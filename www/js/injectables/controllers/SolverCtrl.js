angular.module('starter.controllers')

.controller('SolverCtrl', function($scope, $ionicModal, $timeout, dictionaries, commonRegex) {

  setDebugValues();

  // Flags
  $scope.preventDuplicates = true;
  $scope.searching = true;
  
  // Initial Values
  $scope.matches = [];
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
    var charSet = characters;
    
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
  }
  
  function checkAdditional(word) {
    var result = true;
    
    if(commonRegex.hasDuplicates.test(word)) {
      var char = commonRegex.hasDuplicates.exec(word)[1];
      
      if($scope.settings.duplicatesWhitelist.indexOf(char) === -1) {
        result = false;
      }
    }
    
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
    
    // var postfix = "";
    // for(var i = 0; i < count, i ++) {
    //   postfix += "\1[^\1]*"
    // }
    
    return input;
  }

  function setDebugValues() {
    $scope.characters = "qoftvdw";
    $scope.wordFormat = "||||a||||"
  }
  //endregion

});


