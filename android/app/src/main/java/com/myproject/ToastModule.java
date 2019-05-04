package com.myproject;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class ToastModule extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public ToastModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  //这里我们把这个模块叫做ToastAndroidTest，这样就可以在JavaScript中通过React.NativeModules.ToastAndroidTest访问到这个模块。
  @Override
  public String getName() {
    return "ToastAndroidTest";
  }

  //一个可选的方法getContants返回了需要导出给JavaScript使用的常量。它
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  //要导出一个方法给JavaScript使用，Java方法需要使用注解@ReactMethod。
  //方法的返回类型必须为void。React Native的跨语言访问是异步进行的，所以想要给JavaScript返回一个值的唯一办法是使用回调函数或者发送事件（参见下文的描述）。
  @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }

}