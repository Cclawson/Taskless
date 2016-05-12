var mainApp = angular.module("mainApp", ['ngRoute', 'ngAnimate']);

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
        otherwise({
            redirectTo: '/home'
        });
}]);


mainApp.run(function ($rootScope) {

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


});




mainApp.controller('HomeController', function ($scope, $rootScope) {

});

mainApp.controller('AssignmentController', function ($scope, $rootScope) {

});

mainApp.controller('TeacherController', function ($scope, $rootScope) {

});