/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import React, { Component } from 'react';


// 注意，这里用引号括起来的'HelloWorldApp'必须和你init创建的项目名一致

AppRegistry.registerComponent(appName, () => App);
