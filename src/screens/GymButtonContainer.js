import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity
} from 'react-native';
import FacilityCalendar from './FacilityCalendar.js';


export default class GymButtonContainer extends Component{
	constructor(props){
		super(props);
		this.state = {
			gymName: this.props.gymName,
			subGymClicked: this.props.subGymClicked,
			subGymName: this.props.subGymName,
			changeToSubGym: this.props.changeToSubGym,
			changeTitle: this.props.changeTitle,
			displayMainPageHeader: this.props.displayMainPageHeader,
			hideAllDivs: this.props.hideAllDivs,
			hideAll: this.props.hideAll,
			availability: '',
			users: '',
			openHours: '',
			availability2: '',
			availabilityText: '',
			upcomingEvents: '',
			// availability: this.props.availability,
			// changeAvailability: this.props.changeAvailability,
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
		// this.fetchCalendarData()
		this.fetchAvailabilityData(this, 'users/' + gymNumber + '/' + this.state.subGymName.toLowerCase());
		var urlExt;
		if (this.state.subGymName !== "Fitness"){
			if (this.state.subGymName === "Pool"){
				urlExt = this.state.subGymName.toLowerCase();
			} else { urlExt = "basketball"}
			this.fetchCalendarData(this, urlExt);
		} 
		var myThis = this;
		setInterval(function(){ myThis.fetchAvailabilityData(myThis, 'users/' + gymNumber + '/' + myThis.state.subGymName.toLowerCase())}, 2000);
		this.fetchHours();
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
			if (myThis.state.subGymName == 'Fitness') {
			    value = Math.round(Number(avail*(100/181))) + "%";
			    txt = 'of Max\nCapacity';
			} else if (myThis.state.subGymName == 'Pool'){
				value = Math.round(Number(avail/8));
				txt = 'People per\nLane';
			} else if(myThis.state.subGymName == 'Basketball') {
				value = Math.round(Number(avail/4));
				txt = 'People per\nCourt';
			} else if (myThis.state.subGymName == 'Track'){
				value = Math.round(Number(avail/6));
				txt = 'People per\nLane';
			}
			if (avail !== 0 && value === 0){ value++; }
			myThis.setState({
			    availability: avail,
			    availability2: value,
			    availabilityText: txt
			});
		});
	}

	// fetchCalendarData(){
	// 	fetch('https://pickapp-test.herokuapp.com/api/calendar')
	// 	.then(function(response) {
	// 		return response.json();
	// 	})
	// 	.then(function(myJson) {
	// 		console.log("CALENDAR = ", myJson)
	// 		// var avail;
	// 		// switch(myJson.availability){
	// 		// 	case undefined: 
	// 		// 		avail = myJson.count;
	// 		// 		break;
	// 		// 	default: 
	// 		// 		avail = myJson.availability
	// 		// }	
	// 		// myThis.setState({
	// 		// 	availability: avail,
	// 		// });
	// 	});
	// }


	pressHandler(){
	// 	console.log("BABASIZ = ", this.state.hideAll)
	// 	if (!this.state.hideAll){
	// 		var myThis = this;
	// 		var users;
	// 		switch(this.state.gymName){
	// 			case 'Nelson':
	// 				users = 1;
	// 				break;
	// 			case 'OMAC':
	// 				users = 2;
	// 				break;
	// 		}
	// 		if (this.state.subGymClicked !== null){
	// 			fetch('https://pickapp-test.herokuapp.com/api/users/' + users + '/' + this.state.subGymClicked.toLowerCase())
	// 				.then(function(response) {
	// 				    return response.json();
	// 				})
	// 				.then(function(myJson) {
	// 					var avail;
	// 					if (myJson.availability !== undefined) avail = myJson.availability;
	// 					else if (myJson.count !== undefined) avail = myJson.count;
	// 					this.setState({

	// 					})
	// 					// myThis.state.changeAvailability(avail);
	// 				});
	// 		}
	// 		this.state.changeToSubGym();
	// 	}
	// 	this.state.hideAllDivs = this.state.hideAllDivs.bind(this);
	// 	this.state.hideAllDivs();
	// 	if (this.state.hideAll || this.state.displayMainPageHeader){
	// 		this.state.changeTitle(this.state.subGymName);
	// 	}
	}

	// displayAvailability(){
	// 	if (this.state.availability){
	// 		return this.state.availability;
	// 	}
	// }

	fetchHours(){
		var myThis = this;
		fetch('https://pickapp-test.herokuapp.com/api/calendar/' + this.state.gymName.toLowerCase())
	    .then(function(response) {
        	return response.json();
    	})
    	.then(function(myJson) {
    		var today = myJson[0].split(" - ");
    		var startHour = myJson[0].split(" - ")[0].split("T")[1].split("-")[0].substring(0, 5);
    		var endHour = myJson[0].split(" - ")[1].split("T")[1].split("-")[0].substring(0, 5);
    		// console.log("today = ", today);
    		// console.log("startHour = ", startHour)
    		// console.log("endHour = ", endHour)
    		myThis.setState({
    			openHours: startHour + " - " + endHour,
    		});
    	});
	}

	fetchCalendarData(myThis, urlExt){
	    console.log("Still fetching...");
	    fetch('https://pickapp-test.herokuapp.com/api/calendar/' + urlExt)
	    .then(function(response) {
	        return response.json();
	    })
	    .then(function(myJson) {
	        console.log("myJson = ", myJson);
	        var date, startTime, endTime, eventTitle, court;
	        console.log("new Date().toISOString() = ", new Date().toISOString());
	        var today = new Date().toISOString();
	        var todayDate = today.split('T')[0];
	        var todayMinutes = parseInt(today.split('T')[1].substring(0, 2)) * 60 + parseInt(today.split('T')[1].substring(3, 5));
	        console.log("today = ", today)
	        var upcomingEvents = [];
	        for (var i = 0; i < myJson.length; i++){
	        	if (myJson[i].split("T")[0] === todayDate){
	        		var eventMinutes = parseInt(myJson[i].split('T')[1].substring(0, 2)) * 60 + parseInt(myJson[i].split('T')[1].substring(3, 5));
	        		var diff = eventMinutes - (todayMinutes - 240);
	        		var eventTitle = myJson[i].split(" - ")[2] + "in";
	        		if (diff < 120){
	        			console.log
	        			upcomingEvents.push(<Text style={{fontSize: 10, alignSelf: 'flex-start'}}>{eventTitle} in {diff} min</Text>); 
	        		}
	        	}
	        }
	        myThis.setState({
	        	upcomingEvents: upcomingEvents,
	        });
	        console.log("UPcoming = ", myThis.state.upcomingEvents);
	        // myThis.events = myJson.map((event) => {
	        //     event = event.split(" - ");
	        //     event[0] = (event[0].replace("T", "X")).split("X");
	        //     date = event[0][0];
	        //     startTime = event[0][1].split("-")[0];
	        //     endTime = ((event[1].replace("T", "X")).split("X"))[1].split('-')[0];
	        //     eventTitle = event[2];
	        //     // console.log("event = ", event);
	        //     if (event.length === 4){ court = event[3]; } 
	        //     else { 
	        //       eventTitle = event[2].split("-")[0]; 
	        //       if (event[2].split("-")[1] !== undefined ) { court = event[2].split("-")[1]; }
	        //       // console.log("COURT = ", court); console.log("eventTitle = ", eventTitle);
	        //       // if (event.length === 3){ eventTitle = }
	        //     }
	        //     // console.log("YARRAK");
	            
	        //     // console.log("eventTitle = ", eventTitle);

	        //     if (court !== undefined){
	        //       var courts = [];
	        //       if (court.includes('1')){ courts.push(1); } 
	        //       if (court.includes('2')){ courts.push(2); } 
	        //       if (court.includes('3')){ courts.push(3); } 
	        //       if (court.includes('4')){ courts.push(4); }
	        //       if (courts.length == 0){
	        //         if (court.includes('ower')){
	        //           courts.push(1);
	        //           courts.push(2);
	        //           courts.push(3);
	        //           courts.push(4);
	        //         } else if (court.includes('olleyball')){
	        //           courts.push(4)
	        //         }
	        //       }
	        //     }
	            
	        //     // console.log("AMJIK");
	        //     return(
	        //         {
	        //            date: date,
	        //            startTime: startTime,
	        //            endTime: endTime,
	        //            eventTitle: eventTitle,
	        //            courts: courts
	        //         }
	        //     );
	        // });
	        // myThis.setState({
	        //     render: true,
	        // });
	    });
	  }

	render(){
		return(
			<View style={styles.subGym}>
				<View style={styles.subGymSubHeader}>
					<Text style={styles.marginText}>
				    	{this.state.subGymName}
					</Text>
						<Text style={{bottom: 0, color: '#9B9FA3', fontSize: 15, marginRight: 5}}>
							{this.state.openHours}
						</Text>
				</View>
				<View style={styles.subGymTabContainer}>
					<View style={styles.subGymTab}>
						<Text style={styles.availabilityHeader}>Occupation</Text>
						<Text style={styles.availabilityValue}>{this.state.availability}</Text>
						<Text style={{fontSize: 15}}>people</Text>
					</View>
					<View style={styles.subGymTab}>
					    <Text style={styles.availabilityHeader}>Availability</Text>
					    <Text style={styles.availabilityValue}>{this.state.availability2}</Text>
					    <Text style={{fontSize: 10, textAlign: 'center', marginTop: 2}}>{this.state.availabilityText}</Text>
					</View>
					<View style={styles.subGymTab}>
						<Text style={styles.availabilityHeader}>Coming Up</Text>
						<View style={styles.upcomingEventsContainer}>
							<ScrollView>
								<Text>
									{this.state.upcomingEvents}
								</Text>
							</ScrollView>
						</View>
						<TouchableOpacity style={styles.subGymHeader} onPress={() => this.props.pushScreen("FacilityCalendarPage", {gymName: this.state.gymName, subGymName: this.state.subGymName})}><Text style={{fontSize: 7, color: '#657786', textAlign: 'center'}}>See more</Text></TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	upcomingEventsContainer: {
		marginTop: 10,
		height: 60,
		paddingRight: 2,
		paddingLeft: 2, 
	},
    gymContainer: {
    	borderRadius: 10,
        padding: 10,
    }, 
    subGymTabContainer: {
    	flexDirection: 'row',
    	justifyContent: 'space-around',
    	// alignItems: 'center',
    	// backgroundColor: 'red',
    	marginTop: 10,
    	// marginLeft: 10,
    	padding: 2,

    },

    subGym: {
    	// backgroundColor: 'red',
    	borderColor: '#C7CBD1',
    	borderWidth: 1,
    	padding: 5,
    	margin: 5,
    	paddingRight: 10,
    	paddingLeft: 10,
    	borderRadius: 3,
    	shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.4,
        shadowRadius: 2,
    },

    subGymTab: {
		// backgroundColor: 'blue',
		height: 120,
		alignItems: 'center',
    	width: 100,
    },

    availabilityHeader: {
		textAlign: 'left',
		fontSize: 11,
		fontWeight: 'bold',
	},

	availabilityValue: {
		marginTop: 5,
		textAlign: 'center',
		fontSize: 25,
	},

    subGymSubHeader: {
		// backgroundColor: 'yellow',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: '#E6ECF0',
		paddingBottom: 2,
		borderBottomWidth: 1,
		marginTop: 7

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
    	fontSize: 19,
        color: '#14171A',
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
    	width: 50,
    	// backgroundColor: 'purple',
    	// shadowColor: '#000',
     //    shadowOffset: { width: 0.4, height: 0 },
     //    shadowOpacity: 0.8,
     //    shadowRadius: 2,
     	borderWidth: 0.8,
     	borderColor: '#657786',
    	borderRadius: 50,
    	position: 'absolute',
    	bottom: 4,
    	padding: 4,
    },
    subGymBody: {
    	// flex: 1,
    	backgroundColor: 'blue',
    	margin: 5,
    },
});