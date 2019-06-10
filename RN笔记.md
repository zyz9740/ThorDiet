# react-native 笔记

### 组件与AppRegistry

> 上面的代码定义了一个名为`HelloWorldApp`的新的`组件（Component）`，并且使用了名为`AppRegistry`的内置模块进行了“注册”操作。你在编写React Native应用时，肯定会写出很多新的组件。而一个App的最终界面，其实也就是各式各样的组件的组合。组件本身结构可以非常简单——唯一必须的就是在`render`方法中返回一些用于渲染结构的JSX语句。
>
> `AppRegistry`模块则是用来告知React Native哪一个组件被注册为整个应用的根容器。你无需在此深究，因为一般在整个应用里`AppRegistry.registerComponent`这个方法只会调用一次。上面的代码里已经包含了具体的用法，你只需整个复制到`index.ios.js`或是`index.android.js`文件中即可运行。

**AppRegistry.registerComponent** 注册组件

- 参数一：Appkey应用的名称，

- 参数二：组件的名称；

- 将组件Setup作为应用的根容器 
  AppRegistry.registerComponent(‘maApp’, () => Setup) 

- 也可以注册不同的入口组件 
  AppRegistry.registerComponent(‘login’, () => Login) 

  AppRegistry.registerComponent(‘maApp’, () => Setup)

### 调试技巧

查看console.log的信息：

```
react-native log-android
```

安卓机掉线但是不用重新编译：

```
adb reverse tcp:8081 tcp:8081
```

### 编写原生应用的过程

- 在主Java文件夹里面（就是MainActivity.java所在的文件夹）定义**XXXModule**编写业务逻辑的代码。并且在getName方法里面返回这个Module的名字

  ```
   @Override
    public String getName() {
      return "XXXXName";
    }
  ```

- 同目录下编写**ReactPackage**类，add进去刚才编写的**XXXModule**类

- 在MainApplication的getPackage方法里面添加进去**ReactPackage**类

- 在JS中添加JS文件：

  ```
  import { NativeModules } from 'react-native';
  
  export default NativeModules.XXXXName;
  ```

- 在需要的地方引用这个**XXXXName**即可



**需要注意的是添加完原生组件之后是要重新编译的！！**



### react-native-camera API

https://github.com/react-native-community/react-native-camera/blob/master/docs/RNCamera.md

使用：https://www.jianshu.com/p/7b67c7ef945d

- **flashMode**（是否开闪光灯）

  - `RNCamera.Constants.FlashMode.off` turns it off.（关闭）

  - `RNCamera.Constants.FlashMode.on` means camera will use flash in all photos taken.（开启闪光灯）

  - `RNCamera.Constants.FlashMode.auto` leaves your phone to decide when to use flash when taking photos, based on the lightning conditions that the camera observes.（自动）

  - `RNCamera.Constants.FlashMode.torch` turns on torch mode, meaning the flash light will be turned on all the time (even before taking photo) just like a flashlight.（手电筒）

- **type**（前后摄像头）

  - `RNCamera.Constants.Type.front`
  - `RNCamera.Constants.Type.back`

## RN容易错的坑

- 箭头函数一定要注意一下
- componentWillmount是在render之前，如果要出实话数据的话使用Will而不是Did，在did中初始化数据会render两遍

![12131557749077_.pic_hd](https://ws1.sinaimg.cn/large/006tNc79gy1g2zy0nuwcvj30u01hc7ma.jpg)

- 上面这个报错是我在render里面添加了setState语句后出现的问题，意思是不希望你在render里面添加setState，怕无限循环。所以我们这时候要想别的办法来搞定render的事情

- 带参数的箭头函数：

### 报错处理

##### 1、method does not override method from its superclass

- 去掉 @override（这也太鬼畜了吧）

##### 2、找不到图片路径

- 少年，用require啊！

  ```
  icon={require("../images/home.png")}
  ```

  