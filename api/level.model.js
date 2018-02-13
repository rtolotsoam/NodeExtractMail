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
		return res.status(200)
	    .json({
	        data : data
	    });
	})
	.catch(function(err){
		return next(err);
	});

}


module.exports = {
	getAllLevel : getAllLevel
}