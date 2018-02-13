'use strict'
var POP3Client     = require("poplib");
const util         = require('util').inspect;
var fs             = require("fs");
var https          = require('https');
const simpleParser = require('mailparser').simpleParser;
var extract        = require('./extractPopV2.js');
var Promise        = require('bluebird'), 
	request        = require('request');

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
            url: 'http://localhost:3000/api/mailpop',
            method: 'GET',
            headers: headers
        }


setInterval(function(){

	asyncGetMail(donneesSelect).then(result => {
	    console.log('');
	    console.log('#Paramétrage des mail POP');
	    
	    //console.log(result['data']);

	    for(var i = 0; i < result['data'].length; i++){
	        
	        extract.extractPop(result['data'][i]);

	    }

	}).catch(error => {
	    console.log('#error get mail POP' + error);
	});

}, 30000);