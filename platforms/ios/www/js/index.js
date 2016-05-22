var fakeIt = false;
var mockNets = [
  {
    "level": 4, // raw RSSI value
    "SSID": 'mock net0', // SSID as string, with escaped double quotes: "\"ssid name\""
    "BSSID": 'router MAC address', // MAC address of WiFi router as string
    "frequency": 2.4,
    "capabilities": {} // Describes the authentication, key management, and encryption schemes supported by the access point.
  },
  {
    "level": 2, // raw RSSI value
    "SSID": 'mock net1', // SSID as string, with escaped double quotes: "\"ssid name\""
    "BSSID": 'router MAC address', // MAC address of WiFi router as string
    "frequency": 2.4,
    "capabilities": {} // Describes the authentication, key management, and encryption schemes supported by the access point.
  }
];
var conf = {
  maxLevel: 10
};

var targetNetwork = 'EsEtrok'; //'WannabeAndroid';

var getTargetNetworkName = function getTargetNetworkName() {
  return targetNetwork;
};

var setLevel = function setLevel(net, maxLevel) {
  if (net != null)
    document.getElementById('meterContainer').appendChild(toMeter(net.level, maxLevel));
  else
    document.getElementById('meterContainer').appendChild(toMeter(0, maxLevel));
};

// Handler for available networks
//
var listHandler = function listHandler(networks) {
  setLevel(SSIDFinder.findSSID(getTargetNetworkName(), conf.maxLevel));
  console.log(networks);
};

var getScanResults = function getScanResults() {
  WifiWizard.getScanResults({numLevels: conf.maxLevel},
    listHandler,
    function getScanResultsFail(err) {
      alert(err);
    });
};


var app = {
  // Application Constructor
  initialize: function () {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function () {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function () {
    if (fakeIt)
      listHandler(mockNets);
    else {
      WifiWizard.startScan(function scanStarted() {
          setTimeout(function () {
              getScanResults();
            },
            10 * 1000);
        },
        function scanFail(err) {
          alert('Could not scan for networks. ' + err);
        });
      var node = document.getElementById('ssidPickerContainer');
      SSIDPicker.init(node);

//SSIDPicker.onSelect(function onSSIDSelect(ssid) { targetNetwork = ssid; });
//shake.startWatch(SSIDPicker.show, 40 /*, onError */);

      document.getElementById('meterContainer').appendChild(toMeter(2, 10));

    }
  }
};

app.initialize();
