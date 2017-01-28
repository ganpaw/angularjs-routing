(function() {
  'use strict';

  angular
    .module('crudApp', ['ngRoute', 'crudServiceModule', 'crudControllerModule'])
    .config(Config);

  Config.$inject = ['$routeProvider', '$locationProvider'];

  function Config($routeProvider, $locationProvider) {

    //$locationProvider.html5Mode(false);
    $locationProvider.hashPrefix('');

    $routeProvider
      .when('/deals-list', {
        templateUrl: 'partials/deals-list.html',
        controller: 'DealsListCtrl'
      })
      .when('/deal-publish', {
        templateUrl: 'partials/deal-publish.html',
        controller: 'DealPublishCtrl'
      })
      .when('/deal-publish/:id', {
        templateUrl: 'partials/deal-publish.html',
        controller: 'DealPublishCtrl'
      })
      .when('/deal-detail/:id', {
        templateUrl: 'partials/deal-detail.html',
        controller: 'DealDetailCtrl'
      })
      .otherwise({
        redirectTo: '/deals-list'
      });

  }
})();
