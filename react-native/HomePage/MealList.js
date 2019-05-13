import React from "react";
import {Image, Text, View} from 'react-native';
import {List,Icon } from "@ant-design/react-native";
import PropTypes from 'prop-types'


const Item = List.Item;


export default class MealList extends React.Component {

    static propTypes = {
        recordList: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
           recordList:this.props.recordList,
        }
    }


    renderList(item,index){
        return(
            <Item
                // thumb={
                //     <Image source={require('../../images/imageLeft.png')}
                //            style={{height:20,width:20,marginRight:20}}
                //            resizeMode={"contain"}/>}
                key={index}

            >
                <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                    <Text>{item.name}</Text>
                    <Text>{item.calorie} kJ</Text>
                </View>
            </Item>
        )
    }

    renderEmptyList(){
        let emptyInfo = {name:"添加食物"};
        return this.renderList(emptyInfo,0);
    }

    render(){
        let breakList,lunchList,dinnerList,snacksList,sportsList;
        //breakfast
        if(this.state.recordList.breakfast.length === 0){
            breakList = this.renderEmptyList();
        }else {
            breakList = this.state.recordList.breakfast.map((item, index) => this.renderList(item, index));
        }
        //lunch
        if(this.state.recordList.lunch.length === 0){
            lunchList = this.renderEmptyList();
        }else {
            lunchList = this.state.recordList.lunch.map((item, index) => this.renderList(item, index));
        }
        //dinner
        if(this.state.recordList.dinner.length === 0){
            dinnerList = this.renderEmptyList();
        }else {
            dinnerList = this.state.recordList.dinner.map((item, index) => this.renderList(item, index));
        }
        //snacks
        if(this.state.recordList.snacks.length === 0){
            snacksList = this.renderEmptyList();
        }else {
            snacksList = this.state.recordList.snacks.map((item, index) => this.renderList(item, index));
        }
        //sports
        if(this.state.recordList.sports.length === 0){
            sportsList = this.renderEmptyList();
        }else {
            sportsList = this.state.recordList.sports.map((item, index) => this.renderList(item, index));
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
                <List renderHeader={'零食'}>
                    {snacksList}
                </List>
                <List renderHeader={'运动'}>
                    {sportsList}
                </List>
            </View>
        )}
}