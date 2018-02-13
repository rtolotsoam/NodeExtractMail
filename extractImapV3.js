'use strict';
    const Imap         = require('imap');
    const inspect      = require('util').inspect;
    const simpleParser = require('mailparser').simpleParser;
    var fs             = require('fs'),
    fileStream,
    Promise            = require('bluebird'),
    request            = require('request'),
    encoding           = require("encoding");
    var extract         = require('./extract.js');

Promise.longStackTraces();

/*
Variable header pour les requêtes POST ou GET sur api 
 */
var headers = {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
}

/**
 * Pour récupérer les mail dans la table client
 * @param  {[type]} donneesSelect [description]
 * @return {[type]}               [description]
 */
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


setInterval(function(){

var imaps = [];


asyncGetMail(donneesSelect).then(result => {
    console.log('');
    console.log('#Paramétrage des mail IMAP');
    

    for(var i = 0; i < result['data'].length; i++){
        //console.log(result['data'][i]);

        imaps[i] = {
            user : result['data'][i].mailclient,
            password : result['data'][i].passmail,
            host : result['data'][i].hostmail,
            port: result['data'][i].portmail,
            tls: false
        }
        

        extract.extractInbox(imaps[i]);

    }

}).catch(error => {
    console.log('#error get mail IMAP' + error);
});

}, 30000);


