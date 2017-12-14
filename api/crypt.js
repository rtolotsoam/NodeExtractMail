'use strict';

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    key = 'kvTRhuYnXC!N4b_E2CrC5eJ=WC_Jh4hc!s^7c5mm#2vQ$%C7jMCy6FAP#JUA4y^GP3nEc^f^ybmqUypED9n4xz^NK=$?uKtKPdNrXctj9LLDuzc$ZTwgfX3PTjRyCeau&RTMrNbnv&*%=&6N!He_m+uKavK#%v@cj55Q6pCN_%*7thRzvR_Ja!TV@Y?nh@!kgBu^9%bxvkR&NbV%t?mN4x7RRs6AAh^T!3FTxkeLc#=xwQ!bJbRUAR+A8%x$4PM-';

function encrypt(password){
  var cipher = crypto.createCipher(algorithm, key)
  var crypted = cipher.update(password,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(password){
  var decipher = crypto.createDecipher(algorithm, key)
  var dec = decipher.update(password,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}


module.exports = {
    decrypt : decrypt,
    encrypt : encrypt
};