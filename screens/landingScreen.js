import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { TimerMixin } from 'react-timer-mixin';


import { DEFAULT_NAVIGATION_NO_ARROW } from '../services/navigation';

const wateringCan = require('../images/wateringcaniconblue.png');

const wateringCanWater = require('../images/wateringcaniconwaterblue.png');

const seedling = require('../images/seedlingiconyoungblue2.png');

const seedlingLeaves = require('../images/seedlingiconmatureblue2.png');



export default class LandingScreen extends Component {

    constructor() {
        super();
        this.state = { showWateringCan: true, showSeedling: true };

    }

    static navigationOptions = DEFAULT_NAVIGATION_NO_ARROW;

    studentNavigate(userType) {
        setTimeout(() => {
            this.setState({ showSeedling: !this.state.showSeedlingLeaves });
            this.props.navigation.navigate('Login', { userType })
        }, 800);
    }

    mentorNavigate(userType) {
        setTimeout(() => {
            this.setState({ showWateringCan: !this.state.showWateringCan });
            this.props.navigation.navigate('Login', { userType })
        }, 800);
    }

    renderMentor() {
        let mentorSource = this.state.showWateringCan ?
            wateringCan : wateringCanWater;

        return (
            <Image
                style={styles.icon}
                source={mentorSource}
            />
        );
    }

    renderStudent() {
        let studentSource = this.state.showSeedling ?
            seedling : seedlingLeaves;

        return (
            <Image
                style={styles.icon}
                source={studentSource}
            />
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../images/mentormeboldyellow2.png')} />
                </View>

                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ showWateringCan: !this.state.showWateringCan })
                            this.mentorNavigate('Mentor')
                        }}>
                        {this.renderMentor()}
                    </TouchableOpacity>

                    <Text style={styles.text}> Mentor </Text>
                </View>

                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ showSeedling: !this.state.showSeedling })
                            this.studentNavigate('Student')
                        }}>
                        {this.renderStudent()}
                    </TouchableOpacity>
                    <Text style={styles.text}> Student </Text>
                </View>

            </View >
        );
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#405E63',
        flex: 1,
    },

    imageContainer: {
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        flex: 0,
    },

    image: {
        flex: 1,
        resizeMode: 'contain',
        height: 100,
        width: 300,
    },

    buttonContainer: {
        paddingRight: 20,
        paddingLeft: 20,
        flexDirection: 'row',
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        borderColor: 'rgb(135,204,236)',
        backgroundColor: 'rgb(187,208,157)',
        borderRadius: 62,
        borderWidth: 1,
        height: 124,
        width: 124,
    },

    text: {
        fontSize: 18,
        fontWeight: '500',
    },

    iconContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 0,
        marginTop: 40,
    },

    icon: {
        resizeMode: 'contain',
        width: 150,
        height: 150
    }

})