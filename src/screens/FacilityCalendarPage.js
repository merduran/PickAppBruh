import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import FacilityCalendar from './FacilityCalendar.js';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var urlExt;
    if (this.props.gymName === "Nelson"){
      if (this.props.subGymName === "Fitness"){ 
        urlExt = this.props.gymName; 
      } else { 
        urlExt = this.props.subGymName; 
      }
    } else {
      urlExt = "basketball";
    }
    return (
      <FacilityCalendar urlExt={urlExt.toLowerCase()}></FacilityCalendar>
    );
  }
}
