'use strict';

var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

// Database connection details;
const con = {
	host: '192.168.10.90',//'localhost',//'192.168.10.90', //  is the default
	port: 5432, // 5432 is the default
	database: 'mail_bd',
	user: 'si',//'postgres',//'si',
	password: '51P@vGD24$'//'',//'51P@vGD24$'
};

var db = pgp(con);

module.exports = db;