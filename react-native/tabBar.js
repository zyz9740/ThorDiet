import React from 'react';
import { Text, View, NativeModules } from 'react-native';
import { Icon, SearchBar, TabBar, Button } from '@ant-design/react-native';

import HomePage from "./HomePage/HomePage"
import ListPageNavigator from "./ListPage/ListPageNavigator"
import PrivatePage from "./PrivatePage/PrivatePage"
import MealPage from "./ListPage/MealPage"
import SnacksPage from "./ListPage/SnacksPage"
import SportsPage from "./ListPage/SportsPage"

export default class BasicTabBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      recordList:{
        breakfast:[{name:"米饭",calorie:23}],
        lunch:[{name:"米饭",calorie:23}],
        dinner:[{name:"米饭",calorie:23}],
        snacks:[{name:"米饭",calorie:23}],
        sports:[{name:"米饭",calorie:23}],
      },
      calorieLeft:0,
      userName:"未登录",
    };
  }

  componentDidMount() {
      NativeModules.SplashScreen.hide();
  }

  onChangeTab(tabName) {
  	// console.log(this.state);
    this.setState({
      selectedTab: tabName,
    });
  }

  _onChangeBreakfast(){

  }

  _onChangeLunch(){

  }

  _onChangeDinner(){

  }

  _onChangeCalorieLeft(value){
    this.setState({
      calorieLeft:value,
    })
  }

  onUserLogin(username){
    this.setState({username:username});
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
          <HomePage
            recordList={this.state.recordList}
            calorieLeft={this.state.calorieLeft}
            onChangeCalorieLeft={() => this._onChangeCalorieLeft}/>
        </TabBar.Item>
        <TabBar.Item
            icon={require("../images/meal.png")}
            selectedIcon={require("../images/mealColored.png")}
            title="正餐"
            selected={this.state.selectedTab === 'meal'}
            onPress={this.onChangeTab.bind(this,'meal')}
        >
          <MealPage/>
        </TabBar.Item>
        <TabBar.Item
          icon={require("../images/food.png")}
          selectedIcon={require("../images/foodColored.png")}
          title="加餐"
          selected={this.state.selectedTab === 'food'}
          onPress={this.onChangeTab.bind(this,'food')}
        >
          <SnacksPage />
        </TabBar.Item>
        <TabBar.Item
          icon={require("../images/sport.png")}
          selectedIcon={require("../images/sportColored.png")}
          title="运动"
          selected={this.state.selectedTab === 'sport'}
          onPress={() => this.onChangeTab('sport')}
        >
          <SportsPage />
        </TabBar.Item>
        <TabBar.Item
          icon={require("../images/person.png")}
          selectedIcon={require("../images/personColored.png")}
          title="我的"
          selected={this.state.selectedTab === 'person'}
          onPress={() => this.onChangeTab('person')}
        >
          <PrivatePage calorieLeft={this.state.calorieLeft}
                        recordList={this.state.recordList}
                        onUserLogin={() => this.onUserLogin}/>
        </TabBar.Item>
      </TabBar>
    );
  }
}