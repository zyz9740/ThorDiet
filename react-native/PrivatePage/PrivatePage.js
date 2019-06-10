import React, { Component } from 'react';
import {Image, StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View} from "react-native";
import {Icon, List} from "@ant-design/react-native";
import PropTypes from 'prop-types'
import Drawer from 'react-native-drawer'
import Button from 'apsl-react-native-button'
import { withNavigation } from 'react-navigation';



import Login from "./Login"
import Statistics from "./Statistics"

const Item = List.Item;

class PrivatePage extends Component{
    static propTypes = {
        recordList: PropTypes.object.isRequired,
        calorieLeft: PropTypes.number.isRequired,
        onUserLogin: PropTypes.func.isRequired,
        username:   PropTypes.string.isRequired,
        openStatistics: PropTypes.func.isRequired,
        openLogin:PropTypes.func.isRequired,
        openRegister:PropTypes.func.isRequired,
    };


    constructor(props){
        super(props);
        this.state = {
            username:this.props.username,
            isLogin: false,
        }
    }

    onUserLogin = (username) => {
        this.setState({
            username:username,
            isLogin: true,
        });
        this.props.onUserLogin(username);
        // console.log(this.state);

    };

    onUserRegister = (username) => {
        console.log("Register success")
        this.setState({
            username:username,
            isLogin: true,
        });
        this.props.onUserLogin(username);
    }

    openStatistics = () =>{
        // console.log(this.props);
        this.props.openStatistics();
    };

    openRegister = () => {
        this.props.navigation.push("Register",{
            onUserRegister: this.onUserRegister,
        })
    }

    openLogin = () => {
        // console.log(this.props)
        // this.props.openRegister(this.onUserRegister)
        this.props.navigation.push("Login",{
            onUserLogin: this.onUserLogin,
        })
    }

    render(){
        return(
            <View>
                <View style={styles.topBar}>
                    <Text style={{color:"#33A3F4"}}>占位</Text>
                    <Text style={{color:"white"}}>我的</Text>
                    <Icon name={"setting"} color={"white"}/>
                </View>
                <View style={styles.avatar}>
                    <Image style={styles.roundImage} source={require("../../images/fatThor.png")} />
                    {this.state.isLogin ?
                        // 如果已经登陆
                        <Text style={{marginTop: 30, color: "white"}}>{this.state.username}</Text> :
                        //如果没有登陆
                        <View style={{flexDirection: "row",marginVertical:15, alignItems:"center"}}>
                            <Button onPress={this.openLogin} style={styles.button}
                                    textStyle={{fontSize: 18}}>
                                <Text style={{color: "#33A3F4"}}>登陆</Text>
                            </Button>
                            <Button onPress={this.openRegister} style={styles.button}
                                    textStyle={{fontSize: 18}}>
                                <Text style={{color: "#33A3F4"}}>注册</Text>
                            </Button>
                        </View>
                    }
                </View>
                <View>
                    <List>
                        <Item
                            thumb={
                                <Image source={require('../../images/imageLeft.png')}
                                       style={{height:20,width:20,marginRight:20}}
                                       resizeMode={"contain"}/>}
                            arrow="horizontal"
                            key="1"
                            onPress={this.openStatistics}
                        >
                            每日计划
                        </Item>
                        <Item
                            thumb={
                                <Image source={require('../../images/imageLeft.png')}
                                       style={{height:20,width:20,marginRight:20}}
                                       resizeMode={"contain"}/>}
                            arrow="horizontal"
                            key="2"
                        >
                            关于我们
                        </Item>
                        <Item
                            thumb={
                                <Image source={require('../../images/imageLeft.png')}
                                       style={{height:20,width:20,marginRight:20}}
                                       resizeMode={"contain"}/>}
                            arrow="horizontal"
                            key="3"
                        >
                            不知道填什么
                        </Item>
                    </List>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topBar:{
        height: 40,
        flexDirection: "row",
        backgroundColor:"#33A3F4",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 30
    },
    roundImage: {
        height:75,
        width:75,
        borderRadius: 75,
        backgroundColor:"white"
    },
    avatar:{
        backgroundColor:"#33A3F4",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 180,
        flexDirection: "column",
        paddingTop: 10
    },
    button:{
        paddingHorizontal:20,
        // paddingVertical:10,
        marginHorizontal: 30,
        backgroundColor:"white",
        borderWidth:0,
    }
});

export default withNavigation(PrivatePage)