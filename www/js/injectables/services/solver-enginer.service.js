angular.module('starter.services')
  .factory("solverEngine", function($timeout, $q, asyncService, dictionaries) {

    return {
      solveCombo: solveCombo
    };

    /*
     * conditions is an array of the words with each word numbered i.e.
     * a#1#2#3
     * b#1
     * will solve for {#1,#2,#3} in character set
     */
    function solveCombo(conditions, characterSet) {
      var defer = $q.defer();

      asyncService.runAsync(function() {
        solveComboMain(conditions, characterSet);
        defer.resolve();
      });

      return defer.promise;
    }

    function solveComboMain(conditions, characterSet) {

      conditions.sort(function (a, b) {
        return a.length - b.length;
      });

      var options = sortOptions(conditions),
          optionCount = Object.keys(options).length;

      for(var i = 0; i < conditions.length; i++) {
        var item = conditions[i];


      }

    }

    function sortOptions(conditions) {
      var options = {},
          reg = /#[0-9]+/g;

      for(var i = 0; i < conditions.length; i++) {
        for(var res = reg.exec(conditions[i]); res ;) {

          options[res] = options[res]
            ? options[res]++
            : 0;
        }

        reg.lastIndex = 0;
      }

      return options;
    }

  });
