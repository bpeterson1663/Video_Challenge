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

  return{
    getVideos: getVideos,
    videoLibrary: videoLibrary,
    addVideo: addVideo
  }

}]);
