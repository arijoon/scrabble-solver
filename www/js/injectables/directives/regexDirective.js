angular.module('starter.directives')
  .directive("regExInput", function(){
    return {
      restrict: "A",
      require: "?regEx",
      scope: {},
      replace: false,
      link: function(scope, element, attrs, ctrl){
        element.bind('keypress', function (event) {
          var regex = new RegExp(attrs.regEx);
          var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
          if (!regex.test(key)) {
            event.preventDefault();
            return false;
          }
        });
      }
    };
  });
