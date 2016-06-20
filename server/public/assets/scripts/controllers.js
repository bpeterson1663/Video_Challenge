myApp.controller("ShowVideoController", ["$scope","$window", "VideoService", function($scope, $window, VideoService){
    //checks if Day of the week is either saturday or sunday and if outside of 9:00 AM to 5:00 PM
    var day = VideoService.checkDay();
    var hour = VideoService.checkHour();
    if((day == 0 || day == 6) || (hour > 17 || hour < 9 )){
          $window.location.href = '/views/closed.html'; //redirect to closed page if true
    }else{
      //get videos from api
      VideoService.getVideos();
      //make data available on scope
      $scope.data = VideoService;

      // $scope.addView = function(id){
      //   VideoService.addView(id);
      //   console.log("Function Fired");
      // };
      //When like or dislike button is pressed on the dom
      $scope.updateLike = function(video, status){
        video.review = status;
        VideoService.updateLike(video);
      };

      // var elements = document.getElementsByClassName("md-primary");
      // console.log(elements);
      // for(var i=0; i < elements.length; i++){
      //   if(elements[i].onclick){
      //     showAlert();
      //   }
      //
      // }
      // function showAlert(){
      //   console.log("test");
      // }
    }
}]);

myApp.controller("AddVideoController", ["$scope", "$window", "VideoService", function($scope, $window, VideoService){

  var day = VideoService.checkDay();
  var hour = VideoService.checkHour();
  if((day == 0 || day == 6) || (hour > 17 || hour < 9 )){
      $window.location.href = '/views/closed.html'; //redirect to closed page if true
  }else{
    //Takes in video object from DOM
    VideoService.getVideos();
    $scope.addVideo = function(video){
      var slug = video.title.toLowerCase();
      video.slug = slug;
      var response = VideoService.addVideo(video);
    };

  }
}]);

myApp.controller("TopTenController", ["$scope","$window", "VideoService", function($scope, $window, VideoService){
  var day = VideoService.checkDay();
  var hour = VideoService.checkHour();
  if((day == 0 || day == 6) || (hour > 17 || hour < 9 )){
        $window.location.href = '/views/closed.html'; //redirect to closed page if true
  }else{
    //get data from api
    VideoService.getVideos();
    //make data available on $scope
    $scope.data = VideoService;
    //Have like funcionality on these pages also
    $scope.updateLike = function(video, status){
      video.review = status;
      VideoService.updateLike(video);
    };
  }

}]);
