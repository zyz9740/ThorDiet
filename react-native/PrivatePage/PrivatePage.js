import React, { Component } from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {List,Button} from "@ant-design/react-native";
import PropTypes from 'prop-types'
import Drawer from 'react-native-drawer'

import Login from "./Login"
// import Statistics from "./Statistics"

const Item = List.Item;

export default class PrivatePage extends Component{
    static propTypes = {
        recordList: PropTypes.object.isRequired,
        calorieLeft: PropTypes.number.isRequired,
        onUserLogin: PropTypes.func.isRequired,
        username:   PropTypes.string.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            username:this.props.username,
        }
    }

    _openDrawer = () => {
        console.log("open drawer");
        this.drawer.open();
    };

    _closeDrawer = () => {
        this.drawer.close();
    };

    onUserLogin(username){
        this.setState({username:username});
        this.props.onUserLogin(username);
        console.log(this.state);

    };

    render(){
        return(
            <Drawer
                ref={(ref) => this.drawer = ref}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={0} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({
                    main: { opacity:ratio?0:1 }
                })}
                content={<Login closeDrawer={this._closeDrawer}
                                onUserLogin={(username) => this.onUserLogin(username)}/>}
                initializeOpen={false}
                side={"bottom"}
            >
                <TouchableWithoutFeedback onPress={this._openDrawer}>
                    <View style={styles.avatar}>
                        <Image style={styles.roundImage} source={require("../../images/fatThor.png")} />
                        <Text style={{marginTop: 30,color:"white"}}>{this.state.username}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <List>
                        <Item
                            thumb={
                                <Image source={require('../../images/imageLeft.png')}
                                       style={{height:20,width:20,marginRight:20}}
                                       resizeMode={"contain"}/>}
                            arrow="horizontal"
                            key="1"
                            // onPress={this._openDrawer}
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
            </Drawer>
        )
    }
}

const styles = StyleSheet.create({
    roundImage: {
        height:75,
        width:75,
        borderRadius: 75,
        backgroundColor:"white"
    },
    avatar:{
        backgroundColor:"#33A3F4",
        justifyContent: "center",
        alignItems: "center",
        height: 200,
        flexDirection: "column",
    },

});