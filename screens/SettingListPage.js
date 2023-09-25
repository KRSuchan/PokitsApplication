import React from 'react';
import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
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
                        <Text style={styles.itemtitle}>
                            {title}
                        </Text>
                </View>
                <Divider style={styles.dividerstyle} orientation="horizontal" />
            </View>
        </View>
        
    </TouchableOpacity>
  );

export default function SettingListPage({navigation}) {

    return (
        <View style={styles.container}>
          <Text style={styles.h1}>설정</Text>
          {/* <SettingItemBig title="Go Back" onPress={() => navigation.goBack()} /> */}
          <SettingItemBig 
            title="선호 정류장"
            describe="메인에 보여질 버스 정보"
            onPress={() => navigation.navigate('선호 정류장')}
        />
        <SettingItemBig 
            title="선호 식당" 
            describe="기숙사생도 사용할 수 있어요"
            onPress={() => navigation.navigate('선호 식당')}
        />

        <SettingItemBig 
            title="일정 설정" 
            describe="D-day기능을 사용해 보세요"
            onPress={() => navigation.navigate('선호 식당')}
        />

        <SettingItemBig 
            title="내 학과 설정"
            describe="내 학과로 바로 갈 수 있어요"
            onPress={() => navigation.navigate('선호 식당')}
        />

        <SettingItemSmall 
            title="개발팀" 
            onPress={() => navigation.navigate('선호 식당')}
        />

        <SettingItemSmall 
            title="이용약관" 
            onPress={() => navigation.navigate('선호 식당')}
        />

        <SettingItemSmall 
            title="가이드" 
            onPress={() => navigation.navigate('선호 식당')}
        />
        </View>
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
        verticalAlign:'middle',
    },

    hbox:{
        flexDirection:'row',
        justifyContent:'space-between',
    },

    itemcontainer: { //아이템 간의 간격
        width: '100%', //사실상 작동 안함
        marginTop: 10,
        marginBottom: 6,
    },

    itemtitle: {
        fontSize: 20,
        fontWeight:'600',
    },

    itemdescribe: {
        fontSize: 17,
        color:"#8A8A8E",
        fontWeight:'500',
    },

    dividerstyle: {
        marginTop: 10,
    }
 });