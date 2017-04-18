angular.module('directive', [])
    .directive('dateFormat', ['$filter', function($filter) {
        var dateFilter = $filter('date');
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                function formatter(value) {
                    return dateFilter(value, 'yyyy-MM-dd'); //format  
                }

                function parser() {
                    return ctrl.$modelValue;
                }

                ctrl.$formatters.push(formatter);
                ctrl.$parsers.unshift(parser);

            }
        };
    }])
    .directive('pwCheck', [function() {
        return {
            restrict: 'A',
            require: "ngModel",
            link: function(scope, elem, attrs, ctrl) {
                var otherInput = elem.inheritedData("$formController")[attrs.pwCheck];
                ctrl.$parsers.push(function(value) {
                    ctrl.$setValidity("pwCheck", value === otherInput.$viewValue);
                    return value;
                });

                otherInput.$parsers.push(function(value) {
                    ctrl.$setValidity("pwCheck", value === ctrl.$viewValue);
                    return value;
                });
            }
        };
    }]);;