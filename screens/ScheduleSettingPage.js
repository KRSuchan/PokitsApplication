//설정 조회를 위해 필요함
import React, { useState, useEffect } from 'react';
//설정 저장을 위해 필요함
import AsyncStorage from '@react-native-async-storage/async-storage';

//토글 버튼을 위해 필요
import ToggleSwitch from 'toggle-switch-react-native'

import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-elements';

const SettingItemBig = ({ title, onPress, describe}) => (
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

  const ToggleItemBig = ({ title, onPress, describe, toggled}) => (
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
                    <ToggleSwitch
                        isOn = {toggled}
                        onToggle={onPress}
                    />
                </View>
                <Divider style={styles.dividerstyle} orientation="horizontal" />
            </View>
        </View>
    </TouchableOpacity>
  );

export default function ScheduleSettingPage({navigation}) {
    //수업일수 표시 상태
    const [selectedItem, setSelectedItem] = useState(null);

    //설정 불러오기
    useEffect(() => {
        const loadSettings = async() => {
            try{
                //세팅을 변수에 담음
                const savedSetting = await AsyncStorage.getItem('scheduleViewSetting');
                //비어있지 않다면 state 에 넣을 것임
                if(savedSetting !== null) setSelectedItem(JSON.parse(savedSetting));
            } catch (error) {
                console.error(error);
            }
        }

        loadSettings(); //이걸 해줘야 실제로 작동한다.
    }, []);

    //설정 저장하기, 근데 비어있으면 기본값을 1로 잡을 것임.
    const saveSetting = async(setting) => {
        try{
            if(setting == null){
                setting = true;
            }
            setting = setting == true ? false : true;
            //기존 세팅값이 비어있으면 true로 먼저 불러오고 반대 상태로 변경해둔다.
            await AsyncStorage.setItem('scheduleViewSetting',JSON.stringify(setting));
            //토글상태는 true/false인데, asyncstorage 는 string 만 지원하므로 string 으로 먼저 저장
            setSelectedItem(setting); //저장후 바로 state에 넣을 것임
        } catch(error){
            console.error(error);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.h1}>일정 설정</Text>
            <SettingItemBig 
                title="디데이 설정"
                describe="나만의 디데이를 설정해 보세요"
                onPress={()=> navigation.navigate('선호 식당')}
            />
            <ToggleItemBig
                title="수업일수 표시"
                describe="예시) 수업일수 15주차"
                onPress={()=> saveSetting(selectedItem)}
                toggled={selectedItem}
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

    itemcontainer: { //아이템 간의 간격

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