var notifier = require('mail-notifier');
var extract  = require('./extract.js');
var Promise  = require('bluebird');

var imap1 = {              
    user: 'si.presta1@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false,
    markSeen: false//,
    //debug: console.log
  };
var imap2 = {
    user: 'si.presta2@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false,
    markSeen: false//,
    //debug: console.log
  };
var imap3 = {
    user: 'si.presta3@vivetic.com',
    password: 'TestSI2017',
    host: 'mail.vivetic.com',
    port: 143,
    tls: false,
    markSeen: false//,
    //debug: console.log
  };


var imaps = [];

imaps[1] = imap1;
imaps[2] = imap2;
imaps[3] = imap3;


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


var execute=0;

while (execute < imaps.length - 1) {
    execute++;
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

        setTimeout(toggleState,3000, n);
        
    })
    .catch(error=>{
        console.log('#error : Notification');
    });
}


