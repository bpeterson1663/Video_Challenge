var express = require('express');
var router = express.Router();
var path = require('path');

var request = require('request');
//var authToken 
//Route to get Vidoes
router.get('/getVideos', function(req, res){
  //Request made to ProofAPI
  request({
      method: 'GET',
      url: 'https://private-anon-d31949390-proofapi.apiary-mock.com/videos?page&per_page',
      headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': 'eFuXWvwaHAFYxb7SbkwhrDu4'
      }}, function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
      res.send(body);
    });
});

router.post("/updateView/", function(req, res){
  console.log("Request in updateVideo Route", req);
  request({
    method: 'POST',
    url: 'https://private-anon-376b78b0c-proofapi.apiary-mock.com/views',
    headers: {
    'Content-Type': 'application/json',
    'X-Auth-Token': 'eFuXWvwaHAFYxb7SbkwhrDu4'
    },
    body: "{  \"video_id\": \"4d142443-60d6-47b3-a355-3fe16e1018c9\"}"
    }, function (error, response, body) {
    console.log('Status:', response.statusCode);
    console.log('Headers:', JSON.stringify(response.headers));
    console.log('Response:', body);
    res.send(body);
  });
});
//ROute to update videolie
router.post("/updateVideoLike", function(req, res){
  console.log(req.body.id);
    var id = req.body.id;
    var vote;
    if(req.body.review == 'like'){
      vote=1;
    }
    else if(req.body.review == 'dislike'){
      vote= -1;
    }
    request({
        method: 'POST',
        url: 'https://private-anon-d31949390-proofapi.apiary-mock.com/videos/ef572226-7b56-401b-89fc-7aa8b3642f27/votes',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': 'eFuXWvwaHAFYxb7SbkwhrDu4'
        },
        body: "{  \"opinion\": 1}"
      }, function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
        res.send(body);
      });
});


// router.get("/getVideoLikes", function(req, res){
//       request({
//       method: 'GET',
//       url: 'https://private-anon-0dff40ff7-proofapi.apiary-mock.com/videos/ef572226-7b56-401b-89fc-7aa8b3642f27/votes',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-Auth-Token': 'eFuXWvwaHAFYxb7SbkwhrDu4'
//       }}, function (error, response, body) {
//       console.log('Status in get Video Likes:', response.statusCode);
//       console.log('Headers:', JSON.stringify(response.headers));
//       console.log('Response:', body);
//     });
// });


router.post("/addVideo", function(req, res){
    var title = req.body.title;
    var url = req.body.url;
    var slug = req.body.slug;
    console.log("title", title);

    request({
        method: 'POST',
        url: 'https://private-anon-d31949390-proofapi.apiary-mock.com/videos',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': 'eFuXWvwaHAFYxb7SbkwhrDu4'
        },
        body: "{  \"title\": \"The Highest Mountain\",  \"url\": \"http://vimeo.com/22439234\",  \"slug\": \"the-highest-mountain\"}"
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
