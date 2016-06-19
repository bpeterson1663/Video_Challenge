myApp.factory("VideoService", ["$http", function($http){
  var videoLibrary = {};
  //Make Route to GET request to ProofAPI.
  var getVideos = function(){
    $http.get('/getVideos').then(function(res){
      videoLibrary.response = res.data;
    });
  };

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

  return{
    getVideos: getVideos,
    videoLibrary: videoLibrary,
    addVideo: addVideo,
    checkDay: checkDay,
    checkHour: checkHour,
  }

}]);
