'use strict';

var db = require('./conn.js');

/////////////////////
// Query Functions
/////////////////////

function insertAttachment(req, res, next) {
  req.body.inbox_id = parseInt(req.body.inbox_id);
  db.none('INSERT INTO attachment(filename, inbox_id, uidmail, size)' +
      'values(${filename}, ${inbox_id}, ${uidmail}, ${size})',
    req.body)
    .then(function() {
      return res.status(200)
        .json({
          status: 'success',
          message: 'Inserted attachments'
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
    insertAttachment : insertAttachment
};

