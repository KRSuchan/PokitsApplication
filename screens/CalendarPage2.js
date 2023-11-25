import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator,Dimensions,TouchableHighlight,Alert } from 'react-native';
import { getCalendar, ddayCalculator } from "../controller/CalendarService";

//기존식당 임포트
import { StatusBar } from "expo-status-bar";
import { getCtrlMenu } from "../controller/CafeteriaService";


//화면의 높이
HEIGHT = Dimensions.get("window").height;

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


const Tab = createMaterialTopTabNavigator();

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
                    style={{ width: 28, height: 28 }} // 텍스트 높이만큼 이미지 크기 설정
                  />
                </TouchableOpacity>
              ) : (
                <View style={{ width: 28, height: 28 }} />
              )}
              <Text style={styles.monthText}>{month + 1}월</Text>
              {month < 11 ? (
                <TouchableOpacity onPress={increaseMonth}>
                  <Image
                    source={require("../assets/images/Next_Calendar.png")} // 여기에 실제 이미지 경로 입력
                    style={{ width: 28, height: 28 }} // 텍스트 높이만큼 이미지 크기 설정
                  />
                </TouchableOpacity>
              ) : (
                <View style={{ width: 28, height: 28 }} />
              )}
            </LinearGradient>
            <ScrollView showsVerticalScrollIndicator={false}>
              {makeScheduleComponents()}
            </ScrollView>
          </View>
          <View>
            <Text style={{ fontSize: 13, width: "100%", fontWeight:"500"}}>
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



const LogoGradient = ({navigation}) => (
    <LinearGradient colors={['#182A76', '#3C61FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topView}>
      <TouchableOpacity onPress={()=> navigation.navigate("메인화면")} >
        <Text style={styles.h1}>
            Pokit's
        </Text>
      </TouchableOpacity>
    </LinearGradient>
);

const TabMyTab1 = ({
    calendar,
    month,
    ddays,
    onMonthChange,
    setDdays,
  }) => (
    <Tab.Navigator 
      tabBar={(props) => (
        <LinearGradient colors={['#182A76', '#3C61FF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flexDirection: 'row',paddingLeft: 20,paddingTop: 10}}>
          {props.state.routes.map((route, index) => (
            <TouchableOpacity
              key={route.key}
              onPress={() => props.navigation.navigate(route.name)}
              style={{ alignItems: 'center', paddingRight: 15 }}
            >
              <Text style={{ color: 'white',fontSize: 22, fontWeight: 'bold' ,paddingBottom:10}}>{route.name}</Text>
              {props.state.index === index && <View style={{ width: '100%', height: 4, backgroundColor: 'white' }} />} 
            </TouchableOpacity>
          ))}
        </LinearGradient>
      )}
    >
      <Tab.Screen name="학사일정">
        {props => <UnivCalendarRoute {...props} calendar={calendar} month={month} ddays={ddays} onMonthChange={onMonthChange} setDdays={setDdays} />}
      </Tab.Screen>
      <Tab.Screen name="디데이">
        {props => <DdayCalendarRoute {...props} ddays={ddays} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
  


  export default function CalendarPage2({navigation,route}){
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(false);
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
  
    if (loading) { 
      return <ActivityIndicator />;
    } else {
      return(
        <View style={styles.fullcontainer}>
          <LinearGradient
            colors={['#182A76', '#3C61FF']}
            style={{ height: insets.top }}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}  
          />
          <View style={styles.fullcontainer}> 
            <LogoGradient navigation={navigation}></LogoGradient>
            <View style={{flex: 1}}>
              <TabMyTab1 calendar={calendar} month={month} ddays={ddays} onMonthChange={setMonth} setDdays={setDdays}>
              </TabMyTab1>
            </View>
          </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start', 
      padding: 20,
    },
    topView:{
        // flex: 1,
        paddingTop: 0,
        paddingHorizontal: 20,
    },
    fullcontainer:{
        flex: 1, //화면 꽉채워줭, 
        backgroundColor: '#fff',
    },
    h1: {
        fontFamily: "Lobster",
        fontSize: 40,
        color: "#fff",
      },
      scene: {
        padding:20,
        flex:1,
        backgroundColor: '#F5F5F5',
      },
      vbox: {
        flexDirection: "column",
      },
      hbox: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 3,
      },
      busitemhbox: {
        flex:1,
      },
      busitemhbox2: {
        flex:2,
      },
      tabbarmystyle: {
        backgroundColor: 'transparent',
      },
      busboxstyle:{
        width: "100%",
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 20,
        borderRadius: 10,
      },
      busboxtitle:{
        width: "100%",
        borderRadius: 7,
        padding: 15,
        backgroundColor: '#018242',
        alignItems: "center",
        marginBottom: 15,
      },
      busitemtext:{
        fontSize:18,
        fontWeight:'800',
        color:"black",
        textAlign:"right",
      },
      busitemlefttext:{
        fontSize:18,
        fontWeight:'800',
        color:"black",
        
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
        padding: 10,
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
        padding: 20,
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
        paddingVertical: 10,
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
        fontWeight: "600",
        fontFamily: "NotoSansBlack",
        fontSize: 22,
        paddingVertical:10,
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
      nowDdayDate: { 
        fontSize: 10, color: "#182A76", fontWeight: "800" 
      },
      ddayText: { 
        fontSize: 20, color: "#182A76", fontWeight: "800" 
      },
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
      
      
})