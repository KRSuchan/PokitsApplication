//일반적인 패키지들
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import "react-native-gesture-handler";

//노치 침범 방지 패키지
//최상단에서는 사용하지 않게 됨
//import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';

//폰트 사용을 위한 패키지들
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

//다른 페이지로 이동하는 패키지
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

//화면 불러오기
import MainPage from "./screens/MainPage";
import SettingListPage from "./screens/SettingListPage";
import BusSettingPage from "./screens/BusSettingPage";
import CafeteriaSettingPage from "./screens/CafeteriaSettingPage";
import CafeteriaPage from "./screens/CafeteriaPage";
import ScheduleSettingPage from "./screens/ScheduleSettingPage";
import DdaySettingPage from "./screens/DdaySettingPage";
import DdayEditPage from "./screens/DdayEditPage";
import DepartmentSettingPage from "./screens/DepartmentSettingPage";
import DevInfoPage from "./screens/DevInfoPage";
import TermsPage from "./screens/TermsPage";
import GuidePage from "./screens/GuidePage";
import CalendarPage from "./screens/CalendarPage";

//네비게이터 사용
const Stack = createStackNavigator();

// 앱 시작 시 스플래시 화면이 자동으로 사라지는 것을 방지
SplashScreen.preventAutoHideAsync();

export default function App() {
  // Lobster 폰트를 로드하고 로드 완료 여부를 fontsLoaded 상태에 저장
  const [fontsLoaded] = useFonts({
    Lobster: require("./assets/fonts/Lobster-Regular.ttf"),
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

  if (!fontsLoaded) {
    return null; // 폰트가 아직 로드되지 않았다면 아무것도 출력하지 않습니다.
  }

  // 폰트가 로드된 경우 아래의 JSX를 반환하여 화면에 출력합니다.
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="메인화면"
            component={MainPage}
            options={{ headerShown: false }}
          />
          {/* 이 페이지만 상단 헤더가 안보이게 설정 */}
          <Stack.Screen name="설정" component={SettingListPage} />
          <Stack.Screen name="선호 정류장" component={BusSettingPage} />
          <Stack.Screen name="선호 식당" component={CafeteriaSettingPage} />
          <Stack.Screen name="일정 설정" component={ScheduleSettingPage} />
          <Stack.Screen name="디데이 설정" component={DdaySettingPage} />
          <Stack.Screen name="디데이 수정" component={DdayEditPage} />
          <Stack.Screen name="내 학과 설정" component={DepartmentSettingPage} />
          <Stack.Screen name="개발팀" component={DevInfoPage} />
          <Stack.Screen name="이용약관" component={TermsPage} />
          <Stack.Screen name="가이드" component={GuidePage} />
          <Stack.Screen
            name="식당"
            component={CafeteriaPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="일정"
            component={CalendarPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
  },

  header: {
    //flex:1, //부모 크기까지 늘린다. (전체)
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", //최대한 떨어뜨리기
  },

  h1: {
    fontFamily: "Lobster", // Lobster 폰트를 적용하는 스타일
    fontSize: 50, // 글자 크기를 설정하는 스타일
  },
});
