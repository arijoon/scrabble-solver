/**
 * Created by Arman on 20/10/2016.
 * General Prototype modifications
 */

(function mods() {
  // region String
  String.prototype.replaceAll = function (search, replacement) {
    return this.split(search).join(replacement);
  };
  //endregion
  
  //region Object
  // Object.prototype.getSize = function () {
  //   return Object.keys(this).length;
  // };
  //
})();

