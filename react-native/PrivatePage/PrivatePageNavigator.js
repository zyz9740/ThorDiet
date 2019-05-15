import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

import PrivatePage from "./PrivatePage"
import Statistics from "./Statistics"

const AppNavigator = createStackNavigator(
    {
        Home: PrivatePage,
        Statistics:Statistics,
    },
    {
        initialRouteName: "Home",
        headerMode:"none"
    }
);


const AppContainer = createAppContainer(AppNavigator);

export default class PrivatePageNavigator extends React.Component {
    render() {
        return <AppContainer />;
    }
}