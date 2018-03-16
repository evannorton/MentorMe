import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Button, Overlay, List, ListItem, Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {createAvailability} from '../services/calendar';




export default class AvailabilityPicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: '',
            start:'',
            end: '',
        }
    }

    submitAvailability(date,userid,start,end){
        createAvailability(date,userid,start,end);

    }
    render() {
        return (
            <Overlay
                containerStyle={styles.overlayContainer}
                overlayStyle={styles.overlay}
                fullScreen={true}
                isVisible={this.props.visibility}
            >
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <Button
                            text='Back'
                            onPress={() => {

                            }}
                        />
                    </View>
                    <View style={styles.datePickerContainer}>
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.date}
                            mode='date'
                            placeholder="Select Date"
                            format="YYYY-MM-DD"
                            minDate="2018-03-15"
                            maxDate="2018-05-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                                // ... You can check the source to find the other keys. 
                            }}

                            onDateChange={(date) => { this.setState({ date: date }) }}
                        />
                        <Input placeholder="Start Time" 
                        onStartChange={(start) => { this.setState({ start }) }}
                        />
                        <Input placeholder="End Time" 
                        onEndChange={(end) => { this.setState({ end }) }}
                        />
                        <Button text="Submit Availability"
                        onPress={()=>{this.submitAvailability(this.state.date,this.props.me.id,this.state.start,this.state.end)}}
                        />
                    </View>


                </View>
            </Overlay>

        );
    }
}

const styles = StyleSheet.create({

    overlayContainer: {
        zIndex: 1,
        margin: -5,
        backgroundColor: 'rgba(255,255,255,0.75)',
    },

    overlay: {
        zIndex: 2,
        backgroundColor: 'rgba(255,255,255,0.5)',
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttonContainer:{
        flex:1,
    },
    datePickerContainer:{
        flex: 5,
    }


})