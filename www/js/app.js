angular.module('starter', ['ionic', 'starter.controllers','ionic-datepicker', 'configRouter', 'filter', 'service','directive'])
  .config(['$httpProvider','ionicDatePickerProvider',
    function($httpProvider,ionicDatePickerProvider) {
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
    $httpProvider.interceptors.push(function($rootScope) {
      return {
        request: function(config) {
          $rootScope.$broadcast('loading:show')
          return config
        },
        response: function(response) {
          $rootScope.$broadcast('loading:hide')
          return response
        }
      }
    });

    //添加拦截器  
    $httpProvider.interceptors.push('sessionInteceptor');

    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: '选择日期',
      setLabel: '确定',
      todayLabel: '今天',
      closeLabel: '关闭',
      mondayFirst: false,
      weeksList: ["日", "一","二","三","四","五","六"],
      monthsList: ["一月", "二月", "三月", "四月", "月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      templateType: 'popup',
      showTodayButton: true,
      dateFormat: 'yyyy MMMM dd',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  }])
  .value('baseUrl', 'http://192.168.1.104:3000/')

  .run(['$ionicPlatform','$rootScope','$ionicLoading',
    function($ionicPlatform,$rootScope,$ionicLoading) {
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
      $ionicLoading.show({template: 'loading'})
    });

    $rootScope.$on('loading:hide', function() {
      $ionicLoading.hide()
    });
    }])