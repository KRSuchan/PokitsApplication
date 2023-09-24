// Homepage.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import SettingListPage from '../screens/SettingListPage';

export default function MainPage({navigation}) {
  const [textHeight, setTextHeight] = useState(0);

  const navigateToSettings = () => {
    navigation.navigate('SettingList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text 
          style={styles.h1} 
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setTextHeight(height);
          }}
        >
          Pokit's
        </Text>
        <TouchableOpacity onPress={() => {console.log('프로필버튼 누름');navigateToSettings();}}>
          <Image 
            source={require('../assets/images/profile.png')} // 여기에 실제 이미지 경로 입력
            style={{ width: textHeight-13, height: textHeight-13 }} // 텍스트 높이만큼 이미지 크기 설정
          />
        </TouchableOpacity>
      </View>
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
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
   },

   h1: {
    fontFamily: 'Lobster', 
    fontSize: 50            
   }
});
