import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { SubjectServices } from '../services/attribute';

export default class ProfileSubject extends Component {

    render() {
        return (
            <View>
                {
                    this.props.subjects.map((subject) => {
                        if (subject.categoryid === this.props.categoryid) {
                            return (
                                <TouchableOpacity
                                    key={subject.id}
                                    onPress={() => {
                                        SubjectServices.postMentorSubject(this.props.userid, subject.id)
                                            .then(() => {
                                                this.props.refresh();
                                            })
                                    }}>
                                    <View style={styles.contentContainer}>
                                        <View key={subject.id} style={styles.content} >
                                            <Text style={styles.subjectText}>
                                                {subject.name}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                            );
                        }
                    })
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#465C62',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 40,
        borderWidth: 2,
        borderColor: 'black',
    },
    contentContainer: {
        flex: 0,
        flexDirection: 'row',
        paddingLeft: 40,
        paddingRight: 40
    },
    subjectText: {
        color: '#F8E191',
        fontSize: 20,
    }
})