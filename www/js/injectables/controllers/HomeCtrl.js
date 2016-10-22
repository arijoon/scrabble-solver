angular.module('starter.controllers')

  .controller('HomeCtrl', function($scope, $rootScope, events, loader) {

    loader.load(true);
    
    if($rootScope[events.ready]) {
      onReady();
    }
    else {
      $scope.$on(events.ready, onReady);
    }
    
    function onReady() {
      loader.load(false);
    }

  });


