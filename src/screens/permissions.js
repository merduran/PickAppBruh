import Permissions from 'react-native-permissions'
import React, { Component } from 'react';
import {Navigation} from 'react-native-navigation';

export default class permissions extends React.Component {
    //...

    // Check the status of a single permission
    componentDidMount() {
        Permissions.check('location').then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({ photoPermission: response })
        })
    }

    // Request permission to access photos
    _requestPermission = () => {
        Permissions.request('location').then(response => {
            // Returns once the user has chosen to 'allow' or to 'not allow' access
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
            this.setState({ photoPermission: response })
        })
    }

    // Check the status of multiple permissions
    _checkCameraAndPhotos = () => {
        Permissions.checkMultiple(['location', 'notification']).then(response => {
            //response is an object mapping type to permission
            this.setState({
                cameraPermission: response.camera,
                photoPermission: response.photo,
            })
        })
    }

    // This is a common pattern when asking for permissions.
    // iOS only gives you once chance to show the permission dialog,
    // after which the user needs to manually enable them from settings.
    // The idea here is to explain why we need access and determine if
    // the user will say no, so that we don't blow our one chance.
    // If the user already denied access, we can ask them to enable it from settings.

     _alertForLocationPermission() {
        Alert.alert(
            'Can we access your location?',
            'We need access so you can determine availability',
            [
                {
                    text: 'No way',
                    onPress: () => console.log('Permission denied'),
                    style: 'cancel',
                },
                this.state.photoPermission == 'undetermined'
                    ? { text: 'OK', onPress: this._requestPermission }
                    : { text: 'Open Settings', onPress: Permissions.openSettings },
            ],
        )
    }

}