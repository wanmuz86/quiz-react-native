import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';

export default function Answer(props){
    return (
        <TouchableOpacity onPress={()=> props.answerPress(props.answer)}>
        <View >
            <Text>{props.answer}</Text>
        </View>
        </TouchableOpacity>
    )
}