'use strict'

var db          = require('./conn');

/**
 * Pour l'ajout des accés
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function insertAcces(req, res, next){

    db.tx(t => {
      return t.oneOrNone('SELECT * FROM acces WHERE level_id = $1 AND lien_id = $2', 
              [ req.body.level_id, req.body.lien_id ])
          .then(acces => {

              if(acces == null) {
                  return t.none('INSERT INTO acces(level_id, lien_id)'+
                  ' values($1, $2)', [ req.body.level_id, req.body.lien_id ]);
              }
              return []; // user not found, so no events*/
          });
    })
    .then(events => {
        if(events == null){
            return res.status(200)
            .json({
              status: 'success',
              message: 'Inserted one acces'
            });
        }{
            return res.status(200)
            .json({
              status: 'error',
              message: 'acces doublon'
            });
        }
    })
    .catch(error => {
        return next(error);
    });

}


/**
 * Pour récupérer les liens avec id_level
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getLienWithLevel(req, res, next) {
	var id = parseInt(req.params.id_level);
    db.any('SELECT * FROM acces INNER JOIN lien as ln ON acces.lien_id = ln.id_lien WHERE level_id = $1', 
    		id)
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
 * Pour supprimer un accès
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function deleteAcces(req, res, next) {

	db.result('DELETE FROM acces WHERE level_id = $1 AND lien_id = $2', [ parseInt(req.body.level_id), parseInt(req.body.lien_id) ])
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} acces`
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
    insertAcces : insertAcces,
    getLienWithLevel : getLienWithLevel,
    deleteAcces : deleteAcces
};