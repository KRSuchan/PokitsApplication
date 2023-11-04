// Homepage.js
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

//노치 침범 방지 패키지
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { getOnlyMenu, menuLiner } from "../controller/CafeteriaService";
import Video from "react-native-video";

//화면의 높이
HEIGHT = Dimensions.get("window").height;

//화면의 너비
WIDTH = Dimensions.get("window").width;

const menu = ["Loading..."];

export default function MainPage({ navigation }) {
  const [textHeight, setTextHeight] = useState(0);
  // 설정 불러오기
  const [selectedItem, setSelectedItem] = useState(null);
  // 시간 파악
  const [time, setTime] = useState(new Date());
  const navigateToSettings = () => {
    navigation.navigate("설정");
  };
  const navigateToCafeteria = () => {
    navigation.navigate("식당");
  };
  const navigateToBus = () => {
    navigation.navigate("버스");
  };
  const navigateToCalendar = () => {
    navigation.navigate("일정");
  };
  // 설정에 따른 output component switch 함수
  function cafeteriaComponent(selectedItem) {
    switch (selectedItem) {
      case "학생및교직원":
        return (
          <View style={styles.dietMainMenu}>
            <View style={styles.dietMenuOut}>
              <Text style={styles.dietCafName}>학생식당</Text>
              <View style={styles.dietMenu}>
                <Text style={styles.MenuText}>{studnetCaf}</Text>
              </View>
            </View>
            <View style={styles.dietMenuOut}>
              <Text style={styles.dietCafName}>교직원식당</Text>
              <View style={styles.dietMenu}>
                <Text style={styles.MenuText}>{facultyCaf}</Text>
              </View>
            </View>
          </View>
        );
      case "오름관1동":
        return (
          <View style={styles.dietMainMenu}>
            <View style={styles.dietMenuOut}>
              <Text style={styles.dietCafName}>오름1동</Text>
              <View style={styles.dietMenu}>
                <Text style={styles.MenuText}>{oreum1Caf}</Text>
              </View>
            </View>
          </View>
        );
      case "오름관3동":
        return (
          <View style={styles.dietMainMenu}>
            <View style={styles.dietMenuOut}>
              <Text style={styles.dietCafName}>오름3동</Text>
              <View style={styles.dietMenu}>
                <Text style={styles.MenuText}>{oreum3Caf}</Text>
              </View>
            </View>
          </View>
        );
      case "푸름관":
        return (
          <View style={styles.dietMainMenu}>
            <View style={styles.dietMenuOut}>
              <Text style={styles.dietCafName}>푸름관</Text>
              <View style={styles.dietMenu}>
                <Text style={styles.MenuText}>{puroomCaf}</Text>
              </View>
            </View>
          </View>
        );
    }
  }
  // 각 식당 메뉴별 useState
  const [studnetCaf, setStudentCaf] = useState(menu);
  const [facultyCaf, setFacultyCaf] = useState(menu);
  const [puroomCaf, setPuroomCaf] = useState(menu);
  const [oreum1Caf, setOreum1Caf] = useState(menu);
  const [oreum3Caf, setOreum3Caf] = useState(menu);

  // FB로부터 Menu 전체 긁어오기
  const getMenus = async hours => {
    let menu = JSON.parse(JSON.stringify(await getOnlyMenu()));
    // 10시 전 : 아침, 10시 ~ 14시 : 점심, 14시 후 : 저녁
    if (hours < 10) {
      setStudentCaf(menuLiner(menu.student.breakfast));
      setFacultyCaf(menuLiner(menu.faculty.breakfast));
      setPuroomCaf(menuLiner(menu.puroom.breakfast));
      setOreum1Caf(menuLiner(menu.oreum1.breakfast));
      setOreum3Caf(menuLiner(menu.oreum3.breakfast));
    } else if (hours >= 10 && hours < 14) {
      setStudentCaf(menuLiner(menu.student.lunch));
      setFacultyCaf(menuLiner(menu.faculty.lunch));
      setPuroomCaf(menuLiner(menu.puroom.lunch));
      setOreum1Caf(menuLiner(menu.oreum1.lunch));
      setOreum3Caf(menuLiner(menu.oreum3.lunch));
    } else if (hours >= 14) {
      setStudentCaf(menuLiner(menu.student.dinner));
      setFacultyCaf(menuLiner(menu.faculty.dinner));
      setPuroomCaf(menuLiner(menu.puroom.dinner));
      setOreum1Caf(menuLiner(menu.oreum1.dinner));
      setOreum3Caf(menuLiner(menu.oreum3.dinner));
    }
  };
  // 1초마다 시간을 업데이트하는 함수
  function updateTime() {
    setTime(new Date());
  }
  useEffect(() => {
    //설정 불러오기
    const loadSettings = async () => {
      try {
        //세팅을 변수에 담음
        const savedSetting = await AsyncStorage.getItem("cafeteriaSetting");
        //비어있지 않다면 state 에 넣을 것임
        if (savedSetting !== null)
          setSelectedItem(JSON.parse(JSON.stringify(savedSetting)));
      } catch (error) {
        console.error(error);
      }
    };

    updateTime(); // 초기 시간 설정
    let timer = setInterval(() => {
      updateTime();
      // 초기 설정 및 1초마다 시간을 업데이트
      loadSettings();
    }, 1000);
  }, []);

  useEffect(() => {
    // 시간이 변경될 때마다 메뉴 갱신
    getMenus(time.getHours());
  }, [time]);

  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text
                style={styles.h1}
                onLayout={event => {
                  const { height } = event.nativeEvent.layout;
                  setTextHeight(height);
                }}>
                Pokit's
              </Text>
              <Video
                source={require('../assets/video/logovideo.mp4')}   // 로컬에 저장된 비디오의 경로를 입력하세요.
                style={{height: textHeight}}
                resizeMode="cover"                              // 비디오의 크기 조절 방식을 설정합니다.
                repeat={true}                                   // 이 부분이 비디오를 반복 재생하는 옵션입니다.
                playInBackground={false}                        // 앱이 백그라운드에 있을 때 비디오를 계속 재생할지 여부를 설정합니다.
                playWhenInactive={false}                        // 앱이 비활성화되어 있을 때 비디오를 계속 재생할지 여부를 설정합니다.
            />

            </View>
            
            <TouchableOpacity
              onPress={() => {
                console.log("프로필버튼 누름");
                navigateToSettings();
              }}>
              <Image
                source={require("../assets/images/profile.png")} // 여기에 실제 이미지 경로 입력
                style={{ width: textHeight - 10, height: textHeight - 10 }} // 텍스트 높이만큼 이미지 크기 설정
              />
            </TouchableOpacity>
          </View>
          {/* 학식 컴포넌트 */}
          <View style={styles.componentAria}>
            {/* 입벌려, 버스 들어간다 */}
            <View style={styles.busMainAria}>
              <TouchableOpacity
                onPress={() => {
                  console.log("버스사진 누름");
                  navigateToBus();
                }}>
                <Image
                  source={require("../assets/images/busimsi.jpeg")} // 여기에 실제 이미지 경로 입력
                />
              </TouchableOpacity>
            </View>
            <View style={styles.dietMainAria}>
              <TouchableOpacity
                onPress={() => {
                  console.log("식당 페이지 이동");
                  navigateToCafeteria();
                }}>
                <View style={styles.componentTitle}>
                  <Image
                    source={require("../assets/images/haksicBlack.png")} // 여기에 실제 이미지 경로 입력
                    style={{ width: 23, height: 26.3 }} // 텍스트 높이만큼 이미지 크기 설정
                  />
                  <Text style={styles.componentName}>학식</Text>
                </View>
                {cafeteriaComponent(selectedItem)}
              </TouchableOpacity>
            </View>
          </View>
          {/* 일정 컴포넌트 */}
          <TouchableOpacity
            onPress={() => {
              console.log("일정 페이지 이동");
              navigateToCalendar();
            }}>
            <Image
              source={require("../assets/images/calendar.jpg")} // 여기에 실제 이미지 경로 입력
              style={{ width: textHeight - 10, height: textHeight - 10 }} // 텍스트 높이만큼 이미지 크기 설정
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  h1: {
    fontFamily: "Lobster",
    //fontSize: "50%",
    fontSize: Dimensions.get("window").width > 500 ? 55 : 45,
  },
  componentAria: {
    flex: 1,
    marginTop: (WIDTH / 100) * 5,
    backgroundColor: "#F5F5F5",
  },
  componentTitle: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  componentName: {
    fontSize: 20,
    fontWeight: "800",
    margin: 5,
  },
  dietMainAria: {
    flex: 0.3,
    width: (WIDTH / 100) * 90,
    alignItems: "center",
    padding: 10,
  },
  dietMainMenu: {
    flex: 1,
    flexDirection: "row",
    height: "80%",
    justifyContent: "center",
    width: (WIDTH / 100) * 90,
  },
  dietMenuOut: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#DA121D",
  },
  dietCafName: {
    color: "#fff",
    fontWeight: "800",
    margin: 5,
  },
  dietMenu: {
    flex: 1,
    padding: 5,
    backgroundColor: "#fff",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
  },
  MenuText: {
    fontSize: 12,
    fontWeight: "500",

    color: "#B8131C",
  },
  busMainAria: {
    width: "100%",
  },
});
