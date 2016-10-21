angular.module('starter.services')
  .factory("loader", function($ionicLoading) {
    
    var stack = 0;

    return {
      load: load
    };
    
    function load(val) {
      if(val) {
        stack++;
      } else {
        stack--;
      }
      
      if(stack < 0) stack = 0;
      
      if(stack <= 0) {
        $ionicLoading.hide();
        
      } else if (stack == 1)  {
        $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
      }
      
    }
    
  });
