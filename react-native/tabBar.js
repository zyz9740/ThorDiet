import React from 'react';
import { Text, View } from 'react-native';
import { Icon, SearchBar, TabBar, Button } from '@ant-design/react-native';

import HomePage from "./HomePage/HomePage"
import ListPage from "./ListPage/ListPage"

export default class BasicTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
    };
  }
  renderContent(pageText) {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ margin: 50 }}>{pageText}</Text>
        <Button onPress={this.onChangeTab.bind(this,'redTab')}>default</Button>
      </View>
    );
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
          selected={this.state.selectedTab === 'blueTab'}
          onPress={() => this.onChangeTab('blueTab')}
        >
          <HomePage />
        </TabBar.Item>
        <TabBar.Item
          icon={require("../images/food.png")}
          selectedIcon={require("../images/foodColored.png")}
          title="加餐"
          selected={this.state.selectedTab === 'redTab'}
          onPress={this.onChangeTab.bind(this,'redTab')}
        >
          <ListPage />
        </TabBar.Item>
        <TabBar.Item
          icon={require("../images/sport.png")}
          selectedIcon={require("../images/sportColored.png")}
          title="运动"
          selected={this.state.selectedTab === 'greenTab'}
          onPress={() => this.onChangeTab('greenTab')}
        >
          <ListPage />
        </TabBar.Item>
        <TabBar.Item
          icon={require("../images/person.png")}
          selectedIcon={require("../images/personColored.png")}
          title="我的"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => this.onChangeTab('yellowTab')}
        >
          <ListPage />
        </TabBar.Item>
      </TabBar>
    );
  }
}