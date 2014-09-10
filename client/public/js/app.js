var app = angular.module('meanStart', ["ngAnimate", "ngResource", "ngRoute"]).
    config(['$routeProvider', '$locationProvider',
        function constDemoRouteConfig($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/', 
                {
                    controller: homeController,
                    templateUrl: '../views/partials/home.html'
                })
                .when('/home', 
                {
                    controller: homeController,
                    templateUrl: '../views/partials/home.html'
                })
                .when('/status', 
                {
                    controller: statusController,
                    templateUrl: '../views/partials/status.html'
                })
                .otherwise({
                    redirectTo: '/' });
        }
    ]);