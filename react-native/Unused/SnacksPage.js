import React from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View, Alert, Picker} from 'react-native';
import {List,Icon,SearchBar } from "@ant-design/react-native/lib/index";
import Drawer from 'react-native-drawer'
import PropTypes from 'prop-types'


const Item = List.Item;

import Weight from '../ListPage/Weight'
import ToastAndroidTest from "../ListPage/ToastAndroidTest"


export default class SnacksPage extends React.Component {
    static propTypes = {
        addFood:PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            foodList:[],
            // value:"米饭",
            openDrawerIndex:0,
            mealType:"",
        }
    }
    componentWillMount() {
        //获取数据并初始化
        let foodList = [
            {
                name:"米饭",
                caloriePerGram: 43,
                unitList:[
                    {
                        unitName:"碗",
                        gramPerUnit:500,
                        upperLimit:10,
                        step:1
                    }
                ]
            },
            {
                name:"面包",
                caloriePerGram: 63,
                unitList:[]
            },
            {
                name:"鸡蛋",
                caloriePerGram: 89,
                unitList:[
                    {
                        unitName:"个",
                        gramPerUnit:300,
                        upperLimit: 10,
                        step:1
                    }
                ]
            },{
                name:"香蕉",
                caloriePerGram:23,
                unitList:[
                    {
                        unitName:"个",
                        gramPerUnit:10,
                        upperLimit: 10,
                        step:1
                    },
                ]
            }
        ];
        this.setState({
            foodList:foodList,
            mealType:"零食",
        });

    }

    openDrawer(name,index){
        this.setState({
            openDrawerIndex:index,
        });
        // console.log("index="+index);
        // console.log(this.state.openDrawerIndex);
        this.drawer.open();
    }
    onCloseDrawer = () => {
        this.drawer.close();
    };

    addFood = (record) => {
        // console.log("record:");
        // console.log(record);
        this.props.addFood(record);
    };

    // _onSearch = (value) => {
    //     console.log(value);
    //     let openDrawerIndex = -1;
    //     for(let index=0;index<this.state.foodList.length;index++){
    //         if(this.state.foodList[index].name === value){
    //             console.log(index);
    //             openDrawerIndex = index;
    //             break;
    //         }
    //     }
    //     if(openDrawerIndex!=-1){
    //         this.openDrawer("",openDrawerIndex);
    //     }else{
    //         ToastAndroidTest.show("未找到指定物品", ToastAndroidTest.SHORT);
    //     }
    // };

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
            >
                {item.name}
            </Item>
        )
    }
    render(){
        // console.log(this.state);
        let foodList = this.state.foodList.map((item,index) => this.renderList(item,index));
        let foodSelected = this.state.foodList[this.state.openDrawerIndex];
        return (
            <Drawer
                ref={(ref) => this.drawer = ref}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={300} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}
                content={<Weight foodSelected={foodSelected}
                                 onCloseDrawer={this.onCloseDrawer}
                                 mealType={this.state.mealType}
                                 addFood={this.addFood}/>}
                initializeOpen={false}
                side={"bottom"}
            >
                <View>
                    <View style={styles.topBar}>
                        <TouchableHighlight onPress={() => this.props.navigation.push('Camera')}>
                            <Icon name={"instagram"} size={24} color={"black"}/>
                        </TouchableHighlight>
                        <Text style={styles.topText}>添加零食</Text>
                        {/*<View style={styles.pickerContainer}>*/}
                        {/*    <Picker*/}
                        {/*        androidmode="dialog"*/}
                        {/*        selectedValue={this.state.mealType}*/}
                        {/*        onValueChange={(value) => this.setState({mealType:value})} >*/}
                        {/*        <Picker.Item label="添加早餐" value="早餐" />*/}
                        {/*        <Picker.Item label="添加午餐" value="午餐" />*/}
                        {/*        <Picker.Item label="添加晚餐" value="晚餐" />*/}
                        {/*    </Picker>*/}
                        {/*</View>*/}
                        <Text style={{fontSize:16,color:"black"}}>完成</Text>
                    </View>
                    {/*<SearchBar*/}
                    {/*    value={this.state.value}*/}
                    {/*    placeholder="搜索食品"*/}
                    {/*    onSubmit={(value) => this._onSearch(value)}*/}
                    {/*    onCancel={() => {this.setState({ value: '' });}}*/}
                    {/*    onChange={() => {this.setState({ value });}}*/}
                    {/*/>*/}
                    <List>
                        {foodList}
                    </List>
                </View>
            </Drawer>
        )}
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
});