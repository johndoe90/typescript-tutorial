require.config({
	baseUrl: 'app',

	paths: {
		angular: '../node_modules/angular/angular'
	},

	shim: {
		angular: {
			exports: 'angular'
		}
	}
});

require(['angular', 'appModule'], function(angular, appModule) {
	angular.element(document).ready(function() {
		angular.bootstrap(document, ['typescript']);
	});
});
