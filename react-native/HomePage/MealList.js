import React from "react";
import {Image, Text, View} from 'react-native';
import {List,Icon } from "@ant-design/react-native";

const Item = List.Item;


export default class MealList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breakList: [{name:"米饭"},{name:"煎饼"}],
            lunchList: [],
            dinnerList: [],
        }
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

            >
                {item.name}
            </Item>
        )
    }

    renderEmptyList(){
        return(
            <View style={{justifyContent:"center", alignContent:"center",padding:20}}>
                <Icon name={"plus-circle"} size={"lg"} style={{marginBottom:20}}/>
                <Text>您还没有添加食物，快来记录您的健康吧！</Text>
            </View>
        )
    }

    render(){
        let breakList,lunchList,dinnerList;
        //breakfast
        if(this.state.breakList.length === 0){
            breakList = this.renderEmptyList();
        }else {
            breakList = this.state.breakList.map((item, index) => this.renderList(item, index));
        }
        //lunch
        if(this.state.lunchList.length === 0){
            lunchList = this.renderEmptyList();
        }else {
            lunchList = this.state.lunchList.map((item, index) => this.renderList(item, index));
        }
        //dinner
        if(this.state.dinnerList.length === 0){
            dinnerList = this.renderEmptyList();
        }else {
            dinnerList = this.state.dinnerList.map((item, index) => this.renderList(item, index));
        }
        return (
            <View>
                <List renderHeader={'早餐'}>
                    {breakList}
                </List>
                <List renderHeader={'午餐'}>
                    {lunchList}
                </List>
                <List renderHeader={'晚餐'}>
                    {dinnerList}
                </List>
            </View>
        )}
}