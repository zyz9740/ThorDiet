import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    ScrollView,
    TouchableWithoutFeedback
} from "react-native";
import {Icon,} from "@ant-design/react-native";
import { VictoryChart, VictoryLine, VictoryTheme} from "victory-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';


import PropTypes from 'prop-types'

// import Chart from 'react-native-chart';

export default class Statistics extends Component{

    constructor(props){
        super(props);

    }

    componentWillMount() {
        this.data = [
                { x: "16日", y: 123 },
                { x: "17日", y: -343 },
                { x: "18日", y: 55 },
                { x: "19日", y: -434 },
                { x: "20日", y: 709 },
                { x: "21日", y: 709 },
                { x: "22日", y: 709 },
                { x: "23日", y: 709 },
                { x: "24日", y: 709 },
            ];


    }


    render(){
        return(
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={true}
            >
                <View style={styles.topBar}>
                    <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                        <Icon name={"left"} size={24} color={"black"}/>
                    </TouchableWithoutFeedback>
                    <Text style={styles.topText}>每日计划</Text>
                    <Icon name={"link"} size={24} color={"black"}/>
                </View>
                <View style={styles.circular}>
                    <AnimatedCircularProgress
                        size={200}
                        width={10}
                        fill={21}
                        tintColor="#00e0ff"
                        backgroundColor="#3d5875">
                        {
                            (fill) => (
                                <View style={{alignItems:"center"}}>
                                    <Text>已坚持</Text>
                                    <Text>{ fill } 天 </Text>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>
                </View>
                <VictoryChart theme={VictoryTheme.material}>
                    <VictoryLine
                        style={{
                            data: { stroke: "#c43a31" },
                            parent: { border: "1px solid #ccc"}
                        }}
                        data={this.data}
                        animate={{
                            duration: 2000,
                            onLoad: { duration: 1000 }
                        }}
                        labels={(datum) => datum.y}
                    />
                </VictoryChart>

            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    topBar:{
        height: 50,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft:30,
        paddingRight:30
    },
    topText:{
        fontSize:15,
        color:"black",
    },
    circular:{
        height: 250,
        flexDirection: "row",
        backgroundColor:"rgb(55,160,245)",
        justifyContent: "center",
        alignItems: "center"
    },
    chart: {
        width: 200,
        height: 200,
    },

});