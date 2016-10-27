"use strict";

angular.module('starter.controllers')

.controller('SolverCtrl', function($scope, $ionicModal, $timeout, $q, dictionaries, commonRegex, loader) {

  setDebugValues();

  // Constants
  var maxFormatLength = 20;

  // Flags
  $scope.preventDuplicates = true;
  $scope.searching = true;

  // Initial Values
  $scope.matches = null;
  $scope.settings = {
    duplicatesWhitelist: ""
  };

  // Function mappings
  $scope.findMatch = findMatch;
  $scope.sortMatches = sortBy;

  // Toggles
  $scope.changeToggle = function() {
    $scope.preventDuplicates = !$scope.preventDuplicates;
  };


  //region Function definitions
  function findMatch(characters, wordFormat) {

    $scope.searching = true;

    loader.load(true);

    $scope.matches = [];
    $scope.matchDic = {};

    wordFormat = applyNumberMultiplier(wordFormat);

    if(wordFormat.length > maxFormatLength) {
      wordFormat = wordFormat.slice(0,maxFormatLength);
    }

    var obj = sanitiseCharacters(characters);

    (function processAsync() {

      var defer = $q.defer();

      $timeout(function() {
        if (obj.shouldBrute) {

          characters = obj.characters;

          var possibleFormats = generatePossibleFormats(wordFormat);

          for (var i = 0; i < possibleFormats.length; i++) {
            innerFind(possibleFormats[i]);
          }

        } else {

          innerFind(wordFormat);
        }

        defer.resolve();
      }, 50);

      return defer.promise;

      function innerFind(wordFormat) {

        var afterSpecialConversion = applyStaticConversions(wordFormat, characters),
            myRegex                = new RegExp("^" + afterSpecialConversion + "$", "gi");

        console.log(myRegex);

        for (var key in dictionaries.english) {

          if (!dictionaries.english.hasOwnProperty(key) || $scope.matchDic[key]) continue;

          if (myRegex.test(key) && checkAdditional(key)) {

            $scope.matchDic[key] = calculateScore(key);
          }
        }
      }
    })().then(function onComplete() {

      $scope.matches = Object.keys($scope.matchDic);

      $scope.matches.sort(function (a, b) {
        return $scope.matchDic[b] - $scope.matchDic[a];
        // return b.length - a.length;
      });

      $scope.searching = false;

      loader.load(false, 100);
    }).catch(function() {

      loader.load(false);
    });

  }

  function sortBy(method) {
    if(method == 'length') {

      $scope.matches.sort(function (a, b) {
        return b.length - a.length;
      });

    } else if(method == 'score') {
      $scope.matches.sort(function (a, b) {
        return $scope.matchDic[b] - $scope.matchDic[a];
      });

    } else {
      console.error('[!] Unknown sort method ' + method);
    }
  }

  function checkAdditional(word) {
    var result = true,
        regex = commonRegex.hasDuplicates();

    do {
      var match = regex.exec(word);

      if(match) {
        var char = match[0];

        if($scope.settings.duplicatesWhitelist.indexOf(char) === -1) {
          result = false;
        }
      }
    } while (match);

    return result;
  }

  function calculateScore(word) {
    var score = 0;

    for(var i = 0; i< word.length; i++) {
      score += dictionaries.scores[word[i]];
    }

    return score;
  }

  function applyStaticConversions(input, charset) {
    var mapping = {
      '_': "[a-z]{1}",
      '!': "[a-z]?",
      '|': "[" + charset + "]?",
      '?' : "[" + charset + "]{1}"
    };

    var order = ['?', '!', '_', '|'];

    var count = 0;

    for(var i = 0 ; i < order.length ; i++) {
      var key = order[i];

      if(!mapping.hasOwnProperty(key))  continue;
      count++;

      input = input.replaceAll(key, "(" + mapping[key] + ")");
    }

    return input;
  }

  function applyNumberMultiplier(input) {
    var regex = /([0-9]+)([_\!\|\?a-z])/ig;

    return input.replace(regex, function(a ,b, c) {
      var result = Array(parseInt(b) + 1).join(c);

      return result;
    });
  }

  function sanitiseCharacters(characters) {

    var result = false;

    if(characters.indexOf('_') !== -1) {
      result = true;
      characters = characters.replace(/_/g, "");
    }

    return {
      characters : characters,
      shouldBrute: result
    }
  }

  function generatePossibleFormats(wordFormat) {
    var mapping = {
      '|': '!'
    };

    var count = (wordFormat.match(/\|/g) || []).length,
        result = [];

    for(var i = 0, n = 0, format; i < count; i++) {

      n = 0;
      format = wordFormat.replace(/\|/g, function(match, j, original) {
        return (n++ == i) ? mapping['|'] : match;
      });

      result.push(format);
    }

    return result;
  }

  function setDebugValues() {
    $scope.characters = "qoftvdw";
    $scope.wordFormat = "||||a||||"
  }
  //endregion

});


