'use strict';

var db = require('./conn.js');
var crypt = require('./crypt');

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
  db.any('SELECT * FROM users')
    .then(function (data) {
      var db_data = [];
      for(var i = 0; i < data.length; i++){
          //console.log(data[i].id_user);
          db_data[i] = {
              id_user : data[i].id_user,
              matricule : data[i].matricule,
              mail : data[i].mail,
              password : crypt.decrypt(data[i].password),
              prenom : data[i].prenom,
              level : data[i].level_id
          };
      }

      res.status(200)
      .json({
          data : db_data
      });

        
    })
    .catch(function (err) {
      return next(err);
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

              res.status(200)
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
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated User'
        });
    })
    .catch(function (err) {
      return next(err);
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
    res.status(200)
    .json({
      status: 'success',
      message: 'Inserted one user'
    });
  })
  .catch(function(err){
    return next(err);
  });
}


/////////////
// Exports
/////////////

module.exports = {
    getAllUsers: getAllUsers,
    getUser : getUser,
    updateUser : updateUser,
    insertUser : insertUser
};