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
				user: user
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}
		factory.forgetpwd = function(user) {
			var deferred = $q.defer();
			$http.post(baseUrl + "user/forgetpwd", {
				user: user
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
	}]);