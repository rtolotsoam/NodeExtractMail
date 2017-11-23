var notifier = require('mail-notifier');
var extract  = require('./extract.js');
var Promise  = require('bluebird');

var imap1 = {              
    user: 'si.presta1@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false,
    markSeen: false,
    debug: console.log
  };
var imap2 = {
    user: 'si.presta2@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false,
    markSeen: false,
    debug: console.log
  };
var imap3 = {
    user: 'si.presta3@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false,
    markSeen: false,
    debug: console.log
  };


var imaps = [];

imaps[1] = imap1;
imaps[2] = imap2;
imaps[3] = imap3;


var test = true;

function asyncNotifier(n){
    return new Promise(
        function(resolve, reject){
            if(test){
                extract.extractInbox(imaps[n]);
                resolve(execute);
            }else{
                reject(err);
            }
        }
    );
}

var execute=0;


notifier(imaps[1]).on('mail',function(mail){
    execute++;
    asyncNotifier(1)
    .then(j=>{
        console.log('==================> ### notify1 ### <=========================');
        console.log('==================>    notify1 num :'+ j +'  <============================');
    })
    .catch(error=>{
        console.log('#error : notify1, execute'+j);
    });
	
}).start();
notifier(imaps[2]).on('mail',function(mail){
    execute++;
    asyncNotifier(2)
    .then(j=>{
        console.log('==================> ### notify2 ### <=========================');
        console.log('==================>    notify2 num :'+ j +'  <============================');
    })
    .catch(error=>{
        console.log('#error : notify2, execute'+j);
    });
}).start();
notifier(imaps[3]).on('mail',function(mail){
    execute++;
    asyncNotifier(3)
    .then(j=>{
        console.log('==================> ### notify3 ### <=========================');
        console.log('==================>    notify3 num :'+ j +'  <============================');
    })
    .catch(error=>{
        console.log('#error : notify3, execute'+j);
    });
}).start();
