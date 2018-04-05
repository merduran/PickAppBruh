import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity
} from 'react-native';

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
			// availability: this.props.availability,
			// changeAvailability: this.props.changeAvailability,
		};
		// this.availability;
		switch (this.state.gymName){
			case 'Nelson':
				users = 1;
				break;
			case 'OMAC':
				users = 2;
				break;
		}
		var myThis = this;
		fetch('https://pickapp-test.herokuapp.com/api/users/' + users + '/' + myThis.state.subGymName.toLowerCase())
			.then(function(response) {
			    return response.json();
			})
			.then(function(myJson) {
				var avail;
				if (myJson.availability !== undefined) avail = myJson.availability;
				else if (myJson.count !== undefined) avail = myJson.count;
				// myThis.state.changeAvailability(avail);
				myThis.setState({
					availability: avail,
				});
			});
		setInterval(function(){
			// console.log('https://pickapp-test.herokuapp.com/api/users/' + users + '/' + myThis.state.subGymName.toLowerCase());
			fetch('https://pickapp-test.herokuapp.com/api/users/' + users + '/' + myThis.state.subGymName.toLowerCase())
			.then(function(response) {
			    return response.json();
			})
			.then(function(myJson) {
				var avail;
				if (myJson.availability !== undefined) avail = myJson.availability;
				else if (myJson.count !== undefined) avail = myJson.count;
				// myThis.state.changeAvailability(avail);
				myThis.setState({
					availability: avail,
				});
			});
		}, 10000);
	}


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

	render(){
		console.log("FUCK ML BRUH");
		console.log("LORDE YAYAYA = ", this.state.availability);
		return(
			<View style={styles.subGym}>
				<View style={styles.subGymSubHeader}>
					<Text style={styles.marginText}>
				    	{this.state.subGymName}
					</Text>
				</View>
				<View style={styles.subGymTabContainer}>
					<View style={styles.subGymTab}>
						<Text style={styles.availabilityHeader}>Occupation</Text>
						<Text style={styles.availabilityValue}>{this.state.availability}</Text>
						<Text style={{fontSize: 15}}>people</Text>
						<TouchableOpacity style={styles.subGymHeader} onPress={() => this.pressHandler()}><Text style={{fontSize: 7, color: '#657786', textAlign: 'center'}}>See more</Text></TouchableOpacity>
					</View>
					<View style={styles.subGymTab}>
						<Text style={styles.availabilityHeader}>Upcoming Events</Text>
						<TouchableOpacity style={styles.subGymHeader} onPress={() => this.pressHandler()}><Text style={{fontSize: 7, color: '#657786', textAlign: 'center'}}>See more</Text></TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({

    gymContainer: {
    	borderRadius: 10,
        padding: 10,
    }, 

    subGymTabContainer: {
    	flexDirection: 'row',
    	justifyContent: 'space-around',
    	// alignItems: 'center',
    	// backgroundColor: 'red',
    	margin: 2,
    	// marginLeft: 10,
    	padding: 2,
    },

    subGym: {
    	// backgroundColor: 'red',
    	borderColor: '#C7CBD1',
    	borderWidth: 1,
    	padding: 5,
    	margin: 5,
    	width: 240,
    	borderRadius: 3,
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
		marginTop: 10,
		textAlign: 'center',
		fontSize: 25,
	},

    subGymSubHeader: {
		// backgroundColor: 'yellow',
		borderColor: '#E6ECF0',
		paddingBottom: 2,
		borderBottomWidth: 1,
    	margin: 4,
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