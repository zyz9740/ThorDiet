import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

import BasicTabBar from "./tabBar"
import Camera from "./ListPage/Camera"
import ImageShow from "./ListPage/ImageShow"
import ListPage from "./ListPage/ListPage"
import PrivatePage from "./PrivatePage/PrivatePage"
import Statistics from "./PrivatePage/Statistics"
import Login from "./PrivatePage/Login"
import Register from "./PrivatePage/Register"
import ChoosePage from "./ListPage/ChoosePage";

const AppNavigator = createStackNavigator(
    {
        Home: BasicTabBar,
        ListPage: ListPage,
        Camera: Camera,
        ImageShow:ImageShow,
        Statistics: Statistics,
        Login: Login,
        Register: Register,
        PrivatePage: PrivatePage,
        ChoosePage: ChoosePage
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