var express = require('express');
var router = express.Router();


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


/*
Route pour model user
 */
var modeluser = require('./usermodel'); 

router.get('/api/listusers', modeluser.getAllUsers);
router.get('/api/user/:id', modeluser.getUser);

/*
Route pour model inbox
 */
var modelinbox = require('./inboxmodel'); 

router.post('/api/insertinbox', modelinbox.insertInbox);
router.post('/api/insertinboxcc', modelinbox.insertInboxCC);

/*
Route pour model attachment
 */
var modelattachemnt = require('./attachmentmodel');
router.post('/api/insertattachment', modelattachemnt.insertAttachment);

module.exports = router;