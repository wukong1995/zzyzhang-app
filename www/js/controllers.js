angular.module('starter.controllers', [])
  .controller('SigninCtrl', ['$rootScope', '$scope', '$location', '$timeout', 'PopupSer', 'LoginSer',
    function($rootScope, $scope, $location, $timeout, PopupSer, LoginSer) {

      $scope.user = {
        name: localStorage.getItem('username') || '',
        password: localStorage.getItem('password') || ''
      }

      $scope.doLogin = function() {
        LoginSer.signin($scope.user).then(function(res) {
          PopupSer.show(res.message);
          if (res.success == 1) {
            $rootScope.username = $scope.user.name;
            localStorage.setItem('userid', res.user._id);
            localStorage.setItem('username', $scope.user.name);
            localStorage.setItem('password', $scope.user.password);
            $location.path('/app/first');
          }
        }, function(err) {
          PopupSer.alertErr(err);
        });
      };
    }
  ])
  .controller('SignupCtrl', ['$scope', '$location', '$timeout', 'PopupSer', 'LoginSer',
    function($scope, $location, $timeout, PopupSer, LoginSer) {

      $scope.doSignup = function() {

        if ($scope.user.password != $scope.user.confirpwd) {
          PopupSer.show('两次输入密码不一致');
          return;
        }
        LoginSer.signup($scope.user).then(function(res) {
          PopupSer.show(res.message);
          if (res.success == 0) {} else {
            $location.path('/signin');
          }
        }, function(err) {
          $ionicLoading.hide();
          PopupSer.alertErr(err);
        });
      };
    }
  ])
  .controller('ForgetpwdCtrl', ['$scope', '$location', 'PopupSer', 'LoginSer',
    function($scope, $location, PopupSer, LoginSer) {
      $scope.doForgetpwd = function() {
        LoginSer.forgetpwd($scope.user).then(function(res) {
          if (res.success == 0) {
            PopupSer.show(res.message);
          } else {
            PopupSer.alert('密码已重置为123456，请及时修改密码!');
            $location.path('/signin');
          }
        }, function(err) {
          PopupSer.alertErr(err);
        });
      };
    }
  ])
  .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', function($scope, $ionicModal, $timeout) {
    //
  }])
  .controller('PayCtrl', ['$scope', '$ionicLoading', '$location', 'Const', 'PopupSer', 'CommonSer',
    function($scope, $ionicLoading, $location, Const, PopupSer, CommonSer) {
      // 初始化参数
      var self = this;
      self.reset = function() {
        self.page = 0;
        self.limit = 15;
        $scope.keyword = '';
        $scope.items = [];
        $scope.moredata = false;
      }

      $scope.loadData = function() {
        CommonSer.getList(Const.payment, $scope.keyword, self.page, self.limit)
          .then(function(res) {
            $scope.page = res.page;
            $scope.items.push.apply($scope.items, res.data);
            if ($scope.page * self.limit > res.totalCount) {
              $scope.moredata = false;
            }
          }, function(err) {
            PopupSer.alertErr(err);
          });
      };

      self.reset();
      $scope.loadData();

      $scope.doRefresh = function() {
        self.reset();
        $scope.loadData();
        $scope.$broadcast('scroll.refreshComplete');
      }

      $scope.search = function(keyword) {
        $scope.keyword = keyword;
        $scope.loadData();
      }

      $scope.onItemDelete = function(item) {
        // 一个确认对话框
        var confirmPopup = PopupSer.confirm('确认删除这条记录？');

        confirmPopup.then(function(res) {
          if (res) {
            CommonSer.delItem(Const.payment, item._id)
              .then(function(data) {
                if (data.success === 1) {
                  $scope.items.splice($scope.items.indexOf(item), 1);
                  PopupSer.alert('删除成功');
                } else {
                  PopupSer.alert('删除出错，请重试！');
                }
              }, function(err) {
                PopupSer.alertErr(err);
              });
          }
        });
      };
    }
  ])
  .controller('PayDetailCtrl', ['$scope', '$stateParams', 'Const', 'CommonSer', 'PopupSer',
    function($scope, $stateParams, Const, CommonSer, PopupSer) {
      $scope.id = $stateParams.id;

      CommonSer.detail(Const.payment, $scope.id)
        .then(function(res) {
          if (res.success == 1) {
            $scope.payment = res.data;
          } else {
            PopupSer.alert('后台查询错误');
          }

        }, function(err) {
          PopupSer.alertErr(err);
        });
    }
  ])
  .controller('PayAddCtrl', ['$scope', '$ionicTabsDelegate', '$location', 'PaySer', 'PopupSer',
    function($scope, $ionicTabsDelegate, $location, PaySer, PopupSer) {
      $scope.payment = {
        type: 0,
        product_type: '工资'
      };
      $scope.payment1 = {
        type: 1,
        product_type: '饮食'
      };
      $scope.doSubmit = function() {

        if ($ionicTabsDelegate.selectedIndex() == 0) {
          PaySer.save($scope.payment).then(function(res) {
            if (res.success == 0) {
              PopupSer.show(res.msg);
            } else {
              PopupSer.show('增加成功');
              $location.path('/app/pay/detail/' + res.id);
            }
          }, function(err) {
            PopupSer.alertErr(err);
          });
        } else {
          PaySer.save($scope.payment1).then(function(res) {
            if (res.success == 0) {
              PopupSer.show(res.msg);
            } else {
              PopupSer.show('增加成功');
              $location.path('/app/pay/detail/' + res.id);
            }
          }, function(err) {
            PopupSer.alertErr(err);
          });
        }

      };
    }
  ])
  .controller('ShareCtrl', ['$scope', '$ionicLoading', '$location', 'Const', 'PopupSer', 'CommonSer',
    function($scope, $ionicLoading, $location, Const, PopupSer, CommonSer) {
      // 初始化参数
      var self = this;
      self.reset = function() {
        self.page = 0;
        self.limit = 15;
        $scope.keyword = '';
        $scope.items = [];
        $scope.moredata = false;
      }

      $scope.loadData = function() {
        CommonSer.getList(Const.share, $scope.keyword, self.page, self.limit)
          .then(function(res) {
            $scope.page = res.page;
            $scope.items.push.apply($scope.items, res.data);
            if ($scope.page * self.limit > res.totalCount) {
              $scope.moredata = false;
            }
          }, function(err) {
            PopupSer.alertErr(err);
          });
      };

      self.reset();
      $scope.loadData();

      $scope.doRefresh = function() {
        self.reset();
        $scope.loadData();
        $scope.$broadcast('scroll.refreshComplete');
      }

      $scope.search = function(keyword) {
        $scope.keyword = keyword;
        $scope.loadData();
      }

      $scope.onItemDelete = function(item) {
        // 一个确认对话框
        var confirmPopup = PopupSer.confirm('确认删除这条记录？');

        confirmPopup.then(function(res) {
          if (res) {
            CommonSer.delItem(Const.share, item._id)
              .then(function(data) {
                if (data.success === 1) {
                  $scope.items.splice($scope.items.indexOf(item), 1);
                  PopupSer.alert('删除成功');
                } else {
                  PopupSer.alert('删除出错，请重试！');
                }
              }, function(err) {
                PopupSer.alertErr(err);
              });
          }
        });
      };
    }
  ])
  .controller('ShareDetailCtrl', ['$scope', '$stateParams', 'Const', 'CommonSer', 'PopupSer',
    function($scope, $stateParams, Const, CommonSer, PopupSer) {
      $scope.id = $stateParams.id;

      CommonSer.detail(Const.share, $scope.id)
        .then(function(res) {
          if (res.success == 1) {
            $scope.share = res.data;
          } else {
            PopupSer.alert('后台查询错误');
          }

        }, function(err) {
          PopupSer.alertErr(err);
        });
    }
  ])
  .controller('ShareAddCtrl', ['$scope', '$location', 'ShareSer', 'PopupSer',
    function($scope, $location, ShareSer, PopupSer) {

      $scope.doSubmit = function() {
        ShareSer.save($scope.share).then(function(res) {
          if (res.success == 0) {
            PopupSer.show(res.msg);
          } else {
            PopupSer.show('增加成功');
            $location.path('/app/share/detail/' + res.id);
          }
        }, function(err) {
          PopupSer.alertErr(err);
        });
      };
    }
  ])
  .controller('BorrowCtrl', ['$scope', '$ionicLoading', '$location', 'Const', 'PopupSer', 'CommonSer',
    function($scope, $ionicLoading, $location, Const, PopupSer, CommonSer) {
      // 初始化参数
      var self = this;
      self.reset = function() {
        self.page = 0;
        self.limit = 15;
        $scope.keyword = '';
        $scope.items = [];
        $scope.moredata = false;
      }

      $scope.loadData = function() {
        CommonSer.getList(Const.borrow, $scope.keyword, self.page, self.limit)
          .then(function(res) {
            $scope.page = res.page;
            $scope.items.push.apply($scope.items, res.data);
            if ($scope.page * self.limit > res.totalCount) {
              $scope.moredata = false;
            }
          }, function(err) {
            PopupSer.alertErr(err);
          });
      };

      self.reset();
      $scope.loadData();

      $scope.doRefresh = function() {
        self.reset();
        $scope.loadData();
        $scope.$broadcast('scroll.refreshComplete');
      }

      $scope.search = function(keyword) {
        $scope.keyword = keyword;
        $scope.loadData();
      }

      $scope.onItemDelete = function(item) {
        // 一个确认对话框
        var confirmPopup = PopupSer.confirm('确认删除这条记录？');

        confirmPopup.then(function(res) {
          if (res) {
            CommonSer.delItem(Const.borrow, item._id)
              .then(function(data) {
                if (data.success === 1) {
                  $scope.items.splice($scope.items.indexOf(item), 1);
                  PopupSer.alert('删除成功');
                } else {
                  PopupSer.alert('删除出错，请重试！');
                }
              }, function(err) {
                PopupSer.alertErr(err);
              });
          }
        });
      };
    }
  ])
  .controller('BorrowDetailCtrl', ['$scope', '$stateParams', 'Const', 'CommonSer', 'PopupSer',
    function($scope, $stateParams, Const, CommonSer, PopupSer) {
      $scope.id = $stateParams.id;

      CommonSer.detail(Const.borrow, $scope.id)
        .then(function(res) {
          if (res.success == 1) {
            $scope.borrow = res.data;
          } else {
            PopupSer.alert('后台查询错误');
          }

        }, function(err) {
          PopupSer.alertErr(err);
        });
    }
  ])
  .controller('BorrowAddCtrl', ['$scope', '$ionicTabsDelegate', '$location', 'BorrowSer', 'PopupSer',
    function($scope, $ionicTabsDelegate, $location, BorrowSer, PopupSer) {
      $scope.borrow = {
        type: 0
      };
      $scope.borrow1 = {
        type: 1
      };
      $scope.doSubmit = function() {

        if ($ionicTabsDelegate.selectedIndex() == 0) {
          BorrowSer.save($scope.borrow).then(function(res) {
            if (res.success == 0) {
              PopupSer.show(res.msg);
            } else {
              PopupSer.show('增加成功');
              $location.path('/app/borrow/detail/' + res.id);
            }
          }, function(err) {
            PopupSer.alertErr(err);
          });
        } else {
          BorrowSer.save($scope.borrow1).then(function(res) {
            if (res.success == 0) {
              PopupSer.show(res.msg);
            } else {
              PopupSer.show('增加成功');
              $location.path('/app/borrow/detail/' + res.id);
            }
          }, function(err) {
            PopupSer.alertErr(err);
          });
        }

      };
    }
  ])
  .controller('BondCtrl', ['$scope', '$ionicLoading', '$location', 'Const', 'PopupSer', 'CommonSer',
    function($scope, $ionicLoading, $location, Const, PopupSer, CommonSer) {
      // 初始化参数
      var self = this;
      self.reset = function() {
        self.page = 0;
        self.limit = 15;
        $scope.keyword = '';
        $scope.items = [];
        $scope.moredata = false;
      }

      $scope.loadData = function() {
        CommonSer.getList(Const.bond, $scope.keyword, self.page, self.limit)
          .then(function(res) {
            $scope.page = res.page;
            $scope.items.push.apply($scope.items, res.data);
            if ($scope.page * self.limit > res.totalCount) {
              $scope.moredata = false;
            }
          }, function(err) {
            PopupSer.alertErr(err);
          });
      };

      self.reset();
      $scope.loadData();

      $scope.doRefresh = function() {
        self.reset();
        $scope.loadData();
        $scope.$broadcast('scroll.refreshComplete');
      }

      $scope.search = function(keyword) {
        $scope.keyword = keyword;
        $scope.loadData();
      }

      $scope.onItemDelete = function(item) {
        // 一个确认对话框
        var confirmPopup = PopupSer.confirm('确认删除这条记录？');

        confirmPopup.then(function(res) {
          if (res) {
            CommonSer.delItem(Const.bond, item._id)
              .then(function(data) {
                if (data.success === 1) {
                  $scope.items.splice($scope.items.indexOf(item), 1);
                  PopupSer.alert('删除成功');
                } else {
                  PopupSer.alert('删除出错，请重试！');
                }
              }, function(err) {
                PopupSer.alertErr(err);
              });
          }
        });
      };
    }
  ])
  .controller('BondDetailCtrl', ['$scope', '$stateParams', 'Const', 'CommonSer', 'PopupSer',
    function($scope, $stateParams, Const, CommonSer, PopupSer) {
      $scope.id = $stateParams.id;

      CommonSer.detail(Const.bond, $scope.id)
        .then(function(res) {
          if (res.success == 1) {
            $scope.bond = res.data;
          } else {
            PopupSer.alert('后台查询错误');
          }

        }, function(err) {
          PopupSer.alertErr(err);
        });
    }
  ])
  .controller('BondAddCtrl', ['$scope', '$location', 'BondSer', 'PopupSer',
    function($scope, $location, BondSer, PopupSer) {
      $scope.title = '收支增加';

      $scope.doSubmit = function() {
        BondSer.save($scope.bond).then(function(res) {
          if (res.success == 0) {
            PopupSer.show(res.msg);
          } else {
            PopupSer.show('增加成功');
            $location.path('/app/bond/detail/' + res.id);
          }
        }, function(err) {
          PopupSer.alertErr(err);
        });
      };
    }
  ])
  .controller('AssetsCtrl', ['$scope', '$ionicLoading', '$location', 'Const', 'PopupSer', 'CommonSer',
    function($scope, $ionicLoading, $location, Const, PopupSer, CommonSer) {
      // 初始化参数
      var self = this;
      self.reset = function() {
        self.page = 0;
        self.limit = 15;
        $scope.keyword = '';
        $scope.items = [];
        $scope.moredata = false;
      }

      $scope.loadData = function() {
        CommonSer.getList(Const.assets, $scope.keyword, self.page, self.limit)
          .then(function(res) {
            $scope.page = res.page;
            $scope.items.push.apply($scope.items, res.data);
            if ($scope.page * self.limit > res.totalCount) {
              $scope.moredata = false;
            }
          }, function(err) {
            PopupSer.alertErr(err);
          });
      };

      self.reset();
      $scope.loadData();

      $scope.doRefresh = function() {
        self.reset();
        $scope.loadData();
        $scope.$broadcast('scroll.refreshComplete');
      }

      $scope.search = function(keyword) {
        $scope.keyword = keyword;
        $scope.loadData();
      }

      $scope.edit = function(id) {
        $location.path('/app/assets/edit/' + id);
      }

      $scope.onItemDelete = function(item) {
        // 一个确认对话框
        var confirmPopup = PopupSer.confirm('确认删除这条记录？');

        confirmPopup.then(function(res) {
          if (res) {
            CommonSer.delItem(Const.assets, item._id)
              .then(function(data) {
                if (data.success === 1) {
                  $scope.items.splice($scope.items.indexOf(item), 1);
                  PopupSer.alert('删除成功');
                } else {
                  PopupSer.alert('删除出错，请重试！');
                }
              }, function(err) {
                PopupSer.alertErr(err);
              });
          }
        });
      };
    }
  ])
  .controller('AssetsDetailCtrl', ['$scope', '$stateParams', 'Const', 'CommonSer', 'PopupSer',
    function($scope, $stateParams, Const, CommonSer, PopupSer) {
      $scope.id = $stateParams.id;

      CommonSer.detail(Const.assets, $scope.id)
        .then(function(res) {
          if (res.success == 1) {
            $scope.assets = res.data;
          } else {
            PopupSer.alert('后台查询错误');
          }

        }, function(err) {
          PopupSer.alertErr(err);
        });
    }
  ])
  .controller('AssetsAddCtrl', ['$scope', '$location', 'PopupSer', 'AssetsSer',
    function($scope, $location, PopupSer, AssetsSer) {
      $scope.assets = {
        type: "流动资产"
      };

      $scope.doSubmit = function() {
        AssetsSer.save($scope.assets).then(function(res) {
          if (res.success == 0) {
            PopupSer.show(res.msg);
          } else {
            PopupSer.show('增加成功');
            $location.path('/app/assets/detail/' + res.id);
          }
        }, function(err) {
          PopupSer.alertErr(err);
        });
      };
    }
  ])
  .controller('AssetsEditCtrl', ['$scope', '$location', '$stateParams', 'PopupSer', 'Const', 'CommonSer', 'AssetsSer',
    function($scope, $location, $stateParams, PopupSer, Const, CommonSer, AssetsSer) {
      $scope.id = $stateParams.id;

      CommonSer.detail(Const.assets, $scope.id)
        .then(function(res) {
          if (res.success == 1) {
            $scope.assets = res.data;
          } else {
            PopupSer.alert('后台查询错误');
          }

        }, function(err) {
          PopupSer.alertErr(err);
        });

      $scope.doSubmit = function() {
        AssetsSer.save($scope.assets).then(function(res) {
          if (res.success == 0) {
            PopupSer.show(res.msg);
          } else {
            PopupSer.show('修改成功');
            $location.path('/app/assets/detail/' + res.id);
          }
        }, function(err) {
          PopupSer.alertErr(err);
        });
      };
    }
  ])
  .controller('WishCtrl', ['$scope', '$ionicLoading', '$location', 'Const', 'PopupSer', 'CommonSer', 'WishSer',
    function($scope, $ionicLoading, $location, Const, PopupSer, CommonSer, WishSer) {
      // 初始化参数
      var self = this;

      self.reset = function() {
        self.page = 0;
        self.limit = 15;
        $scope.keyword = '';
        $scope.items = [];
        $scope.moredata = false;
      }

      $scope.loadData = function() {
        CommonSer.getList(Const.wish, $scope.keyword, self.page, self.limit)
          .then(function(res) {
            $scope.page = res.page;
            $scope.items.push.apply($scope.items, res.data);
            if ($scope.page * self.limit > res.totalCount) {
              $scope.moredata = false;
            }
          }, function(err) {
            PopupSer.alertErr(err);
          });
      };

      self.reset();
      $scope.loadData();

      $scope.doRefresh = function() {
        self.reset();
        $scope.loadData();
        $scope.$broadcast('scroll.refreshComplete');
      }

      $scope.search = function(keyword) {
        $scope.keyword = keyword;
        $scope.loadData();
      }

      $scope.edit = function(id) {
        $location.path('/app/wish/edit/' + id);
      }

      $scope.onItemDelete = function(item) {
        // 一个确认对话框
        var confirmPopup = PopupSer.confirm('确认删除这条记录？');

        confirmPopup.then(function(res) {
          if (res) {
            CommonSer.delItem(Const.wish, item._id)
              .then(function(data) {
                if (data.success === 1) {
                  $scope.items.splice($scope.items.indexOf(item), 1);
                  PopupSer.alert('删除成功');
                } else {
                  PopupSer.alert('删除出错，请重试！');
                }
              }, function(err) {
                PopupSer.alertErr(err);
              });
          }
        });
      };

      $scope.buy = function(item) {
        // 一个确认对话框
        var confirmPopup = PopupSer.confirm('确认已经实现？');

        confirmPopup.then(function(res) {
          if (res) {
            WishSer.buy(item._id)
              .then(function(data) {
                if (data.success === 1) {
                  $scope.items.splice($scope.items.indexOf(item), 1);
                  PopupSer.alert('操作成功');
                } else {
                  PopupSer.alert('操作出错，请重试！');
                }
              }, function(err) {
                PopupSer.alertErr(err);
              });
          }
        });
      };
    }
  ])
  .controller('WishDetailCtrl', ['$scope', '$stateParams', 'Const', 'CommonSer', 'PopupSer',
    function($scope, $stateParams, Const, CommonSer, PopupSer) {
      $scope.id = $stateParams.id;

      CommonSer.detail(Const.wish, $scope.id)
        .then(function(res) {
          if (res.success == 1) {
            $scope.wish = res.data;
          } else {
            PopupSer.alert('后台查询错误');
          }

        }, function(err) {
          PopupSer.alertErr(err);
        });
    }
  ])
  .controller('WishAddCtrl', ['$scope', '$location', 'WishSer', 'PopupSer',
    function($scope, $location, WishSer, PopupSer) {
      $scope.wish = {
        product_type: '饮食'
      };
      $scope.doSubmit = function() {
        WishSer.save($scope.wish).then(function(res) {
          if (res.success == 0) {
            PopupSer.show(res.msg);
          } else {
            PopupSer.show('增加成功');
            $location.path('/app/wish/detail/' + res.id);
          }
        }, function(err) {
          PopupSer.alertErr(err);
        });
      }
    }
  ])
  .controller('WishEditCtrl', ['$scope', '$location', '$stateParams', 'PopupSer', 'Const', 'CommonSer', 'WishSer',
    function($scope, $location, $stateParams, PopupSer, Const, CommonSer, WishSer) {
      $scope.id = $stateParams.id;

      CommonSer.detail(Const.wish, $scope.id)
        .then(function(res) {
          if (res.success == 1) {
            $scope.wish = res.data;
          } else {
            PopupSer.alert('后台查询错误');
          }

        }, function(err) {
          PopupSer.alertErr(err);
        });

      $scope.doSubmit = function() {
        WishSer.save($scope.wish).then(function(res) {
          if (res.success == 0) {
            PopupSer.show(res.msg);
          } else {
            PopupSer.show('修改成功');
            $location.path('/app/wish/detail/' + res.id);
          }
        }, function(err) {
          PopupSer.alertErr(err);
        });
      };
    }
  ])
  .controller('UserCtrl', ['$scope', '$location', 'PopupSer', function($scope, $location, PopupSer) {

    $scope.show = function(item) {
      var confirmPopup = PopupSer.confirm('确定注销账户？');

      confirmPopup.then(function(res) {
        if (res) {
          localStorage.removeItem('userid');
          $location.path('/signin');
        }
      });
    };
  }])
  .controller('UserDetailCtrl', ['$scope', '$ionicLoading', '$ionicPopup', 'PopupSer', 'UserSer',
    function($scope, $ionicLoading, $ionicPopup, PopupSer, UserSer) {
      $ionicLoading.show({
        template: '正在获得数据'
      });

      UserSer.detail().then(function(res) {
        $ionicLoading.hide();
        if (res.success == 0) {
          PopupSer.show(res.msg);
        } else {
          $scope.user = res.user;
        }
      }, function(err) {
        PopupSer.alertErr(err);
      });
    }
  ])
  .controller('UserChangeCtrl', ['$scope', '$location', 'ionicDatePicker', 'UserSer', 'PopupSer',
    function($scope, $location, ionicDatePicker, UserSer, PopupSer) {

      UserSer.detail().then(function(res) {
        if (res.success == 0) {
          PopupSer.show(res.message);
        } else {
          $scope.user = res.user;
        }
      }, function(err) {
        PopupSer.alertErr(err);
      });

      $scope.chooseBirth = function() {
        var ipObj1 = {
          callback: function(val) {
            $scope.user.birth = new Date(val);
          },
          inputDate: new Date($scope.user.birth)
        };
        ionicDatePicker.openDatePicker(ipObj1);
      };

      $scope.doChange = function() {
        UserSer.changepro($scope.user).then(function(res) {
          PopupSer.show(res.message);
          if (res.success == 1) {
            $location.path('/app/user/detail');
          }
        }, function(err) {
          PopupSer.alertErr(err);
        });
      };

    }
  ])
  .controller('UserChangepwdCtrl', ['$scope', '$location', 'UserSer', 'PopupSer',
    function($scope, $location, UserSer, PopupSer) {

      $scope.doChange = function() {

        if ($scope.user.newpwd != $scope.user.confirpwd) {
          PopupSer.show('两次输入密码不一致');
          return;
        }
        UserSer.changepwd($scope.user).then(function(res) {
          PopupSer.show(res.message);
          if (res.success == 0) {} else {
            localStorage.removeItem('userid');
            $location.path('/signin');
          }
        }, function(err) {
          PopupSer.alertErr(err);
        });
      };
    }
  ])
  .controller('CommentCtr', ['$scope', 'PopupSer', 'CommentSer',
    function($scope, PopupSer, CommentSer) {

      $scope.doSubmit = function() {
        CommentSer.save($scope.comment).then(function(res) {
          PopupSer.show(res.msg);
          if (res.success == 1) {
            $scope.comment = '';
          }
        }, function(err) {
          PopupSer.alertErr(err);
        });
      };
    }
  ]);