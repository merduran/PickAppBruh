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

const {width} = Dimensions.get('window');
var { height } = Dimensions.get('window');

var box_count = 2;
var box_height = (height-66) / box_count;

class HomeScreen extends Component {

    // static navigatorStyle = {
    //     drawUnderNavBar: true,
    //     navBarTranslucent:true,
    //     navBarNoBorder: true,
    //     navBarTextColor: 'black',
    //     navBarButtonColor: 'black',
    //
    // };

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
                            Sport           Availability            Trend
                            </Text>
                            {/*<View style={styles.marginContainer}>*/}
                                {/*<Text style={styles.textStyle}>*/}
                                    {/*Sport*/}
                                {/*</Text>*/}
                                {/*<Text style={styles.textStyle}>*/}
                                    {/*Availability*/}
                                {/*</Text>*/}
                                {/*<Text style={styles.textStyle}>*/}
                                    {/*Trend*/}
                                {/*</Text>*/}
                            {/*</View>*/}
                            <View style={styles.buttonCC}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button1]}
                                        onPress={this.onPress}>
                                        {/*() => alert('Thank You')*/}
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button2]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button3]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button1]}
                                        onPress={() => alert('Thank You')}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button2]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button3]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button1]}
                                        onPress={() => alert('Thank You')}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button2]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button3]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.box]}>
                            <Text style={styles.headerText}>
                                Nelson
                            </Text>
                            <Text style={styles.marginText}>
                                Sport           Availability            Trend
                            </Text>
                            <View style={styles.buttonCC}>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button1]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button2]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button3]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button1]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button2]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button3]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button1]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button2]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, styles.button3]}
                                        onPress={this.onPress}>
                                        <Text style={styles.textStyle}> Touch Here </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>



                    {/*<NavigationToolBarIOS key='segmented' translucent={true} style={styles.toolBarStyle}>*/}
                    {/*<Button title={"Anan, Press Me"} onPress={() => alert('Thank You')}/>*/}
                    {/*</NavigationToolBarIOS>*/}
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
    // toolBarStyle: {
    //     top: 0,
    //     width: width,
    //     position: 'absolute',
    //     borderTopWidth: 0,
    //     height: 0,
    //     backgroundColor: 'transparent'
    //
    // },
    container: {
        // top:60,
        width:300,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    box: {
        height: height*.8, //set this one
        alignItems:'stretch',
        // justifyContent:'center',
        backgroundColor: '#56565C',
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
        flex: 1,
        flexDirection: 'row',
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
        width: 100,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        opacity: 0.8,
        marginTop:10,
        paddingTop:15,
        paddingBottom:15,
        marginLeft:10,
        marginRight:10,
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

});



module.exports = HomeScreen;