myApp.controller("ShowVideoController", ["$scope","$window", "VideoService", function($scope, $window, VideoService){
    // if((VideoService.checkDay() == 0 || VideoService.checkDay() == 6) || (VideoService.checkHour() > 17 || VideoService.checkHour() < 9 )){
    // if{
    //   $window.location.href = '/views/closed.html';
    // }else{
      VideoService.checkDay();
      VideoService.getVideos();

      $scope.data = VideoService;

      $scope.addView = function(id){
        VideoService.addView(id);
        console.log("Function Fired");
      };
      $scope.updateLike = function(video, status){
        video.review = status;
        VideoService.updateLike(video);
        console.log("Function Fired");
      };


    //}
}]);

myApp.controller("AddVideoController", ["$scope", "VideoService", function($scope, VideoService){

  $scope.addVideo = function(video){
    var slug = video.title.toLowerCase();
    video.slug = slug;
    console.log(video);
    VideoService.addVideo(video);
  };

}]);

myApp.controller("TopTenController", ["$scope", "VideoService", function($scope, VideoService){
  console.log("Controller Working");
  VideoService.getVideos();
  $scope.data = VideoService;

  $scope.addView = function(id){
    VideoService.addView(id);
    console.log("Function Fired");
  };
  $scope.updateLike = function(video, status){
    video.review = status;
    VideoService.updateLike(video);
    console.log("Function Fired");
  };

}]);
