'use strict'
var extract  = require('./extract.js');
var notifier = require('mail-notifier');

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


var started = true;

function toggleState(notify){
  if(started){
    notify.stop();
  }else{
    notify.start();
  }
  started = !started;
  setTimeout(toggleState,5000, notify);
}


var test = true;

function asyncNotifier(){
    return new Promise(
        function(resolve, reject){
            if(test){
                          
                resolve(execute);
                
            }else{
                reject(err);
            }
        }
    );
}


function asyncGetMail(donneesSelect) {
    return new Promise(function(resolve, reject) {
        request(donneesSelect, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var obj = JSON.parse(body);
                resolve(obj);
            } else {
                console.log('#error lors selection mail :' + error);
                reject(error);
            }
        });
    });
}


var donneesSelect = {
            url: 'http://localhost:3000/api/mailimap',
            method: 'GET',
            headers: headers
        }


var imaps = [];

var execute = 0;

asyncGetMail(donneesSelect).then(result => {
    
    console.log('#Paramétrage des mail IMAP');
    

    for(var i = 0; i < result['data'].length; i++){
        //console.log(result['data'][i]);

        imaps[i] = {
            user : result['data'][i].mailclient,
            password : result['data'][i].passmail,
            host : result['data'][i].hostmail,
            port: 143,
            tls: false
        }

        console.log(JSON.stringify(imaps[i]));
    }      
    

})
.then(()=>{

        while (execute < imaps.length) {
            
            asyncNotifier()
            .then(j=>{
                var n  = notifier(imaps[j]).on('mail', function(mail){
                              extract.extractInbox(imaps[j]);
                            });

                n.on('end',function(){
                  console.log('...Fin notification'+ j +'...');
                });

                n.on('error',function(err){
                  console.log('...Error notification'+ j +' : %s', err);
                });

                n.start();

                setTimeout(toggleState, 3000, n);
                
            })
            .catch(error=>{
                console.log('#error : Notification');
            });

            execute++;
        }
})
.catch(error => {
    console.log('#error get mail IMAP' + error);
});





