import React from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View, Alert} from 'react-native';
import {List,Icon,SearchBar } from "@ant-design/react-native";
import Drawer from 'react-native-drawer'

const Item = List.Item;

import Weight from './Weight'

export default class ListPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        foodList:[{name:"米饭0"},{name:"米饭1"},{name:"米饭2"},{name:"米饭3"},],
        value:"米饭",
        openDrawerIndex:0,
        openDrawerName:"",
    }
  }

  openDrawer(name,index){
      this.setState({
          openDrawerIndex:index,
          openDrawerName:name,
      });
      console.log("index="+index);
      console.log(this.state.openDrawerIndex);
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
            content={<Weight index={this.state.openDrawerIndex}
                             name={this.state.openDrawerName}
                             />}
            initializeOpen={false}
            side={"bottom"}
        >
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
});