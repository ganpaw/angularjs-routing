(function() {
  'use strict';

  angular
    .module('crudServiceModule', [])
    .service('DealsService', DealsService);

  DealsService.$inject = ['$http', '$log'];

  /* @ngInject */
  function DealsService($http, $log) {
    var self = this;

    self.deals = [];

    this.setDeals = function(deals) {
      self.deals = deals;
      console.log(self.deals);
    }

    // Get deals
    this.getDeals = function() {
      return $http.get('json/deals.json');
    }

    this.getCachedDeal = function() {
      return self.deals;
    }

    this.updateDeal = function(id, deal) {
      for (var i = 0; i < self.deals.length; i++) {
        if (self.deals[i]._id == id) {
          self.deals[i] = deal;
        }
      }
      $log.debug("DealsService | updateDeal ");
      console.log(self.deals);
    }


    // This is just a test to verify inter controller communication using service's singleton behavior
    self.message = "";
    this.getMessage = function() {
      return self.message;
    }
    this.setMessage = function(message) {
      self.message = message;
    }

    $log.info("DealsService is initialzied");
  }
})();
