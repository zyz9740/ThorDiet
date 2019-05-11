import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

import ListPage from "./ListPage"
import Camera from "./Camera"
import ImageShow from "./ImageShow"

const AppNavigator = createStackNavigator(
    {
        Home: ListPage,
        Camera: Camera,
        ImageShow:ImageShow,
    },
    {
        initialRouteName: "Home",
        headerMode:"none"
    }
);


const AppContainer = createAppContainer(AppNavigator);

export default class ListPageNavigator extends React.Component {
    render() {
        return <AppContainer />;
    }
}