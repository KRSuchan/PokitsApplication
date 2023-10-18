import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import { ScrollView } from "react-native-gesture-handler";
import { getFbMenu } from "../firebase";

//화면의 높이
HEIGHT = Dimensions.get("window").height;

//화면의 너비
WIDTH = Dimensions.get("window").width;

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "white", height: 6 }}
    style={{
      backgroundColor: "rgba(0, 0, 0, 0)",
      width: (WIDTH / 100) * 60,
      shadowColor: "rgba(0,0,0,0)",
    }}
  />
);
const UnivCafeteriaRoute = ({ menuObject }) => (
  <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.pageViewContainer}>
      <View style={styles.cafeteriaContainer}>
        <View style={styles.cafeteriaType}>
          <Image
            source={require("../assets/images/StudentEat.png")} // 여기에 실제 이미지 경로 입력
            style={{ width: 38, height: 38 }} // 텍스트 높이만큼 이미지 크기 설정
          />
          <Text style={styles.cafeteriaName}>학생식당</Text>
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}>
          <View style={styles.cafeteriaMenuComponent}>
            <Text>{menuObject.student.breakfast}</Text>
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            <Text>{menuObject.student.lunch}</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.cafeteriaContainer}>
        <View style={styles.cafeteriaType}>
          <Image
            source={require("../assets/images/ProfEat.png")} // 여기에 실제 이미지 경로 입력
            style={{ width: 34.7, height: 38 }} // 텍스트 높이만큼 이미지 크기 설정
          />
          <Text style={styles.cafeteriaName}>교직원</Text>
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}>
          <View style={styles.cafeteriaMenuComponent}>
            <Text>{menuObject.faculty.lunch}</Text>
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            <Text>{menuObject.faculty.dinner}</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.cafeteriaContainer}>
        <View style={styles.cafeteriaType}>
          <Image
            source={require("../assets/images/SnackEat.png")} // 여기에 실제 이미지 경로 입력
            style={{ width: 38, height: 38 }} // 텍스트 높이만큼 이미지 크기 설정
          />
          <Text style={styles.cafeteriaName}>분식당</Text>
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}>
          <View style={styles.cafeteriaMenuComponent}>
            <Text>{menuObject.snackbar.breakfast}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  </ScrollView>
);

const DormiCafeteriaRoute = ({ menuObject }) => (
  <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.pageViewContainer}>
      <View style={styles.cafeteriaContainer}>
        <View style={styles.cafeteriaType}>
          <Image
            source={require("../assets/images/DormEat.png")} // 여기에 실제 이미지 경로 입력
            style={{ width: 35, height: 38 }} // 텍스트 높이만큼 이미지 크기 설정
          />
          <Text style={styles.cafeteriaName}>푸름관</Text>
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}>
          <View style={styles.cafeteriaMenuComponent}>
            <Text>{menuObject.puroom.lunch}</Text>
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            <Text>{menuObject.puroom.dinner}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.cafeteriaContainer}>
        <View style={styles.cafeteriaType}>
          <Image
            source={require("../assets/images/DormEat.png")} // 여기에 실제 이미지 경로 입력
            style={{ width: 35, height: 38 }} // 텍스트 높이만큼 이미지 크기 설정
          />
          <Text style={styles.cafeteriaName}>오름1동</Text>
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}>
          <View style={styles.cafeteriaMenuComponent}>
            <Text>{menuObject.oreum1.lunch}</Text>
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            <Text>{menuObject.oreum1.dinner}</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.cafeteriaContainer}>
        <View style={styles.cafeteriaType}>
          <Image
            source={require("../assets/images/DormEat.png")} // 여기에 실제 이미지 경로 입력
            style={{ width: 35, height: 38 }} // 텍스트 높이만큼 이미지 크기 설정
          />
          <Text style={styles.cafeteriaName}>오름3동</Text>
        </View>
        <ScrollView
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}>
          <View style={styles.cafeteriaMenuComponent}>
            <Text>{menuObject.oreum3.lunch}</Text>
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            <Text>{menuObject.oreum3.dinner}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  </ScrollView>
);

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
export default function SettingListPage({ navigation }) {
  const [textHeight, setTextHeight] = useState(0);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "UnivCafeteria", title: "교내식당" },
    { key: "DormiCafeteria", title: "기숙사식당" },
  ]);
  const navigateGoHome = () => {
    navigation.navigate("메인화면");
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

  const renderScene = SceneMap({
    UnivCafeteria: () => <UnivCafeteriaRoute menuObject={menuObject} />,
    DormiCafeteria: () => <DormiCafeteriaRoute menuObject={menuObject} />,
  });
  return (
    <SafeAreaProvider style={{ backgroundColor: "black" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          style={styles.outerGrad}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#DA121D", "#FF6725"]}>
          <StatusBar style="light" />
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                console.log("프로필버튼 누름");
                navigateGoHome();
              }}>
              <Text
                style={styles.hPokits}
                onLayout={event => {
                  const { height } = event.nativeEvent.layout;
                  setTextHeight(height);
                }}>
                Pokit's
              </Text>
            </TouchableOpacity>
          </View>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: WIDTH / 400 }}
            style={styles.tabView}
          />
        </LinearGradient>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  outerGrad: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  header: {
    flex: HEIGHT / 15000,
    backgroundColor: "rgba(0,0,0,0)",
    paddingLeft: WIDTH / 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tabView: {
    width: "100%",
  },
  hPokits: {
    fontFamily: "Lobster",
    color: "#FFFFFF",
    alignContent: "center",
    fontSize: WIDTH / 15,
  },
  pageViewContainer: {
    flex: 1,
    padding: (WIDTH / 100) * 10,
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cafeteriaContainer: {
    marginBottom: 20,
    height: 240,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  cafeteriaType: {
    width: "30%",
    backgroundColor: "#DB141E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  cafeteriaMenuContainer: {
    width: "70%",
  },
  cafeteriaName: {
    color: "#fff",
    fontSize: WIDTH / 30,
    margin: 5,
    fontWeight: "700",
  },
  cafeteriaMenuComponent: {
    height: "100%",
    width: (WIDTH / 100) * 56,
    justifyContent: "center",
    alignItems: "center",
  },
  cafeteriaMenu: {
    fontWeight: "600",
    textAlign: "center",
  },
});
