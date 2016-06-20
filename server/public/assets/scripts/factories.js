myApp.factory("VideoService", ["$http", function($http){
  var videoLibrary = {};
  //Make Route to GET request to ProofAPI.
  var getVideos = function(){
    //get videos and store them in library object
    $http.get('/getVideos').then(function(res){
      videoLibrary.response = res.data;
    });
  };
  //calls add video route in server
  var addVideo = function(newVideo){
    $http.post('/addVideo', newVideo).then(function(res){

    });
  };

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
  
  return{
    getVideos: getVideos,
    videoLibrary: videoLibrary,
    addVideo: addVideo,
    checkDay: checkDay,
    checkHour: checkHour,
    addView: addView,
    updateLike: updateLike
  }

}]);
