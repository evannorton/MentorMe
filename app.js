import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LandingScreen from './screens/landingScreen';
import LoginScreen from './screens/loginScreen';
import SignUpScreen from './screens/signUpScreen';
import TabScreen from './screens/tabScreen';
import MentorListScreen from './screens/mentorListScreen';
import CameraRollScreen from './screens/cameraRollScreen';
import { setCustomText } from 'react-native-global-props';
import { Platform } from 'react-native';

const RootNavigator = StackNavigator({
    Home: { screen: LandingScreen },
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen },
    Tab: { screen: TabScreen },
    MentorList: { screen: MentorListScreen },
    CameraRoll: { screen: CameraRollScreen }
}, { intitialRouteName: 'Home' }
);

const customTextProps = {
    style: {
        fontFamily: Platform.OS === 'ios' ? 'AvenirNextCondensed-Regular' : 'Roboto'
    }
};

setCustomText(customTextProps);

export default class App extends Component {
    render() {
        return (
            <RootNavigator />
        );
    }
}