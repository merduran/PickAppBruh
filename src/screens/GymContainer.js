import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
} from 'react-native';

import GymButtonContainer from './GymButtonContainer.js';
import { NavigationToolBarIOS } from 'react-native-navigation';


export default class GymContainer extends Component{
	constructor(props){
		super(props);
        // console.log("MURAT = ", this.props.navigator);
		this.state = {
			gymName: this.props.gymName,
			subGymNames: this.props.subGymNames,
            subGymClicked: this.props.subGymClicked,
            displayMainPageHeader: this.props.displayMainPageHeader,
            hideAll: this.props.hideAll,
            availability: this.props.availability,
		};
        this.header = this.state.gymName;
        // console.log("screenWidth = ", _window.);
        // this.subHeader = 'Choose a Sport';
	}

    // hideAllDivs(){
    //     console.log("HIDE AND SEEK? ", this.state.hideAll);
    //     this.setState({
    //         hideAll: !this.state.hideAll,
    //     });
    //     console.log("AN? ", this.state.hideAll);
    // }

	createFunctionalityDivs(){
		var funcDivs = [];
        var names = ['Availability', 'Schedule'];
		for (var i = 0; i < names.length; i++){
			funcDivs.push(
                <GymButtonContainer 
                    key={i} 
                    gymName={this.state.gymName}
                    subGymName={names[i]} 
                    changeTitle={this.changeTitle.bind(this)} 
                    changeToSubGym={this.changeToSubGym.bind(this)} 
                    subGymClicked={this.state.subGymClicked}
                    hideAll={this.state.hideAll}
                    hideAllDivs={this.hideAllDivs.bind(this)}
                    displayMainPageHeader={this.state.displayMainPageHeader}
                    availability={this.state.availability}
                    changeAvailability={this.changeAvailability.bind(this)}>
                </GymButtonContainer>
	    	);
		}
        // if (!this.state.displayMainPageHeader && !this.state.hideAll){
        return funcDivs;
	}

    createSubGyms(){
        var subGyms = [];
        for (var i = 0; i < this.state.subGymNames.length; i++){
            subGyms.push(
                <GymButtonContainer 
                    key={i} 
                    gymName={this.state.gymName}
                    subGymName={this.state.subGymNames[i]} 
                    changeTitle={this.changeTitle.bind(this)} 
                    changeToSubGym={this.changeToSubGym.bind(this)} 
                    subGymClicked={this.state.subGymClicked}
                    hideAll={this.state.hideAll}
                    hideAllDivs={this.hideAllDivs}
                    displayMainPageHeader={this.state.displayMainPageHeader}
                    availability={this.state.availability}
                    changeAvailability={this.changeAvailability.bind(this)}
                    navigator={this.props.navigator} 
                    pushScreen={this.props.pushScreen.bind(this)}>
                </GymButtonContainer>
            );
        }
        // if (this.state.displayMainPageHeader && !this.state.hideAll){
        //     return subGyms;
        // }
        return subGyms;
    }

    // displayFunctionScreen(){
    //     if (!this.state.displayMainPageHeader && this.state.hideAll){
    //         return(
    //             <Text style={{color: 'yellow'}}>{this.state.availability}</Text>
    //         );
    //     }
    // }

    changeTitle(titleFromButton){
        // console.log("ANNEN = ", titleFromButton);
        this.setState({
            subGymClicked: titleFromButton,
        });
    }

    changeAvailability(availabilityData){
        // console.log("availabilityData = ", availabilityData);
        this.setState({
            availability: availabilityData,
        });
    }

	// <View style={styles.gymContainer}>
	//             <View style={styles.headerContainer}>
	//                  <Text style={styles.headerText}>{this.state.gymName}</Text>
	//                  <Text style={styles.marginText}>Choose a Sport</Text>
	//              </View>
	//              <View style={styles.buttonCC}>
	//  	            <View
	//  			        style={styles.button}
	//  			        onPress={this.pushBasketballScreen}>
	//  	                {this.createSubGyms()}
	//  	            </View>
	//              </View>
	//         </View>


// IMPORTANT: ENTRY SCREEN
// _______________________

    // <View style={styles.gymContainer}>
    //             <View style={styles.headerContainer}>
    //                  <Text style={styles.headerText}>{this.state.gymName}</Text>
    //                  <Text style={styles.marginText}>Choose a Sport</Text>
    //              </View>
    //              <View style={styles.buttonCC}>
    //                 {this.createSubGyms()}
    //              </View>
    //         </View>

// IMPORTANT: PRESS SCREEN
// _______________________

    // displayNavigation(){
    //     if (!this.state.displayMainPageHeader){
    //         return(
    //             <TouchableOpacity onPress={() => this.goToMainPage()}>
    //                 <Text style={styles.navigation}>Go Back</Text>
    //             </TouchableOpacity>
    //         );
    //     }
    // }

    // goToMainPage(){
    //     if (this.state.hideAll){
    //         this.setState({
    //             displayMainPageHeader: false,
    //             hideAll: false,
    //         });
    //     } else {
    //         this.setState({
    //             displayMainPageHeader: true,
    //         });
    //     }
        
    // }

    changeToSubGym(){
        this.setState({
            displayMainPageHeader: false,
        }); 
    }

    displayHeader(){
        // var header = this.state.gymName;;
        // if (this.state.displayMainPageHeader){
        //     if (!this.state.hideAll){
        //         this.header = this.state.gymName;
        //         this.subHeader = 'Choose a Sport';
        //     }
        // } else {
        //     if (!this.state.hideAll){
        //         this.header = this.state.subGymClicked;
        //         this.subHeader = this.state.gymName;    
        //     }
        // }
        return(

            <View style={styles.headerContainer}>   
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>{this.header}</Text>
                </View>
            </View>

        );
    }

	render(){
        // console.log("MURAT = ", this.state.subGymClicked);
		return(

			<TouchableOpacity style={styles.gymContainer}>
	           {this.displayHeader()}
	             <View style={styles.buttonCC}>
	 	            {this.createSubGyms()}
	             </View>
	        </TouchableOpacity>

		);
	}
}
const Dimensions = require('Dimensions');
var _window = Dimensions.get('window');
const styles = StyleSheet.create({

    navigation: {
        opacity: 0.9,
        color: '#14171A',
    },

    headerTextContainer: {
        // backgroundColor: 'green',
    },

    gymContainer: {
        backgroundColor: 'white',
        marginTop: 20,
        marginBottom: 0,
        borderRadius: 1,
        // borderWidth: 2,
        // borderColor: '#E6ECF0',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        width: _window.width,
    }, 

    buttonCC: {
        // backgroundColor: 'black',
        borderTopWidth: 1,
        borderColor: '#E6ECF0',
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
        // backgroundColor: 'blue',
        width: 260,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerText: {
        color: '#14171A',
        textAlign: 'left',
        fontSize: 30,
    },
    marginText: {
        color: '#14171A',
        textAlign: 'left',
        marginBottom: 10,
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
        width: 200,
    	backgroundColor: 'purple',
        textAlign: 'center',
    	padding: 7,
    },
    subGymBody: {
    	flex: 1,
    	backgroundColor: 'white',
    	margin: 5,
    },
});