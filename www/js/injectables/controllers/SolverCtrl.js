angular.module('starter.controllers')

.controller('SolverCtrl', function($scope, $ionicModal, $timeout, dictionaries, commonRegex, loader) {

  setDebugValues();

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

  // Toggles
  $scope.changeToggle = function() {
    $scope.preventDuplicates = !$scope.preventDuplicates;
  };


  //region Function definitions
  function findMatch(characters, wordFormat) {

    $scope.searching = true;

    loader.load(true);
    
    // characters = sanitiseCharacters(characters);
    
    var afterSpecialConversion = applyStaticConversions(wordFormat, characters),
        myRegex = new RegExp("^" + afterSpecialConversion + "$", "gi");

    console.log(myRegex);

    $scope.matches = [];
    $scope.matchDic = {};

    for(var key in dictionaries.english) {

      if(!dictionaries.english.hasOwnProperty(key)) continue;

      $scope.currentKey = key;

      if(myRegex.test(key) && checkAdditional(key)) {

        $scope.matches.push(key);
        $scope.matchDic[key] = calculateScore(key);
      }
    }

    $scope.matches.sort(function(a ,b) {
      return b.length - a.length;
    });

    $scope.searching = false;
    
    $timeout(function() {
      loader.load(false);
    }, 100);
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

    input = applyNumberMultiplier(input);

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
    
    if(characters.indexOf('_') !== -1) {
      characters += "a-z";
    }
    
    characters = characters.replace(/_/g, "");

    return characters;
  }
  
  function setDebugValues() {
    $scope.characters = "qoftvdw";
    $scope.wordFormat = "||||a||||"
  }
  //endregion

});


