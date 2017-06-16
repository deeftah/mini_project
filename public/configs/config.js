/**!
 * AngularJS Quotation and Invoice Managment
 * @author Massinissa Saoudi <massinissa.saoudi@gmail.com>
 * @version 0.0.1
 */
var app = angular.module('app',['ui.router', 'signature','angularPayments']);

app.config(['$stateProvider', '$locationProvider',
    function($stateProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider
        .state('index', {
            url: '/',
            controller: 'mainController',
            templateUrl: 'index.html'
        })
        .state('admin', {
            url: '/admin',
            controller: 'adminController',
            templateUrl: 'views/admin.html'
        })
        .state('visualisation', {
            url: '/visualisation/:documentId',
            controller: 'documentController',
            templateUrl: 'views/visualisation.html'
        })
		.state('payment', {
            url: '/payment/:documentId',
            controller: 'paymentController',
            templateUrl: 'views/payment.html'
        });
    }
]);