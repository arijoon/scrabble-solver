angular.module('starter.services')
  .factory("commonRegex", function() {
    
    return {
      hasDuplicates: hasDuplicates
    };
    
    function hasDuplicates() {
      return /(.)(?=.*\1)/g; 
    }
  });
