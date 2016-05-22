/**
 * Module to handle picking an WLAN SSID.
 *
 */
var SSIDPicker = (function (scope) {
  if (arguments.length == 0 || !(scope !== null && typeof scope === 'object')) {
    scope = {};
  }

  var onSelectCallback = null;

  var containerDOMNode = document;

  // Helper - Make html list of available networks
  //
  var toNetworkList = function toNetworkList(availableNetworks) {
    var list = document.createElement('ul');
    for (var i = 0; i < availableNetworks.length; i++) {
      var item = document.createElement('li');
      item.appendChild(document.createTextNode(availableNetworks[i].SSID + ' - ' + availableNetworks[i].level));
      list.appendChild(item);
    }
    return list;
  };

  var initialize = function initialize(DOMnode) {
    containerDOMNode = DOMnode;
  };

  var onSelect = function onSelect(callback) {
    onSelectCallback = callback;
  };

  var showPicker = function showPicker() {
  };

  var hidePicker = function hidePicker() {
  };


  scope.init = initialize;
  scope.show = showPicker;
  scope.hide = hidePicker;
  scope.onSelect = onSelect;

  return scope;
})();