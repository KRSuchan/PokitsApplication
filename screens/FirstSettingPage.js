import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-elements';


// Setting item component
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

  const SettingItemSmall = ({ title, onPress}) => (
    <TouchableOpacity style={{width:'100%'}} onPress={onPress}>
        <View style={styles.itemcontainer}>
            <View style-={styles.vbox}>
                <View style={styles.hbox}> 
                    <View style={styles.hbox}>
                            <Text style={styles.itemtitle}>
                                {title}
                            </Text>
                    </View>
                </View>
                
                <Divider style={styles.dividerstyle} orientation="horizontal" />
            </View>
        </View>
        
    </TouchableOpacity>
  );

export default function FirstSettingPage({navigation}) {

    // 각 항목이 눌렸는지 확인하기 위한 상태
    const [isBusStopPressed, setBusStopPressed] = useState(false);
    const [isRestaurantPressed, setRestaurantPressed] = useState(false);
    const [isDepartmentPressed, setDepartmentPressed] = useState(false);
    const [isTermsPressed, setTermsPressed] = useState(false);

    // 모든 항목이 눌렸는지 확인하는 함수
    const isAllPressed = () => {
        return isBusStopPressed && isRestaurantPressed && isDepartmentPressed && isTermsPressed;
    };

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
            <View style={styles.container}>
          <Text style={styles.h1}>초기설정</Text>
          {/* <SettingItemBig title="Go Back" onPress={() => navigation.goBack()} /> */}
          <SettingItemBig 
            title="선호 정류장"
            describe="메인에 보여질 버스 정보"
            onPress={() => {
                navigation.navigate('선호 정류장') 
                setBusStopPressed(true);}}
            
        />
        <SettingItemBig 
            title="선호 식당" 
            describe="기숙사생도 사용할 수 있어요"
            onPress={() => {navigation.navigate('선호 식당')
            setRestaurantPressed(true);}}
        />
        <SettingItemBig 
            title="내 학과 설정"
            describe="내 학과로 바로 갈 수 있어요"
            onPress={() => {navigation.navigate('내 학과 설정') 
            setDepartmentPressed(true)}}
        />
        <SettingItemSmall 
            title="이용약관" 
            onPress={() => {navigation.navigate('이용약관') 
            setTermsPressed(true)}}
        />
        <View style={styles.buttonContainer}>
            <Button 
            title={isAllPressed()?"여러분 만을 위한 앱을 만들어 드릴게요 ▶️" : "모든 항목을 확인해 주세요!" }
            color={isAllPressed() ? 'black' : 'lightgray'}  // 모든 항목이 눌렸을 시 검은색으로 변경
            disabled={!isAllPressed()}  // 모든 항목이 눌리지 않았을 시 비활성화
            onPress={() => navigation.navigate('메인화면')}
            />
        </View>
        </View>
        </SafeAreaView>
        
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
 
    h1: {
        fontWeight: 'bold',
        fontSize: 35,         // 글자 크기를 설정하는 스타일
        marginBottom: 10,
    },

    // bigitem:{

    // },

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

    dividerstyle: {
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 36,
        marginRight: 16,
      },
 });