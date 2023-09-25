// Homepage.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

//노치 침범 방지 패키지
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';

import { Dimensions } from 'react-native';

//화면의 높이
Dimensions.get('window').height

//화면의 너비
Dimensions.get('window').width

export default function MainPage({navigation}) {
  const [textHeight, setTextHeight] = useState(0);

  const navigateToSettings = () => {
    navigation.navigate('설정');
  };

  return (
    <SafeAreaProvider style={{backgroundColor: '#fff'}}>
    <SafeAreaView style={{flex:1}}>
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
            style={{ width: textHeight-10, height: textHeight-10 }} // 텍스트 높이만큼 이미지 크기 설정
          />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
    </SafeAreaProvider>
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
    //fontSize: "50%",      
    fontSize: Dimensions.get('window').width > 500? 55 : 45,     
   }
});
