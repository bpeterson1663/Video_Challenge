myApp.factory("VideoService", ["$http", function($http){
  var videoLibrary = {};
  //Make Route to GET request to ProofAPI.
  var getVideos = function(){
    $http.get('/getVideos').then(function(res){

      videoLibrary.response = res.data;

    });

  };

  return{
    getVideos: getVideos,
    videoLibrary: videoLibrary
  }

}]);
