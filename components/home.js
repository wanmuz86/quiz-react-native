import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native';


export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/logo.png')} style={{width:200,height:100}}></Image>

            <TouchableOpacity onPress={() => navigation.push('Question')} style={styles.startButton}>
                <View ><Text style={{color:'white'}}>Start game</Text></View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop:40,
        flex: 1,
        backgroundColor: 'lightyellow',
        alignItems: 'center',
       
    },
    startButton:{
        marginTop:40,
        backgroundColor:'indigo',
        padding:20,
       alignItems:'center',
        width:'80%'
    }
});
