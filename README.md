# AngularJs-security
AngularJs module for managing authentication and authorization

Based on different literature pieces found over medium.

## Install
1. download the files
	1. Bower
		1. add `"angular-security": "latest"` to your `bower.json` file then run `bower install` OR run `bower install angular-security`
2. include the files in your app
	1. `security.min.js`
3. include the module in angular (i.e. in `app.js`) - `sh1n.angular-security`

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
TBA


