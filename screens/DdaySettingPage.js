//설정 조회를 위해 필요함
import React, { useState, useEffect } from 'react';
//설정 저장을 위해 필요함
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-elements';

// Dday 클래스 정의
class Dday{
    constructor(id, ddayName, ddayDate){
        this.id = id;
        this.ddayName = ddayName;
        this.ddayDate = ddayDate;
    }
}

// Setting item component
const DdayItemBig = ({ title, onPress, describe}) => (
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
            source={require('../assets/images/Next.png')} // 여기에 실제 이미지 경로 입력
            style={{ width: 10, height: 30 }} // 텍스트 높이만큼 이미지 크기 설정
          />
                </View>
                <Divider style={styles.dividerstyle} orientation="horizontal" />
            </View>
        </View>
    </TouchableOpacity>
    
  );

export default function DdaySettingPage({navigation}){
    const [ddays, setDdays] = useState([]);

    useEffect(()=>{
        getData();
    },[]);

    const getData = async() => {
        try{
            const jsonValue = await AsyncStorage.getItem('ddays')
            let data = jsonValue != null ? JSON.parse(jsonValue) : [];
            setDdays(data);

        }catch(e){
            console.log(e)
        }
    }

    const addDdays = async() => {
        let id = Math.random.toString(36).substring(2); //난수를 36진수로 변환후 앞2글자 삭제
        let dateObj = new Date();
        let month = String(dateObj.getMonth()+1).padStart(2,'0');  //JS는 0월부터 시작, 문자열 2글자 맞추기
        let day = String(dateObj.getDate()).padStart(2,'0');
        let year = dateObj.getFullYear();

        const newDday = new Dday(id,`${year}-${month}-${day}`, `${year}-${month}-${day}`)

        try{
            ddays.push(newDday);
            await AsyncStorage.setItem('ddays',JSON.stringify(ddays));
            setDdays([...ddays]);
        }catch(e){
            console.log(e);
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.h1}>디데이 설정</Text>
            <DdayItemBig
                title="디데이 추가"
                describe="지금 디데이를 추가해 보세요"
                onPress={addDdays}
            />
            {ddays.map(dday =>
                <DdayItemBig
                title={dday.ddayName}
                describe={dday.ddayDate}
                onPress={()=>navigation.navigate('디데이 수정',dday)}
            />)}
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