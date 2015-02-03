var http = require('http')
var request = require('request');

module.exports = {

    "Server is running": function (test) {
		test.expect(1)
		request
		  .get("http://localhost:3000")
		  .on('response', function(res) {
			test.equal(res.statusCode, 200, 'everything is ok');
			test.done();
		  })
		  .on('error', function(err) {
			test.ok(false, err);
			test.done();
		  })
    }

    
};

