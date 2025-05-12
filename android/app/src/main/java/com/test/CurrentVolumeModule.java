package com.test;

import android.content.Context;
import android.media.AudioManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CurrentVolumeModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public CurrentVolumeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CurrentVolume";
    }

    @ReactMethod
    public void getCurrentVolume(Promise promise) {
        try {
            AudioManager audioManager = (AudioManager) reactContext.getSystemService(Context.AUDIO_SERVICE);
            int currentVolume = audioManager.getStreamVolume(AudioManager.STREAM_MUSIC);
            promise.resolve(currentVolume);
        } catch (Exception e) {
            promise.reject("VOLUME_ERROR", "Failed to get current volume", e);
        }
    }
    @ReactMethod
public void setMediaVolume(int volume, Promise promise) {
    try {
        AudioManager audioManager = (AudioManager) reactContext.getSystemService(Context.AUDIO_SERVICE);
        int maxVolume = audioManager.getStreamMaxVolume(AudioManager.STREAM_MUSIC);
        
        // Clamp the volume to valid range
        int newVolume = Math.max(0, Math.min(volume, maxVolume));
        
        audioManager.setStreamVolume(AudioManager.STREAM_MUSIC, newVolume, 0);
        promise.resolve("Volume set to " + newVolume);
    } catch (Exception e) {
        promise.reject("SET_VOLUME_ERROR", "Failed to set volume", e);
    }
}

}
