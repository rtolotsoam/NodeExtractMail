'use strict'
var POP3Client = require("poplib");
const util      = require('util').inspect;
var fs = require("fs");
var https = require('https');


var host = "192.168.10.4";
var port = 110;
var username = "tolotsoa.randrianatoandro@vivetic.mg";
var password = "0WePx33Z";
var totalmsgcount = 0;
var currentmsg = 0;
var debug;
var filename = "./data/test.txt";

var fd = fs.openSync(filename, "a+");

var client = new POP3Client(port, host, {
 
        tlserrs: false,
        enabletls: false,
        debug: false
 
    });


client.on("error", function(err) {

	if (err.errno === 111) console.log("Unable to connect to server");
	else console.log("Server error occurred");

	console.log(err);

});

client.on("connect", function(rawdata) {

	console.log("CONNECT success");
	client.login(username, password);

});

client.on("invalid-state", function(cmd) {
	console.log("Etat non valide. Vous avez essayé d'appeler " + cmd);
});

client.on("locked", function(cmd) {
	console.log("La commande en cours n'est pas encore terminée. Vous avez essayé d'appeler " + cmd);
});

client.on("login", function(status, rawdata) {

	if (status) {

		console.log("LOGIN/PASS success");
		client.list();

	} else {

		console.log("LOGIN/PASS failed");
		client.quit();

	}

});


client.on("list", function(status, msgcount, msgnumber, data, rawdata) {


	if (status === false) {

		if (msgnumber !== undefined) console.log("LIST failed for msgnumber " + msgnumber);
		else console.log("LIST failed");

		client.quit();

	} else if (msgcount === 0) {

		console.log("LIST success with 0 elements");
		client.quit();

	} else if (msgcount > 0){

		console.log("LIST success with " + msgcount + " element(s)");
		
		client.uidl();	
					
	}else{

		console.log("LIST success with 0 message(s)");
		client.quit();
	}
});



client.on("uidl", function(status) {

	if (status === true) {

		console.log("UIDL success");
		if (debug) console.log("Parsed data: " + data);

			client.top(1);

	} else {

		client.quit();

	}
});


client.on("top", function(status, msgnumber, data, rawdata) {

	if (status === true) {

		console.log("TOP success for msgnumber " + msgnumber);
		if (debug) console.log("Parsed data: " + data);

		client.retr(msgnumber);

	} else {

		console.log("TOP failed for msgnumber " + msgnumber);
		client.quit();

	}
});


client.on("retr", function(status, msgnumber, data, rawdata) {

	if (status === true) {

		console.log("RETR success for msgnumber " + msgnumber);

		if (debug) console.log("Parsed data: " + data);

        if (msgnumber !== undefined) client.dele(msgnumber);
        else client.rset();

	} else {

		console.log("RETR failed for msgnumber " + msgnumber);
		client.rset();

	}
});

client.on("dele", function(status, msgnumber, data, rawdata) {

	if (status === true) {

		console.log("DELE success for msgnumber " + msgnumber);
		client.rset();

	} else {

		console.log("DELE failed for msgnumber " + msgnumber);
		client.quit();

	}
});

client.on("rset", function(status, rawdata) {

	if (status === true) console.log("RSET success");
	else console.log("RSET failed");

	client.quit();

});

client.on("quit", function(status, rawdata) {

	if (status === true) console.log("QUIT success");
	else console.log("QUIT failed");

});