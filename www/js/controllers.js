angular.module('starter.controllers', [])
  .controller('LoginCtrl', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {

    $scope.user = {
      name: localStorage.getItem('username') || '',
      password: localStorage.getItem('password') || ''
    }

    $scope.doLogin = function() {
      console.log('Doing login', $scope.user);

      localStorage.setItem('userid', '58bbc428ce0e2e1438a93ea9');
      localStorage.setItem('username', $scope.user.name);
      localStorage.setItem('password', $scope.user.password);

      // delete localStorage.token;

      $timeout(function() {
        $location.path('/app/first');
      }, 1000);
    };
  }])
  .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', function($scope, $ionicModal, $timeout) {
    //
  }])
  .controller('PayCtrl', ['$scope', '$ionicPopup', '$location', 'PaySer', function($scope, $ionicPopup, $location, PaySer) {
    // 初始化参数
    var self = this;
    self.page = 0;
    self.limit = 15;
    $scope.keyword = '';
    $scope.items = [];
    $scope.moredata = true;


    $scope.loadData = function() {
      PaySer.getList($scope.keyword, self.page, self.limit).then(function(data) {
        $scope.page = data.page;
        $scope.items.push.apply($scope.items, data.payment);
        if ($scope.page * self.limit > data.totalCount) {
          $scope.moredata = false;
        }
      }, function(err) {
        $ionicPopup.alert({
          title: '请求错误',
          template: err,
          okText: '确认'
        });
      });
    };

    $scope.search = function(keyword) {
      $scope.keyword = keyword;

      PaySer.getList($scope.keyword, self.page, self.limit).then(function(data) {
        $scope.page = data.page;
        $scope.items = data.payment;
        if ($scope.page * self.limit > data.totalCount) {
          $scope.moredata = false;
        }
      }, function(err) {
        $ionicPopup.alert({
          title: '请求错误',
          template: err,
          okText: '确认'
        });
      });
    }

    $scope.edit = function(item) {
      $location.path('/app/pay/edit/' + item.id);
    };

    $scope.onItemDelete = function(item) {
      // 一个确认对话框
      var confirmPopup = $ionicPopup.confirm({
        title: '提示',
        template: '确认删除这条记录？',
        cancelText: '取消',
        okText: '确认',
      });

      confirmPopup.then(function(res) {
        if (res) {
          PaySer.delItem(item._id).then(function(data) {
            if (data.success === 1) {
              $scope.items.splice($scope.items.indexOf(item), 1);
              $ionicPopup.alert({
                title: '',
                template: '删除成功',
                okText: '确认'
              });
            } else {
              $ionicPopup.alert({
                title: '',
                template: '删除出错，请重试！',
                okText: '确认'
              });
            }
          }, function(err) {
            $ionicPopup.alert({
              title: '请求错误',
              template: err,
              okText: '确认'
            });
          });
        }
      });
    };
  }])
  .controller('PayDetailCtrl', ['$scope', '$stateParams', 'PaySer', function($scope, $stateParams, PaySer) {
    $scope.id = $stateParams.id;

    PaySer.detail($scope.id).then(function(data) {
      $scope.payment = data.payment;

    }, function(err) {
      $ionicPopup.alert({
        title: '请求错误',
        template: err,
        okText: '确认'
      });
    });
  }])
  .controller('PayAddCtrl', ['$scope', '$stateParams', '$timeout', '$location', function($scope, $stateParams, $timeout, $location) {
    $scope.title = '收支增加';
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      $timeout(function() {
        $location.path('/app/pay/detail/0');
      }, 1000);
    };
  }])
  .controller('PayEditCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.id = $stateParams.id;
    $scope.title = '收支编辑';
  }])
  .controller('ShareCtrl', ['$scope', '$ionicPopup', '$location', function($scope, $ionicPopup, $location) {
    $scope.items = [];
    for (var i = 0; i < 50; i++) {
      $scope.items.push({
        id: i
      });
    }

    $scope.edit = function(item) {
      $location.path('/app/share/edit/' + item.id);
    };

    $scope.onItemDelete = function(item) {
      // 一个确认对话框
      var confirmPopup = $ionicPopup.confirm({
        title: '提示',
        template: '确认删除这条记录？',
        cancelText: '取消',
        okText: '确认',
      });

      confirmPopup.then(function(res) {
        if (res) {
          $scope.items.splice($scope.items.indexOf(item), 1);
        }
      });
    };
  }])

.controller('UserCtrl', ['$scope', '$ionicActionSheet', '$location', function($scope, $ionicActionSheet, $location) {
  // 点击按钮触发，或一些其他的触发条件
  $scope.show = function() {
    $ionicActionSheet.show({
      destructiveText: '确定',
      cancelText: '取消',
      destructiveButtonClicked: function() {
        $location.path('/');
        return true;
      }
    });
  }
}]);