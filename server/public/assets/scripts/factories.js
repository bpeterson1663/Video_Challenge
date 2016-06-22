

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
      //search videoarray using search funciton on line 123 to check if video has been uploaded
      if(search(newVideo.url, videoArray)){
        document.getElementById('message').innerHTML = "That video is already uploaded!";//display message
        setTimeout(fade_out, 2500);//fade out message
      }
      else{//add video if no url was found
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
  //checkDay and checkHour for closing times
  var checkDay = function(){
    var day = new Date();
    var result = day.getDay();//returns a number 0 thru 6, 0=Sunday 6=Saturday
    return result;
  };

  var checkHour = function(){
    var hour = new Date();
    var result = hour.getHours();//returns the hour, 17 = 5:00 pm etc.
    return result;
  };

  //calls updatevideo route on server
  var updateLike = function(video){
    $http.post("/updateVideoLike/", video).then(function(response){
        console.log('response ', response);
        //getVideos();
    });
  };

  var checkCookies = function(video, status){
    //Check Status of like or dislike
    if(status=="like"){
          //get cookie for like
        var liked = $cookies.get('like');

        if(liked == "true"){//if cookie exists
          alert("You have already liked a video today.");
        }
         //if cookie doesnt exists
        if(liked == undefined){
          var now = new Date();
          now.setTime(now.getTime() + (9 * 3600 * 1000));//expires in nine hours
          $cookies.put('like', true, {expires: now});//create new cookie
          video.review = status;//add the status to the video object
          updateLike(video);//pass the video to the function
          alert("Thank you for your input! Glad you liked the video. \n You are allowed one like and one dislike a day so be sure to come back tomorrow to provide more feedback!");
          $window.location.href = '/views/index.html';//redirect back to home to refresh page

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
        video.review = status;
        updateLike(video);
        
        alert("Thank you for your input! We're sorry you didn't like the video. \nYou are allowed one like and one dislike a day so be sure to come back tomorrow to provide more feedback!");
        $window.location.href = '/views/index.html';

      }
    }

  };
  //Update view route taking in the video object and passing it to the server
  var updateViewCount = function(video){
    $http.post("/updateView/", video).then(function(response){
        console.log('response ', response);
        alert("Thanks for viewing!");
        $window.location.href = '/views/index.html';
    });
  };
  //return functions and objects
  return{
    getVideos: getVideos,
    videoLibrary: videoLibrary,
    addVideo: addVideo,
    checkDay: checkDay,
    checkHour: checkHour,
    updateLike: updateLike,
    checkCookies: checkCookies,
    updateViewCount: updateViewCount
  }
  //global functions used in factories
  function search(nameKey, myArray){
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].attributes.url === nameKey) {
              return true;
          }
      }
  }

  function fade_out() {
      document.getElementById('message').style.display = "none";
      $window.location.href = '/views/index.html';
  }

}]);
