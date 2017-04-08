angular.module("service", [])
	.factory('LoginSer',['$http','$q','baseUrl',function($http,$q,baseUrl) {
		var factory = {};

		// 登录
		factory.signin = function(user) {
			var deferred = $q.defer();

			$http.post(baseUrl + "user/signin", {
				name: user.name,
				password:user.password
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		// 注册
		factory.signup = function(user) {
			var deferred = $q.defer();
			$http.post(baseUrl + "user/signup", {
				name:user.name,
				email:user.email,
				telphone:user.telphone,
				password:user.password
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		// 忘记密码
		factory.forgetpwd = function(user) {
			var deferred = $q.defer();
			$http.post(baseUrl + "user/forgetpwd", {
				name:user.name,
				email:user.email,
				telphone:user.telphone
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		return factory;

	}])
	.factory('PaySer', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
		var factory = {};

		factory.getList = function(keyword, page, limit) {
			var deferred = $q.defer();
			var start = page * limit;
			$http.post(baseUrl + "payment/result", {
				keyword: keyword,
				page: page,
				start: start,
				limit: limit
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}
		factory.delItem = function(id) {
			var deferred = $q.defer();
			$http.delete(baseUrl + 'payment/list', {
				id: id
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}
		factory.detail = function(id) {
			var deferred = $q.defer();
			$http.post(baseUrl + 'payment/detail', {
				id: id
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}
		return factory;
	}])
	.factory('sessionInteceptor', [function() {

		var sessionInjector = {
			request: function(config) {
				var token = localStorage.getItem('userid');
				if (token) {
					config.headers['token'] = token;
				}
				return config;
			}
		};
		return sessionInjector;
	}])
	.factory('UserSer',['$http','$q','baseUrl',function($http,$q,baseUrl) {
		var factory = {};

		// 用户详情页面
		factory.detail = function(user) {
			var deferred = $q.defer();

			$http.get(baseUrl + "user/detailmo").success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		// 修改个人资料
		factory.changepro = function(user) {
			var deferred = $q.defer();
			$http.post(baseUrl + "user/changepromo", {
				name:user.name,
				email:user.email,
				telphone:user.telphone,
				password:user.password
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		// 修改密码
		factory.detail = function(user) {
			var deferred = $q.defer();

			$http.post(baseUrl + "user/changepwd",{
				pwd:user.pwd,
				newpwd:user.newpwd
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		return factory;

	}]);