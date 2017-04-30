angular.module('starter', ['ionic', 'starter.controllers', 'ionic-datepicker', 'configRouter', 'filter', 'service', 'directive'])
  .config(['$httpProvider', 'ionicDatePickerProvider',
    function($httpProvider, ionicDatePickerProvider) {
      $httpProvider.defaults.transformRequest = function(obj) {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
      }
      $httpProvider.defaults.headers.post = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

      // 为http 增加loading效果
      $httpProvider.interceptors.push('loadingInteceptor');

      //添加拦截器  
      $httpProvider.interceptors.push('sessionInteceptor');

      var datePickerObj = {
        inputDate: new Date(),
        titleLabel: '选择日期',
        setLabel: '确定',
        todayLabel: '今天',
        closeLabel: '关闭',
        mondayFirst: false,
        weeksList: ["日", "一", "二", "三", "四", "五", "六"],
        monthsList: ["一月", "二月", "三月", "四月", "月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        templateType: 'popup',
        showTodayButton: true,
        dateFormat: 'yyyy MMMM dd',
        closeOnSelect: false,
        disableWeekdays: []
      };
      ionicDatePickerProvider.configDatePicker(datePickerObj);
    }
  ])
  .value('Const', {
    payment: 'payment',
    assets: 'assets',
    bond: 'bond',
    borrow: 'borrowing',
    share: 'share',
    wish: 'wishlist'
  })
  .value('baseUrl', 'http://139.199.111.41:3000/')

.run(['$ionicPlatform', '$rootScope', '$ionicLoading', '$state', '$ionicPopup',
  function($ionicPlatform, $rootScope, $ionicLoading, $state, $ionicPopup) {
    //监听路由事件 
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        var noLogin = ["signin", "signup", "forgetpwd"];

        if (noLogin.indexOf(toState.name) < 0 &&
          !localStorage.getItem('userid')) {
          event.preventDefault();
          $ionicPopup.alert({
            title: "提示",
            template: "请先登录！",
            okText: "确定"
          }).then(function() {
            $state.go("signin");
          })
        }
      })

    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
    $rootScope.$on('loading:show', function() {
      $ionicLoading.show({
        template: '加载中'
      })
    });

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
    });
  }
])