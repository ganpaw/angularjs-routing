(function() {
  'use strict';

  angular
    .module('crudControllerModule', [])
    .controller('DealsListCtrl', DealsListCtrl)
    .controller('DealPublishCtrl', DealPublishCtrl)
    .controller('DealDetailCtrl', DealDetailCtrl);

  DealsListCtrl.$inject = ['$scope', '$log', '$location', 'DealsService'];
  DealPublishCtrl.$inject = ['$scope', '$log', '$routeParams', '$location', 'DealsService'];
  DealDetailCtrl.$inject = ['$scope', '$log', '$routeParams', 'DealsService'];

  /* @ngInject */
  function DealsListCtrl($scope, $log, $location, DealsService) {

    function refreshDeals() {
      DealsService.getDeals()
        .then(function(response) {
          $log.debug("Got success !");
          $scope.deals = response.data;

          DealsService.setDeals($scope.deals);
        }, function() {
          $log.error("Somthing went wrong");
          $scope.deals = "[]";
        });
    }

    // Read (R)
    function init() {
      $scope.deals = DealsService.getCachedDeal();
      if ($scope.deals.length == 0) {
        refreshDeals();
      }
      $log.info("DealsListCtrl is initialzied");
    }

    // Watch Deals
    $scope.$watch('deals', function() {
      $log.debug('DealsListCtrl[deals - Watched]');
      DealsService.setDeals($scope.deals);
    });

    init();

    $scope.addNewDeal = function() {
      //$log.debug("Add new deal");
      $location.path('/deal-publish');
    };

    $scope.refresh = function() {
      refreshDeals();
    }

    $scope.edit = function(id) {
      //$log.debug("Update existing deal");
      $location.path('/deal-publish/' + id);
    }

    /**
     *  Delete (D)
     *  Here we will run 2 things
     *  We will itearte over deals and find out right deal object, we will delete deal object from memory that by using 'delete'
     *  but still we need to use splice to change the length and rearrange the array indexes
     */
    $scope.remove = function(id) {
      if (id > -1) {
        for (var i = 0; i < $scope.deals.length; i++) {
          if ($scope.deals[i]._id == id) {
            $log.debug("Removing deal:");
            console.log($scope.deals[i]);

            delete $scope.deals[i];
            $scope.deals.splice(i, 1);
            break;
          }
        }
      }
    }

    // Just a test for passing values from DealsListCtrl to DealDetailCtrl
    $scope.message = DealsService.getMessage();
    $scope.$watch('message', function() {
      DealsService.setMessage($scope.message);
    });
  }

  /* @ngInject */
  function DealPublishCtrl($scope, $log, $routeParams, $location, DealsService) {

    $log.info('DealPublishCtrl is initialzied.');

    $scope.deals = DealsService.getCachedDeal();

    $scope.action = "Submit";
    if ($routeParams.id) {
      for (var i = 0; i < $scope.deals.length; i++) {
        if ($scope.deals[i]._id == $routeParams.id) {
          $scope.deal = $scope.deals[i];
          $scope.action = "Update"
          break;
        }
      }
    }

    // Update  (U)
    $scope.update = function(id) {
      $log.debug($scope.deal);
      DealsService.updateDeal(id, $scope.deal);
      $location.path('/');
    }

    // Create  (C)
    $scope.create = function() {
      $log.debug($scope.deal);
      $scope.deal._id = $scope.deals.length > 0 ? $scope.deals[$scope.deals.length - 1]._id + 1 : 0;
      //$log.debug('$scope.deal._id: ' + $scope.deal._id);
      $scope.deals.push($scope.deal);
      $location.path('/');
    }

  }

  /* @ngInject */
  function DealDetailCtrl($scope, $log, $routeParams, DealsService) {

    $log.info('DealDetailCtrl is invoked ($routeParams.id:' + $routeParams.id + ')');

    $scope.deals = DealsService.getCachedDeal();
    for (var i = 0; i < $scope.deals.length; i++) {
      if ($scope.deals[i]._id == $routeParams.id) {
        $scope.deal = $scope.deals[i];
        break;
      }
    }

    // Update DealsService for cache so that other Controllers can access deals without reading json file
    $scope.message = DealsService.getMessage();
    $scope.$watch('message', function() {
      $log.debug('DealDetailCtrl[deals - Watched]');
      DealsService.setMessage($scope.message);
    });


    $scope.goToStore = function() {
      $log.debug("goToStore");
    }
  }

})();
