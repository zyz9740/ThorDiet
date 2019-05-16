import React from 'react';
import { Text, View, NativeModules } from 'react-native';
import { Icon, SearchBar, TabBar, Button } from '@ant-design/react-native';

import HomePage from "./HomePage/HomePage"
import PrivatePage from "./PrivatePage/PrivatePage"
import ListPage from "./ListPage/ListPage"


export default class BasicTabBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'home',
        // recordList:{
          breakfast:[],
          lunch:[],
          dinner:[],
          snacks:[],
          sports:[],
        // },
        calorieLeft:0,
        username:"未登录",
      };
    }

    componentDidMount() {
        NativeModules.SplashScreen.hide();
    }

    onChangeTab(tabName) {
      console.log(this.state);
      this.setState({
        selectedTab: tabName,
      });
    }

    _onChangeFoodList = (record) => {
        console.log("record");
        console.log(record);
        let mealType = record.mealType;
        let pushList = [];
        switch (mealType) {
          case "早餐":
            pushList = this.state.breakfast;
            break;
          case "午餐":
            pushList = this.state.lunch;
            break;
          case "晚餐":
            pushList = this.state.dinner;
            break;
          case "零食":
            pushList = this.state.snacks;
            break;
          case "运动":
            pushList = this.state.sports;
            break;
          default:console.log("**************");
        }
        let i;
        for(i=0;i<pushList.length;i++){
          if(pushList[i].name === record.name && pushList[i].unitName === record.unitName){
              pushList[i].calorie += record.calorie;
              pushList[i].quantity += record.quantity;
              break;
          }
        }
        //如果list里面没有或者单位不匹配
        if(i === pushList.length){
          pushList.push(record);
        }
        console.log("pushList:");
        console.log(pushList);
        switch (mealType) {
            case "早餐":
              this.setState({breakfast:pushList});
              break;
            case "午餐":
              this.setState({lunch:pushList});
              break;
            case "晚餐":
              this.setState({dinner:pushList});
              break;
            case "零食":
              this.setState({snacks:pushList});
              break;
            case "运动":
              this.setState({sports:pushList});
              break;
            default:console.log("**************");

        }
          console.log(this.state);
    };

    _onChangeCalorieLeft(value){
      this.setState({
        calorieLeft:value,
      })
    }

    openCamera = () => {
        this.props.navigation.push('Camera')
    };

    openStatistics = () => {
        this.props.navigation.push('Statistics')
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
              // recordList={this.state.recordList}
                recordList={{
                  breakfast:this.state.breakfast,
                  lunch:this.state.lunch,
                  dinner:this.state.dinner,
                  snacks:this.state.snacks,
                  sports:this.state.sports,
                }}
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
            {/*<MealPage addFood={this._onChangeFoodList}/>*/}
            <ListPage addFood={this._onChangeFoodList}
                      mealType=""
                      haveCamera={true}
                      havePicker={true}
                      foodListURL={"test.php"}
                      openCamera={this.openCamera}/>
          </TabBar.Item>
          <TabBar.Item
            icon={require("../images/food.png")}
            selectedIcon={require("../images/foodColored.png")}
            title="加餐"
            selected={this.state.selectedTab === 'food'}
            onPress={this.onChangeTab.bind(this,'food')}
          >
            {/*<SnacksPage addFood={this._onChangeFoodList}/>*/}
              <ListPage addFood={this._onChangeFoodList}
                        mealType="零食"
                        haveCamera={true}
                        havePicker={false}
                        foodListURL={"test.php"}
                        openCamera={this.openCamera} />
          </TabBar.Item>
          <TabBar.Item
            icon={require("../images/sport.png")}
            selectedIcon={require("../images/sportColored.png")}
            title="运动"
            selected={this.state.selectedTab === 'sport'}
            onPress={() => this.onChangeTab('sport')}
          >
            {/*<SportsPage addFood={this._onChangeFoodList}/>*/}
            <ListPage addFood={this._onChangeFoodList}
                      mealType="运动"
                      haveCamera={false}
                      havePicker={false}
                      foodListURL={"test.php"} />
          </TabBar.Item>
          <TabBar.Item
            icon={require("../images/person.png")}
            selectedIcon={require("../images/personColored.png")}
            title="我的"
            selected={this.state.selectedTab === 'person'}
            onPress={() => this.onChangeTab('person')}
          >
            <PrivatePage calorieLeft={this.state.calorieLeft}
                         recordList={{
                           breakfast:this.state.breakfast,
                           lunch:this.state.lunch,
                           dinner:this.state.dinner,
                           snacks:this.state.snacks,
                           sports:this.state.sports,
                         }}
                         onUserLogin={(username) => this.onUserLogin(username)}
                         username={this.state.username}
                         openStatistics={this.openStatistics}/>
          </TabBar.Item>
        </TabBar>
      );
    }
}