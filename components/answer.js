import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';

export default function Answer(props){
    return (
        <TouchableOpacity onPress={()=> props.answerPress(props.answer)} style={styles.answerButton}>
        <View >
            <Text style={{color:'white'}}>{props.answer}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    answerButton: { 
      backgroundColor: 'indigo',
      padding:20,
      width:'80%',
      alignItems:'center',
      marginVertical:10
    },
  });