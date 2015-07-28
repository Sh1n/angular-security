/**
@fileOverview

@toc

*/

'use strict';

var security = angular.module('sh1n.angular-security', []);
    

security.constant('AUTH_ENDPOINTS', {
    LOGOUT  : 'security/logout',
    LOGIN   : 'security/login',
    PROFILE : 'security/profile'
});

security.constant('AUTH_EVENTS', {
    loginSuccess : 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

security.factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function($rootScope, $q, AUTH_EVENTS){
    return {
        responseError: function (response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized,
                419: AUTH_EVENTS.sessionTimeout,
                440: AUTH_EVENTS.sessionTimeout
            }[response.status], response);
            return $q.reject(response);
        }
    };
}]);

security.config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push(['$injector', function($injector){
        return $injector.get('AuthInterceptor');
    }]);
}]);

security.service('Session', function () {
    this.create = function (userId, loginName, userRoles) {
        this.userId = userId;
        this.loginName = loginName;
        this.userRoles = userRoles;
        this.loggedIn = true;
    };
    this.destroy = function () {
        this.userId = null;
        this.userRoles = null;
        this.loginName = null;
        this.loggedIn = false;
    };
});
    
security.factory('AuthService', ['$http', 'Session', 'AUTH_ENDPOINTS', '$rootScope', 'AUTH_EVENTS',
    function($http, Session, AUTH_ENDPOINTS, $rootScope, AUTH_EVENTS){

    var authService = {};

    authService.login = function(credentials){
        return $http
            .post(AUTH_ENDPOINTS.LOGIN, credentials)
            .then(function(res){
                Session.create(
                    res.data.id,
                    res.data.loginName,
                    res.data.roles
                );
                return res.data;
            });
    };

    authService.logout = function(){
        return $http
            .get(AUTH_ENDPOINTS.LOGOUT)
            .then(function(){
                Session.destroy();
                return true;
            });
    };


    authService.isAuthenticated = function(){
        return !!Session.loggedIn;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        if(!authService.isAuthenticated()){
            return false;
        }
        var found = false;
        for(var i in Session.userRoles){
            if(authorizedRoles.indexOf(Session.userRoles[i]) !== -1){
                found = true;
                break;
            }
        }
        return found;
    };

    authService.restore = function(){
        $http.get(AUTH_ENDPOINTS.PROFILE)
            .success(function(user){
                Session.create(
                    user.id,
                    user.loginName,
                    user.roles);
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            })
            .error(function(data){
                console.error(data);
            });
    };

    authService.getLoginName = function(){
        return Session.loginName;
    };

    authService.getUserId = function(){
        return Session.userId;
    };

    return authService;
}]);

security.controller('LoginFormController', ['$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService', function($scope, $rootScope, AUTH_EVENTS, AuthService){
    $scope.credentials = {
        identifier  : '',
        password    : ''
    };
    $scope.login = function(credentials){
        $scope.loginLoader = true;
        AuthService.login(credentials).then(function(){
            $scope.loginLoader = false;
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        }, function(errorData){
            $scope.loginLoader = false;
            $scope.loginFailedMessage = errorData;
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
}]);