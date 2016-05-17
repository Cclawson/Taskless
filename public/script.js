var mainApp = angular.module("mainApp", ['ngRoute', 'ngAnimate', 'ngCookies']);

mainApp.config(['$routeProvider',
function ($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'AngularTemplates/homepage.html',
            controller: 'HomeController'
        }).
        when('/addassignment', {
            templateUrl: 'AngularTemplates/assignment.html',
            controller: 'AssignmentController'
        }).
        when('/teachers', {
            templateUrl: 'AngularTemplates/teacher.html',
            controller: 'TeacherController'
        }).
        when('/login', {
            templateUrl: 'AngularTemplates/login.html',
            controller: 'LoginController'
        }).
        when('/register', {
            templateUrl: 'AngularTemplates/register.html',
            controller: 'RegisterController'
        }).
        otherwise({
            redirectTo: '/home'
        });
}]);


mainApp.run(function ($rootScope, $cookies, $location, $route) {

    $rootScope.steps = [{
            msg: 'Home',
            link: '#home'
     },
        {
            msg: 'Add Assignment',
            link: '#addassignment'
     }, {
            msg: 'Teachers',
            link: '#teachers'
     }];

    $rootScope.activeStep = $rootScope.steps[0];

    $rootScope.setActive = function (menuitem) {
        $rootScope.activeStep = menuitem;
    };

    $rootScope.username = $cookies.get('username');

    $rootScope.logout = function () {
        console.log("logout clicked")
        $cookies.remove('username');
        $location.path('/');
        window.location.reload();
    }


});




mainApp.controller('HomeController', function ($scope, $rootScope) {
    //    $scope.loggedUser = $cookies.get('username');
});

mainApp.controller('AssignmentController', function ($scope, $rootScope) {

});

mainApp.controller('TeacherController', function ($scope, $rootScope) {

});


mainApp.controller('RegisterController', function ($scope, $rootScope, $http, $location, $route) {
    $scope.User = {};
    $scope.errorMessage = '';

    $scope.register = function () {
        $http.post('/register', $scope.User).
        success(function (data) {
            $location.path('/');
            window.location.reload();
        }).error(function (err) {
            $scope.errorMessage = err;
        });
    }
});


mainApp.controller('LoginController', function ($scope, $rootScope, $http, $location, $route) {
    $scope.User = {};
    $scope.errorMessage = '';

    $scope.login = function () {
        $http.post('/login', $scope.User).
        success(function (data) {
            $location.path('/');
            window.location.reload();
        }).error(function (err) {
            $scope.errorMessage = err;
        });
    }
});