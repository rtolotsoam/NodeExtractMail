'use strict';
    const Imap         = require('imap');
    const inspect      = require('util').inspect;
    const simpleParser = require('mailparser').simpleParser;
    var fs             = require('fs'),
    fileStream,
    Promise            = require('bluebird'),
    request            = require('request'),
    encoding           = require("encoding");
Promise.longStackTraces();
/*
Variable header pour les requêtes POST ou GET sur api 
 */
var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
}
/*
Fonction pour l'insertion des données dans INBOX
 */
var idinbox;

function asyncGetidbox(donneesInsert) {
    return new Promise(function(resolve, reject) {
        request(donneesInsert, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var obj = JSON.parse(body);
                idinbox = obj.id_inbox;
                console.log('#insertion inbox : OK,  id ==>' + idinbox);
                resolve(idinbox);
            } else {
                console.log('#error lors insertion inbox :' + error);
                reject(error);
            }
        });
    });
}
/*
Fonction qui extract la boite mail
 */
function extractInbox(mailConfig) {
    var imap = new Imap(mailConfig);
    /*
    Pour rendre les fonctions imap asynchrone
     */
    Promise.promisifyAll(imap);
    /*
    Fonction pour extraire boite de réception, 
    pour ensuite enregistrer dans le server et la base de données
     */
    imap.onAsync('ready', function() {
        imap.openBoxAsync('INBOX', false, function(err, mailBox) {
            if (err) throw err;
            /*
            Rechercher tous les mails non lu
             */
            imap.search(['UNSEEN'], function(err, results) {
                if (err) throw err;
                /*
                Pour tester s'il y a des mail non lu
                 */
                if (results.length > 0) {
                    /*
                    Configuration de lecture des mails 
                     */
                    var f = Promise.promisifyAll(imap.fetch(results, {
                        bodies: '', // Pour prendre tous le corps du mail
                        markSeen: true // Pour marquer les mails en lu
                    }));
                    /*
                    Lecture des mails
                     */
                    f.on('message', function(msg, seqno) {
                        var uid = seqno;
                        console.log('uid ==>' + seqno);
                        /*
                        Lecture du body du mail
                         */
                        msg.on('body', function(stream, info) {
                            console.log("================>  simpleparser  <==========================");
                            /*
                            Pour récupérer le contenu du mail et l'attachement.
                            On utilise le librairie SimpleParser
                             */
                            simpleParser(stream, (err, mail) => {
                                
                                var dateservermail = mail.date; //  Date par défaut du server mail
                                /*
                                Convertion date : DD-MM-YYYY HH:MM:SS
                                 */
                                var date = new Date(dateservermail);
                                var year = date.getFullYear();
                                var month = date.getMonth() + 1;
                                var dt = date.getDate();
                                var hour = date.getHours();
                                var min = date.getMinutes();
                                var sec = date.getSeconds();
                                if (dt < 10) {
                                    dt = '0' + dt;
                                }
                                if (month < 10) {
                                    month = '0' + month;
                                }
                                if (hour < 10) {
                                    hour = '0' + hour;
                                }
                                if (min < 10) {
                                    min = '0' + min;
                                }
                                if (sec < 10) {
                                    sec = '0' + sec;
                                }
                                var dateservermailformat = dt + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec; //  Date formater en DD-MM-YYYY HH:MM:SS
                                console.log('date ==>' + dateservermail);
                                var frommail = mail.from.value[0].address; // Adresse mail de l'envoyeur 
                                console.log('from ==>' + frommail);
                                var fromname = mail.from.value[0].name; // Nom de l'envoyeur du mail
                                console.log('fromname ==>' + fromname);
                                if(mail.to.value.length>0){
                                    var tomail = mail.to.value[0].address; // Adresse mail qui reçoit le mail
                                    console.log('tomail ==>' + tomail);
                                }
                                var subject = mail.subject; //  Sujet du mail
                                console.log('subject ==>' + subject);
                                /*
                                Vérification des adresses mail en copie
                                 */
                                var ccadd = '';
                                if (typeof(mail.cc) != 'undefined') {
                                    if (mail.cc.value.length > 1) {
                                        for (var i = 0; i < mail.cc.value.length; i++) {
                                            if (i == 0) {
                                                ccadd = mail.cc.value[i].address;
                                            } else {
                                                ccadd = ccadd + ';' + mail.cc.value[i].address;
                                            }
                                        }
                                    } else {
                                        ccadd = mail.cc.value[0].address;
                                    }
                                    console.log('cc ==>' + ccadd);
                                }

                              /*
                              Pour assurer que le mail est destinné au addresse mail
                              c-a-d to pas cc
                               */
                              if(mail.to.value.length>0){
                                  if(mailConfig.user == tomail) {

                                        var dir = 'data/' + tomail;
                                        /*
                                        tester si le répertoire existe déja
                                         */
                                        if (!fs.existsSync(dir)) {
                                            fs.mkdirSync(dir); // création du répertoire avec pour nom l'adresse mail (tomail)
                                        }
                                        var dirmail = dir + '/' + seqno;
                                        if (!fs.existsSync(dirmail)) {
                                            fs.mkdirSync(dirmail); // création du répertoire pour enregistrer les mail (tomail/uid)
                                            var filename = dirmail + '/' + seqno + '.html'; //  le corp du mail est enregistrer en format uid.html
                                            var bodystream = fs.createWriteStream(filename);
                                            //bodystream.write(encoding.convert(mail.html, 'iso-8859-1', 'utf-8'));
                                            bodystream.write(mail.html);
                                            bodystream.end();
                                            console.log('======================> saved simple<=================');
                                            /*
                                            Données à insérer dans inbox
                                             */
                                            var donneesInsert = {
                                                url: 'http://localhost:3000/api/insertinbox',
                                                method: 'POST',
                                                headers: headers,
                                                form: {
                                                    'cc': ccadd,
                                                    'subject': subject,
                                                    'frommail': frommail,
                                                    'tomail': tomail,
                                                    'uidmail': uid,
                                                    'dateservermail': dateservermail,
                                                    'fromname': fromname,
                                                    'dateservermailformat': dateservermailformat
                                                }
                                            }
                                            /*
                                            Pour ré-initialiser les variable
                                             */
                                            ccadd                = ''; 
                                            subject              = '';
                                            frommail             = '';
                                            tomail               = '';
                                            dateservermailformat = '';
                                            fromname             = '';
                                            dateservermailformat = '';
                                            /*
                                            Pour l'insertion des données dans inbox
                                             */
                                            asyncGetidbox(donneesInsert).then(result => {
                                                console.log('#id_inbox ==>' + idinbox);
                                                /*
                                                tester s'il y a des fichier en attachement
                                                 */
                                                if (mail.attachments.length > 0) {
                                                    console.log('=============> DEBUT attachment <==============');
                                                    var count     = mail.attachments.length; // nombre attachement
                                                    var attach    = mail.attachments;
                                                    var attachdir = dirmail + '/attach';
                                                    if (!fs.existsSync(attachdir)) {
                                                      fs.mkdirSync(attachdir);
                                                    }

                                                    /*
                                                    Pour tous récupérer les attachments
                                                     */
                                                    for (var i = 0; i < count; i++) {
                                                        var attachfilename = attach[i].filename; // 
                                                        console.log('filename ' + seqno + '=============>' + attachfilename);
                                                        var file = attachdir + '/' + attach[i].filename; // enregistrement de l'attachement avec son nom
                                                        var size = attach[i].size; // taille de l'attachement
                                                        console.log('size ===>' + size);
                                                        var attachstream = fs.createWriteStream(file);
                                                        attachstream.write(attach[i].content);
                                                        attachstream.end();
                                                        /*
                                                        Données à insérer dans attachment
                                                         */
                                                        var donneesAttach = {
                                                            url: 'http://localhost:3000/api/insertattachment',
                                                            method: 'POST',
                                                            headers: headers,
                                                            form: {
                                                                'filename': attachfilename,
                                                                'inbox_id': idinbox,
                                                                'uidmail': uid,
                                                                'size': size
                                                            }
                                                        }
                                                        /*
                                                        Pour ré-initialiser les variables
                                                         */
                                                        attachfilename = '';
                                                        size           = '';
                                                        /*
                                                        Pour l'insertion des données dans attachment
                                                         */
                                                        request(donneesAttach, function(error, response, body) {
                                                            if (!error && response.statusCode == 200) {
                                                                console.log('#insertion attachment : OK');
                                                            } else {
                                                                console.log('#error lors insertion attachment :' + error);
                                                            }
                                                        });
                                                        console.log('content attach' + seqno + '=============> saved <========================');
                                                    }
                                                    console.log('=============> FIN attachment <==============');
                                                }
                                            }).catch(error => {
                                                console.log('#error get id_inbox' + error);
                                            });
                                        }
                                    console.log("================>  simpleparser  END <==========================");
                                  
                                  }else{

                                        var dir = 'data/' + mailConfig.user;
                                        /*
                                        tester si le répertoire existe déja
                                         */
                                        if (!fs.existsSync(dir)) {
                                            fs.mkdirSync(dir); // création du répertoire avec pour nom l'adresse mail (tomail)
                                        }
                                        var dirmail = dir + '/' + seqno;
                                        if (!fs.existsSync(dirmail)) {
                                            fs.mkdirSync(dirmail); // création du répertoire pour enregistrer les mail (tomail/uid)
                                            var filename = dirmail + '/' + seqno + '.html'; //  le corp du mail est enregistrer en format uid.html
                                            var bodystream = fs.createWriteStream(filename);
                                            //bodystream.write(encoding.convert(mail.html, 'iso-8859-1', 'utf-8'));
                                            bodystream.write(mail.html);
                                            bodystream.end();
                                            console.log('======================> saved simple<=================');
                                            /*
                                            Données à insérer dans inbox
                                             */
                                            var donneesInsert = {
                                                url: 'http://localhost:3000/api/insertinboxcc',
                                                method: 'POST',
                                                headers: headers,
                                                form: {
                                                    'cc': ccadd,
                                                    'subject': subject,
                                                    'frommail': frommail,
                                                    'tomail': mailConfig.user,
                                                    'uidmail': uid,
                                                    'dateservermail': dateservermail,
                                                    'fromname': fromname,
                                                    'dateservermailformat': dateservermailformat,
                                                    'tomailcc' : tomail,
                                                    'flagcc' : true
                                                }
                                            }
                                            /*
                                            Pour ré-initialiser les variable
                                             */
                                            ccadd                = ''; 
                                            subject              = '';
                                            frommail             = '';
                                            tomail               = '';
                                            dateservermailformat = '';
                                            fromname             = '';
                                            dateservermailformat = '';
                                            /*
                                            Pour l'insertion des données dans inbox
                                             */
                                            asyncGetidbox(donneesInsert).then(result => {
                                                console.log('#id_inbox ==>' + idinbox);
                                                /*
                                                tester s'il y a des fichier en attachement
                                                 */
                                                if (mail.attachments.length > 0) {
                                                    console.log('=============> DEBUT attachment <==============');
                                                    var count     = mail.attachments.length; // nombre attachement
                                                    var attach    = mail.attachments;
                                                    var attachdir = dirmail + '/attach';
                                                    if (!fs.existsSync(attachdir)) {
                                                      fs.mkdirSync(attachdir);
                                                    }

                                                    /*
                                                    Pour tous récupérer les attachments
                                                     */
                                                    for (var i = 0; i < count; i++) {
                                                        var attachfilename = attach[i].filename; // 
                                                        console.log('filename ' + seqno + '=============>' + attachfilename);
                                                        var file = attachdir + '/' + attach[i].filename; // enregistrement de l'attachement avec son nom
                                                        var size = attach[i].size; // taille de l'attachement
                                                        console.log('size ===>' + size);
                                                        var attachstream = fs.createWriteStream(file);
                                                        attachstream.write(attach[i].content);
                                                        attachstream.end();
                                                        /*
                                                        Données à insérer dans attachment
                                                         */
                                                        var donneesAttach = {
                                                            url: 'http://localhost:3000/api/insertattachment',
                                                            method: 'POST',
                                                            headers: headers,
                                                            form: {
                                                                'filename': attachfilename,
                                                                'inbox_id': idinbox,
                                                                'uidmail': uid,
                                                                'size': size
                                                            }
                                                        }
                                                        /*
                                                        Pour ré-initialiser les variables
                                                         */
                                                        attachfilename = '';
                                                        size           = '';
                                                        /*
                                                        Pour l'insertion des données dans attachment
                                                         */
                                                        request(donneesAttach, function(error, response, body) {
                                                            if (!error && response.statusCode == 200) {
                                                                console.log('#insertion attachment : OK');
                                                            } else {
                                                                console.log('#error lors insertion attachment :' + error);
                                                            }
                                                        });
                                                        console.log('content attach' + seqno + '=============> saved <========================');
                                                    }
                                                    console.log('=============> FIN attachment <==============');
                                                }
                                            }).catch(error => {
                                                console.log('#error get id_inbox' + error);
                                            });
                                        }                                




                                    console.log("================>  simpleparser  END <==========================");
                                  }
                          }


                            });
                        });
                        msg.once('attributes', function(attrs) {
                            console.log('Attributes ===> mail ' + seqno + ': %s', inspect(attrs, false, 8));
                        });
                        msg.once('end', function() {
                            console.log('Terminer ===>' + seqno);
                        });
                    });
                    f.once('error', function(err) {
                        console.log('Fetch error: ' + err);
                    });
                    f.once('end', function() {
                        console.log('Done fetching all messages!')
                        imap.end();
                    });
                } else {
                    console.log('Pas de nouvelle mail non lu dans mail');
                    imap.end();
                }
            });
        });
    });
    imap.onAsync('error', function(err) {
        console.log(err);
    });
    imap.onAsync('end', function() {
        console.log('Connection ended');
    });
    imap.connectAsync();
}
/*
Pour exporter la fonction extractInbox
 */
module.exports.extractInbox = function(imap) {
    extractInbox(imap);
};