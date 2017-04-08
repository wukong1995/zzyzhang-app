angular.module('starter.controllers', [])
  .controller('SigninCtrl', ['$scope', '$location', '$timeout','$ionicLoading','$ionicPopup','LoginSer',
   function($scope, $location, $timeout,$ionicLoading,$ionicPopup,LoginSer) {
    if (localStorage.getItem('userid')) {
      $location.path('/app/first');
    }

    $scope.user = {
      name: localStorage.getItem('username') || '',
      password: localStorage.getItem('password') || ''
    }

    $scope.doLogin = function() {
       $ionicLoading.show({
        template: '正在登录'
      });
      LoginSer.signin($scope.user).then(function(res) {
        $ionicLoading.hide();
        if(res.success == 0) {
            $ionicLoading.hide();
            var myPopup = $ionicPopup.show({
              title: res.message,
              buttons: null
            });
            $timeout(function() {
              myPopup.close(); //由于某种原因3秒后关闭弹出
            }, 3000);
        } else {
          localStorage.setItem('userid', res.user._id);
          localStorage.setItem('username', $scope.user.name);
          localStorage.setItem('password', $scope.user.password);
          $location.path('/app/first');
        }
      }, function(err) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          title: '请求错误！',
          buttons: null
        });
        $timeout(function() {
          myPopup.close(); //由于某种原因3秒后关闭弹出
        }, 3000);
      });
    };
  }])
  .controller('SignupCtrl', ['$scope', '$location', '$timeout', '$ionicLoading','$ionicPopup','LoginSer',
    function($scope, $location, $timeout,$ionicLoading,$ionicPopup,LoginSer) {
    
    $scope.doSignup = function() {

      if($scope.user.password != $scope.user.confirpwd) {
        var myPopup = $ionicPopup.show({
          title: '两次输入密码不一致',
          buttons: null
        });
        $timeout(function() {
          myPopup.close(); 
        }, 3000);
        return ;
      }

      $ionicLoading.show({
        template: '正在注册'
      });
      LoginSer.signup($scope.user).then(function(res) {
        $ionicLoading.hide();
        if(res.success == 0) {
            $ionicLoading.hide();
            var myPopup = $ionicPopup.show({
              title: res.message,
              buttons: null
            });
            $timeout(function() {
              myPopup.close(); 
            }, 3000);
        } else {
          var myPopup = $ionicPopup.show({
              title: res.message,
              buttons: null
            });
           $timeout(function() {
              myPopup.close(); 
            }, 3000);

          $location.path('/signin');
        }
      }, function(err) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          title: '请求错误！',
          buttons: null
        });
        $timeout(function() {
          myPopup.close(); 
        }, 3000);
      });
    };
  }])
  .controller('ForgetpwdCtrl',['$scope', '$location', '$timeout', '$ionicLoading','$ionicPopup','LoginSer',
    function($scope, $location, $timeout,$ionicLoading,$ionicPopup,LoginSer) {
    $scope.doForgetpwd = function() {
      
      $ionicLoading.show({
        template: '正在重置'
      });
      LoginSer.forgetpwd($scope.user).then(function(res) {
        $ionicLoading.hide();
        if(res.success == 0) {
            $ionicLoading.hide();
            var myPopup = $ionicPopup.show({
              title: res.message,
              buttons: null
            });
            $timeout(function() {
              myPopup.close(); 
            }, 2000);
        } else {
          $ionicLoading.hide();
            var myPopup = $ionicPopup.show({
              title: '密码已重置为123456，请及时修改密码!',
              buttons: null
            });
            $timeout(function() {
              myPopup.close(); 
            }, 2000);
          $location.path('/signin');
        }
      }, function(err) {
        $ionicLoading.hide();
        var myPopup = $ionicPopup.show({
          title: '请求错误！',
          buttons: null
        });
        $timeout(function() {
          myPopup.close(); 
        }, 3000);
      });
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
  .controller('ShareDetailCtrl', ['$scope', '$stateParams', 'ShareSer', function($scope, $stateParams, ShareSer) {
    $scope.id = $stateParams.id;

    shareSer.detail($scope.id).then(function(data) {
      $scope.sharement = data.sharement;

    }, function(err) {
      $ionicPopup.alert({
        title: '请求错误',
        template: err,
        okText: '确认'
      });
    });
  }])
  .controller('ShareAddCtrl', ['$scope', '$stateParams', '$timeout', '$location', function($scope, $stateParams, $timeout, $location) {
    $scope.title = '收支增加';
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      $timeout(function() {
        $location.path('/app/pay/detail/0');
      }, 1000);
    };
  }])
  .controller('BorrowCtrl', ['$scope', '$ionicPopup', '$location', function($scope, $ionicPopup, $location) {
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
  .controller('BorrowDetailCtrl', ['$scope', '$stateParams', 'BorrowSer', function($scope, $stateParams, BorrowSer) {
    $scope.id = $stateParams.id;

    shareSer.detail($scope.id).then(function(data) {
      $scope.sharement = data.sharement;

    }, function(err) {
      $ionicPopup.alert({
        title: '请求错误',
        template: err,
        okText: '确认'
      });
    });
  }])
  .controller('BorrowAddCtrl', ['$scope', '$stateParams', '$timeout', '$location', function($scope, $stateParams, $timeout, $location) {
    $scope.title = '收支增加';
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      $timeout(function() {
        $location.path('/app/pay/detail/0');
      }, 1000);
    };
  }])
  .controller('BondCtrl', ['$scope', '$ionicPopup', '$location', function($scope, $ionicPopup, $location) {
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
  .controller('BondDetailCtrl', ['$scope', '$stateParams', 'BondSer', function($scope, $stateParams, BondSer) {
    $scope.id = $stateParams.id;

    shareSer.detail($scope.id).then(function(data) {
      $scope.sharement = data.sharement;

    }, function(err) {
      $ionicPopup.alert({
        title: '请求错误',
        template: err,
        okText: '确认'
      });
    });
  }])
  .controller('BondAddCtrl', ['$scope', '$stateParams', '$timeout', '$location', function($scope, $stateParams, $timeout, $location) {
    $scope.title = '收支增加';
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      $timeout(function() {
        $location.path('/app/pay/detail/0');
      }, 1000);
    };
  }])
  .controller('AssetsCtrl', ['$scope', '$ionicPopup', '$location', function($scope, $ionicPopup, $location) {
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
  .controller('AssetsDetailCtrl', ['$scope', '$stateParams', 'AssetsSer', function($scope, $stateParams, AssetsSer) {
    $scope.id = $stateParams.id;

    shareSer.detail($scope.id).then(function(data) {
      $scope.sharement = data.sharement;

    }, function(err) {
      $ionicPopup.alert({
        title: '请求错误',
        template: err,
        okText: '确认'
      });
    });
  }])
  .controller('AssetsAddCtrl', ['$scope', '$stateParams', '$timeout', '$location', function($scope, $stateParams, $timeout, $location) {
    $scope.title = '收支增加';
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      $timeout(function() {
        $location.path('/app/pay/detail/0');
      }, 1000);
    };
  }])
  .controller('AssetsEditCtrl', ['$scope', '$stateParams', 'AssetsSer', function($scope, $stateParams, AssetsSer) {
    $scope.id = $stateParams.id;

    shareSer.detail($scope.id).then(function(data) {
      $scope.sharement = data.sharement;

    }, function(err) {
      $ionicPopup.alert({
        title: '请求错误',
        template: err,
        okText: '确认'
      });
    });
  }])
  .controller('WishCtrl', ['$scope', '$ionicPopup', '$location', function($scope, $ionicPopup, $location) {
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
  .controller('WishDetailCtrl', ['$scope', '$stateParams', 'WishSer', function($scope, $stateParams, WishSer) {
    $scope.id = $stateParams.id;

    shareSer.detail($scope.id).then(function(data) {
      $scope.sharement = data.sharement;

    }, function(err) {
      $ionicPopup.alert({
        title: '请求错误',
        template: err,
        okText: '确认'
      });
    });
  }])
  .controller('WishAddCtrl', ['$scope', '$stateParams', '$timeout', '$location', function($scope, $stateParams, $timeout, $location) {
    $scope.title = '收支增加';
    $scope.doLogin = function() {
      console.log('Doing login', $scope.loginData);

      $timeout(function() {
        $location.path('/app/pay/detail/0');
      }, 1000);
    };
  }])
  .controller('WishEditCtrl', ['$scope', '$stateParams', 'WishSer', function($scope, $stateParams, WishSer) {
    $scope.id = $stateParams.id;

    shareSer.detail($scope.id).then(function(data) {
      $scope.sharement = data.sharement;

    }, function(err) {
      $ionicPopup.alert({
        title: '请求错误',
        template: err,
        okText: '确认'
      });
    });
  }])
  .controller('UserCtrl', ['$scope', '$ionicPopup', '$location', function($scope, $ionicPopup, $location) {

    $scope.show = function(item) {
      // 一个确认对话框
      var confirmPopup = $ionicPopup.confirm({
        title: '提示',
        template: '确定注销账户？',
        cancelText: '取消',
        okText: '确认',
      });

      confirmPopup.then(function(res) {
        if (res) {
          localStorage.removeItem('userid');
          $location.path('/');
        }
      });
    };
  }])
  .controller('UserDetailCtrl', ['$scope', '$ionicActionSheet', '$location', function($scope, $ionicActionSheet, $location) {
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
  }])
  .controller('UserChangeCtrl', ['$scope', '$ionicActionSheet', '$location', function($scope, $ionicActionSheet, $location) {
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
  }])
  .controller('UserChangepwdCtrl', ['$scope', '$ionicActionSheet', '$location', function($scope, $ionicActionSheet, $location) {
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