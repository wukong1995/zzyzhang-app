angular.module("service", [])
	.factory('LoginSer', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
		var factory = {};

		// 登录
		factory.signin = function(user) {
			var deferred = $q.defer();

			$http.post(baseUrl + "user/signin", {
				name: user.name,
				password: user.password
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
				name: user.name,
				email: user.email,
				telphone: user.telphone,
				password: user.password
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
				name: user.name,
				email: user.email,
				telphone: user.telphone
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		return factory;

	}])
	.factory('UserSer', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
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
				email: user.email,
				telphone: user.telphone,
				real_name: user.real_name,
				sex: user.sex,
				birth: user.birth,
				signature: user.signature
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		// 修改密码
		factory.changepwd = function(user) {
			var deferred = $q.defer();

			$http.post(baseUrl + "user/changepwd", {
				pwd: user.pwd,
				newpwd: user.newpwd
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}

		return factory;
	}])
	.factory('PopupSer', ['$ionicPopup', '$timeout', function($ionicPopup, $timeout) {
		var factory = {};

		factory.show = function(msg) {
			var myPopup = $ionicPopup.show({
				title: msg,
				buttons: null
			});
			$timeout(function() {
				myPopup.close();
			}, 2000);
		}
		factory.alertErr = function(err) {
			$ionicPopup.alert({
				title: '请求错误',
				template: err,
				okText: '确认'
			});
		}
		factory.alert = function(msg) {
			$ionicPopup.alert({
				title: '提示',
				template: msg,
				okText: '确认'
			});
		}
		factory.confirm = function(msg) {
			return $ionicPopup.confirm({
				title: '提示',
				template: msg,
				cancelText: '取消',
				okText: '确认',
			});
		}

		return factory;
	}])
	.factory('CommonSer', ['$http', '$q', 'baseUrl',
		function($http, $q, baseUrl) {

			var factory = {};

			factory.getList = function(url_type, keyword, page, limit) {
				var deferred = $q.defer();
				var start = page * limit;
				$http.get(baseUrl + url_type + "/result", {
					params: {
						keyword: keyword,
						page: page,
						start: start,
						limit: limit
					}
				}).success(function(data) {
					deferred.resolve(data);
				}).error(function(err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
			factory.delItem = function(url_type, id) {
				var deferred = $q.defer();
				$http.delete(baseUrl + url_type + '/list/del', {
					params: {
						id: id
					}
				}).success(function(data) {
					deferred.resolve(data);
				}).error(function(err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
			factory.detail = function(url_type, id) {
				var deferred = $q.defer();
				$http.get(baseUrl + url_type + '/detailmo/' + id).success(function(data) {
					deferred.resolve(data);
				}).error(function(err) {
					deferred.reject(err);
				});
				return deferred.promise;
			}
			return factory;
		}
	])
	.factory('PaySer', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
		var factory = {};
		factory.save = function(payment) {

			var deferred = $q.defer();
			$http.post(baseUrl + 'payment/savemo', {
				type: payment.type,
				name: payment.name,
				product_type: payment.product_type,
				price: payment.price,
				remark: payment.remark
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}
		return factory;
	}])
	.factory('AssetsSer', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
		var factory = {};

		factory.save = function(assets) {
			var deferred = $q.defer();
			if (assets._id) {
				var _assets = {
					_id: assets._id,
					type: assets.type,
					name: assets.name,
					price: assets.price,
					remark: assets.remark
				}
			} else {
				var _assets = {
					type: assets.type,
					name: assets.name,
					price: assets.price,
					remark: assets.remark
				}
			}
			$http.post(baseUrl + 'assets/savemo', _assets)
				.success(function(data) {
					deferred.resolve(data);
				}).error(function(err) {
					deferred.reject(err);
				});
			return deferred.promise;
		}
		return factory;
	}])
	.factory('BondSer', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
		var factory = {};
		factory.save = function(payment) {

			var deferred = $q.defer();
			$http.post(baseUrl + 'bond/savemo', {
				type: payment.type,
				name: payment.name,
				product_type: payment.product_type,
				price: payment.price,
				remark: payment.remark
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}
		return factory;
	}])
	.factory('BorrowSer', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
		var factory = {};
		factory.save = function(payment) {

			var deferred = $q.defer();
			$http.post(baseUrl + 'borrowing/savemo', {
				type: payment.type,
				name: payment.name,
				product_type: payment.product_type,
				price: payment.price,
				remark: payment.remark
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}
		return factory;
	}])
	.factory('ShareSer', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
		var factory = {};
		factory.save = function(payment) {

			var deferred = $q.defer();
			$http.post(baseUrl + 'share/savemo', {
				type: payment.type,
				name: payment.name,
				product_type: payment.product_type,
				price: payment.price,
				remark: payment.remark
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}
		return factory;
	}])
	.factory('WishSer', ['$http', '$q', 'baseUrl', function($http, $q, baseUrl) {
		var factory = {};
		factory.save = function(wish) {

			var deferred = $q.defer();
			$http.post(baseUrl + 'wishlist/savemo', {
				type: payment.type,
				name: payment.name,
				product_type: payment.product_type,
				price: payment.price,
				remark: payment.remark
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		}
		factory.buy = function(id) {
			var deferred = $q.defer();
			$http.get(baseUrl + 'wishlist/action/buy', {
				params: {
					id: id
				}
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