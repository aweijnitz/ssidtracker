var conf = {
  maxLevel: 10,
  useMocks: true,
  mockNets: [
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
  ]
};