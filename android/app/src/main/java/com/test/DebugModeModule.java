import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class DebugModeModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;

    public DebugModeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "DebugModeModule";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean isDebugModeEnabled() {
        return BuildConfig.DEBUG;
    }

    @ReactMethod
    public void getDeviceInfo(Callback successCallback) {
        try {
            String deviceInfo = android.os.Build.MANUFACTURER + " " + 
                                android.os.Build.MODEL + 
                                " (Android " + android.os.Build.VERSION.RELEASE + ")";
            successCallback.invoke(deviceInfo, BuildConfig.DEBUG);
        } catch (Exception e) {
            successCallback.invoke("Unknown Device", false);
        }
    }
}
