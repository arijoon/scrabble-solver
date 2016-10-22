angular.module('starter.directives')
  .directive("regExInput", function(){
    return {
      restrict: "A",
      require: ["?regEx", "^ngModel"],
      scope: {},
      replace: false,
      link: function(scope, element, attrs, controllerAttrs){
        
        element.bind('keypress', function (event) {

          var regex = new RegExp(attrs.regEx),
              key = String.fromCharCode(!event.charCode ? event.which : event.charCode) || "",
              modelVal = controllerAttrs[1].$modelValue || "";
          
          if (!regex.test(modelVal + key)) {
            event.preventDefault();
            return false;
          }
          
        });
      }
    };
  });
