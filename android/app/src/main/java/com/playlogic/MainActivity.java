package com.playlogic;

import com.facebook.react.ReactActivity;
import android.content.Intent;
import android.content.res.Configuration;
import org.devio.rn.splashscreen.SplashScreen; 
import android.os.Bundle;

import android.os.Bundle;
import android.view.View;

public class MainActivity extends ReactActivity {

  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);
      hideNavigationBar();
      super.onCreate(savedInstanceState);
  }

  @Override
  public void onWindowFocusChanged(boolean hasFocus) {
      super.onWindowFocusChanged(hasFocus);
      if (hasFocus) {
          hideNavigationBar();
      }
  }
  
  private void hideNavigationBar() {
      getWindow().getDecorView().setSystemUiVisibility(
          View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
          | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);

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
