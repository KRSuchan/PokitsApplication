//설정 조회를 위해 필요함
import React, { useState, useEffect } from 'react';
//설정 저장을 위해 필요함
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-elements';

const CheckItemBig = ({ title, onPress, describe, selected}) => (
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
                    {selected && <Image 
            source={require('../assets/images/Done.png')} // 여기에 실제 이미지 경로 입력
            style={{ width: 30, height: 30 }} // 텍스트 높이만큼 이미지 크기 설정
          />}
                    
                </View>
                <Divider style={styles.dividerstyle} orientation="horizontal" />
            </View>
        </View>
    </TouchableOpacity>
    
  );

export default function BusSettingPage({navigation}) {
    const [selectedItem, setSelectedItem] = useState(null);

    //설정 불러오기
    useEffect(() => {
        const loadSettings = async() => {
            try{
                //세팅을 변수에 담음
                const savedSetting = await AsyncStorage.getItem('busSetting');
                //비어있지 않다면 state 에 넣을 것임
                if(savedSetting !== null) setSelectedItem(savedSetting);
            } catch (error) {
                console.error(error);
            }
        }

        loadSettings(); //이걸 해줘야 실제로 작동한다.
    }, []);

    //설정 저장하기
    const saveSetting = async(setting) => {
        try{
            await AsyncStorage.setItem('busSetting',setting);
            setSelectedItem(setting); //저장후 바로 state에 넣을 것임
        } catch(error){
            console.error(error);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.h1}>선호 정류장</Text>
            <CheckItemBig
                title="옥계중학교 방면"
                describe="옥계, 산동, 인동 방향"
                onPress={() => saveSetting("옥계중학교방면")}
                selected = {selectedItem === "옥계중학교방면"}
            />
            <CheckItemBig
                title="구미시내 방면"
                describe="구미역, 버스터미널, 사곡 방향"
                onPress={()=> saveSetting("구미시내방면")}
                selected = {selectedItem === "구미시내방면"}
            />
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