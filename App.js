import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';

// expo-font 라이브러리에서 useFonts 훅을 임포트합니다.
import { useFonts } from 'expo-font';
// expo-splash-screen 라이브러리에서 SplashScreen 객체를 임포트합니다.
import * as SplashScreen from 'expo-splash-screen';
// React 라이브러리에서 useState, useEffect, useCallback 훅을 임포트합니다.
import React, { useState, useEffect, useCallback } from 'react';
import Homepage from './screens/Homepage';

// 앱 시작 시 스플래시 화면이 자동으로 사라지는 것을 방지합니다.
SplashScreen.preventAutoHideAsync();

export default function App() {
  //텍스트의 높이는 여기에 저장된다.
  const [textHeight, setTextHeight] = useState(0);


  // Lobster 폰트를 로드하고 로드 완료 여부를 fontsLoaded 상태에 저장합니다.
  const [fontsLoaded] = useFonts({
    'Lobster' : require('./assets/fonts/Lobster-Regular.ttf'),
  });

  // 폰트가 로드된 후에 스플래시 화면을 숨기는 함수입니다. 
  // 이 함수는 fontsLoaded 값에 의존하므로 fontsLoaded 값이 변경될 때마다 새로 생성됩니다.
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // 컴포넌트가 마운트되거나 onLayoutRootView 함수가 변경될 때마다 실행되는 useEffect 훅입니다. 
  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);
  
  if(!fontsLoaded) {
    return null; // 폰트가 아직 로드되지 않았다면 아무것도 출력하지 않습니다.
   }
  
   // 폰트가 로드된 경우 아래의 JSX를 반환하여 화면에 출력합니다. 
   return (
    <SafeAreaProvider> 
        <SafeAreaView style={{flex:1}}>
          <Homepage/>
          <StatusBar style="auto" />
        </SafeAreaView>
     </SafeAreaProvider>
   );
};

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
    fontFamily: 'Lobster', // Lobster 폰트를 적용하는 스타일
    fontSize: 50            // 글자 크기를 설정하는 스타일
   }
});
