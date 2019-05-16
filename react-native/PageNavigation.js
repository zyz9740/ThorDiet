import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

import BasicTabBar from "./tabBar"
import Camera from "./ListPage/Camera"
import ImageShow from "./ListPage/ImageShow"
import ListPage from "./ListPage/ListPage"
import Statistics from "./PrivatePage/Statistics"

const AppNavigator = createStackNavigator(
    {
        Home: BasicTabBar,
        ListPage: ListPage,
        Camera: Camera,
        ImageShow:ImageShow,
        Statistics: Statistics,
    },
    {
        initialRouteName: "Home",
        headerMode:"none"
    }
);


const AppContainer = createAppContainer(AppNavigator);

export default class PageNavigation extends React.Component {
    render() {
        return <AppContainer />;
    }
}