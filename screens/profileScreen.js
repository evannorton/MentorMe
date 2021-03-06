import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';

import { getMe, getMentorSkills, getMentorSubjects, getCategories, getSubjects } from '../services/user';
import { CategoryServices, SubjectServices, SkillServices } from '../services/attribute';
import { DEFAULT_NAVIGATION_OPTIONS } from '../services/navigation';

import ProfileButtonsTop from '../components/profileButtonsTop';
import ProfileEditList from '../components/profileEditList';
import ProfileSubjects from '../components/profileSubjects'; //mentor only
import ProfileSkills from '../components/profileSkills'; //mentor only
import ProfilePhoto from '../components/profilePhoto';
import ProfileName from '../components/profileName';
import ProfileWage from '../components/profileWage'; //mentor only
import ProfileBio from '../components/profileBio';
import ProfileContact from '../components/profileContact';
import ProfileAttributes from '../components/profileAttributes'; //mentor only
import ProfileLogout from '../components/profileLogout';

export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {},
            mySubjects: [],
            mySkills: [],
            subjects: [],
            categories: [],
            isSubjectsVisible: false,
            isSkillsVisible: false,
            isEditListVisible: false
        }
        currentSkill = '';
    };

    static navigationOptions = {
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => (tintColor == '#F8E191' ?
            <Image
                source={require('../images/usericon.png')}
                style={{ width: 40, height: 40, }}
            />
            :
            <Image
                source={require('../images/usericongray.png')}
                style={{ width: 40, height: 40, }}
            />
        ),

    }

    async componentDidMount() {
        if (this.props.screenProps.navigation.state.params) {
            if (this.props.screenProps.navigation.state.params.isSubjectsVisible) {
                this.setState({ isSubjectsVisible: this.props.screenProps.navigation.state.params.isSubjectsVisible });
            } else if (this.props.screenProps.navigation.state.params.isSkillsVisible) {
                this.setState({ isSkillsVisible: this.props.screenProps.navigation.state.params.isSkillsVisible });
            }
        }
        let me = await getMe();
        let mySubjects = await SubjectServices.getMentorSubjects(me.id);
        let mySkills = await SkillServices.getMentorSkills(me.id);
        let subjects = await SubjectServices.getSubjects();
        let categories = await CategoryServices.getCategories();
        this.setState({
            me,
            mySubjects,
            mySkills,
            subjects,
            categories
        });
    }

    renderSubjects() {
        this.setState({ isSubjectsVisible: true });
    }

    renderSkills() {
        this.setState({ isSkillsVisible: true });
    }

    renderWage() {
        if (this.state.me.usertype === 'Mentor') {
            return (
                <ProfileWage wage={this.state.me.wage} />
            );
        }
    }

    renderAttributes() {
        if (this.state.me.usertype === 'Mentor') {
            return (
                <ProfileAttributes
                    renderSubjects={() => { this.renderSubjects() }}
                    renderSkills={() => { this.renderSkills() }}
                />
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ProfileButtonsTop renderEditList={() => { this.setState({ isEditListVisible: true }) }} navigate={this.props.screenProps.navigation.navigate} />
                <ProfileEditList me={this.state.me} navigate={this.props.screenProps.navigation.navigate} visibility={this.state.isEditListVisible} />

                <ProfileSubjects
                    isSubjectsVisible={this.state.isSubjectsVisible}
                    screenProps={this.props.screenProps}
                    me={this.state.me}
                    mySubjects={this.state.mySubjects}
                    categories={this.state.categories}
                    subjects={this.state.subjects}
                />
                <ProfileSkills
                    isSkillsVisible={this.state.isSkillsVisible}
                    screenProps={this.props.screenProps}
                    me={this.state.me}
                    mySkills={this.state.mySkills}
                />
                <ProfilePhoto
                    userid={this.state.me.id}
                    image={this.state.me.image}
                    navigate={this.props.screenProps.navigation.navigate}
                />
                <ProfileName
                    name={this.state.me.name}
                />
                {this.renderWage()}
                <ProfileBio
                    bio={this.state.me.bio}
                />
                <ProfileContact
                    email={this.state.me.email}
                    phone={this.state.me.phone}
                />
                {this.renderAttributes()}


            </View>
        );
    };

}

const styles = StyleSheet.create({

    container: {
        margin: 0,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column',
        zIndex: 0,
    }

});