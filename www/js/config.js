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
			.state('signin', {
				url: '/signin',
				templateUrl: 'templates/signin.html'
			})
			.state('signup', {
				url: '/signup',
				templateUrl: 'templates/signup.html',
				controller: 'SignupCtrl'
			})
			.state('forgetpwd', {
				url: '/forgetpwd',
				templateUrl: 'templates/forgetpwd.html',
				controller: 'ForgetpwdCtrl'
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
						templateUrl: 'templates/account/user.html'
					}
				}
			})
			.state('app.user.detail', {
				url: '/detail',
				cache:false ,
				views: {
					'menuContent@app': {
						templateUrl: 'templates/account/detail.html'
					}
				}
			})
			.state('app.user.change', {
				url: '/change',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/account/change.html'
					}
				}
			})
			.state('app.user.changepwd', {
				url: '/change',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/account/changepwd.html',
						controller: 'UserChangepwdCtrl'
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
			.state('app.assets', {
				url: '/assets',
				views: {
					'menuContent': {
						templateUrl: 'templates/assets/list.html',
						controller: 'AssetsCtrl'
					}
				}
			})
			.state('app.assets.detail', {
				url: '/detail/:id',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/assets/detail.html',
						controller: 'AssetsDetailCtrl'
					}
				}
			})
			.state('app.assets.add', {
				url: '/add',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/assets/add.html',
						controller: 'AssetsAddCtrl'
					}
				}
			})
			.state('app.assets.edit', {
				url: '/edit/:id',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/assets/add.html',
						controller: 'AssetsEditCtrl'
					}
				}
			})
			.state('app.bond', {
				url: '/bond',
				views: {
					'menuContent': {
						templateUrl: 'templates/bond/list.html',
						controller: 'BondCtrl'
					}
				}
			})
			.state('app.bond.detail', {
				url: '/detail/:id',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/bond/detail.html',
						controller: 'BondDetailCtrl'
					}
				}
			})
			.state('app.bond.add', {
				url: '/add',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/bond/add.html',
						controller: 'BondAddCtrl'
					}
				}
			})
			.state('app.borrow', {
				url: '/borrow',
				views: {
					'menuContent': {
						templateUrl: 'templates/borrow/list.html',
						controller: 'BorrowCtrl'
					}
				}
			})
			.state('app.borrow.detail', {
				url: '/detail/:id',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/borrow/detail.html',
						controller: 'BorrowDetailCtrl'
					}
				}
			})
			.state('app.borrow.add', {
				url: '/add',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/borrow/add.html',
						controller: 'BonrrowAddCtrl'
					}
				}
			})
			.state('app.wish', {
				url: '/wish',
				views: {
					'menuContent': {
						templateUrl: 'templates/wish/list.html',
						controller: 'WishCtrl'
					}
				}
			})
			.state('app.wish.detail', {
				url: '/detail/:id',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/wish/detail.html',
						controller: 'WishDetailCtrl'
					}
				}
			})
			.state('app.wish.add', {
				url: '/add',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/wish/add.html',
						controller: 'WishAddCtrl'
					}
				}
			})
			.state('app.wish.edit', {
				url: '/edit/:id',
				views: {
					'menuContent@app': {
						templateUrl: 'templates/wish/add.html',
						controller: 'WishEditCtrl'
					}
				}
			});
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/signin');
	});