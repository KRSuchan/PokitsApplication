//설정 조회를 위해 필요함
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-elements';

export default function DevInfoPage ({navigation}) {
    return(
        <View style={styles.container}>
            <Text style={styles.h1}>개발팀</Text>
            <View style={styles.secondcontaioner}>
                <Image source={require('../assets/images/devinfo.png')}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000000',
      alignItems: 'flex-start',
      justifyContent: 'flex-start', 
      padding: 20,
    },

    secondcontaioner: {
        paddingTop: '20%',
        flex: 1,
        width: "100%",
        alignItems: 'center'
    },

    h1: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 35,         // 글자 크기를 설정하는 스타일
        marginBottom: 10,
    },

})