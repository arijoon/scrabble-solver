angular.module('starter.services')
  .factory("commonRegex", function() {
    return {
      hasDuplicates: /^.*(.).*\1.*$/
    }
  });
