import React,{Component} from "react"
import {Image, Text, View, StyleSheet, Picker, TouchableWithoutFeedback} from "react-native";
import Slider from "react-native-slider";
import PropTypes from 'prop-types'

import ToastAndroidTest from "./ToastAndroidTest"



export default class Weight extends React.Component {

    static propTypes = {
        foodSelected:PropTypes.object.isRequired,
        onCloseDrawer:PropTypes.func.isRequired,
        mealType:PropTypes.string.isRequired,
        addFood:PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            sliderValue: 0,
            calorieSum: 0,
            unit: {
                unitName: "克",
                gramPerUnit: 1,
                upperLimit: 1000,
                step: 10
            }
        }
    }

    renderUnitList(){
        // console.log(this.props.foodSelected);
        let unitList = this.props.foodSelected.unitList.map((item,index)=>{
            //-1表示以 克 为单位，其他表示索引
            return <Picker.Item value={item.unitName} label={item.unitName} key={index}/>;
        });
        // console.log(unitList);
        return(unitList);
    }

    _onChangeUnit(itemPosition){
        //如果不是克的话就改变
        if(itemPosition!=0) {
            let unit = this.props.foodSelected.unitList[itemPosition-1];
            this.setState({
                sliderValue:0,
                unit: unit,
            });
        }else{
            let unit = {
                unitName: "克",
                gramPerUnit: 1,
                upperLimit: 1000,
                step: 10
            };
            this.setState({
                unit:unit,
                sliderValue:0,
            });
            // console.log(this.state);
        }
    }


    _onSubmit = () =>{
        // console.log("props:");
        // console.log(this.props);

        if(this.state.calorieSum != 0) {
            let record = {
                name: this.props.foodSelected.name,
                calorie: this.state.calorieSum,
                unitName: this.state.unit.unitName,
                quantity: this.state.sliderValue,
                mealType:this.props.mealType,
            };
            ToastAndroidTest.show('添加'+this.props.mealType+'成功', ToastAndroidTest.SHORT);
            let recordContent = this.props.foodSelected.name + " : " +
                this.state.sliderValue + ' ' + this.state.unit.unitName;
            ToastAndroidTest.show(recordContent, ToastAndroidTest.SHORT);
            this.props.addFood(record);
        }
        this.props.onCloseDrawer();
    };

    render() {
        // console.log("render drawer: ****************************");
        // console.log(this.props);
        let day = new Date().getDate();
        let month = new Date().getMonth()+1;
        let unitList = this.renderUnitList();
        return(
            <View style={styles.drawer}>
                <View style={styles.topBar}>
                    <TouchableWithoutFeedback
                        onPress={this._onSubmit} >
                        <Text>确认</Text>
                    </TouchableWithoutFeedback>
                    <View style={{flexDirection:"row"}}>
                        <Text style={{marginHorizontal:10,}}>{month}月{day}日</Text>
                        <Text style={{marginHorizontal:10,}}>{this.props.mealType}</Text>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={this.props.onCloseDrawer} >
                        <Text>取消</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.foodInfo}>
                    <Image source={require("../../images/fatThor.png")} style={styles.foodImage}/>
                    <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                        <Text style={{marginVertical:5}}>{this.props.foodSelected.name}</Text>
                        <Text style={{marginVertical:5}}> {this.props.foodSelected.caloriePerGram} kJ / g</Text>
                        <Text style={{marginVertical:5}}>总计热量： {this.state.calorieSum} kJ</Text>
                    </View>
                </View>
                <View style={styles.sliderContainer}>
                    <Slider
                        maximumValue={this.state.unit.upperLimit}
                        minimumValue={0}
                        step={this.state.unit.step}
                        thumbTintColor='#33A3F4'
                        minimumTrackTintColor="#33A3F4"
                        value={this.state.sliderValue}
                        onValueChange={value => this.setState({
                            sliderValue:value,
                            calorieSum: value * this.props.foodSelected.caloriePerGram * this.state.unit.gramPerUnit,
                        })}
                        style={styles.slider}
                    />
                </View>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%"}}>
                    <View style={{ width:50, height:40,justifyContent:"center",alignItems:"center",paddingTop:7}}>
                        <Text style={{color:"black",fontSize:17}}>{this.state.sliderValue}</Text>
                    </View>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={this.state.unit.unitName}
                            onValueChange={(itemValue,itemPosition) => this._onChangeUnit(itemPosition) }>
                            <Picker.Item value="克" label="克" />
                            {unitList}
                        </Picker>
                    </View>
                    <View style={{ width:50, height:40,justifyContent:"center",alignItems:"center",
                                    paddingTop:10,marginLeft:10}}>
                        {this.state.unit.unitName === "克" ? null :
                            <Text style={{color: "grey", fontSize: 10}}>{this.state.unit.gramPerUnit} 克
                                / {this.state.unit.unitName}</Text>
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
   drawer: {
       flexDirection: "column",
       justifyContent: "center",
       alignItems: "center",
       // borderTopWidth: 1,
       backgroundColor:"white",
   },
    topBar:{
       //backgroundColor:"#33A3F4",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        paddingHorizontal:30,
        paddingVertical:15,
        height:50,
        //borderTopWidth: 1,
        //borderBottomWidth: 1,
        //borderColor:"grey",
    },
    foodInfo:{
        flexDirection: "row",
        height:100,
        justifyContent:"space-between",
        alignItems:"center",
        width:"100%",
        paddingHorizontal: 30,
        paddingVertical: 15,

    },
    foodImage:{
       height:80,
        width:80,
    },
    sliderContainer:{
        alignItems: "stretch",
        justifyContent: "center",
        paddingHorizontal:15,
    },
    slider:{
       width:300,
    },
    pickerContainer:{
        //backgroundColor: "blue",
        width:70,
        height:40,
        //marginHorizontal:30,
    }
});