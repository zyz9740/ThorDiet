'use strict';
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from "@ant-design/react-native";
import ImagePicker from 'react-native-image-picker';
import ImageToGallery from "./ImageToGallery";


export default class Camera extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type:RNCamera.Constants.Type.front,
            imageURI:"file:///data/data/com.myproject/cache/Camera/c0a4f3fe-ada0-41d1-94d0-d2edac272a39.jpg",
        };
    }

    render() {
        return (
            <View style={styles.container}>

                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={this.state.type}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />
                <View style={styles.operation}>
                    <TouchableOpacity onPress={this.loadAlbum.bind(this)}>
                        <Icon name="picture" color="white"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Icon name="camera" color="white"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Text style={{ fontSize: 14,color:"white" }}>取消</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.operation_top}>
                    <TouchableOpacity onPress={this.changeType.bind(this)}>
                        <Icon name="sync" color="white"></Icon>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    loadAlbum(){
        ImagePicker.launchImageLibrary({}, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                this.props.navigation.push('ImageShow',{
                    'imageURI':response.uri,
                    "base64":response.data,
                    mealType:   this.props.navigation.state.params.mealType,
                    addFood: this.props.navigation.state.params.addFood,
                });
            }
        });
    }

    changeType(){
        let type = this.state.type;
        if(type === RNCamera.Constants.Type.back){
            type = RNCamera.Constants.Type.front;
        }else{
            type = RNCamera.Constants.Type.back;
        }
        console.log(this.state.type);
        this.setState({
            type:type,
        })
    }

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true, mirrorImage:true };
            const data = await this.camera.takePictureAsync(options);
            this.setState({
                imageURI: data.uri,
            });
            console.log("base64:",data.base64);

            //获取屏幕长宽比
            const res = await this.camera.getSupportedRatiosAsync();
            console.log(res);
            ImageToGallery.save(data.base64);
            this.props.navigation.push('ImageShow',{
                'imageURI':data.uri,
                "base64":data.base64,
                mealType:   this.props.navigation.state.params.mealType,
                addFood: this.props.navigation.state.params.addFood,
            });
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    operation_top:{
        flex: 0,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems:"center",
        position:"absolute",
        bottom: 160,
        alignSelf: 'center',
    },
    operation:{
        flex: 0,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems:"center",
        position:"absolute",
        bottom:75,
        alignSelf: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#33A3F4',
        borderRadius: 100,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        marginHorizontal : 50 ,

    },
});