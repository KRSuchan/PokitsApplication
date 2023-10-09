//설정 조회를 위해 필요함
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-elements';

export default function TermsPage ({navigation}) {
    return(
        <View style={styles.container}>
            <Text style={styles.h1}>이용약관</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
        color: "#000000",
        fontWeight: 'bold',
        fontSize: 35,         // 글자 크기를 설정하는 스타일
        marginBottom: 10,
    },

})