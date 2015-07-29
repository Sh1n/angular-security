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

### (constant) AUTH_EVENTS

The module fires the following set of self-explainable events on the rootScope:

* AUTH_EVENTS.loginSuccess
* AUTH_EVENTS.loginFailed
* AUTH_EVENTS.logoutSuccess
* AUTH_EVENTS.sessionTimeout
* AUTH_EVENTS.notAuthenticated
* AUTH_EVENTS.notAuthorized


### (factory) Session

The Session object stores a minimum amount of data regarding the authenticated user:

* userId
* loginName
* userRoles

### (service) AuthService
The AuthService can be used in your controllers to check for authentication and authorization. It can be achieved using two methods:

* AuthService.isAuthenticated() evaluating true if the user is logged in, false otherwise.
* AuthService.isAuthorized(requiredRole) evaluating to true if the intersection between the input parameter and the user roles is not empty. It accepts both an array of strings (role names) or a single string. See the above code for usage example.

### (controller) LoginFormController

Attach it to a form and put ng-submit="login()" as its attributes in order to quickly implement a login form. It needs to populate the credentials object with both identifier and password fields. See the example above.

## License :

The code is available at github [project][home] under [MIT licence][4].

 [home]: https://github.com/Sh1n/angular-security
 [4]: http://revolunet.mit-license.org
