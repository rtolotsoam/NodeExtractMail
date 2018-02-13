'use strict'
var POP3Client     = require("poplib");
const util         = require('util').inspect;
var fs             = require("fs");
var https          = require('https');
const simpleParser = require('mailparser').simpleParser,
	request        = require('request');


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


function extractPop(mailConfig){

var host = mailConfig.hostmail;
var port = mailConfig.portmail;
var username = mailConfig.mailclient;
var password = mailConfig.passmail;
var totalmsgcount = 0;
var currentmsg = 0;
var debug;

var client = new POP3Client(port, host, {

		tlserrs: false,
		enabletls: false,
		debug: false

	});

client.on("error", function(err) {

	if (err.errno === 111) console.log("Unable to connect to server, failed");
	else console.log("Server error occurred, failed");

	console.log(err);

});

client.on("connect", function() {

	console.log("CONNECT success");
	client.login(username, password);

});

client.on("invalid-state", function(cmd) {
	console.log("Invalid state. You tried calling " + cmd);
});

client.on("locked", function(cmd) {
	console.log("Current command has not finished yet. You tried calling " + cmd);
});

client.on("login", function(status, data) {

	if (status) {

		console.log("LOGIN/PASS success");
		client.list();

	} else {

		console.log("LOGIN/PASS failed");
		client.quit();

	}

});

var uids, uid;

client.on("list", function(status, msgcount, msgnumber, data, rawdata) {

	if (status === false) {

		console.log("LIST failed");
		client.quit();

	} else if (msgcount > 0) {

		uids =  data.toString().split(","); 

		totalmsgcount = msgcount;
		currentmsg = 1;
		console.log("LIST success with " + msgcount + " message(s)");
		client.retr(1);

	} else {

		console.log("LIST success with 0 message(s)");
		client.quit();

	}
});

client.on("retr", function(status, msgnumber, data, rawdata) {


	if (status === true) {


		console.log("RETR success " + msgnumber);
		currentmsg += 1;

		simpleParser(data, (err, mail) => {

			//console.log(mail);
			
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
		        if(username == tomail) {

	                var dir = 'data/' + tomail;
	                /*
	                tester si le répertoire existe déja
	                */
	                if (!fs.existsSync(dir)) {
	                    fs.mkdirSync(dir); // création du répertoire avec pour nom l'adresse mail (tomail)
	                }
	                var dirmail = dir + '/' + uids[msgnumber];
	                if (!fs.existsSync(dirmail)) {
	                    fs.mkdirSync(dirmail); // création du répertoire pour enregistrer les mail (tomail/uid)
	                    var filename = dirmail + '/' + uids[msgnumber] + '.html'; //  le corp du mail est enregistrer en format uid.html
	                    var bodystream = fs.createWriteStream(filename);
	                    //bodystream.write(encoding.convert(mail.html, 'iso-8859-1', 'utf-8'));
	                    bodystream.write(mail.html);
	                    bodystream.end();
	                    console.log('======================> DEBUT simpleparser <=================');
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
	                            'uidmail': uids[msgnumber],
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
	                                console.log('filename ' + uids[msgnumber] + '=============>' + attachfilename);
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
	                                        'uidmail': uids[msgnumber],
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
	                                console.log('content attach' + uids[msgnumber] + '=============> saved <========================');
	                            }
	                            console.log('=============> FIN attachment <==============');
	                        }
	                    }).catch(error => {
	                        console.log('#error get id_inbox' + error);
	                    });
	                }
	                console.log("================>  simpleparser  END <==========================");
		        
		        }else{

		        	var dir = 'data/' + username;
	                /*
	                tester si le répertoire existe déja
	                */
	                if (!fs.existsSync(dir)) {
	                    fs.mkdirSync(dir); // création du répertoire avec pour nom l'adresse mail (tomail)
	                }
	                var dirmail = dir + '/' + uids[msgnumber];
	                if (!fs.existsSync(dirmail)) {
	                    fs.mkdirSync(dirmail); // création du répertoire pour enregistrer les mail (tomail/uid)
	                    var filename = dirmail + '/' + uids[msgnumber] + '.html'; //  le corp du mail est enregistrer en format uid.html
	                    var bodystream = fs.createWriteStream(filename);
	                    //bodystream.write(encoding.convert(mail.html, 'iso-8859-1', 'utf-8'));
	                    bodystream.write(mail.html);
	                    bodystream.end();
	                    console.log('======================> DEBUT simpleparser <=================');
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
	                            'tomail': username,
	                            'uidmail': uids[msgnumber],
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
	                                console.log('filename ' + uids[msgnumber] + '=============>' + attachfilename);
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
	                                        'uidmail': uids[msgnumber],
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
	                                console.log('content attach' + uids[msgnumber] + '=============> saved <========================');
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


            if (err) client.rset();
			else client.dele(msgnumber);
            console.log("=======================================>FIN MAIL<==================================");
			
		});


	} else {

		console.log("RETR failed for msgnumber " + msgnumber);
		client.rset();

	}
});

client.on("dele", function(status, msgnumber, data, rawdata) {

	if (status === true) {

		console.log("DELE success for msgnumber " + msgnumber);

		if (currentmsg > totalmsgcount)
			client.quit();
		else
			client.retr(currentmsg);

	} else {

		console.log("DELE failed for msgnumber " + msgnumber);
		client.rset();

	}
});

client.on("rset", function(status,rawdata) {
	client.quit();
});

client.on("quit", function(status, rawdata) {

	if (status === true) console.log("QUIT success");
	else console.log("QUIT failed");

});

}
/*
Pour exporter la fonction extractPop
*/
module.exports.extractPop = function(config) {
    extractPop(config);
};