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

router.post('/api/login', modeluser.getUserLogin);
router.get('/api/listusers', token.verifyToken, modeluser.getAllUsers);
router.get('/api/user/:id', token.verifyToken, modeluser.getUser);
router.put('/api/userupdate/:id', token.verifyToken, modeluser.updateUser);
router.post('/api/adduser', token.verifyToken, modeluser.insertUser);

/**
 * Route pour le model : inbox.model.js
 * @type {[type]}
 */
var modelinbox = require('./inbox.model'); 

router.post('/api/insertinbox', modelinbox.insertInbox);
router.post('/api/insertinboxcc', modelinbox.insertInboxCC);

/**
 * Route pour le model : attachment.model.js
 * @type {[type]}
 */
var modelattachemnt = require('./attachment.model');
router.post('/api/insertattachment', modelattachemnt.insertAttachment);


/**
 * Route pour le model : level.model.js
 * @type {[type]}
 */
var modellevel = require('./level.model');

router.get('/api/listlevel', modellevel.getAllLevel);

module.exports = router;