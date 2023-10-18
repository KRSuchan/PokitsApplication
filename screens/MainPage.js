// Homepage.js
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

//노치 침범 방지 패키지
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Dimensions } from "react-native";

//화면의 높이
HEIGHT = Dimensions.get("window").height;

//화면의 너비
WIDTH = Dimensions.get("window").width;
const menu = {
  faculty: {
    breakfast: "Loading..",
    dinner: "Loading..",
    lunch: "Loading..",
  },
  oreum1: {
    breakfast: "Loading..",
    dinner: "Loading..",
    lunch: "Loading..",
  },
  oreum3: {
    breakfast: "Loading..",
    dinner: "Loading..",
    lunch: "Loading..",
  },
  puroom: {
    breakfast: "Loading..",
    dinner: "Loading..",
    lunch: "Loading..",
  },
  snackbar: {
    breakfast: "Loading..",
    dinner: "Loading..",
    lunch: "Loading..",
  },
  student: {
    breakfast: "Loading..",
    dinner: "Loading..",
    lunch: "Loading..",
  },
};
export default function MainPage({ navigation }) {
  const [textHeight, setTextHeight] = useState(0);

  const navigateToSettings = () => {
    navigation.navigate("설정");
  };
  const navigateToCafeteria = () => {
    navigation.navigate("식당");
  };
  const [menuObject, setMenu] = useState(menu);
  const getMenus = async () => {
    try {
      let url = `https://pokits-diet-default-rtdb.firebaseio.com/Diet/body.json`;
      let response = await fetch(url);
      if (response.ok) {
        let menu = await response.json();
        setMenu(menu);
      } else {
        console.error(
          "Network request failed:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };
  useEffect(() => {
    getMenus();
  }, []);
  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text
              style={styles.h1}
              onLayout={event => {
                const { height } = event.nativeEvent.layout;
                setTextHeight(height);
              }}>
              Pokit's
            </Text>
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
          <View style={styles.componentAria}>
            <View style={styles.dietMainAria}>
              <TouchableOpacity
                onPress={() => {
                  console.log("식당 페이지 이동");
                  navigateToCafeteria();
                }}>
                <Text style={styles.componentName}>학식</Text>
                <View style={styles.dietMainMenu}>
                  <View style={styles.dietMenuOut}>
                    <Text style={styles.dietCafName}>학생식당</Text>
                    <View style={styles.dietMenu}>
                      <Text style={styles.MenuText}>
                        {menuObject.student.lunch}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.dietMenuOut}>
                    <Text style={styles.dietCafName}>교직원식당</Text>
                    <View style={styles.dietMenu}>
                      <Text style={styles.MenuText}>
                        {menuObject.faculty.lunch}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
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
  componentName: {
    fontSize: 25,
    width: "100%",
    fontWeight: "600",
    margin: 5,
  },
  dietMainAria: {
    flex: 0.33,
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
    width: (WIDTH / 100) * 40,
    flex: 0.5,
    margin: 5,
    borderRadius: 10,
    backgroundColor: "#DB141E",
  },
  dietCafName: {
    color: "#fff",
    margin: 5,
  },
  dietMenu: {
    flex: 1,
    backgroundColor: "#fff",
  },
  MenuText: {
    fontWeight: "500",
    color: "#DB141E",
  },
});
