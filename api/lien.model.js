'use strict'
var db  = require('./conn');


/**
 * Pour récupérer tous les liens
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getAllLien(req, res, next) {

    db.any('SELECT * FROM lien')
    .then(function (data) {
          
          var db_data = [];
          for(var i = 0; i < data.length; i++){
               
                db_data[i] = {
                    id_lien : data[i].id_lien,
                    titre : data[i].titre,
                    path : data[i].path,
                    icon : data[i].icon
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
 * Pour récupérer un lien
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getLien(req, res, next) {
  	var id = parseInt(req.params.id);
  
    db.one('SELECT * FROM lien WHERE id_lien = $1', id)
    .then(function(data){

          var  db_data = {
                  id_lien : data.id_lien,
                  titre : data.titre,
                  path : data.path,
                  icon : data.icon
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
 * Pour mettre jour un lien
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function updateLien(req, res, next) {

    db.tx(t => {
      return t.oneOrNone('SELECT * FROM lien WHERE path = $1', 
              [ req.body.path.toLowerCase() ])
          .then(lien => {
              if(lien){
                return t.none('UPDATE lien SET titre=$1, icon=$2 WHERE id_lien=$3',
                [req.body.titre.toUpperCase(), req.body.icon.toLowerCase(), parseInt(req.body.id_lien)]);
              }else if(lien == null) {
                return t.none('UPDATE lien SET titre=$1, path=$2, icon=$3 WHERE id_lien=$4',
    					  [req.body.titre.toUpperCase(), req.body.path.toLowerCase(), req.body.icon.toLowerCase(), parseInt(req.body.id_lien)]);
              }
              return []; 
          });
    })
    .then(events => {
        if(events == null){
            return res.status(200)
            .json({
              status: 'success',
              message: 'updated one lien'
            });
        }{
            return res.status(200)
            .json({
              status: 'error',
              message: 'lien doublon'
            });
        }
    })
    .catch(error => {
        return next(error);
    });
}


/**
 * Pour insérer un lien
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function insertLien(req, res, next){
  
    db.tx(t => {
      return t.oneOrNone('SELECT * FROM lien WHERE path = $1', 
              [ req.body.path.toUpperCase() ])
          	.then(lien => {

              	if(lien == null) {
                  	return t.none('INSERT INTO lien(titre, path, icon)'+
                  	' values($1, $2, $3)', [ req.body.titre.toUpperCase(), req.body.path.toLowerCase(), req.body.icon.toLowerCase() ]);
              	}
             	 return [];
          	});
    })
    .then(events => {
        
        if(events == null){
            return res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one lien'
            });
        }{
            return res.status(200)
            .json({
              status: 'error',
              message: 'lien doublon'
            });
        }
    })
    .catch(error => {
        return next(error);
    });

}

/**
 * Pour supprimer un lien
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function deleteLien(req, res, next) {

  db.result('DELETE FROM lien WHERE id_lien = $1',  parseInt(req.body.id_lien))
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} lien`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}



/////////////
// Exports
/////////////

module.exports = {
    getAllLien: getAllLien,
    getLien : getLien,
    updateLien : updateLien,
    insertLien : insertLien,
    deleteLien : deleteLien
};