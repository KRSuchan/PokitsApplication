//설정 조회를 위해 필요함, 
//페이지 스크롤이 필요함. 이 페이지
import React, { useState, useEffect } from 'react';
//설정 저장을 위해 필요함
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Divider } from 'react-native-elements';

//학과 정보가 담긴 json파일
import departments from '../assets/data/departments.json';

  const CheckItemSmall = ({title, onPress, selected}) => (
    <TouchableOpacity style={{width:'100%'}} onPress={onPress}>
        <View style={styles.itemcontainer}>
            <View style-={styles.vbox}>
                <View style={styles.hbox}>
                    <View style={styles.hbox}>
                        <Text style={styles.itemtitle}>
                            {title}
                        </Text>
                    </View>
                    {selected && <Image 
            source={require('../assets/images/Done.png')} 
            style={{ width: 30, height: 30 }} // 텍스트 높이만큼 이미지 크기 설정
          />}
                    
                </View>
                <Divider style={styles.dividerstyle} orientation="horizontal" />
            </View>
        </View>
    </TouchableOpacity>
    
  );

export default function DepartmentSettingPage({navigation}) {
    const [selectedItem, setSelectedItem] = useState(null);

    //설정 불러오기
    useEffect(() => {
        const loadSettings = async() => {
            try{
                //세팅을 변수에 담음
                const savedSetting = await AsyncStorage.getItem('departmentSetting');
                console.log(savedSetting)
                //비어있지 않다면 state 에 넣을 것임
                if(savedSetting !== null) setSelectedItem(JSON.stringify(savedSetting));
            } catch (error) {
                console.error(error);
            }
        }

        loadSettings(); //이걸 해줘야 실제로 작동한다.
    }, []);

    //설정 저장하기
    const saveSetting = async(setting) => {
        try{
            await AsyncStorage.setItem('departmentSetting',JSON.stringify(setting));
            setSelectedItem(JSON.stringify(setting)); //저장후 바로 state에 넣을 것임
        } catch(error){
            console.error(error);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.h1}>내 학과 설정</Text>
            <ScrollView style={width="100%"}>
                {Object.keys(departments).map((key)=>(
                        <CheckItemSmall
                            key={key} //map 을 위한 키임.
                            title={key} //실제 표시되는 값임
                            onPress={()=> saveSetting(key)} //눌렀을때 학과명으로 저장할 것임
                            selected = {selectedItem === JSON.stringify(key)} //저장된 학과명과 지금 이 학과명이 같은가?
                    />
                ))}
            </ScrollView>
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