package com.test;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.test.DeviceInfoPackage; // Import the package

public class MainApplication extends Application implements ReactApplication {

private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
@Override
public boolean getUseDeveloperSupport() {
return BuildConfig.DEBUG;
}

@Override
protected List getPackages() {
return Arrays.asList(
new MainReactPackage(),
new DeviceInfoPackage() // Register the package here
);
}

@Override
protected String getJSMainModuleName() {
return "index";
}
};
}
