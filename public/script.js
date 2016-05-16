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


mainApp.run(function ($rootScope, $cookies) {

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

});




mainApp.controller('HomeController', function ($scope, $rootScope) {
    //    $scope.loggedUser = $cookies.get('username');
});

mainApp.controller('AssignmentController', function ($scope, $rootScope) {

});

mainApp.controller('TeacherController', function ($scope, $rootScope) {

});


mainApp.controller('RegisterController', function ($scope, $rootScope, $http, $location) {
    $scope.User = {};
    $scope.errorMessage = '';

    $scope.register = function () {
        $http.post('/register', $scope.User).
        success(function (data) {
            $location.path('/');
        }).error(function (err) {
            $scope.errorMessage = err;
        });
    }
});


mainApp.controller('LoginController', function ($scope, $rootScope) {

});