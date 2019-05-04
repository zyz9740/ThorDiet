import React from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View, Alert} from 'react-native';
import {List,Icon,SearchBar } from "@ant-design/react-native";

const Item = List.Item;


export default class ListPage extends React.Component {
    static navigationOptions = {
        // headerTitle: <Text style={{fontSize:16,fontWeight:"bold",color:"black"}}>添加零食</Text>,
        // headerLeft:
        //     <TouchableHighlight onPress={() => this.props.navigation.push('Camera')}>
        //         <Icon name={"instagram"} size={24} color={"black"}/>
        //     </TouchableHighlight>,
        // headerRight:
        //     <Text style={{fontSize:16,color:"black"}}>完成</Text>,
        // headerStyle: {
        //     height: 50,
        //     flexDirection: "row",
        //     backgroundColor: "white",
        //     justifyContent: "space-between",
        //     alignItems: "center",
        //     paddingLeft:30,
        //     paddingRight:30
        // },
    };


  constructor(props) {
    super(props);
    this.state = {
      foodList:[{name:"米饭"},{name:"米饭"},{name:"米饭"},{name:"米饭"},],
      value:"米饭"
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

  onChange = value => {
    this.setState({ value });
  };

  clear = () => {
    this.setState({ value: '' });
  };

  render(){
    let foodList = this.state.foodList.map((item,index) => this.renderList(item,index));
    return (
        <View>
          <View style={styles.topBar}>
              <TouchableHighlight onPress={() => this.props.navigation.push('Camera')}>
                  <Icon name={"instagram"} size={24} color={"black"}/>
              </TouchableHighlight>
              <Text style={{fontSize:16,fontWeight:"bold",color:"black"}}>添加零食</Text>
              <Text style={{fontSize:16,color:"black"}}>完成</Text>
          </View>
          <SearchBar
              value={this.state.value}
              placeholder="搜索"
              onSubmit={value => Alert.alert(value)}
              onCancel={this.clear}
              onChange={this.onChange}
          />
          <List>
            {foodList}
          </List>
        </View>
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
});