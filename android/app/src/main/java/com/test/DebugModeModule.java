package com.test; // Make sure this matches your app's package

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.test.BuildConfig; // <-- This is the important part

public class DebugModeModule extends ReactContextBaseJavaModule {

    public DebugModeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "DebugMode";
    }

    @ReactMethod
    public void isDebugMode(Callback successCallback) {
        boolean isDebug = BuildConfig.DEBUG;
        successCallback.invoke(isDebug);
    }
}
