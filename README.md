# Signal Strength Tracker App for Android

This is a small Cordova app for Android that tracks the signal strength of a given WiFi SSID.

The purpose of this project was for personal learning, more than anything else.


## Installing and running the app on a USB attached device

```./runOnAndroidDevice.sh```

## Debug app on device

The easiset way to debug/inspect your app, running on the device is by using the Chrome inspector.
The device has to be in Developer Mode and attached via USB.

[Chrome device debugger](chrome://inspect/#devices)


## Limitations

- The app does not work with new Android devices, due to the new permission handling in Android 6 "Marshmallow"
- The app does not work on iOS, since the WiFi scanning API:s are private on iOS

