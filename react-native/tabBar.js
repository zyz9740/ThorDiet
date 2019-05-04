import React from 'react';
import { Text, View, NativeModules } from 'react-native';
import { Icon, SearchBar, TabBar, Button } from '@ant-design/react-native';

import HomePage from "./HomePage/HomePage"
import ListPageNavigator from "./ListPage/ListPageNavigator"
import PrivatePage from "./PrivatePage/PrivatePage"

export default class BasicTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
    };
  }

  componentDidMount() {
      NativeModules.SplashScreen.hide();
  }

  onChangeTab(tabName) {
  	console.log("****");
    this.setState({
      selectedTab: tabName,
    });
  }
  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="#f5f5f5"
      >
        <TabBar.Item
          title="主页"
          icon={require("../images/home.png")}
          selectedIcon={require("../images/homeColored.png")}
          selected={this.state.selectedTab === 'home'}
          onPress={() => this.onChangeTab('home')}
        >
          <HomePage />
        </TabBar.Item>
        <TabBar.Item
            icon={require("../images/meal.png")}
            selectedIcon={require("../images/mealColored.png")}
            title="正餐"
            selected={this.state.selectedTab === 'meal'}
            onPress={this.onChangeTab.bind(this,'meal')}
        >
          <ListPageNavigator />
        </TabBar.Item>
        <TabBar.Item
          icon={require("../images/food.png")}
          selectedIcon={require("../images/foodColored.png")}
          title="加餐"
          selected={this.state.selectedTab === 'food'}
          onPress={this.onChangeTab.bind(this,'food')}
        >
          <ListPageNavigator />
        </TabBar.Item>
        <TabBar.Item
          icon={require("../images/sport.png")}
          selectedIcon={require("../images/sportColored.png")}
          title="运动"
          selected={this.state.selectedTab === 'sport'}
          onPress={() => this.onChangeTab('sport')}
        >
          <ListPageNavigator />
        </TabBar.Item>
        <TabBar.Item
          icon={require("../images/person.png")}
          selectedIcon={require("../images/personColored.png")}
          title="我的"
          selected={this.state.selectedTab === 'person'}
          onPress={() => this.onChangeTab('person')}
        >
          <PrivatePage />
        </TabBar.Item>
      </TabBar>
    );
  }
}