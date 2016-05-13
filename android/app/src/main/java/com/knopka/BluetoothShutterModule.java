package com.knopka;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;


public class BluetoothShutterModule extends ReactContextBaseJavaModule {

    private final BluetoothButtonListener buttonListener;
    private final ReactApplicationContext reactContext;

    public BluetoothShutterModule(ReactApplicationContext reactContext, BluetoothButtonListener buttonListener) {
        super(reactContext);
        this.buttonListener = buttonListener;
        this.reactContext = reactContext;
    }

    @ReactMethod
    public void init(){
        this.buttonListener.emitter = this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);
    }

    @Override
    public String getName() {
        return "BluetoothShutter";
    }

}
