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
import { getCtrlMenu } from "../controller/CafeteriaService";

//화면의 높이
HEIGHT = Dimensions.get("window").height;

//화면의 너비
WIDTH = Dimensions.get("window").width;

// 교내식당, 기숙사식당 탭 타이틀
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

// 교내식당 탭 내용
const UnivCafeteriaRoute = ({
  studentBf = { studentBf },
  studentLunch = { studentLunch },
  facultyLunch = { facultyLunch },
  facultyDinner = { facultyDinner },
  snackbarMenu = { snackbarMenu },
}) => (
  <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.pageViewContainer}>
      {/* 학생식당 컨테이너 */}
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
            {studentBf.map((studentBf, index) => {
              return (
                <Text
                  key={`studentBf-${index}`}
                  style={styles.cafeteriaMenuText}>
                  {studentBf}
                </Text>
              );
            })}
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            {studentLunch.map((studentLunch, index) => {
              return (
                <Text
                  key={`studentLunch-${index}`}
                  style={styles.cafeteriaMenuText}>
                  {studentLunch}
                </Text>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* 교직원식당 컨테이너 */}
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
            {facultyLunch.map((facultyLunch, index) => {
              return (
                <Text
                  key={`facultyLunch-${index}`}
                  style={styles.cafeteriaMenuText}>
                  {facultyLunch}
                </Text>
              );
            })}
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            {facultyDinner.map((facultyDinner, index) => {
              return (
                <Text
                  key={`facultyDinner-${index}`}
                  style={styles.cafeteriaMenuText}>
                  {facultyDinner}
                </Text>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* 분식당 컨테이너 */}
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
            {snackbarMenu.map((snackbarMenu, index) => {
              return (
                <Text
                  key={`snackbarMenu-${index}`}
                  style={styles.cafeteriaMenuText}>
                  {snackbarMenu}
                </Text>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  </ScrollView>
);

// 교내식당 탭 내용
const DormiCafeteriaRoute = ({
  puroomLunch = { puroomLunch },
  puroomDinner = { puroomDinner },
  oreum1Lunch = { oreum1Lunch },
  oreum1Dinner = { oreum1Dinner },
  oreum3Lunch = { oreum3Lunch },
  oreum3Dinner = { oreum3Dinner },
}) => (
  <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.pageViewContainer}>
      {/* 푸름관 컨테이너 */}
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
            {puroomLunch.map((puroomLunch, index) => {
              return (
                <Text
                  key={`puroomLunch-${index}`}
                  style={styles.cafeteriaMenuText}>
                  {puroomLunch}
                </Text>
              );
            })}
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            {puroomDinner.map((puroomDinner, index) => {
              return (
                <Text
                  key={`puroomDinner-${index}`}
                  style={styles.cafeteriaMenuText}>
                  {puroomDinner}
                </Text>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {/* 오름1 컨테이너 */}
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
            {oreum1Lunch.map((oreum1Lunch, index) => {
              return (
                <Text
                  key={`oreum1Lunch-${index}`}
                  style={styles.cafeteriaMenuText}>
                  {oreum1Lunch}
                </Text>
              );
            })}
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            {oreum1Dinner.map((oreum1Dinner, index) => {
              return (
                <Text
                  key={`oreum1Dinner-${index}`}
                  style={styles.cafeteriaMenuText}>
                  {oreum1Dinner}
                </Text>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {/* 오름3 컨테이너 */}
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
            {oreum3Lunch.map((oreum3Lunch, index) => {
              return (
                <Text
                  key={`oreum3Lunch-${index}`}
                  style={styles.cafeteriaMenuText}>
                  {oreum3Lunch}
                </Text>
              );
            })}
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            {oreum3Dinner.map((oreum3Dinner, index) => {
              return (
                <Text
                  key={`oreum3Dinner-${index}`}
                  style={styles.cafeteriaMenuText}>
                  {oreum3Dinner}
                </Text>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  </ScrollView>
);

const menu = ["Loading..."];

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
  // 각 식당 메뉴별 useState
  const [studentBf, setStudentBf] = useState(menu);
  const [studentLunch, setStudentLunch] = useState(menu);
  const [facultyLunch, setFacultyLunch] = useState(menu);
  const [facultyDinner, setFacultyDinner] = useState(menu);
  const [snackbarMenu, setSnackbarMenu] = useState(menu);
  const [puroomLunch, setPuroomLunch] = useState(menu);
  const [puroomDinner, setPuroomDinner] = useState(menu);
  const [oreum1Lunch, setOreum1Lunch] = useState(menu);
  const [oreum1Dinner, setOreum1Dinner] = useState(menu);
  const [oreum3Lunch, setOreum3Lunch] = useState(menu);
  const [oreum3Dinner, setOreum3Dinner] = useState(menu);

  // FB로부터 Menu 전체 긁어오기
  const getMenus = async () => {
    let menu = JSON.parse(JSON.stringify(await getCtrlMenu()));
    setStudentBf(menu.student.breakfast);
    setStudentLunch(menu.student.lunch);
    setFacultyLunch(menu.faculty.lunch);
    setFacultyDinner(menu.faculty.dinner);
    setSnackbarMenu(menu.snackBar.breakfast);
    setPuroomLunch(menu.puroom.lunch);
    setPuroomDinner(menu.puroom.dinner);
    setOreum1Lunch(menu.oreum1.lunch);
    setOreum1Dinner(menu.oreum1.dinner);
    setOreum3Lunch(menu.oreum3.lunch);
    setOreum3Dinner(menu.oreum3.dinner);
  };
  // menu 불러오는거에 대한 useEffect
  useEffect(() => {
    getMenus();
  }, []);

  // 교내식당, 기숙사식당 탭타이틀과 탭내용 매핑
  const renderScene = SceneMap({
    UnivCafeteria: () => (
      <UnivCafeteriaRoute
        studentBf={studentBf}
        studentLunch={studentLunch}
        facultyLunch={facultyLunch}
        facultyDinner={facultyDinner}
        snackbarMenu={snackbarMenu}
      />
    ),
    DormiCafeteria: () => (
      <DormiCafeteriaRoute
        puroomLunch={puroomLunch}
        puroomDinner={puroomDinner}
        oreum1Lunch={oreum1Lunch}
        oreum1Dinner={oreum1Dinner}
        oreum3Lunch={oreum3Lunch}
        oreum3Dinner={oreum3Dinner}
      />
    ),
  });

  // 식당페이지 리턴
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
            {/* 메인페이지로 가는 Pokit's*/}
            <TouchableOpacity
              onPress={() => {
                console.log("메인페이지 버튼 누름");
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
          {/* 탭뷰 */}
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

// 식당 페이지 CSS
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
    height: 250,
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
  cafeteriaMenuText: {
    fontWeight: "500",
    textAlign: "center",
  },
});
