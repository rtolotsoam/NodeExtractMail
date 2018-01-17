const jwt       = require('jsonwebtoken');
const jwtconfig = require('./../jwtconfig');

function verifyToken(req, res, next){
	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	if(token){
		jwt.verify(token, jwtconfig.secret, function(err, decoded){
			if(err){
				return res.json({ success : false, message : 'Échec de l\'authentification du jeton.'});
			}else{
				req.decoded = decoded;
				next();
			}
		});
	}else{
		return res.status(403).send({
			success : false,
			message : 'Aucun jeton fourni.'
		});
	}
}


module.exports = {
	verifyToken : verifyToken
}