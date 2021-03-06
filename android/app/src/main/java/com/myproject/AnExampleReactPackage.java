package com.myproject;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class AnExampleReactPackage implements ReactPackage {

//  //@Override
//  public List<Class<? extends JavaScriptModule>> createJSModules() {
//    return Collections.emptyList();
//  }

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<NativeModule> createNativeModules(
          ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    //小提示
    modules.add(new ToastModule(reactContext));
    //封面图
    modules.add(new ModuleHideSplash(reactContext));
    //保存图片
    modules.add(new ImageToGallery(reactContext));

    return modules;
  }
}