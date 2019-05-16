import React, { Component } from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';
import {ActivityIndicator,} from '@ant-design/react-native';
import Button from 'apsl-react-native-button'



export default class ImageShow extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            animating: false,
        }
    }

    componentDidMount() {
        console.log("now:"+this.props.navigation.getParam('imageURI'));
        //console.log("now:"+this.props.navigation.getParam('base64'));

    }

    _onPressSubmit = () => {
        let ImageURI = this.props.navigation.getParam('imageURI');
        console.log(ImageURI);
        //网络请求
        this.setState({ animating: !this.state.animating });
        //网络请求
        this.closeTimer = setTimeout(() => {
            this.setState({ animating: !this.state.animating });
            this.props.navigation.navigate('Home');
        },5000);

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
