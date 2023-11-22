import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import { ScrollView } from "react-native-gesture-handler";
import { getCalendar, ddayCalculator } from "../controller/CalendarService";
import AsyncStorage from "@react-native-async-storage/async-storage";

//화면의 높이
HEIGHT = Dimensions.get("window").height;
// expo start --tunnel
//화면의 너비
WIDTH = Dimensions.get("window").width;

// Dday 클래스 정의
class Dday {
  constructor(id, ddayName, ddayDate) {
    this.id = id;
    this.ddayName = ddayName;
    this.ddayDate = ddayDate;
  }
}

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
const UnivCalendarRoute = ({
  calendar,
  month,
  ddays,
  onMonthChange,
  setDdays,
}) => {
  let time = new Date();
  let today = time.getDate();
  let thisMonth = time.getMonth();
  function popDate(string) {
    return string.split("(")[0].split(".")[1];
  }
  function popMonth(string) {
    return string.split(".")[0];
  }
  const increaseMonth = () => {
    onMonthChange(month + 1);
  };

  const decreaseMonth = () => {
    onMonthChange(month - 1);
  };

  function univCalDday(calData) {
    let time = new Date();
    let year = time.getFullYear();
    let startMonth = Number(popMonth(calData.startDay));
    let endMonth = Number(popMonth(calData.endDay));
    let startDate = Number(popDate(calData.startDay));
    let endDate = Number(popDate(calData.endDay));
    let startDay = year + "-" + startMonth + "-" + startDate;
    let endDay = year + "-" + endMonth + "-" + endDate;
    let startDday = ddayCalculator(startDay);
    let endDday = ddayCalculator(endDay);
    const _onLongPressButton = async (contents, date) => {
      // 난수를 36진수로 변환후 앞2글자 삭제 (기존 dday 설정)
      let id = Math.random().toString(36).substring(2);

      const newDday = new Dday(id, `${contents}`, `${date}`);

      try {
        ddays.push(newDday);
        await AsyncStorage.setItem("ddays", JSON.stringify(ddays));
        setDdays([...ddays]);
        Alert.alert("DDAY에 추가되었습니다!");
      } catch (e) {
        console.log(e);
        Alert.alert("오류로 인해 DDAY에 정상적으로 추가되지 않았습니다.\n");
      }
    };
    if (startDday > 0) {
      return (
        <TouchableHighlight
          onLongPress={() =>
            _onLongPressButton(calData.contents + " 시작", startDay)
          }
          underlayColor="gray">
          <View style={styles.calendarComponent}>
            <View style={styles.calendarContents}>
              <Text style={styles.beforeUnivContents}>{calData.contents}</Text>
              <View>
                <Text style={styles.calDays}>
                  {calData.startDay} ~ {calData.endDay}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.beforeDday}>
                {startDday}일{"\n"}남음
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    } else if (startDday <= 0 && endDday >= 0) {
      return (
        <TouchableHighlight
          onLongPress={() =>
            _onLongPressButton(calData.contents + " 끝", endDay)
          }
          underlayColor="gray">
          <View style={styles.calendarComponent}>
            <View style={styles.calendarContents}>
              <Text style={styles.nowUnivContents}>{calData.contents}</Text>
              <View>
                <Text style={styles.calDays}>
                  {calData.startDay} ~ {calData.endDay}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.nowDday}>진행중!</Text>
              <Text style={styles.nowDdayDate}>{endDday}일 남음</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
    } else {
      return (
        <View style={styles.calendarComponent}>
          <View style={styles.calendarContents}>
            <Text style={styles.afterUnivContents}>{calData.contents}</Text>
            <View>
              <Text style={styles.calDays}>
                {calData.startDay} ~ {calData.endDay}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.afterDday}>
              {-endDday}일{"\n"}지남
            </Text>
          </View>
        </View>
      );
    }
  }
  const makeScheduleComponents = () => {
    // calendar 데이터를 이용하여 <View> 컴포넌트들을 생성
    if (!calendar || calendar.length === 0) {
      console.log("calendar2 : " + JSON.stringify(calendar));
      // calendar 데이터가 없거나 빈 경우에 대한 처리
      return (
        <View style={styles.calendarNoScheduleContainer}>
          <Text>일정이 없습니다.</Text>
        </View>
      );
    }

    return calendar.map((event, index) => {
      return (
        <View key={index} style={styles.calendarScheduleContainer}>
          {univCalDday(event)}
        </View>
      );
    });
  };
  return (
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
        <ScrollView showsVerticalScrollIndicator={false}>
          {makeScheduleComponents()}
        </ScrollView>
      </View>
      <View>
        <Text style={{ fontSize: 10, width: "100%" }}>
          ※ 디데이에 넣고 싶은 학사 일정을 꾹 눌러보세요!
        </Text>
      </View>
    </View>
  );
};
// Setting item component
const DdayItemBig = ({ title, describe }) => {
  let dday = ddayCalculator(describe);
  const ddayComponent = () => {
    if (dday == 0) {
      return <Text style={styles.ddayText}>D-DAY!</Text>;
    } else if (dday < 0) {
      return <Text style={styles.ddayText}>D+{-dday}</Text>;
    } else {
      return <Text style={styles.ddayText}>D-{dday}</Text>;
    }
  };
  return (
    <View style={styles.calendarScheduleContainer}>
      <View style={styles.calendarContents}>
        <Text style={styles.beforeUnivContents}>{title}</Text>
        <View>
          <Text style={styles.calDays}>{describe}</Text>
        </View>
      </View>
      <View>{ddayComponent()}</View>
    </View>
  );
};

//날짜 데이터를 보기 좋게 변환, 시간 없애는게 목적임
const formatDate = dateStr => {
  const date = new Date(dateStr);
  let month = "" + (date.getMonth() + 1),
    day = "" + date.getDate(),
    year = date.getFullYear();

  //두자리수 맞춰줌
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

// 디데이 탭 내용
const DdayCalendarRoute = ({ ddays }) => {
  if (!ddays || ddays.length === 0) {
    // calendar 데이터가 없거나 빈 경우에 대한 처리
    return (
      <View style={styles.pageViewContainer}>
        <LinearGradient
          style={styles.DdayTitleContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#182A76", "#3C61FF"]}>
          <Text style={styles.monthText}>D-DAY</Text>
        </LinearGradient>
        <View style={styles.calendarViewContaniner}>
          <View style={styles.calendarNoScheduleContainer}>
            <Text>설정한 DDAY가 없습니다.</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.pageViewContainer}>
          <View style={styles.calendarViewContaniner}>
            <LinearGradient
              style={styles.DdayTitleContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#182A76", "#3C61FF"]}>
              <Text style={styles.monthText}>D-DAY</Text>
            </LinearGradient>
            {ddays.map(dday => {
              if (dday) {
                return (
                  <View key={dday.id}>
                    <DdayItemBig
                      title={dday.ddayName}
                      describe={formatDate(dday.ddayDate)}
                    />
                  </View>
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default function CalendarPage({ navigation }) {
  console.log(
    "기종 height/100 : " + HEIGHT / 100 + "\n기종 width/100 : " + WIDTH / 100
  );
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
  const [ddays, setDdays] = useState([]);

  const getMonthCalendar = async month => {
    let calendar = JSON.parse(JSON.stringify(await getCalendar(month)));
    setCalendar(calendar);
  };
  const getDdayData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("ddays");
      let data = jsonValue != null ? JSON.parse(jsonValue) : [];
      setDdays(data);
      console.log("DdaySettingPaged에서 getData함수안");
      console.log(data);
    } catch (e) {
      console.log(e);
    }
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
    getDdayData(); // dday 데이터 불러오기를 실행
    fetchData();
  }, [month]);

  // 학사일정, 디데이 탭타이틀과 탭내용 매핑
  const renderScene = SceneMap({
    UnivCalendar: () => (
      <UnivCalendarRoute
        calendar={JSON.parse(JSON.stringify(calendar))}
        month={month}
        onMonthChange={setMonth}
        ddays={ddays}
        setDdays={setDdays}
      />
    ),
    DdayCalendar: () => <DdayCalendarRoute ddays={ddays} />,
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
  contentsBigContainer: {
    width: (WIDTH / 100) * 90,
    height: HEIGHT,
  },
  ddayViewContainer: {
    width: (WIDTH / 100) * 90,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  calendarMonthContainer: {
    // flex: 0.1,
    height: "auto",
    minHeight: "10%",
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: (WIDTH / 100) * 2,
    borderRadius: 10,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  DdayTitleContainer: {
    // flex: 0.1,
    height: "auto",
    minHeight: "10%",
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: (WIDTH / 100) * 2,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarScheduleContainer: {
    minHeight: "10%",
    flexDirection: "row",
    paddingHorizontal: 20,
    width: (WIDTH / 100) * 90,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#BABABA",
    borderBottomWidth: 0.5,
    borderStyle: "solid",
  },
  calendarNoScheduleContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  monthText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 30,
  },
  calendarComponent: {
    width: (WIDTH / 100) * 80,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  calendarContents: { height: "auto" },
  univContents: { flexWrap: "wrap" },
  afterUnivContents: {
    maxWidth: (WIDTH / 100) * 60,
    color: "#8A8A8E",
    fontWeight: "800",
  },
  nowUnivContents: {
    maxWidth: (WIDTH / 100) * 60,
    color: "#182A76",
    fontWeight: "800",
  },
  beforeUnivContents: {
    maxWidth: (WIDTH / 100) * 60,
    fontWeight: "800",
  },
  beforeDday: { fontWeight: "800", textAlign: "center" },
  afterDday: {
    color: "#8A8A8E",
    textAlign: "center",
  },
  nowDday: {
    color: "#182A76",
    fontWeight: "800",
    textAlign: "center",
  },
  nowDdayDate: { fontSize: 10, color: "#182A76", fontWeight: "800" },
  ddayText: { fontSize: 20, color: "#182A76", fontWeight: "800" },
  calDays: { color: "#8A8A8E" },
  vbox: {
    height: "auto",
    flexWrap: "wrap",
    flexDirection: "column",
  },

  hbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 9,
  },

  itemtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 2,
  },

  itemdescribe: {
    fontSize: 17,
    color: "#8A8A8E",
    fontWeight: "500",
  },
});
