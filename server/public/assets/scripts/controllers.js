myApp.controller("ShowVideoController", ["$scope", "$sce", "VideoService", function($scope, $sce, VideoService){

    VideoService.getVideos();
    $scope.data = VideoService;
    console.log($scope.data);
    $scope.trustSrc = function(src){
      return $sce.trustAsResourceUrl(src);
    }

    $scope.vimeo = "//player.vimeo.com/video/22439234";
}]);
