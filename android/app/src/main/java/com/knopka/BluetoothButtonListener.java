package com.knopka;

import com.facebook.react.modules.core.DeviceEventManagerModule;

public class BluetoothButtonListener {

    public DeviceEventManagerModule.RCTDeviceEventEmitter emitter;

    public void onPressed() {
        if (emitter != null)
            emitter.emit("BLUETOOTH_PRESSED", null);
    }

}
