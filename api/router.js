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

router.get('/listlevel', modellevel.getAllLevel);


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


module.exports = router;