"use strict";

const Imap = require('imap');
const inspect = require('util').inspect;
const simpleParser = require('mailparser').simpleParser;
var fs = require('fs'),
    fileStream,
    Promise = require('bluebird');

Promise.longStackTraces();


/*
Liste des addres mail qui recoivent les mails
 */
var imap1 = {              
    user: 'si.presta1@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false
  };
var imap2 = {
    user: 'si.presta2@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false
  };
var imap3 = {
    user: 'si.presta3@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false
  };


var imaps = [];

imaps[1] = imap1;
imaps[2] = imap2;
imaps[3] = imap3;


var test = true;  //  Variable pour une test dans le fonction asynchrone

/*
Fonction pour rendre boucle WHILE asynchrone
 */
function asyncBoucle() {
    return new Promise(
        function (resolve, reject) {

          if(test){

            resolve(execute);

          }else{
            reject(err);
          }
          
        }
    );
}


var execute = 0;  //  Variable qui compte les mails executer


/*
Boucle pour extraire tous les données dans les adresses mails
 */
while(execute < imaps.length-1){
    
  execute++;

  asyncBoucle()
  .then(i=>{  

    console.log('Adresse mail ==>'+ i);

    var imap = new Imap(imaps[i]);


    /*
    Pour rendre les fonctions imap asynchrone
     */
    Promise.promisifyAll(imap);

    /*
    Fonction pour extraire boite de réception, 
    pour ensuite enregistrer dans le server et la base de données
     */

    imap.onAsync('ready', function(){
        imap.openBox('INBOX', false, function(err, mailBox) {
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
                                var month = date.getMonth()+1;
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
                                if(hour < 10){
                                  hour = '0' + hour;
                                }
                                if(min < 10){
                                  min = '0'+ min;
                                }
                                if(sec < 10){
                                  sec = '0'+ sec;
                                }

                                var dateservermailformat = dt+ '-' + month + '-' + year + ' '+ hour + ':'+ min +':'+ sec; //  Date formater en DD-MM-YYYY HH:MM:SS

                                console.log('date ==>'+ dateservermail);

                                var frommail = mail.from.value[0].address; // Adresse mail de l'envoyeur 

                                console.log('from ==>' + frommail);

                                var fromname = mail.from.value[0].name; // Nom de l'envoyeur du mail

                                console.log('fromname ==>' + fromname);

                                var tomail = mail.to.value[0].address;  // Adresse mail qui reçoit le mail

                                console.log('tomail ==>' + tomail);

                                var subject = mail.subject; //  Sujet du mail

                                console.log('subject ==>' + subject);

                                /*
                                Vérification des adresses mail en copie
                                 */
                                if(typeof(mail.cc) != 'undefined') {
                                    
                                    var ccadd = '';
                                    if(mail.cc.value.length > 1) {
                                        
                                        for (var i = 0; i < mail.cc.value.length; i++) {
                                          if(i==0){
                                            ccadd = mail.cc.value[i].address; 
                                          }else{
                                            ccadd = ccadd + ';' + mail.cc.value[i].address; 
                                          }
                                        }
                                    }else{
                                      ccadd = mail.cc.value[0].address;
                                    }

                                    console.log('cc ==>' + ccadd);
                                }
                                

                                var dir = 'data/'+ tomail;
                                var uid = seqno;

                                console.log('uid ==>' + seqno);

                                //fs.writeFileSync('mail_conf.txt', JSON.stringify(mail));

                                /*
                                tester si le répertoire existe déja
                                 */
                                if (!fs.existsSync(dir)) {
                                    

                                    fs.mkdirSync(dir); // création du répertoire avec pour nom l'adresse mail (tomail)

                                }

                                var dirmail = dir +'/'+ seqno;

                                if (!fs.existsSync(dirmail)) {
                                    

                                    fs.mkdirSync(dirmail); // création du répertoire pour enregistrer les mail (tomail/uid)

                                

                                    var filename = dirmail +'/' + seqno + '.html';  //  le corp du mail est enregistrer en format uid.html
                                    var bodystream = fs.createWriteStream(filename);
                                    bodystream.write(mail.textAsHtml);
                                    bodystream.end();

                                    console.log('======================> saved simple<=================');
                                
                                      /*
                                      tester s'il y a des fichier en attachement
                                       */
                                      if(mail.attachments.length > 0) {

                                          console.log('=============> DEBUT attachment <==============');

                                          var count = mail.attachments.length; // nombre attachement
                                          var attach = mail.attachments;
                                          
                                              /*
                                              Pour tous récupérer les attachments
                                               */
                                              for(var i=0; i < count; i++)  {

                                                var attachfilename = attach[i].filename; // 

                                                console.log('filename '+ seqno +'=============>' + attachfilename);

                                                var file = dirmail + '/' + attach[i].filename; // enregistrement de l'attachement avec son nom

                                                var size = attach[i].size; // taille de l'attachement

                                                console.log('size ===>' + size);

                                                var attachstream = fs.createWriteStream(file);
                                                attachstream.write(attach[i].content);
                                                attachstream.end();

                                                console.log('content attach'+ seqno +'=============> saved <========================');
                                                    
                                              }

                                          console.log('=============> FIN attachment <==============');    


                                      }

                                }
                                
        
                          });
                          console.log("================>  simpleparser  END <==========================");
                      });
                      msg.once('attributes', function(attrs) {
                          console.log('Attributes ===> mail '+ seqno +': %s', inspect(attrs, false, 8));
                      });
                      msg.once('end', function() {
                          console.log('Terminer ===>' + seqno);
                      });
                  });
                  f.once('error', function(err) {
                      console.log('Fetch error: ' + err);
                  });
                  f.once('end', function() {
                      console.log('Done fetching all messages!');
                      imap.end();
                  });

              }else{

                  console.log('Pas de nouvelle mail non lu');
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

  })
  .catch(error => { console.log('#error : '+ error) });
    
}
      
      
      