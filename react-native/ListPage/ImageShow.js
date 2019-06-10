import React, { Component } from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {ActivityIndicator,} from '@ant-design/react-native';
import Button from 'apsl-react-native-button'
import ToastAndroidTest from "./ToastAndroidTest";
import ImageToGallery from "./ImageToGallery"

const webRoot = "http://111.230.68.239:8000/api/";

export default class ImageShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animating: false,
            mealType:"",
        }
    }

    componentWillMount() {
        console.log("now:"+this.props.navigation.getParam('imageURI'));
        //console.log("now:"+this.props.navigation.getParam('base64'));
        let mealType = "零食";
        if(this.props.navigation.getParam('mealType') !== "零食"){
            mealType = "正餐"
        }
        this.setState({
            mealType: mealType
        })
    }

    foodRecognize(){
        Promise.race([
            fetch(webRoot + "image", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image:this.props.navigation.getParam('base64'),
                    type:this.state.mealType,
                })

            }),
            new Promise(function(resolve,reject){
                setTimeout(()=> reject(new Error('request timeout')),10000) //设置10s超时时间
            })
        ]).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ animating: !this.state.animating });
                console.log(responseJson);
                if(responseJson[0].name === "非菜"){
                    ToastAndroidTest.show("没有监测到菜品", ToastAndroidTest.LONG);
                    this.props.navigation.goBack();
                }else {
                    this.props.navigation.push('ChoosePage', {
                        mealType: this.props.navigation.state.params.mealType,
                        addFood: this.props.navigation.state.params.addFood,
                        foodList: responseJson,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                ToastAndroidTest.show("提交超时", ToastAndroidTest.SHORT);
            });
    }

    tableRecognize(){
        this.closeTimer = setTimeout(() => {
            this.setState({ animating: !this.state.animating });
            this.props.navigation.push('ChoosePage',{
                mealType: this.props.navigation.state.params.mealType,
                addFood: this.props.navigation.state.params.addFood,
            });
        },2000);
    }

    _onPressSubmit = () => {
        let ImageURI = this.props.navigation.getParam('imageURI');
        console.log(ImageURI);

        //网络请求
        this.setState({ animating: !this.state.animating });
        if(this.state.mealType === "正餐"){
            this.foodRecognize();
        }else{
            this.tableRecognize();
        }
        //网络请求
        // this.closeTimer = setTimeout(() => {
        //     this.setState({ animating: !this.state.animating });
        //     this.props.navigation.push('ChoosePage',{
        //         mealType: this.props.navigation.state.params.mealType,
        //         addFood: this.props.navigation.state.params.addFood,
        //     });
        // },2000);

    };

    render(){
        return(
            <View style={{flex:1,backgroundColor:"black"}}>
                <Image source={{uri:this.props.navigation.getParam('imageURI')}} style={{flex:1,resizeMode:"contain"}}/>
                <View style={styles.buttonLayout}>
                    <Button onPress={this._onPressSubmit.bind(this)} style={styles.button} textStyle={{fontSize: 18}}>
                        <Text style={{color:"white"}}>提交</Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.goBack()} style={styles.button} textStyle={{fontSize: 18}}>
                        <Text style={{color:"white"}}>取消</Text>
                    </Button>
                </View>
                <ActivityIndicator
                    animating={this.state.animating}
                    toast
                    size="large"
                    text="正在提交..."
                />
            </View>
        )
    }


}

const styles = StyleSheet.create({
    buttonLayout:{
        paddingVertical:30,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "black"
    },
    button:{
        paddingHorizontal:20,
        paddingVertical:10,
        marginHorizontal: 30,
        backgroundColor:"#33A3F4",
        borderWidth:0,
    }
})
