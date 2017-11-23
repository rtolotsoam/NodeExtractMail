var request = require('request');

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}

// Configure the request
var options = {
    url: 'http://localhost:3000/api/insertinbox',
    method: 'POST',
    headers: headers,
    form: {
        'cc': 'test', 
        'subject': 'test',
        'frommail' : 'test',
        'tomail' : 'test',
        'uidmail' : 1,
        'dateservermail' : 'test',
        'fromname' : 'test',
        'dateservermail' : 'test',
        'dateservermailformat' : 'test'
    }
}

// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body);
    }else{
        console.log(error);
    }
});