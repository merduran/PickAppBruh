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

import FacilityCalendar from './FacilityCalendar.js';
import Alert from './Alert.js';

export default class GymButtonContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			gymName: this.props.gymName,
            subGymClicked: this.props.subGymClicked,
            subGymName: this.props.subGymName,
            changeToSubGym: this.props.changeToSubGym,
            displayMainPageHeader: this.props.displayMainPageHeader,
            hideAllDivs: this.props.hideAllDivs,
            hideAll: this.props.hideAll,
            availability: '',
            users: '',
            openHours: '',
            availability2: '',
            availabilityText: '',
            upcomingEvents: [],
            happeningEvents: 0,
            gymColor: '',
            iconPath:'',
		};
		var gymNumber;
		switch (this.state.gymName){
			case 'Nelson':
				gymNumber = 1;
				break;
			case 'OMAC':
				gymNumber = 2;
				break;
		}
		this.fetchAvailabilityData(this, 'users/' + gymNumber + '/' + this.state.subGymName.toLowerCase());
		var urlExt;
		var myThis = this;
		if (this.state.subGymName !== "Fitness"){
			if (this.state.subGymName === "Pool"){
				urlExt = this.state.subGymName.toLowerCase();
			} else { urlExt = "basketball"}
			this.fetchCalendarData(this, urlExt);
			setInterval(function(){myThis.fetchCalendarData(myThis, urlExt)}, 2000);
		} 
		setInterval(function(){ myThis.fetchAvailabilityData(myThis, 'users/' + gymNumber + '/' + myThis.state.subGymName.toLowerCase())}, 2000);
		
	}
	fetchAvailabilityData(myThis, urlExt){
        fetch('https://pickapp-test.herokuapp.com/api/' + urlExt)
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                var avail;
                switch(myJson.availability){
                    case undefined:
                        avail = myJson.count;
                        break;
                    default:
                        avail = myJson.availability
                }
                var value;
                var txt;
                var clr;
                var icon;
                if (myThis.state.subGymName == 'Fitness') {
                    value = Math.round(Number(avail*(100/181))) + "%";
                    txt = 'of max capacity';
                    clr = '#bfae00';//'#BFAE00';
                    icon = require('./Icons/gym.png');
                } else if (myThis.state.subGymName == 'Pool'){
                    value = Math.round(Number(avail/8));
                    txt = 'people per lane';
                    clr = '#66b3c3';//'#66B3C3'
                    icon = require('./Icons/pool.png');
                } else if(myThis.state.subGymName == 'Basketball') {
                    value = Math.round(Number(avail/4));
                    txt = 'people per court';
                    clr = '#de8100';//'#DE8100';
                    icon = require('./Icons/basketball_court.png');
                } else if (myThis.state.subGymName == 'Track'){
                    value = Math.round(Number(avail/6));
                    txt = 'people per lane';
                    clr = '#b82a22';//'#B82A22';
                    icon = require('./Icons/tracks.png');
                }
                if (avail !== 0 && value === 0){ value++; }
                myThis.setState({
                    availability: avail,
                    availability2: value,
                    availabilityText: txt,
                    gymColor: clr,
                    iconPath: icon,
                });
            });
    }

    adjustTimeZoneInISOString(date){
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, -1);
        return localISOTime
    }

    adjustTimeZoneInDate(date){
        return new Date(date.getTime() + (date.getTimezoneOffset() * 60000))
    }

	fetchCalendarData(myThis, urlExt){
	    fetch('https://pickapp-test.herokuapp.com/api/calendar/' + urlExt)
	    .then(function(response) {
	        return response.json();
	    })
	    .then(function(myJson) {
	        var closestUpcoming;
	        var upcomingEventsCount = 0;
	        var happeningEventsCount = 0;
            var todayStartHour = myThis.adjustTimeZoneInDate(new Date(myThis.adjustTimeZoneInISOString(new Date()).split("T")[0] + "T00:00:00"));
	        var todayEndHour = new Date(new Date(todayStartHour).getTime() + 24 * 60 * 60 * 1000);
	        var curr = new Date();
	        var minutesAway;
            var sameDateAsClosest = true;
	        for (var i = 0; i < myJson.length; i++){
                var parsedEvent = myJson[i].split(" - ");
                var eventStartDate = myThis.adjustTimeZoneInDate(new Date(parsedEvent[0].substring(0, 19)));
                var eventEndDate = myThis.adjustTimeZoneInDate(new Date(parsedEvent[1].substring(0, 19)));
	        	if (eventStartDate > todayEndHour){
		        	break;
		        }
                if (closestUpcoming) { sameDateAsClosest =  eventStartDate.getTime() === closestUpcoming.getTime()}
	        	var dif = eventStartDate - curr;
                if (eventStartDate > curr) {
                    if (dif <= 3600000 && sameDateAsClosest){
                        closestUpcoming = eventStartDate;
                        minutesAway = dif;
                        upcomingEventsCount++;
                    }
	        	} else if (eventEndDate > curr){
                    happeningEventsCount++
                }
	        }

            if (upcomingEventsCount){
                myThis.setState({
                    upcomingEvents: [ Math.ceil(minutesAway / (60*1000)), upcomingEventsCount ],
                });
            }
            if (happeningEventsCount){
                myThis.setState({
                    happeningEvents: happeningEventsCount,
                });
            }
	    });
	}

    returnFacilityIcon(){
        if (this.state.subGymName === "Fitness"){
            return(
                <Image style={[styles.image, {marginLeft: 15}]} source={require('./Icons/gym.png')}/> 
            );
        }
        if (this.state.subGymName === "Pool"){
            return(
                <Image style={[styles.image, {marginLeft: 15}]} source={require('./Icons/pool.png')}/> 
            );
        }
        if (this.state.subGymName === "Basketball"){
            return(
                <Image style={[styles.image, {marginLeft: 15}]} source={require('./Icons/basketball_court.png')}/> 
            );
        } 
        if (this.state.subGymName === "Track"){
            return(
                <Image style={[styles.image, {marginLeft: 15}]} source={require('./Icons/tracks.png')}/> 
            );
        } 
    }

	displayCalendarButton(){
        var colorCode;
        if (this.state.subGymName === "Pool"){
            colorCode = '#66B3C3';
        } else if (this.state.subGymName === "Basketball"){
            colorCode = '#DE8100';
        } else if (this.state.subGymName === "Track"){
            colorCode = '#B82A22';
        }
    	if (this.state.subGymName !== "Fitness"){
			return(
                <View>
                    <Text style={{fontSize: 22, width: 300, textAlign: 'left', marginTop: 10}}>Coming Up</Text>
                    <View style={[styles.subGymTabContainer, {width: 300}]}>
                        <Alert upcomingEvents={this.state.upcomingEvents} happeningEvents={this.state.happeningEvents}></Alert>
                    </View>
                    <TouchableOpacity style={[styles.subGymHeader, {backgroundColor: colorCode}]} onPress={() => this.props.pushScreen("FacilityCalendarPage", {gymName: this.state.gymName, subGymName: this.state.subGymName})}>
                        <Text style={{fontSize: 15, color: 'white', textAlign: 'center', fontWeight: 'bold'}}>GO TO CALENDAR</Text>
                    </TouchableOpacity>
                </View>
            );
		}
	}

    returnGymHeader(){
        if (this.state.subGymName === "Fitness"){
            return(
                <Text style={[styles.marginText, {color:'#BFAE00', fontSize: 35}]}>
                    {this.state.subGymName}
                </Text>
            );
        }
        if (this.state.subGymName === "Pool"){
            return(
                <Text style={[styles.marginText, {color:'#66B3C3', fontSize: 35}]}>
                    {this.state.subGymName}
                </Text>
            );
        }
        if (this.state.subGymName === "Basketball"){
            return(
                <Text style={[styles.marginText, {color:'#DE8100', fontSize: 35}]}>
                    {this.state.subGymName}
                </Text>
            );
        }
        if (this.state.subGymName === "Track"){
            return(
                <Text style={[styles.marginText, {color:'#B82A22', fontSize: 35}]}>
                    {this.state.subGymName}
                </Text>
            );
        }
    }

	render(){
        var colorCode;
        if (this.state.subGymName === "Fitness"){
            colorCode = "#BFAE00"
        }
        if (this.state.subGymName === "Pool"){
            colorCode = "#66B3C3"
        }
        if (this.state.subGymName === "Basketball"){
            colorCode = "#DE8100"
        }
        if (this.state.subGymName === "Track"){
            colorCode = "#B82A22"
        }
        return(
            <View style={[styles.subGym, {borderColor: colorCode}]}>
                <View style={[styles.subGymSubHeader1]}>
                    <View style={[styles.subGymSubHeader]}>
                    	{this.returnGymHeader()}
                        {this.returnFacilityIcon()}
                    </View>
                </View>
                <Text style={{fontSize: 22, width: 300, textAlign: 'left', marginTop: 10}}>Occupancy</Text>
                <View style={[styles.subGymTabContainer, {width: 300}]}>	
                	<View style={{flexDirection: 'row'}}>
	                    <View style={[styles.subGymTab, {margin: 5}]}>
	                        <Text style={styles.availabilityValue}>{this.state.availability}</Text>
	                        <Text style={{fontSize: 15}}>people there</Text>
	                    </View>
	                    <View style={[styles.subGymTab, {margin: 5}]}>
	                        <Text style={styles.availabilityValue}>{this.state.availability2}</Text>
	                        <Text style={{fontSize: 15, textAlign: 'center', marginTop: 2}}>{this.state.availabilityText}</Text>
	                    </View>
                    </View>
                </View>
                {this.displayCalendarButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    upcomingEventsContainer: {
        alignSelf: 'flex-start',
        marginTop: 10,
        paddingRight: 2,
        paddingLeft: 2,
    },
    gymContainer: {
        borderRadius: 10,
        padding: 10,
    },
    subGymTabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red',
        // height: 100,
        width: 250,
        marginBottom: 20,
        padding: 2,

    },
    image: {
        // flex: 0.3,
        width: 35,
        height: 35,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent:'center',
        opacity: 0.8,
    },
    subGym: {
        backgroundColor: '#f6f6f6',//'#ECECF7',
        opacity: 0.8,
        // borderColor: '#C7CBD1',
        borderWidth: 2,
        // height: 250,
        // width: 320,
        padding: 5,
        margin: 5,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 20,
        // shadowColor: '#808080',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        // shadowRadius: 2,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    subGymTab: {
        // backgroundColor: 'blue',
        // height: 120,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 120,
    },
    subGymTab1: {
        // backgroundColor: 'blue',
        // height: 120,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    availabilityHeader: {
        textAlign: 'left',
        fontSize: 25,
        fontWeight: 'bold',
    },

    availabilityValue: {
        marginTop: 5,
        textAlign: 'center',
        fontSize: 40,
    },

    subGymSubHeader: {
        // backgroundColor: 'yellow',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderColor: '#E6ECF0',
        // paddingRight: 
        // paddingBottom: 2,
        // borderBottomWidth: 1,
        // marginTop: 7

    },
    subGymSubHeader1: {
        // backgroundColor: 'orange',
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E6ECF0',
        paddingBottom: 2,
        borderBottomWidth: 1,
        marginTop: 7,
        width: 300,
    },
    buttonCC: {
        // backgroundColor: 'black',
        padding: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        height: 200,
        width: 175,
        backgroundColor: 'yellow',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerContainer: {
        backgroundColor: 'blue',
        height: 70,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },

    headerText: {
        color: '#14171A',
        textAlign: 'left',
        fontSize: 30,

    },
    marginText: {
        fontSize: 25,
        // color: '#DE8100',//'#14171A',
        textAlign: 'left',
    },

    textStyle: {
        color: 'white',
        textAlign: 'center',
        opacity: 1,
    },
    button: {
        width: 230,
        backgroundColor: 'green',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 100,
    },


    subGymHeader: {
        margin: 7,
        // width: 50,
        // backgroundColor: 'purple',
        // shadowColor: '#000',
        //    shadowOffset: { width: 0.4, height: 0 },
        //    shadowOpacity: 0.8,
        //    shadowRadius: 2,
        // borderWidth: 0.8,
        // borderColor: '#657786',
        borderRadius: 50,
        padding: 8,
    },
    subGymBody: {
        // flex: 1,
        backgroundColor: 'blue',
        margin: 5,
    },
});

// 	render(){
// 		return(
// 			<View style={styles.subGym}>
// 				<View style={styles.subGymSubHeader}>
// 					<Text style={styles.marginText}>
// 				    	{this.state.subGymName}
// 					</Text>
// 				</View>
// 				<View style={styles.subGymTabContainer}>
// 					<View style={styles.subGymTab}>
// 						<Text style={styles.availabilityHeader}>Occupation</Text>
// 						<Text style={styles.availabilityValue}>{this.state.availability}</Text>
// 						<Text style={{fontSize: 15}}>people</Text>
// 					</View>
// 					<View style={styles.subGymTab}>
// 					    <Text style={styles.availabilityHeader}>Availability</Text>
// 					    <Text style={styles.availabilityValue}>{this.state.availability2}</Text>
// 					    <Text style={{fontSize: 10, textAlign: 'center', marginTop: 2}}>{this.state.availabilityText}</Text>
// 					</View>
// 					<View style={styles.subGymTab}>
// 						<Text style={styles.availabilityHeader}>Coming Up</Text>
// 						<View style={styles.upcomingEventsContainer}>
// 							<Alert upcomingEvents={this.state.upcomingEvents} happeningEvents={this.state.happeningEvents}></Alert>
// 						</View>
// 						<TouchableOpacity style={styles.subGymHeader} onPress={() => this.props.pushScreen("FacilityCalendarPage", {gymName: this.state.gymName, subGymName: this.state.subGymName})}><Text style={{fontSize: 7, color: '#657786', textAlign: 'center'}}>See more</Text></TouchableOpacity>
// 					</View>
// 				</View>
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	upcomingEventsContainer: {
// 		alignSelf: 'flex-start',
// 		marginTop: 10,
// 		height: 60,
// 		paddingRight: 2,
// 		paddingLeft: 2, 
// 	},
//     gymContainer: {
//     	borderRadius: 10,
//         padding: 10,
//     }, 
//     subGymTabContainer: {
//     	flexDirection: 'row',
//     	justifyContent: 'space-around',
//     	// alignItems: 'center',
//     	// backgroundColor: 'red',
//     	marginTop: 10,
//     	// marginLeft: 10,
//     	padding: 2,

//     },

//     subGym: {
//     	backgroundColor: '#ECECF7',
//     	borderColor: '#C7CBD1',
//     	borderWidth: 1,
//     	padding: 5,
//     	margin: 5,
//     	paddingRight: 10,
//     	paddingLeft: 10,
//     	borderRadius: 20,
//     	shadowColor: '#000',
//         shadowOffset: { width: 1, height: 1 },
//         // shadowOpacity: 0.4,
//         shadowRadius: 2,
//     },

//     subGymTab: {
// 		// backgroundColor: 'blue',
// 		height: 120,
// 		alignItems: 'center',
//     	width: 100,
//     },

//     availabilityHeader: {
// 		textAlign: 'left',
// 		fontSize: 11,
// 		fontWeight: 'bold',
// 	},

// 	availabilityValue: {
// 		marginTop: 5,
// 		textAlign: 'center',
// 		fontSize: 25,
// 	},

//     subGymSubHeader: {
// 		// backgroundColor: 'yellow',
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 		borderColor: '#E6ECF0',
// 		paddingBottom: 2,
// 		borderBottomWidth: 1,
// 		marginTop: 7

//     },

//     buttonCC: {
//         // backgroundColor: 'black',
//         padding: 20,
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     buttonContainer: {
//     	height: 200,
//     	backgroundColor: 'yellow',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     headerContainer: {
//         backgroundColor: 'blue',
//         height: 70,
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//     },

//     headerText: {
//         color: '#14171A',
//         textAlign: 'left',
//         fontSize: 30,

//     },
//     marginText: {
//     	fontSize: 19,
//         color: '#D9D11D',//'#14171A',
//         textAlign: 'left',
//     },

//     textStyle: {
//         color: 'white',
//         textAlign: 'center',
//         opacity: 1,
//     },
//     button: {
//         width: 230,
//         backgroundColor: 'green',
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         height: 100,
//     },


//     subGymHeader: {
//     	margin: 7,
//     	width: 50,
//     	// backgroundColor: 'purple',
//     	// shadowColor: '#000',
//      //    shadowOffset: { width: 0.4, height: 0 },
//      //    shadowOpacity: 0.8,
//      //    shadowRadius: 2,
//      	borderWidth: 0.8,
//      	borderColor: '#657786',
//     	borderRadius: 50,
//     	position: 'absolute',
//     	bottom: 4,
//     	padding: 4,
//     },
//     subGymBody: {
//     	// flex: 1,
//     	backgroundColor: 'blue',
//     	margin: 5,
//     },
// });