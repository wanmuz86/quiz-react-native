import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function Answer(props){
    return (
        <View>
            <Text>{props.answer}</Text>
        </View>
    )
}