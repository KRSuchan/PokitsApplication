import React from 'react';
import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-elements';

const SettingItemBig = ({ title, onPress, describe, isCheck}) => (
    <TouchableOpacity style={{width:'100%'}} onPress={onPress}>
        <View style={styles.itemcontainer}>
            <View style-={styles.vbox}>
                <View style={styles.hbox}>
                    <View style={styles.vbox}>
                        <Text style={styles.itemtitle}>
                            {title}
                        </Text>
                        <Text style={styles.itemdescribe}>
                            {describe}
                        </Text>
                    </View>
                    <Image 
            source={require('../assets/images/Done.png')} // 여기에 실제 이미지 경로 입력
            style={{ width: 10, height: 30 }} // 텍스트 높이만큼 이미지 크기 설정
          />
                </View>
                <Divider style={styles.dividerstyle} orientation="horizontal" />
            </View>
        </View>
    </TouchableOpacity>
    
  );

export default function BusSettingPage({navigation}) {
    return(
        <View style={styles.container}>
            <Text style={styles.h1}>선호 정류장</Text>

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

    h1: {
        fontWeight: 'bold',
        fontSize: 35,         // 글자 크기를 설정하는 스타일
        marginBottom: 10,
    },

    vbox:{
        flexDirection:'column',
    },

    hbox:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:9,
    },

    itemtitle: {
        fontSize: 20,
        fontWeight:'600',
        marginBottom:2,
    },

    itemdescribe: {
        fontSize: 17,
        color:"#8A8A8E",
        fontWeight:'500',
    },
})