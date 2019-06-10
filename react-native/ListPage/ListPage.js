import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    Alert,
    Picker,
    TouchableWithoutFeedback
} from 'react-native';
import {List,Icon,SearchBar,Modal } from "@ant-design/react-native";
import Drawer from 'react-native-drawer'
import PropTypes from 'prop-types'
import { withNavigation } from 'react-navigation';

const Item = List.Item;


import Weight from './Weight'
import ToastAndroidTest from "./ToastAndroidTest"
import Button from "@ant-design/react-native/es/button";
import Provider from "@ant-design/react-native/es/provider";


class ListPage extends React.Component {
    static propTypes = {
        addFood:PropTypes.func.isRequired,
        mealType:PropTypes.string.isRequired,
        haveCamera:PropTypes.bool.isRequired,
        havePicker:PropTypes.bool.isRequired,
        foodListURL:PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            foodList:[],
            openDrawerIndex:0,
            mealType:"",
            modalVisible:false,
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
        //根据时间确定现在是吃什么的时间
        let hour = new Date().getHours();
        let mealType = "";
        //传入""的时候才确定
        if(this.props.mealType.length === 0) {
            if (hour < 10 && hour > 5) {
                mealType = "早餐";
            } else if (hour >= 10 && hour <= 14) {
                mealType = "午餐";
            } else {
                mealType = "晚餐";
            }
        }else {
            mealType = this.props.mealType;
        }
        this.setState({
            foodList:foodList,
            mealType:mealType,
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

    openCamera = () =>{
        // console.log(this.props);
        // this.props.openCamera();
        this.props.navigation.push('Camera',{
            mealType: this.state.mealType,
            addFood: this.props.addFood
        })
    };

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
                        {this.props.haveCamera?
                            <TouchableWithoutFeedback onPress={this.openCamera}>
                                <Icon name={"instagram"} size={24} color={"black"}/>
                            </TouchableWithoutFeedback>
                            : <Text style={{color:"white"}}>占位</Text>
                        }
                        {this.props.havePicker?
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
                            :<Text style={styles.topText}>添加{this.props.mealType}</Text>
                        }
                        <Text style={{fontSize:16,color:"white"}}>完成</Text>
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

export default withNavigation(ListPage)