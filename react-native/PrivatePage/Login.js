import React, { Component } from 'react';
import {Text, View,StyleSheet,TextInput } from "react-native";
import { InputItem,List } from "@ant-design/react-native";
import Button from 'apsl-react-native-button'

import PropTypes from 'prop-types'
import Drawer from 'react-native-drawer'
import {TextInputLayout} from 'rn-textinputlayout';


const Item = List.Item;

export default class Login extends Component{
    static propTypes = {
        closeDrawer:PropTypes.func.isRequired,
        onUserLogin: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            username:"",
            password:"",
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    //??为什么他用箭头函数不行？？？？
    _onPressSubmit(){
        // console.log("state:");
        // console.log(this.state);
        this.props.onUserLogin(this.state.username);
        this.props.closeDrawer();
    };

    render(){
        return(
            <View style={styles.container}>
                <View style={{alignItems: "center", justifyContent: "center",}}>
                    <Text style={{fontSize:20,marginVertical:10}}>用户注册</Text>
                </View>
                <TextInputLayout
                    style={styles.inputLayout}
                    // checkValid={t => EMAIL_REGEX.test(t)}
                >
                    <TextInput
                        style={styles.textInput}
                        placeholder={'用户名'}
                        // onSubmitEditing={(event) => this.setState({username:event.nativeEvent.text})}
                        onChangeText={(value) => this.setState({username:value})}
                        value={this.state.username}
                    />
                </TextInputLayout>
                <TextInputLayout style={styles.inputLayout}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'密码'}
                        secureTextEntry={true}
                        // onSubmitEditing={(event) => this.setState({password:event.nativeEvent.text})}
                        onChangeText={(value) => this.setState({password:value})}
                        value={this.state.password}
                    />
                </TextInputLayout>
                <View style={styles.buttonLayout}>
                    <Button onPress={this._onPressSubmit.bind(this)} style={styles.button} textStyle={{fontSize: 18}}>
                        <Text style={{color:"white"}}>提交</Text>
                    </Button>
                    <Button onPress={this.props.closeDrawer} style={styles.button} textStyle={{fontSize: 18}}>
                        <Text style={{color:"white"}}>取消</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    textInput: {
        fontSize: 16,
        height: 40
    },
    inputLayout: {
        marginTop: 16,
        marginHorizontal: 36
    },
    buttonLayout:{
        marginVertical:30,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        paddingHorizontal:20,
        paddingVertical:10,
        marginHorizontal: 30,
        backgroundColor:"#33A3F4",
        borderWidth:0,
    }
});