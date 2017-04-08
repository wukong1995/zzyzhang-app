angular.module('filter', [])
	.filter('DateFilter',['$filter', function($filter) {
		return function(data) {
			var dateFilter = $filter('date');  
			return dateFilter(data, 'yyyy-MM-dd');;
		}
	}])