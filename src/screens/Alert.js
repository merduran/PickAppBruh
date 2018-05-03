import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';

import { NavigationToolBarIOS } from 'react-native-navigation';

export default class Alert extends Component{
	constructor(props){
		super(props);
        console.log("this.props.happeningEvents = ", this.props.happeningEvents)
        console.log("this.props.upcomingEvents = ", this.props.upcomingEvents)
	}

	render(){
        var happeningStr;
        var upcomingStr;
        if (this.props.happeningEvents){
            happeningStr = this.props.happeningEvents + " events currently happening";
        } else {
            happeningStr = "no events currently happening";
        }
        if (this.props.upcomingEvents.length){
            if (this.props.upcomingEvents.length === 1){
                upcomingStr = this.props.upcomingEvents[1] + " event in " + this.props.upcomingEvents[0];
            } else {
                upcomingStr = this.props.upcomingEvents[1] + " event in " + this.props.upcomingEvents[0];
            }
        } else {
            upcomingStr = "no upcoming events";
        }
        return <View><Text>{happeningStr}</Text><Text>{upcomingStr}</Text></View>;
	}
}
const Dimensions = require('Dimensions');
var _window = Dimensions.get('window');
const styles = StyleSheet.create({
});