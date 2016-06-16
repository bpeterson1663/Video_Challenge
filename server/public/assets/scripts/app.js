var myApp = angular.module("myApp", ["ngRoute", "ngSanitize"]);

myApp.config(["$routeProvider", function($routeProvider){
      $routeProvider.
        when('/home',{
          templateUrl: "/views/routes/home.html",
          controller: "ShowVideoController"
        }).
        when('/add', {
          templateUrl: "/views/routes/add.html",
          controller: "AddVideoController"
        }).
        when('/topTen', {
          templateUrl: "/views/routes/topTen.html"
        }).
        otherwise({
          redirectTo: "/home"
        });
}]);
