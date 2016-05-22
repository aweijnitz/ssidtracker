/**
 * Module to check for a specific SSID in a network scan from https://github.com/parsonsmatt/WifiWizard
 */
var SSIDFinder = (function (scope) {
  if (arguments.length == 0 || !(scope !== null && typeof scope === 'object')) {
    scope = {};
  }

  // Define and add function to scope
  scope.containsSSID = function containsSSID(ssid, networklist) {
    if (arguments.length < 2 || ssid === null || networklist === null)
      return false;

    var found = false;
    for (var i = 0; i < networklist.length; i++) {
      if (networklist[i].SSID === ssid) {
        found = true;
        break;
      }
    }
    return found;
  };

  scope.findSSID = function findSSID(ssid, networklist) {
    var found = null;
    if (arguments.length < 2 || ssid === null || networklist === null)
      return found;

    for (var i = 0; i < networklist.length; i++) {
      if (networklist[i].SSID === ssid) {
        found = networklist[i];
        break;
      }
    }
    return found;
  };

  return scope;
})();