myApp.controller("ShowVideoController", ["$scope", "$sce", "VideoService", function($scope, $sce, VideoService){

    VideoService.getVideos();
    $scope.data = VideoService;

    $scope.trustSrc = function(src){
      return $sce.trustAsResourceUrl(src);
    };

}]);

myApp.controller("AddVideoController", ["$scope", "VideoService", function($scope, VideoService){

  $scope.addVideo = function(video){
    var slug = video.title.toLowerCase();
    video.slug = slug;
    console.log(video);
    VideoService.addVideo(video);
  };
  
}]);
