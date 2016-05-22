(function (document, $) {
  var targetNetwork = 'WannabeAndroid';
  var currentNets = []; // Result from last scan

  // Get the name of the network we are tracking
  var getTargetNetworkName = function getTargetNetworkName() {
    return targetNetwork;
  };

  // UI helper. Set the meter to the right number of ticks
  var setLevel = function setLevel(net, maxLevel) {
    if (net != null)
      document.getElementById('meterContainer').appendChild(toMeter(net.level, maxLevel));
    else
      document.getElementById('meterContainer').appendChild(toMeter(0, maxLevel));
  };

  // Handler for available networks. Used as callback to handle the scan results.
  //
  var listHandler = function listHandler(networks) {
    currentNets = networks;
    setLevel(SSIDFinder.findSSID(getTargetNetworkName(), networks), conf.maxLevel);
  };

  //Retrieves list of available networks.
  var getScanResults = function getScanResults(callback) {
    WifiWizard.getScanResults({numLevels: conf.maxLevel},
      callback,
      function getScanResultsFail(err) {
        alert(err);
      });
  };

  // Refreshes the list of available networks and their signal strengths.
  var scanForNetworks = function scanForNetworks() {
    setTimeout(function startScan() {
      WifiWizard.startScan(function scanStarted() {
          // Wait a while and then read the result of the scan. Ugly, but there is no better way with WifiWizard
          setTimeout(function () {
              getScanResults(listHandler);
            },
            2 * 1000);
        },
        function scanFail(err) {
          alert('Could not scan for networks. ' + err);
        });
    }, 500);
  };

  // Re-scan for networks periodically
  var backgroundScannerId = null;
  var startBackgroundScanner = function startBackgroundScanner(countdownDOMNode) {
    var scanInterval = 10;
    var intervalCount = scanInterval;
    countdownDOMNode.max = scanInterval;
    countdownDOMNode.value = scanInterval;
    backgroundScannerId = setInterval(function countdown() {
      if (intervalCount-- <= 0) {
        scanForNetworks();
        intervalCount = scanInterval;
      }
      countdownDOMNode.value = intervalCount; // update UI
    }, 1000);
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
      if (conf.useMocks) {
        listHandler(conf.mockNets);
        currentNets = conf.mockNets;
      }
      else {
        // Trigger initial scan (about 3.5s delay)
        scanForNetworks();
        startBackgroundScanner(document.getElementById('scancountdown'));
      }

      // Initialize the hidden network picker
      var node = document.getElementById('ssidList');
      SSIDPicker.init(node);
      //SSIDPicker.onSelect(function onSSIDSelect(ssid) { targetNetwork = ssid; });
      $('#saveSSIDButton').on('click', function() {
        targetNetwork = $( 'input:checked' ).val();
        setLevel(SSIDFinder.findSSID(targetNetwork, currentNets), conf.maxLevel);
        $('#ssidPicker').modal('hide');
      });

      $('#scancountdownContainer').on("click", function () {
        SSIDPicker.populate(currentNets);
        $('#ssidPicker').modal('show');
      });

      document.getElementById('meterContainer').appendChild(toMeter(0, 10));
    }
  };

  app.initialize();
})(document, $);
