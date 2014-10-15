var app = angular.module('meanStart', ["ngAnimate", "ngResource", "ngRoute", "ngDialog"]).
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

app.factory('Global', ['$http', '$location', function($http, $location) 
{
    return {
        logout : function()
        {
            $http.get('/logout')
            .success(function(data, status, headers, config) 
            {
                $location.path("/");
            });
        },
        header : "./views/partials/header.html"
        
    };
}]);
