'use strict'

var db          = require('./conn');
var crypt       = require('./crypt');


/**
 * Pour récupérer tous les mails
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getAllMail(req, res, next) {

	db.any('SELECT * FROM mailclient WHERE id_mailclient != 4')
    .then(function (data) {
          
          var db_data = [];
          for(var i = 0; i < data.length; i++){

                if(data[i].passmail == null){

                   var passmail = data[i].passmail;
                }else{
                   var passmail = crypt.decrypt(data[i].passmail);
                }

               
                db_data[i] = {
                    id_mailclient : data[i].id_mailclient,
                    mailclient : data[i].mailclient,
                    passmail : passmail,
                    hostmail : data[i].hostmail,
                    typemail : data[i].typemail,
                    nameclient : data[i].nameclient,
                    portmail : data[i].portmail
                };

          }

        return res.status(200)
        .json({
            data : db_data
        });
        
    })
    .catch(function (err) {
      return next(err);
    });

}


/**
 * Pour récupérer les adresses mail type IMAP dans la table mailclient
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getMailImap(req, res, next) {

	db.any('SELECT * FROM mailclient WHERE typemail = \'imap\'')
    .then(function (data) {
          
          var db_data = [];
          for(var i = 0; i < data.length; i++){
               
               if(data[i].passmail == null){

                    var passmail = data[i].passmail;
                }else{
                    var passmail = crypt.decrypt(data[i].passmail);
                }

                db_data[i] = {
                    id_mailclient : data[i].id_mailclient,
                    mailclient : data[i].mailclient,
                    passmail : passmail,
                    hostmail : data[i].hostmail,
                    typemail : data[i].typemail,
                    nameclient : data[i].nameclient,
                    portmail : data[i].portmail
                };

          }

        return res.status(200)
        .json({
            data : db_data
        });
        
    })
    .catch(function (err) {
      return next(err);
    });

}


/**
 * Pour récupérer les addresses mail POP
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getMailPop(req, res, next){

	db.any('SELECT * FROM mailclient WHERE typemail = \'pop\'')
    .then(function (data) {
          
          var db_data = [];
          for(var i = 0; i < data.length; i++){
                
                if(data[i].passmail == null){

                    var passmail = data[i].passmail;
                }else{
                    var passmail = crypt.decrypt(data[i].passmail);
                }

                db_data[i] = {
                    id_mailclient : data[i].id_mailclient,
                    mailclient : data[i].mailclient,
                    passmail : passmail,
                    hostmail : data[i].hostmail,
                    typemail : data[i].typemail,
                    nameclient : data[i].nameclient,
                    portmail : data[i].portmail
                };

          }

        return res.status(200)
        .json({
            data : db_data
        });
        
    })
    .catch(function (err) {
      return next(err);
    });

}

/**
 * Pour récupérer un mail
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getMail(req, res, next){

    var id = parseInt(req.params.id);
    
    db.one('SELECT * FROM mailclient WHERE id_mailclient = $1', id)
    .then(function (data) {

            
            if(data.passmail == null){
               var passmail = data.passmail;
            }else{
                var passmail = crypt.decrypt(data.passmail);
            }

            var  db_data = {
                    id_mailclient : data.id_mailclient,
                    mailclient : data.mailclient,
                    passmail : passmail,
                    hostmail : data.hostmail,
                    typemail : data.typemail,
                    nameclient : data.nameclient,
                    portmail : data.portmail
            };

            return res.status(200)
            .json({
                data: db_data
            });

    })
    .catch(function (err) {
      return next(err);
    });
}

/**
 * Pour mettre jour un mail client
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function updateMail(req, res, next) {
    var passmail = crypt.encrypt(req.body.passmail);

    db.tx(t => {
      return t.oneOrNone('SELECT * FROM mailclient WHERE mailclient = $1', 
              [ req.body.mailclient ])
          .then(mail => {

              if(mail){
                  return t.none('UPDATE mailclient SET nameclient=$1, passmail=$2, typemail=$3, hostmail=$4, portmail=$5 where id_mailclient=$6',
                  [req.body.nameclient, passmail, req.body.typemail, req.body.hostmail, parseInt(req.body.portmail), parseInt(req.body.id_mailclient)]);
              }else if(mail == null) {
                  return t.none('UPDATE mailclient SET mailclient=$1, nameclient=$2, passmail=$3, typemail=$4, hostmail=$5, portmail=$6 where id_mailclient=$7',
                  [req.body.mailclient, req.body.nameclient, passmail, req.body.typemail, req.body.hostmail, parseInt(req.body.portmail), parseInt(req.body.id_mailclient)]);
              }
              return []; // user not found, so no events*/
          });
    })
    .then(events => {
        //console.log('events :'+events);
        if(events == null){
            
            return res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one client'
            });
        }{
            return res.status(200)
            .json({
              status: 'error',
              message: 'mail client doublon'
            });
        }
    })
    .catch(error => {
        return next(error);
    });
}

/**
 * Pour insérer un mail
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function insertMail(req, res, next){

  var passmail = crypt.encrypt(req.body.passmail);

    db.tx(t => {
      return t.oneOrNone('SELECT * FROM mailclient WHERE mailclient = $1 AND passmail = $2', 
              [ req.body.mailclient, passmail ])
          .then(mail => {

              if(mail == null) {
                  return t.none('INSERT INTO mailclient(mailclient, nameclient, typemail, passmail, hostmail, portmail)'+
                  ' values($1, $2, $3, $4, $5, $6)', [req.body.mailclient, req.body.nameclient, req.body.typemail, passmail, req.body.hostmail, req.body.portmail]);
              }
              return []; // user not found, so no events*/
          });
    })
    .then(events => {
        //console.log('events :'+events);
        if(events == null){
            return res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one client'
            });
        }{
            return res.status(200)
            .json({
              status: 'error',
              message: 'client doublon'
            });
        }


    })
    .catch(error => {
        return next(error);
    });

}


/**
 * Pour supprimer un client
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function deleteClient(req, res, next) {

  db.result('DELETE FROM mailclient WHERE id_mailclient = $1', parseInt(req.body.id_mailclient))
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} mail client`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
    getMailImap : getMailImap,
    getMailPop : getMailPop,
    getAllMail : getAllMail,
    getMail : getMail,
    updateMail : updateMail,
    insertMail : insertMail,
    deleteClient : deleteClient
};