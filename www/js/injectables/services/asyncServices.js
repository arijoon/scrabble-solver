angular.module('starter.services')
  .factory("asyncService", function($timeout) {

    return {
      runAsync: runAsync
    };

    function runAsync(callback, context, args) {

      setTimeout(function() {
        if (context) {
          if (args) {
            callback.apply(context, args)
          } else {
            callback.call(context);
          }
        } else {
          callback();
        }
      }, 100);

    }

  });
