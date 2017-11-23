var notifier = require('mail-notifier');
var extract = require('./extract.js');

var imap1 = {              
    user: 'si.presta1@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false,
    markSeen: false
  };
var imap2 = {
    user: 'si.presta2@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false,
    markSeen: false
  };
var imap3 = {
    user: 'si.presta3@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false,
    markSeen: false
  };


var imaps = [];

imaps[1] = imap1;
imaps[2] = imap2;
imaps[3] = imap3;


notifier(imaps[1]).on('mail',function(mail){
	console.log('notify1');
	extract.extractInbox(imaps[1]);
}).start();
notifier(imaps[2]).on('mail',function(mail){
	console.log('notify2');
	extract.extractInbox(imaps[2]);
}).start();
notifier(imaps[3]).on('mail',function(mail){
	console.log('notify3');
	extract.extractInbox(imaps[3]);
}).start();
