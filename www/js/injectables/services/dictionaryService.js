angular.module('starter.services')
  .factory("dictionaries", function(dics) {
    var scores = {
      a: 1,
      b: 4,
      c: 4,
      d: 2,
      e: 1,
      f: 4,
      g: 3,
      h: 3,
      i: 1,
      j: 10,
      k: 5,
      l: 2,
      m: 4,
      n: 2,
      o: 1,
      p: 4,
      q: 10,
      r: 1,
      s: 1,
      t: 1,
      u: 2,
      v: 5,
      w: 4,
      x: 8,
      y: 3,
      z: 10
    };
    return {
      english: dics.enable,
      scores: scores
    }
  });
