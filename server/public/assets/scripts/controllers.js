myApp.controller("ShowVideoController", ["$scope","$window", "$sce", "VideoService", function($scope, $window, $sce, VideoService){
    // if((VideoService.checkDay() == 0 || VideoService.checkDay() == 6) || (VideoService.checkHour() > 17 || VideoService.checkHour() < 9 )){
    // if{
    //   $window.location.href = '/views/closed.html';
    // }else{
      VideoService.checkDay();
      VideoService.getVideos();
      $scope.data = VideoService;

      $scope.trustSrc = function(src){
        return $sce.trustAsResourceUrl(src);
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
}]);
