import React, { Component } from 'react';
import {Image, Text, View, StyleSheet, TouchableWithoutFeedback, Picker} from 'react-native';
import {ActivityIndicator, Icon, List,} from '@ant-design/react-native';
import Button from 'apsl-react-native-button'
import Drawer from "react-native-drawer";
import Weight from "./Weight";

const Item = List.Item;


export default class ChoosePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            foodList:[],
            openDrawerIndex:0,
            mealType:"",
        }
    }

    componentWillMount() {
        // let foodList = [
        //     {
        //         name:"米饭",
        //         caloriePerGram: 43,
        //         unitList:[
        //             {
        //                 unitName:"碗",
        //                 gramPerUnit:500,
        //                 upperLimit:10,
        //                 step:1
        //             }
        //         ]
        //     },
        //     {
        //         name:"面包",
        //         caloriePerGram: 63,
        //         unitList:[]
        //     },
        //     {
        //         name:"鸡蛋",
        //         caloriePerGram: 89,
        //         unitList:[
        //             {
        //                 unitName:"个",
        //                 gramPerUnit:300,
        //                 upperLimit: 10,
        //                 step:1
        //             }
        //         ]
        //     },{
        //         name:"香蕉",
        //         caloriePerGram:23,
        //         unitList:[
        //             {
        //                 unitName:"个",
        //                 gramPerUnit:10,
        //                 upperLimit: 10,
        //                 step:1
        //             },
        //         ]
        //     }
        // ];
        console.log(this.props.navigation.state.params);
        this.setState({
            mealType: this.props.navigation.state.params.mealType,
            foodList: this.props.navigation.state.params.foodList,
        })
    }


    onCloseDrawer = () => {
        this.drawer.close();
    };

    openDrawer(name,index){
        this.setState({
            openDrawerIndex:index,
        });
        // console.log("index="+index);
        // console.log(this.state.openDrawerIndex);
        this.drawer.open();
    }

    renderList(item,index){
        return(
            <Item
                thumb={
                    <Image source={require('../../images/imageLeft.png')}
                           style={{height:20,width:20,marginRight:20}}
                           resizeMode={"contain"}/>}
                arrow="horizontal"
                key={index}
                onPress={() => this.openDrawer(item.name,index)}
                extra={`置信度：${item.probability}`}
            >
                {item.name}
            </Item>
        )
    }

    render(){
        let foodList = this.state.foodList.map((item,index) => this.renderList(item,index));
        let foodSelected = this.state.foodList[this.state.openDrawerIndex];
        return(
            <Drawer
                ref={(ref) => this.drawer = ref}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={250}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
                content={<Weight foodSelected={foodSelected}
                                 onCloseDrawer={this.onCloseDrawer}
                                 mealType={this.state.mealType}
                                 addFood={this.props.navigation.state.params.addFood}/>}
                initializeOpen={false}
                side={"bottom"}
            >
               <View style={styles.topBar}>
                   <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                       <Icon name={"left"} size={24} color={"black"}/>
                   </TouchableWithoutFeedback>
                   <View style={styles.pickerContainer}>
                       <Picker
                           androidmode="dialog"
                           selectedValue={this.state.mealType}
                           onValueChange={(value) => this.setState({mealType: value})}>
                           <Picker.Item label="添加早餐" value="早餐"/>
                           <Picker.Item label="添加午餐" value="午餐"/>
                           <Picker.Item label="添加晚餐" value="晚餐"/>
                       </Picker>
                   </View>
                   <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Home")}>
                       <Text style={{fontSize:16,color:"black"}}>完成</Text>
                   </TouchableWithoutFeedback>
               </View>
               <List>
                   {foodList}
               </List>
            </Drawer>
        )
    }


}

const styles = StyleSheet.create({
    topBar: {
        height: 50,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft:30,
        paddingRight:30
    },
    pickerContainer:{
        width:100,
        height:40,
    },
    topText:{
        fontSize:15,
        color:"black",
    }
})
