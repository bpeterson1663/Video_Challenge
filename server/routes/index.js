var express = require('express');
var router = express.Router();

var path = require('path');
var bodyParser = require('body-parser');

var request = require('request');

//Route to get Vidoes
router.get('/getVideos', function(req, res){
  //Request made to ProofAPI
  request({
    method: 'GET',
    url: 'https://private-anon-a46491567-proofapi.apiary-mock.com/videos?page&per_page',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': 'eFuXWvwaHAFYxb7SbkwhrDu4'
    }}, function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
      //Send Data back to client side
      res.send(body);
  });
});

router.post("/addVideo", function(req, res){
    var title = req.body.title;
    var url = req.body.url;
    var slug = req.body.slug;

    request({
      method: 'POST',
      url: 'https://private-anon-a46491567-proofapi.apiary-mock.com/videos',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': 'eFuXWvwaHAFYxb7SbkwhrDu4'
      },
      body: "{  \"title\": \""+title+"\",  \"url\": \""+url+"\",  \"slug\": \""+slug+"\"}"
    }, function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
      res.send(body);
    });
});


router.get("/*", function(req, res){
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, '../public' ,file));
});

module.exports = router;
