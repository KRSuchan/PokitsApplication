import React from 'react';
import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-elements';

export default function BusPage({navigation}){
    return(
        <View style={styles.fullcontainer}> 
            <View style={styles.topView}>
                
            </View>
             <View style={styles.container}>
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start', 
      padding: 20,
    },
    topView:{
        flex: 1,
        height: 50,
        padding: 20,
    },
    fullcontainer:{
        flex: 1, //화면 꽉채워줭
        backgroundColor: '#fff',
    }
})