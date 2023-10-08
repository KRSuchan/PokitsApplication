import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import { ScrollView } from "react-native-gesture-handler";

//화면의 높이
HEIGHT = Dimensions.get("window").height;

//화면의 너비
WIDTH = Dimensions.get("window").width;
StudentMorning =
  "[천원의 아침밥]\n*재학생만 해당\n08:20~09:20\n쌀밥\n순대국\n볶음멸치조림\n병아리콩조림\n미니새송이버섯볶음\n깍두기";
StudentLunch =
  "[정식: 3000원]\n11:30~13:30\n쌀밥\n콩나물매운국\n돈까스/소스\n김가루무침\n아삭고추쌈장무침\n맛김치";

ProfLunch =
  "[정식: 5500원]\n11:30~13:30\n잡곡밥\n들깨미역국\n찹쌀탕수육\n계란장조림\n도라지사과무침\n땅콩우엉조림\n배추김치";
ProfDinner =
  "[정식: 5500원]\n17:00~18:30\n김치볶음밥\n두부계란국\n깐풍만두\n맛김구이\n오이피클\n양배추샐러드\n요구르트";
SnackBar =
  "[11:00~14:00]\n[16:00~18:30]\n제주흑돼지김치찌개\n제주흑돼지참치김치찌개\n제주흑돼지스팸김치찌개\n고추장불백비빔밥\n라면류\n돈가스류";
PurmLunch =
  "중식\n12:00~13:00\n흑미밥\n유부장국\n미트볼케찹조림\n삼치데리야끼구이\n부추양파무침\n맛김치";
PurmDinner =
  "석식\n17:00~18:00\n카레라이스\n짬뽕국\n군만두\n단무지부추무침\n깍두기";
Orm1Lunch =
  "백미밥\n쇠고기미역국\n닭고기곤약장조림\n만두강정\n미나리무생채\n배추김치\n바나나우유미니";
Orm1Dinner =
  "백미밥\n사골우거지국(뚝)\n멘치카츠/소스\n맛살브로컬리볶음\n모듬콩자반\n깍두기";
Orm3Lunch =
  "순대국밥\n떡고기산적*데미소스\n부추김가루무침\n핫도그*케찹\n쌀밥/석박지\n아이스초코";
Orm3Dinner =
  "토마토스파게티\n치킨덴더\n수제피클\n그린샐러드*허니머스타드D\n쌀밥/미니깍두기\n식혜";
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
const UnivCafeteriaRoute = () => (
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
            <Text style={styles.cafeteriaMenu}>{StudentMorning}</Text>
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            <Text style={styles.cafeteriaMenu}>{StudentLunch}</Text>
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
            <Text style={styles.cafeteriaMenu}>{ProfLunch}</Text>
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            <Text style={styles.cafeteriaMenu}>{ProfDinner}</Text>
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
            <Text style={styles.cafeteriaMenu}>{SnackBar}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  </ScrollView>
);

const DormiCafeteriaRoute = () => (
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
            <Text style={styles.cafeteriaMenu}>{PurmLunch}</Text>
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            <Text style={styles.cafeteriaMenu}>{PurmDinner}</Text>
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
            <Text style={styles.cafeteriaMenu}>{Orm1Lunch}</Text>
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            <Text style={styles.cafeteriaMenu}>{Orm1Dinner}</Text>
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
            <Text style={styles.cafeteriaMenu}>{Orm3Lunch}</Text>
          </View>
          <View style={styles.cafeteriaMenuComponent}>
            <Text style={styles.cafeteriaMenu}>{Orm3Dinner}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  </ScrollView>
);

const renderScene = SceneMap({
  UnivCafeteria: UnivCafeteriaRoute,
  DormiCafeteria: DormiCafeteriaRoute,
});

export default function SettingListPage({ navigation }) {
  const [textHeight, setTextHeight] = useState(0);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "UnivCafeteria", title: "교내식당" },
    { key: "DormiCafeteria", title: "기숙사식당" },
  ]);
  const navigateGoHome = () => {
    navigation.navigate("메인화면");
  };
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
