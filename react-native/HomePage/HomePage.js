import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableHighlight,
		NativeModules, Image, ScrollView }
		from 'react-native';
import { Button, WhiteSpace, WingBlank, Icon } from '@ant-design/react-native';

import MyCalendar from "./MyCalendar";
import ToastAndroidTest from './ToastAndroidTest';
import MealList from "./MealList"


class HomePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			calendarDisplay: "none",
		}
	}

  toastAction(){
  	console.log("Press");
  	ToastAndroidTest.show('Awesome', ToastAndroidTest.SHORT);
  }


  _onPressDateSelector = () => {
	if(this.state.calendarDisplay === "none") {
		this.setState({calendarDisplay: "flex"});
	}else{
		this.setState({calendarDisplay: "none"});
	}
	console.log(this.state);
  };

  render() {
    return (
		<ScrollView
			style={{ flex: 1 }}
			showsVerticalScrollIndicator={true}
		>
			<View style={styles.topBar}>
				<TouchableHighlight onPress={this._onPressDateSelector}>
					<View style={styles.dateSelector}>
						<Text style={{color:"white",marginRight:5}}>今天</Text>
						<Icon name={"caret-down"} size={"xxs"} color={"white"}/>
					</View>
				</TouchableHighlight>
				{/*<Icon name={"down-circle"} color={"white"}/>*/}
			</View>
			{this.state.calendarDisplay === "none"? (null):(<MyCalendar />)}
			<View style={styles.statistics}>
				<View style={styles.inAndout}>
					<Image style={styles.smallImage} source={require('../../images/imageLeft.png')}
						   resizeMode={"contain"}/>
						   <Text>摄入</Text>
				</View>
				<View style={styles.visualization}>
					<Image style={styles.bigImage} source={require('../../images/fatThor.png')}
						   resizeMode={"contain"}/>
					<Text>还可摄入：1730 KJ</Text>
				</View>
				<View style={styles.inAndout}>
					<Image style={styles.smallImage} source={require('../../images/imageRight.png')}
						   resizeMode={"contain"}/>
					<Text>消耗</Text>
				</View>
			</View>
			<View>
				<MealList />
			</View>
		</ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	topBar:{
		height: 60,
		flexDirection: "row",
		backgroundColor:"#33A3F4",
		justifyContent: "center",
		alignItems: "center"
	},
	dateSelector:{
		backgroundColor: "rgba(0,0,0,0.17)"	,
		flexDirection: "row",
		paddingTop:5,
		paddingBottom: 5,
		paddingLeft: 30,
		paddingRight:30,
		borderRadius: 25,
		justifyContent: "center",
		alignItems: "center",
	},
	mainView:{
	},
	statistics:{
		backgroundColor:"#33A3F4",
		justifyContent: "center",
		alignItems: "center",
		height: 200,
		flexDirection: "row",
	},
	visualization:{
		flex:3,
		flexDirection:"column",
		justifyContent: "center",
		alignItems: "center",
		margin: 20,
	},
	inAndout:{
		flex: 1,
		flexDirection:"column",
		justifyContent: "center",
		alignItems: "center",
		margin: 20,
	},
	smallImage:{
		height: 50,
		marginBottom: 20,
	},
	bigImage:{
		height: 150,
		marginBottom: 20,
	},
	list:{

	},


});

export default HomePage;