package com.test;

import android.os.Build;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class DeviceInfoModule extends ReactContextBaseJavaModule {

DeviceInfoModule(ReactApplicationContext context) {
super(context);
}

@Override
public String getName() {
return "DeviceInfo";
}

@ReactMethod
public void getDeviceName(Promise promise) {
try {
String deviceName = Build.MODEL; // Get the device model name
promise.resolve(deviceName);
} catch (Exception e) {
promise.reject("Error", e);
}
}
}
