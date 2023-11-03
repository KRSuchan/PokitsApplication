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
import { getCalendar } from "../controller/CalendarService";

//화면의 높이
HEIGHT = Dimensions.get("window").height;
// expo start --tunnel
//화면의 너비
WIDTH = Dimensions.get("window").width;

// 학사일정, 디데이 탭 타이틀
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

// 학사일정 탭 내용
const UnivCalendarRoute = ({ calendar, month, onMonthChange }) => {
  const increaseMonth = () => {
    onMonthChange(month + 1);
  };

  const decreaseMonth = () => {
    onMonthChange(month - 1);
  };

  const makeScheduleComponents = () => {
    // calendar 데이터를 이용하여 <View> 컴포넌트들을 생성
    if (!calendar || calendar.length === 0) {
      console.log("calendar2 : " + JSON.stringify(calendar));
      // calendar 데이터가 없거나 빈 경우에 대한 처리
      return <Text>일정이 없습니다.</Text>;
    }

    return calendar.map((event, index) => {
      return (
        <View key={index} style={styles.calendarScheduleContainer}>
          <View>
            <Text>{event.contents}</Text>
            <View>
              <Text>
                {event.startDay} ~ {event.endDay}
              </Text>
            </View>
          </View>
          <View>
            <Text>3일 전</Text>
          </View>
        </View>
      );
    });
  };
  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.pageViewContainer}>
        <View style={styles.calendarViewContaniner}>
          <LinearGradient
            style={styles.calendarMonthContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={["#182A76", "#3C61FF"]}>
            {month > 0 ? (
              <TouchableOpacity onPress={decreaseMonth}>
                <Image
                  source={require("../assets/images/Prev_Calendar.png")} // 여기에 실제 이미지 경로 입력
                  style={{ width: 38, height: 38 }} // 텍스트 높이만큼 이미지 크기 설정
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 38, height: 38 }} />
            )}
            <Text style={styles.monthText}>{month + 1}월</Text>
            {month < 11 ? (
              <TouchableOpacity onPress={increaseMonth}>
                <Image
                  source={require("../assets/images/Next_Calendar.png")} // 여기에 실제 이미지 경로 입력
                  style={{ width: 38, height: 38 }} // 텍스트 높이만큼 이미지 크기 설정
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 38, height: 38 }} />
            )}
          </LinearGradient>
          {makeScheduleComponents()}
        </View>
      </View>
    </ScrollView>
  );
};

// 디데이 탭 내용
const DdayCalendarRoute = ({}) => (
  <ScrollView showsHorizontalScrollIndicator={false}>
    <View style={styles.pageViewContainer}>
      <Text>This is Dday Calendar Route</Text>
    </View>
  </ScrollView>
);

export default function CalendarPage({ navigation }) {
  const [textHeight, setTextHeight] = useState(0);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "UnivCalendar", title: "학사일정" },
    { key: "DdayCalendar", title: "디데이" },
  ]);
  const navigateGoHome = () => {
    navigation.navigate("메인화면");
  };
  const [calendar, setCalendar] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth());
  const getMonthCalendar = async month => {
    let calendar = JSON.parse(JSON.stringify(await getCalendar(month)));
    setCalendar(calendar);
  };
  // 학사일정 부르는 useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCalendar(month);
        setCalendar(result);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        setCalendar([]); // 에러 발생 시 빈 배열로 초기화
      }
    };

    fetchData();
  }, [month]);

  // 학사일정, 디데이 탭타이틀과 탭내용 매핑
  const renderScene = SceneMap({
    UnivCalendar: () => (
      <UnivCalendarRoute
        calendar={JSON.parse(JSON.stringify(calendar))}
        month={month}
        onMonthChange={setMonth}
      />
    ),
    DdayCalendar: () => <DdayCalendarRoute />,
  });

  // 일정페이지 리턴
  return (
    <SafeAreaProvider style={{ backgroundColor: "black" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          style={styles.outerGrad}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#182A76", "#3C61FF"]}>
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

// 일정 페이지 CSS
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
    height: (HEIGHT / 100) * 80,
    padding: (WIDTH / 100) * 5,
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calendarViewContaniner: {
    width: (WIDTH / 100) * 90,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    borderRadius: 10,
  },
  calendarMonthContainer: {
    flex: 0.1,
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: (WIDTH / 100) * 2,
    borderRadius: 10,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calendarScheduleContainer: {
    flex: 0.1,
    flexDirection: "row",
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#BABABA",
    borderBottomWidth: 0.5,
    borderStyle: "solid",
  },
  monthText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 30,
  },
});
