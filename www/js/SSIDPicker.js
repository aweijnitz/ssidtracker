/**
 * Module to handle picking an WLAN SSID.
 *
 */
var SSIDPicker = (function (document, $) {
  var scope = {};
  var onSelectCallback = null;
  var containerDOMNode = document;


  // Helper - Make html list of available networks
  //
  var toNetworkList = function toNetworkList(availableNetworks) {
    for (var i = 0; i < availableNetworks.length; i++) {
      var radio = $('<div class="radio">' +
        '<label>' +
        '<input type="radio" name="optionsRadios" id="ssid'+i+'" value="'+availableNetworks[i].SSID+'">' +
        ''+availableNetworks[i].SSID +
        '</label>' +
        '</div>');
      radio.appendTo('#ssidList');
    }
  };

  var initialize = function initialize(DOMnode) {
    containerDOMNode = DOMnode;
  };

  var onSelect = function onSelect(callback) {
    onSelectCallback = callback;
  };

  var populate = function populate(networks) {
    $('#ssidList').empty();
    toNetworkList(networks);
  };


  scope.init = initialize;
  scope.populate = populate;
  scope.onSelect = onSelect;

  return scope;
})(document, $);