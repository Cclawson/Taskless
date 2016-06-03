var mainApp = angular.module("mainApp", ['ngRoute', 'ngAnimate', 'ngCookies', 'ngMaterial', 'ngMessages']);

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

    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if ($cookies.get("username") == null) {
            if (next.templateUrl == "AngularTemplates/login.html" || next.templateUrl == "AngularTemplates/homepage.html" || next.templateUrl == "AngularTemplates/register.html") {

            } else {
                $location.path("login");
            }
        }
    });

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
        $cookies.remove('username');
        $location.path('/');
        window.location.reload();
    }


});




mainApp.controller('HomeController', function ($scope, $rootScope, $cookies, $http) {

    $scope.Assignments = [];
    $scope.User = $cookies.get('username');
    $http.get('/home').
    success(function (data) {
        $scope.Assignments = data;
    }).error(function (err) {
        $scope.errorMessage = err;
    });

});

mainApp.controller('AssignmentController', function ($scope, $rootScope, $cookies, $http, $location) {

    angular.element(".md-datepicker-button").each(function () {
        var el = this;
        var ip = angular.element(el).parent().find("input").bind('click', function (e) {
            angular.element(el).click();
        });
    });

    $scope.Assignment = {};
    $scope.errorMessage = '';
    $scope.Assignment.rating = 1;
    $scope.Assignment.color = "#00FFFF";
    $scope.successmsg = '';
    checkcolor = function () {
        if ($scope.Assignment.rating == 1) {
            $scope.Assignment.color = "#00FFFF";
        }
        if ($scope.Assignment.rating == 2) {
            $scope.Assignment.color = "#ADFF2F";
        }
        if ($scope.Assignment.rating == 3) {
            $scope.Assignment.color = "#FFFF00";
        }
        if ($scope.Assignment.rating == 4) {
            $scope.Assignment.color = "#FFA500";
        }
        if ($scope.Assignment.rating == 5) {
            $scope.Assignment.color = "#FF0000";
        }

    }

    $scope.Add = function () {
        checkcolor();
        if ($cookies.get('username') != null) {
            $scope.Assignment.userId = $cookies.get('username');
            $http.post('/addassignment', $scope.Assignment).
            success(function (data) {
                document.getElementById('assignmentform').reset();
                $scope.errorMessage = '';
                $scope.successmsg = "Assignment added."
                $scope.Assignment.color = "#00FFFF";
            }).error(function (err) {
                $scope.errorMessage = err;
            });
        } else {
            $scope.errorMessage = "Please Login/Register";
        }
    }
});

mainApp.controller('TeacherController', function ($scope, $rootScope, $cookies, $http, $location) {

    $scope.Teacher = {};
    $scope.errorMessage = '';
    $scope.Teacherlist = [];

    $http.get("/teacher").
    success(function (data) {
        $scope.Teacherlist = data;
    }).error(function (err) {});

    $scope.Add = function () {
        if ($cookies.get('username') != null) {
            $scope.Teacher.userId = $cookies.get('username');
            $http.post('/addteacher', $scope.Teacher).
            success(function (data) {
                document.getElementById('teacherform').reset();
                $scope.Teacherlist = data;
                $('#myModal').modal('toggle');
            }).error(function (err) {
                $scope.errorMessage = err;
            });
        } else {
            $scope.errorMessage = "Please Login/Register";
        }
    }
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