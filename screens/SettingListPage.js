import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Setting item component
const SettingItemBig = ({ title, onPress, describe}) => (
    <Button title={title} onPress={onPress} />
  );

  const SettingItemSmall = ({ title, onPress, describe}) => (
    <Button title={title} onPress={onPress} />
  );


export default function SettingListPage({navigation}) {

    return (
        <View style={styles.container}>
          <Text style={styles.h1}>설정</Text>
          <SettingItemBig title="Go Back" onPress={() => navigation.goBack()} />
          <SettingItemBig 
            title="선호 정류장" 
            onPress={() => navigation.navigate('선호 정류장')}
        />
        <SettingItemBig 
            title="선호 식당" 
            onPress={() => navigation.navigate('선호 식당')}
        />

        <SettingItemBig 
            title="일정 설정" 
            onPress={() => navigation.navigate('선호 식당')}
        />

        <SettingItemBig 
            title="내 학과 설정" 
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
 
    header: {
     //flex:1, //부모 크기까지 늘린다. (전체)
     width:'100%',
     flexDirection:'row',
     alignItems:'center',
     justifyContent:'space-between', //최대한 떨어뜨리기
    },
 
    h1: {
        fontWeight: 'bold',
        fontSize: 35,         // 글자 크기를 설정하는 스타일
    },

    bigitem:{

    }
 });