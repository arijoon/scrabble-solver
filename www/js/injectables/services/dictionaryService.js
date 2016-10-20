angular.module('starter.services')
  .factory("dictionaries", function(englishDic) {
    return {
      english: englishDic
    }
  });
