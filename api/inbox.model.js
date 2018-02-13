'use strict';

var db = require('./conn.js');

/////////////////////
// Query Functions
/////////////////////

function insertInbox(req, res, next) {
  req.body.uidmail = parseInt(req.body.uidmail);
  db.one('INSERT INTO inbox(cc, subject, frommail, tomail, uidmail, dateservermail,fromname,dateservermailformat)' +
      'values(${cc}, ${subject}, ${frommail}, ${tomail}, ${uidmail}, ${dateservermail}, ${fromname}, ${dateservermailformat}) RETURNING id_inbox',
    req.body)
    .then(data => {
      return res.status(200)
        .json({
          status: 'success',
          id_inbox : data.id_inbox,
          message: 'Inserted one inbox'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}



function insertInboxCC(req, res, next) {
  req.body.uidmail = parseInt(req.body.uidmail);
  db.one('INSERT INTO inbox(cc, subject, frommail, tomail, uidmail, dateservermail,fromname,dateservermailformat,tomailcc,flagcc)' +
      'values(${cc}, ${subject}, ${frommail}, ${tomail}, ${uidmail}, ${dateservermail}, ${fromname}, ${dateservermailformat}, ${tomailcc}, ${flagcc}) RETURNING id_inbox',
    req.body)
    .then(data => {
      
      return res.status(200)
      .json({
        status: 'success',
        id_inbox : data.id_inbox,
        message: 'Inserted one inbox'
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
    insertInbox : insertInbox,
    insertInboxCC : insertInboxCC
};

