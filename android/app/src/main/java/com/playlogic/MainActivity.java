package com.playlogic;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.content.res.Configuration;
import org.devio.rn.splashscreen.SplashScreen; 
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);
      super.onCreate(savedInstanceState);
  }

  @Override
  public void onConfigurationChanged(Configuration newConfig) {
  super.onConfigurationChanged(newConfig);
  Intent intent = new Intent("onConfigurationChanged");
  intent.putExtra("newConfig", newConfig);
  this.sendBroadcast(intent);
 }
  @Override
  protected String getMainComponentName() {
    return "playlogic";
  }
}
