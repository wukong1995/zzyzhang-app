angular.module('configRouter', [])
	.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

		$ionicConfigProvider.platform.ios.tabs.style('standard');
		$ionicConfigProvider.platform.ios.tabs.position('bottom');
		$ionicConfigProvider.platform.android.tabs.style('standard');
		$ionicConfigProvider.platform.android.tabs.position('standard');

		$ionicConfigProvider.platform.ios.navBar.alignTitle('center');
		$ionicConfigProvider.platform.android.navBar.alignTitle('center');

		$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
		$ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

		$ionicConfigProvider.platform.ios.views.transition('ios');
		$ionicConfigProvider.platform.android.views.transition('android');

		$stateProvider
			.state('login', {
				url: '/',
				templateUrl: 'templates/login.html',
				controller: 'LoginCtrl'
			})
			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'templates/menu.html',
				controller: 'AppCtrl'
			})
			.state('app.first', {
				url: '/first',
				views: {
					'menuContent': {
						templateUrl: 'templates/first.html'
					}
				}
			})
			.state('app.user', {
				url: '/user',
				views: {
					'menuContent': {
						templateUrl: 'templates/account/user.html',
						controller: 'UserCtrl'
					}
				}
			})
			.state('app.pay', {
				url: '/pay',
				views: {
					'menuContent': {
						templateUrl: 'templates/payment/list.html',
						controller: 'PayCtrl'
					}
				}
			})
			.state('app.pay.detail', {
				url: '/detail/:id',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/payment/detail.html',
						controller: 'PayDetailCtrl'
					}
				}
			})
			.state('app.pay.add', {
				url: '/add',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/payment/add.html',
						controller: 'PayAddCtrl'
					}
				}
			})
			.state('app.pay.edit', {
				url: '/edit/:id',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/payment/add.html',
						controller: 'PayEditCtrl'
					}
				}
			})
			.state('app.share', {
				url: '/share',
				views: {
					'menuContent': {
						templateUrl: 'templates/share/list.html',
						controller: 'ShareCtrl'
					}
				}
			})
			.state('app.share.detail', {
				url: '/detail/:id',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/share/detail.html',
						controller: 'ShareDetailCtrl'
					}
				}
			})
			.state('app.share.add', {
				url: '/add',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/share/add.html',
						controller: 'ShareAddCtrl'
					}
				}
			})
			.state('app.share.edit', {
				url: '/edit/:id',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/share/add.html',
						controller: 'ShareEditCtrl'
					}
				}
			});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/');
	});