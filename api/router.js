'use strict'

var express   = require('express');
var router    = express.Router();
var token = require('./security');

// http://localhost:3000/
router.get('/', function(req, res, next) {
    res.status(200)
      .json({
        status: 'success',
        message: 'Live long and prosper!'
      });
});


//////////////////////
// Postgres queries
//////////////////////

/**
 * Route pour le model : user.model.js
 * @type {[type]}
 */
var modeluser = require('./user.model'); 

router.post('/login', modeluser.getUserLogin);
router.get('/listusers', token.verifyToken, modeluser.getAllUsers);
router.get('/user/:id', token.verifyToken, modeluser.getUser);
router.put('/userupdate/:id', token.verifyToken, modeluser.updateUserVerif);
router.post('/adduser', token.verifyToken, modeluser.insertUser);
router.post('/adduserverif', token.verifyToken, modeluser.insertUserVerif);
router.post('/deleteuser', token.verifyToken, modeluser.deleteUser);

/**
 * Route pour le model : inbox.model.js
 * @type {[type]}
 */
var modelinbox = require('./inbox.model'); 

router.post('/insertinbox', modelinbox.insertInbox);
router.post('/insertinboxcc', modelinbox.insertInboxCC);

/**
 * Route pour le model : attachment.model.js
 * @type {[type]}
 */
var modelattachemnt = require('./attachment.model');

router.post('/insertattachment', modelattachemnt.insertAttachment);


/**
 * Route pour le model : level.model.js
 * @type {[type]}
 */
var modellevel = require('./level.model');

router.get('/listlevel', token.verifyToken, modellevel.getAllLevel);
router.get('/level/:id', token.verifyToken, modellevel.getLevel);
router.post('/addlevel', token.verifyToken, modellevel.insertLevel);
router.put('/levelupdate/:id', token.verifyToken, modellevel.updateLevel);
router.post('/deletelevel', token.verifyToken, modellevel.deleteLevel);

/**
 * Route pour le model : client.model.js
 * @type {[type]}
 */
var modelclient = require('./client.model');

router.get('/mailclient', token.verifyToken, modelclient.getAllMail);
router.get('/mailclient/:id', token.verifyToken, modelclient.getMail);
router.put('/clientupdate/:id', token.verifyToken, modelclient.updateMail);
router.post('/mailinsert', token.verifyToken, modelclient.insertMail);
router.get('/mailimap', modelclient.getMailImap);
router.get('/mailpop', modelclient.getMailPop);
router.post('/deleteclient', token.verifyToken, modelclient.deleteClient);

/**
 * Route pour les liens
 * @type {[type]}
 */
var modellien = require('./lien.model');

router.get('/listlien', token.verifyToken, modellien.getAllLien);
router.get('/lien/:id', token.verifyToken, modellien.getLien);
router.post('/addlien', token.verifyToken, modellien.insertLien);
router.put('/lienupdate/:id', token.verifyToken, modellien.updateLien);
router.post('/deletelien', token.verifyToken, modellien.deleteLien);

/**
 * Route pour les accès
 * @type {[type]}
 */
var modelacces = require('./acces.model');

router.post('/addacces', token.verifyToken, modelacces.insertAcces);
router.get('/acceslienwithlevel/:id_level', token.verifyToken, modelacces.getLienWithLevel);
router.get('/acceslienuserwithlevel/:id_level', token.verifyToken, modeluser.getUserWithLevel);
router.post('/deleteacces', token.verifyToken, modelacces.deleteAcces);

module.exports = router;