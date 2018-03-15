import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, } from 'react-native';
import { Calendar, CalenderList, Agenda } from 'react-native-calendars'
import { Button } from 'react-native-elements';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';
import { getMe, getUser } from '../services/user';
import { getAppointments } from '../services/calendar';
import { SubjectServices } from '../services/attribute';




export default class CalendarScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            me: {},
            calendarDates: {},
            user: {
                name: ''
            },
            subject:{
                name: ''
            }
        }
    }

    static navigationOptions = {
        title: 'Calendar',
        tabBarIcon: ({ tintColor }) => (tintColor == '#F8E191' ?
            <Image
                source={require('../images/calendaricon.png')}
                style={{ width: 40, height: 40, }}
            />
            :
            <Image
                source={require('../images/calendaricongray.png')}
                style={{ width: 40, height: 40, }}
            />

        ),
    }

    async componentDidMount() {
        let me = await getMe();
        let appointments = await getAppointments(me.usertype, me.id, 1);
        let calendarDates = {}
        let appointmentsForSpecificDate = [];
        let lastDate = appointments[0].date.substring(0,10);
        for (let i = 0; i <= appointments.length; i++) {
            if (i === appointments.length) {
                calendarDates[lastDate] = appointmentsForSpecificDate;
            } else {
                if (appointments[i].date.substring(0,10) === lastDate) {
                    appointmentsForSpecificDate.push(appointments[i]);
                } else {
                    calendarDates[lastDate] = appointmentsForSpecificDate;
                    appointmentsForSpecificDate = [appointments[i]];
                }
                lastDate = appointments[i].date.substring(0,10);
            
            }
            console.log(calendarDates);
        }
        this.setState({
            me,
            calendarDates,
        }
        )
        
    }

    navigate(screen) {
        userType = this.props.navigation.state.params.userType;
        this.props.navigation.navigate(screen, { userType });
    };

    loadItems(day) {
        setTimeout(() => {
          for (let i = -15; i < 85; i++) {
            const time = day.timestamp + i * 24 * 60 * 60 * 1000;
            const strTime = this.timeToString(time);
            if (!this.state.calendarDates[strTime]) {
              this.state.calendarDates[strTime] = [];
             
            }
          }
          const newItems = {};
          Object.keys(this.state.calendarDates).forEach(key => {newItems[key] = this.state.calendarDates[key];});
          this.setState({
            calendarDates: newItems
          });
        }, 1000);

      };
      
      timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
      };

    
     

     renderItem(item) {
        SubjectServices.getSubject(item.subjectid).then((subject)=>{
            this.setState({
                subject,
            });
        });
        if(this.state.me.usertype === 'Mentor'){
            
           getUser(item.studentid).then((user)=>{
              this.setState({
                user,
              })
           }); 
           
    
           
        return (
            <View style={styles.item}>
                <View style={styles.layout2}>
                    <View style={styles.layout}>
                        <Text>Class:</Text>
                    </View>
                    <View style={styles.layout}>
                        <Text>Time:</Text>
                    </View>
                    <View style={styles.layout}>
                        <Text>Student:</Text>
                    </View>
                </View>
                <View style={styles.layout2}>
                    <View style={styles.layout}>
                        <Text>{this.state.subject.name}</Text>
                    </View>
                    <View style={styles.layout}>
                        <Text>{item.hour}</Text>
                    </View>
                    <View style={styles.layout}>
                        <Text>{this.state.user.name}</Text>
                    </View>
                </View>
            </View>
        
        );}else{
            getUser(item.mentorid).then((user)=>{
                this.setState({
                  user,
                });
            });
                return(
            <View style={styles.item}>
            <View style={styles.layout2}>
                <View style={styles.layout}>
                    <Text>Class:</Text>
                </View>
                <View style={styles.layout}>
                    <Text>Time:</Text>
                </View>
                <View style={styles.layout}>
                    <Text>Mentor:</Text>
                </View>
            </View>
            <View style={styles.layout2}>
                <View style={styles.layout}>
                    <Text>{this.state.subject.name}</Text>
                </View>
                <View style={styles.layout}>
                    <Text>{item.hour}</Text>
                </View>
                <View style={styles.layout}>
                    <Text>{this.state.user.name}</Text>
                </View>
            </View>
        </View>

                )}
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text></Text></View>
        );
    };

    renderButton(){
        if(this.state.me.usertype=== 'Mentor'){
            return(
                <Button text='My Availability' />
            )
        }
    }

    render() {
            return (
                <View style={styles.container}>
                    {this.renderButton()}
                    
                    <Agenda
                        items={this.state.calendarDates}
                        renderItem={this.renderItem.bind(this)}
                        loadItemsForMonth={this.loadItems.bind(this)}
                        renderEmptyDate={this.renderEmptyDate.bind(this)}
                        rowHasChanged={(r1, r2) => { return r1.text !== r2.text }}
                    />
                </View>
            );

       
            
        
    };
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center'
    },

    text: {
        textAlign: 'center'
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,

    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    layout: {
        flex: 1,
        padding: 5,

    },
    layout2: {
        flex: 1,
        flexDirection: 'row',
    },



});