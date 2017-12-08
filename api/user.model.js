'use strict';

var db = require('./conn.js');

/////////////////////
// Query Functions
/////////////////////



// pour récupèrer tous les utilisateur
function getAllUsers(req, res, next) {
  db.any('SELECT * FROM users')
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


// pour récupèrer un utilisateur par son id
function getUser(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM users WHERE id_user = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


/////////////
// Exports
/////////////

module.exports = {
    getAllUsers: getAllUsers,
    getUser : getUser
};