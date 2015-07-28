# Angular Security
Authentication & Authorization module for angular JS.

Based on different literature pieces found over medium.

## How to Use
Include the library .min.js file and add it to your angular application:
```javascript
var myApp = angular.module('myApp', ['sh1n.security']);
```
Include the AuthService dependency in your controllers in order to use its methods to shape your UI
```javascript
var myController = myApp.controller('PageController', ['$scope', 'AuthService', function($scope, AuthService){
    $scope.isLoggedIn = AuthService.isAuthenticated;
    $scope.isAuthorized = AuthService.isAuthorized;
    $scope.getUsername = AuthService.getLoginName;
}]);
```
```html
<div ng-show="isLoggedIn()">
    <h2>Welcome {{getUsername()}}</h2>
    <a href="#" ng-show="isAuthorized('ADMIN')">Admin Panel</a>
</div>
<div ng-hide="isLoggedIn()">
    <form class="LoginFormController" ng-submit="login()">
        <input type="text" ng-model="credentials.identifier" placeholder="Identifier"/>
        <input type="password" ng-model="credentials.password" placeholder="Password"/>
        <input type="submit" />
    </form>
</div>
```


## Artifacts
TBA
### (constant) AUTH_EVENTS
TBA
### (factory) Session
TBA
### (service) AuthService
TBA
### (controller) LoginFormController