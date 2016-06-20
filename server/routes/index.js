var express = require('express');
var router = express.Router();
var path = require('path');

var request = require('request');
var authToken;
//Route to get Vidoes
router.get('/getVideos', function(req, res){
  //Request made to ProofAPI
      request({
      method: 'GET',
      url: 'https://proofapi.herokuapp.com/videos?page&per_page',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': ''+authToken+''
      }}, function (error, response, body) {
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
      res.send(body);
    });
});

// router.get("/updateVideoView/", function(req, res){
//   console.log("Request in updateVideo Route", req);
//         request({
//         method: 'PATCH',
//         url: 'https://private-anon-0dff40ff7-proofapi.apiary-mock.com/videos/ef572226-7b56-401b-89fc-7aa8b3642f27',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Auth-Token': 'eFuXWvwaHAFYxb7SbkwhrDu4'
//         },
//         body: "{  \"title\": \"The Highest Mountain\",  \"slug\": \"the-highest-mountain\"}"
//       }, function (error, response, body) {
//         // console.log('Status:', response.statusCode);
//         // console.log('Headers:', JSON.stringify(response.headers));
//         // console.log('Response:', body);
//       });
// });
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
      url: 'https://proofapi.herokuapp.com/videos/'+id+'/votes',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': ''+authToken+''
      },
      body: "{  \"opinion\": "+vote+"}"
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
      url: 'https://proofapi.herokuapp.com/videos',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': ''+authToken+''
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
