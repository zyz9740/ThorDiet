import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation/typescript/react-navigation';

import ListPage from "../ListPage/ListPage"
import Camera from "../ListPage/Camera"
import ImageShow from "../ListPage/ImageShow"
import MealPage from "./MealPage"
import SnacksPage from "./SnacksPage"

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