webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var User_1 = __webpack_require__(1);
	var UserService = (function () {
	    function UserService() {
	    }
	    UserService.prototype.getAll = function () {
	        return [new User_1.User("Brecht", "Billiet"), new User_1.User("John", "Doe")];
	    };
	    return UserService;
	}());
	var service = new UserService();
	var users = service.getAll();
	users.forEach(function (user) {
	    console.log(user.fullName);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var User = (function () {
	    function User(firstName, lastName) {
	        this.firstName = firstName;
	        this.lastName = lastName;
	    }
	    Object.defineProperty(User.prototype, "fullName", {
	        get: function () {
	            return this.firstName + " " + this.lastName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return User;
	}());
	exports.User = User;


/***/ }
]);
//# sourceMappingURL=app.bundle.js.map