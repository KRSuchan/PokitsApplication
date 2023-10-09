//설정 조회를 위해 필요함
import React, { useState, useEffect } from 'react';
//설정 저장을 위해 필요함
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';

//날짜 선택을 위한 
import DateTimePicker from '@react-native-community/datetimepicker';

class Dday{
    constructor(id, ddayName, ddayDate){
        this.id = id;
        this.ddayName = ddayName;
        this.ddayDate = ddayDate;
    }
}

//React navigation 에서 route 랑 navigation 을 인자로 받음
export default function DdayEditPage({route, navigation}){
    const [dday,setDday] = useState(route.params); 
    //이전 페이지에서 ddays를 "객체" 로 전달해 주었으므로, 여기서도 그 객체를 그대로 사용할 것임.
    const [date,setDate] = useState(new Date(dday.ddayDate));

    const deleteDdays = async() => {
        try{
            //로컬에 저장된 디데이 불러옴
            let jsonValue = await AsyncStorage.getItem('ddays')
            //비어있지 않다면 json 파싱
            let data = jsonValue != null ? JSON.parse(jsonValue) : [];
            //선택된 디데이 id를 필터링한 값이 newData
            let newData = data.filter(item=> item.id!=dday.id);
            //그걸 로컬 디데이에 넣고
            await AsyncStorage.setItem('ddays',JSON.stringify(newData));
            //앞 페이지로 이동
            navigation.goBack();
        }catch(e){
            console.log(e);
        }
    };


    return(
        <View style={styles.container}>
            <Text style={styles.h1}>디데이 수정</Text>
            <TextInput 
                style={styles.input}
                value={'nice to meet you'}
                placeholder='hello'
            />
            <Button title="삭제" onPress={()=>deleteDdays()}/>
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

    input:{
        height: 40,
    }
})