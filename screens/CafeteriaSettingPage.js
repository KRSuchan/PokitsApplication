//설정 조회를 위해 필요함
import React, { useState, useEffect } from 'react';
//설정 저장을 위해 필요함
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-elements';

const CheckItemBig = ({title, onPress, describe, selected}) => (
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
            source={require('../assets/images/Done.png')} // 여기에 실제 이미지 경로 입력
            style={{ width: 30, height: 30 }} // 텍스트 높이만큼 이미지 크기 설정
          />}
                    
                </View>
                <Divider style={styles.dividerstyle} orientation="horizontal" />
            </View>
        </View>
    </TouchableOpacity>
    
  );

export default function CafeteriaSettingPage({navigation}) {
    const [selectedItem, setSelectedItem] = useState(null);

    //설정 불러오기
    useEffect(() => {
        const loadSettings = async() => {
            try{
                //세팅을 변수에 담음
                const savedSetting = await AsyncStorage.getItem('cafeteriaSetting');
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
            await AsyncStorage.setItem('cafeteriaSetting',setting);
            setSelectedItem(setting); //저장후 바로 state에 넣을 것임
        } catch(error){
            console.error(error);
        }
    };

    return(
        <View style={styles.container}>
            <Text style={styles.h1}>선호 식당</Text>
            <CheckItemBig
                title="학생식당 & 교직원식당"
                describe="간편히 비교할 수 있게 모두 표시됩니다!"
                onPress={() => saveSetting("학생및교직원")}
                selected = {selectedItem === "학생및교직원"}
            />
            <CheckItemSmall
                title="오름관 1동"
                onPress={()=> saveSetting("오름관1동")}
                selected = {selectedItem === "오름관1동"}
            />
            <CheckItemSmall
                title="오름관 3동"
                onPress={()=> saveSetting("오름관3동")}
                selected = {selectedItem === "오름관3동"}
            />
            <CheckItemSmall
                title="푸름관"
                onPress={()=> saveSetting("푸름관")}
                selected = {selectedItem === "푸름관"}
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