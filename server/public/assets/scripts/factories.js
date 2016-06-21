

myApp.factory("VideoService", ["$http", "$window","$cookies", function($http, $window, $cookies){
  var videoLibrary = {};
  var response;
  //Make Route to GET request to ProofAPI.
  var getVideos = function(){
    //get videos and store them in library object
    $http.get('/getVideos').then(function(res){
      videoLibrary.response = res.data;
    });
  };
  //calls add video route in server
  var addVideo = function(newVideo){

    var videoArray = videoLibrary.response.data;

      if(search(newVideo.url, videoArray)){
        document.getElementById('message').innerHTML = "That video is already uploaded!";
        setTimeout(fade_out, 2500);
      }
      else{
        $http.post('/addVideo', newVideo).then(function(res){
            if(res.status == 200){
              document.getElementById('message').innerHTML = "Video Added Successfully!";
              setTimeout(fade_out, 2500);
            }
            else{
              document.getElementById('message').innerHTML = "There was an error uploading your video. Please Try Again.";
              setTimeout(fade_out, 2500);
            }
        });
      }
  };




  function fade_out() {
      document.getElementById('message').style.display = "none";
      $window.location.href = '/views/index.html';
  }

  var checkDay = function(){
    var day = new Date();
    var result = day.getDay();
    return result;
  };

  var checkHour = function(){
    var hour = new Date();
    var result = hour.getHours();
    return result;
  };

  var addView = function(id){
    $http.put("/updateVideoView/"+id).then(function(response){

    });
    // $http.get("/getWineDatabase/"+userInfo.data._id).then(function(response){
    //     wineList.response = response.data;
    // })
  };
  //calls updatevideo route on server
  var updateLike = function(video){
    $http.post("/updateVideoLike/", video).then(function(response){
        console.log('response ', response);
        //getVideos();
    });
  };

  var checkCookies = function(video, status){
    if(status=="like"){
        console.log("Here ");
        var liked = $cookies.get('like');
        if(liked == "true"){
          alert("You have already liked a video today.");
        }
        if(liked == undefined){
          var now = new Date();
          now.setTime(now.getTime() + (9 * 3600 * 1000));//expires in nine hours
          $cookies.put('like', true, {expires: now});
          document.getElementById('popularMessage').innerHTML = "Thank you for your input! Glad you liked the video. You are allowed one like and one dislike a day so be sure to come back tomorrow to provide more feedback!";
          setTimeout(fade_out, 2500);
          video.review = status;
          updateLike(video);
        }
      }
    if(status == "dislike"){
      var disliked = $cookies.get('dislike');

      if(disliked == "true"){
        alert("You have already disliked a video today.");
      }
      if(disliked == undefined){
        var now = new Date();
        now.setTime(now.getTime() + (9 * 3600 * 1000));
        $cookies.put('dislike', true, {expires: now});
        document.getElementById('popularMessage').innerHTML = "Thank you for your input! We're sorry you didn't like the video. You are allowed one like and one dislike a day so be sure to come back tomorrow to provide more feedback!";
        setTimeout(fade_out, 2500);
        video.review = status;
        updateLike(video);
      }
    }

  };

  return{
    getVideos: getVideos,
    videoLibrary: videoLibrary,
    addVideo: addVideo,
    checkDay: checkDay,
    checkHour: checkHour,
    addView: addView,
    updateLike: updateLike,
    checkCookies: checkCookies
  }
}]);

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].attributes.url === nameKey) {
            return true;
        }
    }
}
