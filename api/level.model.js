'use strict';

var db = require('./conn.js');

/**
 * Fonction pour récupérer les level dans la table level
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getAllLevel(req, res, next){
	db.any('SELECT * FROM level')
	.then(function(data){

		var db_data = [];
	    for(var i = 0; i < data.length; i++){
	           
            db_data[i] = {
                id_level : data[i].id_level,
                name : data[i].name,
                redirect : data[i].redirect
            };
	    }
		return res.status(200)
	    .json({
	        data : db_data
	    });
	})
	.catch(function(err){
		return next(err);
	});

}

function getLevel(req, res, next) {
  	var id = parseInt(req.params.id);

	db.one('SELECT * FROM level WHERE id_level = $1', id)
	.then(function(data){

	      var  db_data = {
	              id_level : data.id_level,
	              name : data.name,
                redirect : data.redirect
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
 * Pour insérer un level
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function insertLevel(req, res, next){

    db.tx(t => {
      return t.oneOrNone('SELECT * FROM level WHERE name = $1', 
              [ req.body.name.toLowerCase() ])
          .then(level => {

              //console.log(user);
              if(level == null) {
                  return t.none('INSERT INTO level(name, redirect)'+
                  ' values($1, $2)', [ req.body.name.toLowerCase(), req.body.redirect.toLowerCase() ]);
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
              message: 'Inserted one level'
            });
        }{
            return res.status(200)
            .json({
              status: 'error',
              message: 'level doublon'
            });
        }
    })
    .catch(error => {
        return next(error);
    });

}

/**
 * Pour mettre à jour un level
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function updateLevel(req, res, next) {
    
    db.tx(t => {
      return t.oneOrNone('SELECT * FROM level WHERE name = $1 AND redirect = $2', 
              [ req.body.name.toLowerCase(), req.body.redirect.toLowerCase() ])
          .then(level => {

              //console.log(user);
              if(level == null) {
                return t.none('UPDATE level SET name=$1, redirect = $2 WHERE id_level=$3',
    				    [ req.body.name.toLowerCase(), req.body.redirect.toLowerCase(), parseInt(req.body.id_level) ]);
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
              message: 'update one level'
            });
        }{
            return res.status(200)
            .json({
              status: 'error',
              message: 'level doublon'
            });
        }
    })
    .catch(error => {
        return next(error);
    });
}

/**
 * Pour supprimer un level
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function deleteLevel(req, res, next) {

  db.result('DELETE FROM level WHERE id_level = $1', parseInt(req.body.id_level))
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} level`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


module.exports = {
	getAllLevel : getAllLevel,
	getLevel : getLevel,
	insertLevel : insertLevel,
	updateLevel : updateLevel,
  deleteLevel : deleteLevel
}