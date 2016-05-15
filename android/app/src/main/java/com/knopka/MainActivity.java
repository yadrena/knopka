package com.knopka;

import android.os.Bundle;
import android.view.KeyEvent;
import com.facebook.react.ReactActivity;
import com.oney.gcm.GcmPackage;
import com.devstepbcn.wifi.AndroidWifiPackage;
import com.remobile.splashscreen.RCTSplashScreenPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.remobile.splashscreen.*;

import java.util.Arrays;
import java.util.List;
import com.devstepbcn.wifi.AndroidWifiPackage;

public class MainActivity extends ReactActivity {
    //BluetoothButtonListener listener;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //takeKeyEvents(true);
    }

    /*
    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        //This is phone button
        //KeyEvent { action=ACTION_UP, keyCode=KEYCODE_VOLUME_UP, scanCode=115, metaState=0, flags=0x8, repeatCount=0, eventTime=127185805, downTime=127185535, deviceId=8, source=0x101 }
        //This is remote shutter button
        //KeyEvent { action=ACTION_UP, keyCode=KEYCODE_VOLUME_UP, scanCode=115, metaState=0, flags=0x8, repeatCount=0, eventTime=127095596, downTime=127095303, deviceId=20, source=0x101 }
        if (keyCode == KeyEvent.KEYCODE_VOLUME_UP && listener != null){
            listener.onPressed();
            return true;
        }
        return super.onKeyUp(keyCode, event);
    }
    */

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "knopka";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        //listener = new BluetoothButtonListener();
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new GcmPackage(),
            new AndroidWifiPackage(),
            //new BluetoothShutterPackage(listener),
            new RCTSplashScreenPackage(this)
        );
    }
}
