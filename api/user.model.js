'use strict'

var db          = require('./conn');
var crypt       = require('./crypt');
const jwt       = require('jsonwebtoken');
const jwtconfig = require('./../jwtconfig');

/////////////////////
// Query Functions
/////////////////////


/**
 * Pour récupérer les utilisateurs
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getAllUsers(req, res, next) {

    db.any('SELECT * FROM users INNER JOIN level as lv ON users.level_id = lv.id_level')
    .then(function (data) {
          
          var db_data = [];
          for(var i = 0; i < data.length; i++){
               
                db_data[i] = {
                    id_user : data[i].id_user,
                    matricule : data[i].matricule,
                    mail : data[i].mail,
                    password : crypt.decrypt(data[i].password),
                    prenom : data[i].prenom,
                    level : data[i].name,
                    idlevel : data[i].level_id
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



function getUserLogin(req, res, next) {
  var pass = crypt.encrypt(req.body.password);


  db.one('SELECT * FROM users INNER JOIN level as lv ON users.level_id = lv.id_level WHERE matricule = $1 AND password = $2', 
    [ req.body.matricule, pass ])
  .then(function (data) {

      var payload = {
          matricule : data.matricule
      }

      var token = jwt.sign(payload, jwtconfig.secret, {
            expiresIn : 86400
      });

      var  db_data = {
                    id_user : data.id_user,
                    matricule : data.matricule,
                    mail : data.mail,
                    password : crypt.decrypt(data.password),
                    prenom : data.prenom,
                    level : data.name,
                    idlevel : data.level_id
                };

      return res.status(200)
      .json({
          data: db_data,
          token : token
      });

  })
  .catch(function(err){
      
      return res.status(200)
      .json({
          status: 'erreur'
      });
      //return err.received;
  });
}


/**
 * Pour récupérer un utilisateur
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getUser(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM users WHERE id_user = $1', id)
    .then(function (data) {

        db.one('SELECT * FROM level WHERE id_level = $1', data.level_id)
        .then(function(data2){

              var  db_data = {
                      id_user : data.id_user,
                      matricule : data.matricule,
                      mail : data.mail,
                      password : crypt.decrypt(data.password),
                      prenom : data.prenom,
                      level : data2.name,
                      idlevel : data.level_id
                  };

              return res.status(200)
              .json({
                data: db_data
              });
                  
        })
        .catch(function (err) {
          return next(err);
        });
        

    })
    .catch(function (err) {
      return next(err);
    });
}

/**
 * Pour mettre à jour un utilisateur
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function updateUser(req, res, next) {
  var pass = crypt.encrypt(req.body.password);
  db.none('UPDATE users SET matricule=$1, mail=$2, password=$3, prenom=$4, level_id=$5 where id_user=$6',
    [req.body.matricule, req.body.mail, pass, req.body.prenom, req.body.level, parseInt(req.body.id_user)])
    .then(function () {
      return res.status(200)
        .json({
          status: 'success',
          message: 'Updated User'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function updateUserVerif(req, res, next) {
    var pass = crypt.encrypt(req.body.password);

    db.tx(t => {
      return t.oneOrNone('SELECT * FROM users INNER JOIN level as lv ON users.level_id = lv.id_level WHERE matricule = $1 AND password = $2', 
              [ req.body.matricule, pass ])
          .then(user => {

              //console.log(user);
              if(user) {
                  return t.none('UPDATE users SET matricule=$1, mail=$2, password=$3, prenom=$4, level_id=$5 where id_user=$6',
    [req.body.matricule, req.body.mail, pass, req.body.prenom, req.body.level, parseInt(req.body.id_user)]);
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
              message: 'Inserted one user'
            });
        }{
            return res.status(200)
            .json({
              status: 'error',
              message: 'user doublon'
            });
        }
    })
    .catch(error => {
        return next(error);
    });
}




/**
 * Pour insérer un utilisateur dans la table user
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function insertUser(req, res, next){
  var pass = crypt.encrypt(req.body.password);

  db.none('INSERT INTO users(matricule, mail, password, prenom, level_id)'+
    ' values($1, $2, $3, $4, $5)', [req.body.matricule, req.body.mail, pass, req.body.prenom, parseInt(req.body.level)])
  .then(function() {
    return res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one user'
    });
  })
  .catch(function(err){
    return next(err);
  });
}

/**
 * vérification des doublons
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function insertUserVerif(req, res, next){
  var pass = crypt.encrypt(req.body.password);

    db.tx(t => {
      return t.oneOrNone('SELECT * FROM users INNER JOIN level as lv ON users.level_id = lv.id_level WHERE matricule = $1 AND password = $2', 
              [ req.body.matricule, pass ])
          .then(user => {

              //console.log(user);
              if(user == null) {
                  return t.none('INSERT INTO users(matricule, mail, password, prenom, level_id)'+
                  ' values($1, $2, $3, $4, $5)', [req.body.matricule, req.body.mail, pass, req.body.prenom, parseInt(req.body.level)]);
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
              message: 'Inserted one user'
            });
        }{
            return res.status(200)
            .json({
              status: 'error',
              message: 'user doublon'
            });
        }
    })
    .catch(error => {
        return next(error);
    });

}


/////////////
// Exports
/////////////

module.exports = {
    getAllUsers: getAllUsers,
    getUserLogin : getUserLogin,
    getUser : getUser,
    updateUser : updateUser,
    insertUser : insertUser,
    insertUserVerif : insertUserVerif,
    updateUserVerif : updateUserVerif
};