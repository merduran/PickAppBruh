import _ from 'lodash';
import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
    View,
    ScrollView,
    Dimensions,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
import {NavigationToolBarIOS} from 'react-native-navigation';
// import Permissions from 'react-native-permissions';
// import permissions from './permissions';
//import {_alertForLocationPermission} from './permissions';

const {width} = Dimensions.get('window');
var { height } = Dimensions.get('window');

var box_count = 2;
var box_height = (height-66) / box_count;

// permissions._alertForLocationPermission();

class HomeScreen extends Component {

    static navigatorStyle = {
        drawUnderNavBar: true,
        navBarTranslucent:true,
        navBarNoBorder: true,
        navBarTextColor: 'black',
        navBarButtonColor: 'black',

    };
    pushFitnessScreen = () => {
        this.props.navigator.push({
            screen: 'PickApp.Screens.fitnessScreen',
            title: 'Fitness',
        });
    };
    pushPoolScreen = () => {
        this.props.navigator.push({
            screen: 'PickApp.Screens.poolScreen',
            title: 'Pool',
        });
    };
    pushBasketballScreen = () => {
        this.props.navigator.push({
            screen: 'PickApp.Screens.basketballScreen',
            title: 'Basketball',
        });
    };
    pushTrackScreen = () => {
        this.props.navigator.push({
            screen: 'PickApp.Screens.trackScreen',
            title: 'Track',
        });
    };
    pushVolleyballScreen = () => {
        this.props.navigator.push({
            screen: 'PickApp.Screens.volleyballScreen',
            title: 'Volleyball',
        });
    };
    pushBadmintonScreen = () => {
        this.props.navigator.push({
            screen: 'PickApp.Screens.badmintonScreen',
            title: 'Fitness',
        });
    };
    render(){
        return (
            <View
                style={styles.cellContainer}>
                <LinearGradient colors={['#212176', '#A8611A', '#11113B']}
                style={styles.linearGradient}>

                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View
                        style={styles.container}>
                        <View style={[styles.box]}>
                            <Text style={styles.headerText}>
                                OMAC
                            </Text>
                            <Text style={styles.marginText}>
                            Choose a Sport
                            </Text>
                            <View style={styles.buttonCC}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button1]}
                                        onPress={this.pushBasketballScreen}>
                                        <Text style={styles.textStyle}> Basketball </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button2]}
                                        onPress={this.pushTrackScreen}>
                                        <Text style={styles.textStyle}> Track </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button3]}
                                        onPress={this.pushVolleyballScreen}>
                                        <Text style={styles.textStyle}> Volleyball </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button1]}
                                        onPress={this.pushBadmintonScreen}>
                                        <Text style={styles.textStyle}> Badminton </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.box]}>
                            <Text style={styles.headerText}>
                                Nelson
                            </Text>
                            <Text style={styles.marginText}>
                                Choose a Sport
                            </Text>
                            <View style={styles.buttonCC}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button1]}
                                        onPress={this.pushFitnessScreen}>
                                        <Text style={styles.textStyle}> Fitness </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button2]}
                                        onPress={this.pushPoolScreen}>
                                        <Text style={styles.textStyle}> Pool </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={[styles.button, styles.button4]}>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={[styles.button, styles.button4]}>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>



                    <NavigationToolBarIOS key='segmented' translucent={true} style={styles.toolBarStyle}>
                    {/*<Button title={"Anan, Press Me"} onPress={() => alert('Thank You')}/>*/}
                    </NavigationToolBarIOS>
                </ScrollView>
                </LinearGradient>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        // flex:1,
        // paddingVertical: 0,
        // backgroundColor: '#212176',
        // opacity: 0.7,
    },
    linearGradient: {
        flex: 1,
        // paddingLeft: width/2,
        // paddingRight: width/2,
        // paddingHorizontal: 0,
        justifyContent: 'center',
        alignItems:'center',

        // borderRadius: 5,
    },
    cellContainer: {
        flex: 1,
        // paddingVertical: 30,
        // justifyContent: 'center',
        // alignItems:'center',
        // backgroundColor: '#212176',
    },
    toolBarStyle: {
        top: 0,
        width: width,
        position: 'absolute',
        borderTopWidth: 0,
        height: 0,
        backgroundColor: 'transparent'

    },
    container: {
        //top:60,
        //bottom:60,
        width:350,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    box: {
        top:60,
        height: height*.6, //set this one
        alignItems:'stretch',
        // justifyContent:'center',
        backgroundColor: 'transparent',//'#56565C',
        opacity: 0.8,
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:5,
        marginRight:5,
        borderRadius:10,
        borderWidth: 1,
        borderColor: 'transparent'//'#fff'
    },
    // marginContainer: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     // alignItems: 'center',
    //     paddingTop: 20,
    //     paddingHorizontal: 20,
    //     height: 10,
    //     justifyContent: 'space-between',
    //     backgroundColor: 'black'
    // },
    buttonCC: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        // flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        color: 'white',
        textAlign: 'center',
        opacity: 1,
        fontSize: 30,
    },
    marginText: {
        color: 'white',
        paddingTop:20,
        textAlign: 'center',
        opacity: 1,
    },
    textStyle: {
        color: 'white',
        textAlign: 'center',
        opacity: 1,
    },
    button: {
        flex: 1,
        width: 300,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',

        opacity: 0.8,
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:5,
        marginRight:5,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    button1: {
        backgroundColor: '#3B3B3B',

    },
    button2: {
        backgroundColor: '#262525',
    },
    button3: {
        backgroundColor: '#1C1C1C',

    },
    button4: {
        backgroundColor: 'transparent',
        borderColor:'transparent',
    }

});



module.exports = HomeScreen;