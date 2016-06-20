var myApp = angular.module("myApp", [, "ngRoute", "ngMaterial", "ngAnimate", "anguvideo"]);

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
        when('/topTenViewed', {
          templateUrl: "/views/routes/topTenViewed.html",
          controller: "TopTenController"
        }).
        when('/topTenPopular', {
          templateUrl: "/views/routes/topTenPopular.html",
          controller: "TopTenController"
        }).
        otherwise({
          redirectTo: "/home"
        });
}]);
