// Homepage.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Homepage() {
  const [textHeight, setTextHeight] = useState(0);

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
        <TouchableOpacity onPress={() => console.log('누름')}>
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
