import React, { Component } from 'react';
import {Image, Text} from 'react-native';



export default class ImageShow extends React.Component{
    constructor(props){
        super(props);

    }

    componentDidMount() {
        console.log("now:"+this.props.navigation.getParam('imageURI'));
        //console.log("now:"+this.props.navigation.getParam('base64'));

    }

    render(){
        return(
            <Image source={{uri:this.props.navigation.getParam('imageURI')}} style={{flex:1,resizeMode:"contain"}}/>
        )
    }
}
