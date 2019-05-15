import React, { Component } from 'react';
import {Text, View,StyleSheet,TextInput } from "react-native";
import { InputItem,List } from "@ant-design/react-native";

import PropTypes from 'prop-types'

import Chart from 'react-native-chart';

export default class Statistics extends Component{
    // static propTypes = {
    //
    // };

    constructor(props){
        super(props);
        this.state = {
            data : [
                [0, 1],
                [1, 3],
                [3, 7],
                [4, 9],
            ]
        }
    }

    componentDidMount() {
        // console.log(this.props);
    }


    render(){
        return(
            <View style={styles.container}>
                <Chart
                    style={styles.chart}
                    data={this.state.data}
                    verticalGridStep={5}
                    type="line"
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
    },
    chart: {
        width: 200,
        height: 200,
    },

});