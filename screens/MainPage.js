// Homepage.js
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

//노치 침범 방지 패키지
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import { getOnlyMenu, menuLiner } from "../controller/CafeteriaService";
import {
  getMainCalendar,
  ddayCalculator,
  dateFormatter,
} from "../controller/CalendarService";
import { Video } from "expo-av";

import { Divider } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";



//화면의 높이
HEIGHT = Dimensions.get("window").height;

//화면의 너비
WIDTH = Dimensions.get("window").width;

const menu = ["Loading..."];

const readyCalendar = [
  { contents: "", startDay: "01.01(일)", endDay: "01.01(일)" },
  { contents: "", startDay: "01.01(일)", endDay: "01.01(일)" },
];

const images = {
  home: require('../assets/images/quickMenuImg/home.png'),
  pen: require('../assets/images/quickMenuImg/pen.png'),
  event: require('../assets/images/quickMenuImg/event.png'),
  alarm: require('../assets/images/quickMenuImg/alarm.png'),
};

const QuickMenuBox = ({navigation}) => {
  return(<View style ={styles.quickMenuBoxStyle}>
    <QuickMenuMiniBox1 navigation={navigation} title="내학과" iconName = "home" onPress={() => navigation.navigate('퀵메뉴', { initialTab: '학과' })}/>
    <QuickMenuMiniBox navigation={navigation} title="학사" iconName = "pen" onPress={() => navigation.navigate('퀵메뉴', { initialTab: '학사' })}/>
    <QuickMenuMiniBox navigation={navigation} title="행사" iconName = "event" onPress={() => navigation.navigate('퀵메뉴', { initialTab: '행사' })}/>
    <QuickMenuMiniBox navigation={navigation} title="소식" iconName = "alarm" onPress={() => navigation.navigate('퀵메뉴', { initialTab: '소식' })} />
  </View>)
  
}

const QuickMenuMiniBox = ({navigation,title,onPress,iconName}) => {
  return(
  <TouchableOpacity style = {styles.quickMiniBoxStyle} onPress = {onPress}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={images[iconName]} style={{ width: 25, height: 25, resizeMode: "contain" }}/>
          <Text style={{paddingTop:7, fontFamily:"NotoSansB",color:"#00A0D2"}}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
  )
  
}

const QuickMenuMiniBox1 = ({navigation,title,onPress,iconName}) => {
  return(
    // 여러 스타일 적용할 때 아래와 같이
  <TouchableOpacity style = {[styles.quickMiniBoxStyle,{backgroundColor:"#00A0D2"}]} onPress = {onPress}> 
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image source={images[iconName]} style={{ width: 25, height: 25, resizeMode: "contain"}}/>
          <Text style={{paddingTop:7, fontFamily:"NotoSansB",color:"#fff"}}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
  )
  
}

export default function MainPage({ navigation }) {
  const [textHeight, setTextHeight] = useState(0);
  // 설정 불러오기
  const [cafeteria, setCafeteria] = useState(null);
  const [classMark, setClassMark] = useState(true);
  const [calendar, setCalendar] = useState(readyCalendar);
  const [ddays, setDdays] = useState([]);
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

  // 버스 설정 상태
  const [busSetting, setBusSetting] = useState(null);
  const [buses, setBuses] = useState([]);

  // dday데이터 불러오는 함수
  const getDdayData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("ddays");
      let data = jsonValue != null ? JSON.parse(jsonValue) : [];
      setDdays(data);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchData = async () => {
    const result = await getMainCalendar(time.getMonth(), classMark);

    if (result && result.length > 0) {
      setCalendar(result);
    } else {
      setCalendar([]);
    }
  };

  useEffect(() => {
    //설정 불러오기
    const loadSettings = async () => {
      try {
        const getClassMark = await AsyncStorage.getItem("scheduleViewSetting");
        // 일정 설정에 따른 조건
        if (getClassMark !== null || getClassMark == "true") setClassMark(true);
        else setClassMark(false);
        //세팅을 변수에 담음
        const getCafeteriaSetting = await AsyncStorage.getItem(
          "cafeteriaSetting"
        );
        // 식단 설정에 따른 조건
        if (getCafeteriaSetting !== null) setCafeteria(getCafeteriaSetting);
      } catch (error) {
        console.error(error);
      }
    };

    const loadBusSettings = async () => {
      try {
        //세팅을 변수에 담음
        const savedBusSetting = await AsyncStorage.getItem("busSetting");
        console.log(savedBusSetting);
        //비어있지 않다면 state 에 넣을 것임
        if (savedBusSetting !== null)
          setBusSetting(JSON.parse(JSON.stringify(savedBusSetting)));
        getBusData(JSON.parse(JSON.stringify(savedBusSetting)));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    loadBusSettings();
    updateTime(); // 초기 시간 설정
    let timer = setInterval(() => {
      updateTime();
      getDdayData(); // dday 데이터 불러오기를 실행
      // 초기 설정 및 1초마다 시간을 업데이트
      loadSettings();
    }, 1000);

    let timer2 = setInterval(() => {
      loadBusSettings();
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(timer2); // 두 번째 타이머도 해제
    };
  }, []);

  useEffect(() => {
    // 시간이 변경될 때마다 메뉴 갱신
    getMenus(time.getHours());
  }, [time]);

  // 버스 데이터를 불러옴
  const getBusData = async bussetting => {
    let url = "";
    print("getbusdata시작" + bussetting);
    try {
      switch (bussetting) {
        case "옥계중학교방면":
          url = "LoungeToOk";
          break;
        case "구미시내방면":
          url = "LoungeToGumi";
          break;
        case "":
          url = "LoungeToGumi";
          break;
      }
      const response = await fetch(
        "https://pokits-bus-default-rtdb.firebaseio.com/" + url + "/.json"
      );
      console.log("메인에서 " + url);
      const data = await response.json();
      if (
        data &&
        data.Bus &&
        data.Bus.Body &&
        data.Bus.Body.items &&
        data.Bus.Body.items.bus
      ) {
        data.Bus.Body.items.bus.sort((a, b) => a.leftSecs - b.leftSecs); //버스 시간순 정렬
        setBuses(data.Bus.Body.items.bus);
        console.log("버스데이터 정상적으로 불러옴");
      } else {
        console.log("버스데이터에 Body가 없음 " + url);
        setBuses([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const BusBox = ({ buses }) => (
    <View style={styles.busboxstyle}>
      {buses.length === 0 && <Text styles={styles.itemtitle}>버스 없음</Text>}
      {buses.length > 0 && (
        <BusMiniBoxTrue
          busNum={buses[0].busNum}
          leftTime={buses[0].leftSecs}
          leftStation={buses[0].prevStationCnt}
        />
      )}
      {buses.length > 1 && (
        <View>
          <Divider style={styles.dividerstyle} orientation="horizontal" />
          <BusMiniBoxTrue
            busNum={buses[1].busNum}
            leftTime={buses[1].leftSecs}
            leftStation={buses[1].prevStationCnt}
          />
        </View>
      )}
    </View>
  );
  // 설정에 따른 output component switch 함수
  function cafeteriaComponent(cafeteria) {
    switch (cafeteria) {
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

  const CalendarBox = ({ calendar }) => {
    // calendar 데이터를 이용하여 <View> 컴포넌트들을 생성
    if (calendar == "undefined" || calendar.length == 0) {
      // calendar 데이터가 없거나 빈 경우에 대한 처리
      return (
        <View style={styles.calendarViewContainer}>
          <View style={styles.calendarContentsAndDday}>
            <Text style={styles.calendarContents}>이번달 일정 없음!</Text>
          </View>
        </View>
      );
    }
    if (calendar.length >= 2) {
      let startDday = [];
      startDday.push(ddayCalculator(dateFormatter(calendar[0].startDay)));
      startDday.push(ddayCalculator(dateFormatter(calendar[1].startDay)));
      let endDday = [];
      endDday.push(ddayCalculator(dateFormatter(calendar[0].endDay)));
      endDday.push(ddayCalculator(dateFormatter(calendar[1].endDay)));
      let showDday = [];
      for (let i = 0; i < 2; i++) {
        if (startDday[i] > 0) {
          showDday[i] = startDday[i];
        } else {
          showDday[i] = endDday[i];
        }
      }
      return (
        <View style={styles.calendarViewContainer}>
          <View style={styles.calendarContentsAndDday}>
            <Text style={styles.calendarContents}>{calendar[0].contents}</Text>
            <Text style={styles.calendarContentsDday}>
              ({showDday[0]}일 남음)
            </Text>
          </View>
          <View style={styles.calendarContentsAndDday}>
            <Text style={styles.calendarContents}>{calendar[1].contents}</Text>
            <Text style={styles.calendarContentsDday}>
              ({showDday[1]}일 남음)
            </Text>
          </View>
        </View>
      );
    } else {
      let startDday = [];
      startDday.push(ddayCalculator(dateFormatter(calendar[0].startDay)));
      let endDday = [];
      endDday.push(ddayCalculator(dateFormatter(calendar[0].endDay)));
      let showDday = [];
      if (startDday[0] > 0) {
        showDday[0] = startDday[0];
      } else {
        showDday[0] = endDday[0];
      }
      return (
        <View style={styles.calendarViewContainer}>
          <View style={styles.calendarContentsAndDday}>
            <Text style={styles.calendarContents}>{calendar[0].contents}</Text>
            <Text style={styles.calendarContentsDday}>
              ({showDday[0]}일 남음)
            </Text>
          </View>
        </View>
      );
    }
  };
  const DdayBox = ({ dday }) => {
    // dday 데이터를 이용하여 <View> 컴포넌트들을 생성
    if (dday == "undefined" || dday.length == 0) {
      // dday 데이터가 없거나 빈 경우에 대한 처리
      return (
        <View style={styles.DdayBox}>
          <Text style={styles.DdayContents}>앞으로 남은 DDAY 없음!</Text>
        </View>
      );
    }
    let ddays = [];
    for (let i = 0; i < dday.length; i++) {
      if (ddayCalculator(dday[i].ddayDate) >= 0) ddays.push(dday[i]);
    }

    let ddaysByddays = ddays.sort((a, b) => {
      if (ddayCalculator(a.ddayDate) > ddayCalculator(b.ddayDate)) return 1;
      if (ddayCalculator(a.ddayDate) < ddayCalculator(b.ddayDate)) return -1;
      return 0;
    });
    if (ddaysByddays.length >= 2) {
      let dday1 = ddayCalculator(ddaysByddays[0].ddayDate);
      let dday2 = ddayCalculator(ddaysByddays[1].ddayDate);
      if (dday1 > 0) dday1 = "-" + dday1;
      else if (dday1 < 0) dday1 = "+" + -dday1;
      else dday1 = "-Day";
      if (dday2 > 0) dday2 = "-" + dday2;
      else if (dday2 < 0) dday2 = "+" + -dday2;
      else dday2 = "-Day";
      return (
        <View style={styles.DdayBox}>
          <Text style={styles.DdayContents}>
            D{dday1} {ddaysByddays[0].ddayName}
          </Text>
          <Text style={styles.DdayContents}>
            {ddaysByddays[1].ddayName} D{dday2}
          </Text>
        </View>
      );
    } else {
      let dday1 = ddayCalculator(ddaysByddays[0].ddayDate);
      if (dday1 > 0) dday1 = "-" + dday1;
      else if (dday1 < 0) dday1 = "+" + -dday1;
      else dday1 = "-Day";
      return (
        <View style={styles.DdayBox}>
          <Text style={styles.DdayContents}>
            D{dday1} {ddaysByddays[0].ddayName}
          </Text>
        </View>
      );
    }
  };
  const BusMiniBoxTrue = ({ busNum, leftTime, leftStation }) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 5,
      }}>
      <View style={{ flexDirection: "column" }}>
        <Text
          style={[styles.itemtitle, leftStation <= 1 && { color: "#018242" }]}>
          {busNum + "번 버스"}
        </Text>
        <Text
          style={[styles.itemtitle2, leftStation <= 1 && { color: "#018242" }]}>
          {leftStation + "정거장 전"}
        </Text>
      </View>
      <View
        style={{ height: "100%", flexDirection: "row", alignItems: "center" }}>
        <Text
          style={[styles.itemtitle, leftStation <= 1 && { color: "#018242" }]}>
          {leftStation > 1 ? Math.floor(leftTime / 60) + "분" : "곧도착"}
        </Text>
      </View>
    </View>
  );

  const videoRef = useRef(null);

  useFocusEffect(
    //사용자가 이 페이지를 주목할때 실행하는 모든 것들.
    React.useCallback(() => {
      if (videoRef.current) {
        //일단 비디오부터 재생되게 할거임. 로고부분임
        videoRef.current.playAsync();
      }
    }, [])
  );

  

  return (
    <SafeAreaProvider style={{ backgroundColor: "#F5F5F5" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={()=>{
                navigation.navigate("퀵메뉴");
              }}>
                <Text
                  style={styles.h1}
                  onLayout={event => {
                    const { height } = event.nativeEvent.layout;
                    setTextHeight(height);
                  }}>
                  Pokit's
                </Text>
              </TouchableOpacity>
              
            </View>

            <TouchableOpacity
              onPress={() => {
                console.log("프로필버튼 누름");
                navigateToSettings();
              }}>
              {/* <Image
                source={require("../assets/images/profile.png")} // 여기에 실제 이미지 경로 입력
                style={{ width: textHeight - 10, height: textHeight - 10 }} // 텍스트 높이만큼 이미지 크기 설정
              /> */}
              <Video
                ref={videoRef}
                source={require("../assets/video/logovideo.mp4")}
                style={{
                  height: textHeight,
                  width: textHeight,
                  marginRight: 5,
                }}
                rate={1.0}
                volume={1.0}
                isMuted={true}
                resizeMode="cover"
                shouldPlay
                isLooping
                autoPlay
              />
            </TouchableOpacity>
          </View>
          {/* 학식 컴포넌트 */}
          <View style={styles.componentAria}>
            {/* 입벌려, 버스 들어간다 */}
            <View style={styles.busMainAria}>
              <View style={styles.componentTitle}>
                <Image
                  source={require("../assets/images/busBlack.png")} // 여기에 실제 이미지 경로 입력
                  style={{ width: 20, height: 23 }} // 텍스트 높이만큼 이미지 크기 설정
                />
                <Text style={styles.componentName}>버스</Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  console.log("버스사진 누름");
                  navigateToBus();
                }}>
                <BusBox buses={buses} />
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
                {cafeteriaComponent(cafeteria)}
              </TouchableOpacity>
            </View>
            <View style={styles.componentTitle}>
              <Image
                source={require("../assets/images/quickMenu.png")} // 여기에 실제 이미지 경로 입력
                style={{ width: 20, height: 23 }} // 텍스트 높이만큼 이미지 크기 설정
              />
              <Text style={styles.componentName}>바로가기</Text>
            </View>
              <QuickMenuBox navigation={navigation}></QuickMenuBox>
            {/* 일정 컴포넌트 */}
            <TouchableOpacity
              onPress={() => {
                console.log("일정 페이지 이동");
                navigateToCalendar();
              }}>
              <View style={styles.componentTitle}>
                <Image
                  source={require("../assets/images/Calendar.png")} // 여기에 실제 이미지 경로 입력
                  style={{ width: 23, height: 26.3 }} // 텍스트 높이만큼 이미지 크기 설정
                />
                <Text style={styles.componentName}>일정</Text>
              </View>
              <View style={styles.calendarMainMenu}>
                <LinearGradient
                  style={styles.calendarComponentTitle}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#182A76", "#3C61FF"]}>
                  <Image
                    source={require("../assets/images/calendarInsde.png")} // 여기에 실제 이미지 경로 입력
                    style={{ width: 23, height: 26.3 }} // 텍스트 높이만큼 이미지 크기 설정
                  />
                </LinearGradient>
                <CalendarBox calendar={calendar} />
                <LinearGradient
                  style={styles.calendarDdayComponent}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={["#182A76", "#3C61FF"]}>
                  <DdayBox dday={ddays} />
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
    width: "100%",
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
    fontFamily: "NotoSansBlack",
  },
  dietMainAria: {
    height: (HEIGHT / 100) * 25,
    width: "100%",
    alignItems: "center",
  },
  dietMainMenu: {
    flexDirection: "row",
    height: "80%",
    justifyContent: "center",
    width: "100%",
  },
  dietMenuOut: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#DA121D",
  },
  dietCafName: {
    fontSize: (HEIGHT / 1000) * 15,
    color: "#fff",
    fontWeight: "800",
    margin: 5,
  },
  dietMenu: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
  },
  MenuText: {
    fontSize: (HEIGHT / 1000) * 13,
    fontWeight: "500",
    color: "#B8131C",
  },
  busMainAria: {
    width: "100%",
  },
  busboxstyle: {
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemtitle: {
    fontSize: 18,
    fontWeight: "800",
    fontFamily: "NotoSansBlack",
  },

  itemtitle2: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7D7D7D",
    fontFamily: "NotoSansBlack",
  },
  dividerstyle: {
    marginVertical: 10,
  },
  calendarMainMenu: {
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  calendarComponentTitle: {
    height: (HEIGHT / 100) * 4,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarDdayComponent: {
    height: (HEIGHT / 100) * 5,
    borderRadius: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarViewContainer: {
    width: (WIDTH / 100) * 80,
    height: (HEIGHT / 100) * 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-evenly",
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  calendarContentsAndDday: {
    alignItems: "flex-end",
    flexDirection: "row",
  },
  calendarContents: {
    fontSize: (HEIGHT / 100) * 1.5,
    fontWeight: "600",
    color: "#182A76",
  },
  calendarContentsDday: {
    fontSize: (HEIGHT / 100) * 1.2,
    color: "#182A76",
  },
  DdayContents: {
    fontSize: (HEIGHT / 100) * 1.2,
    fontWeight: "800",
    color: "#fff",
  },
  DdayBox: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  quickMenuBoxStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickMiniBoxStyle:{
    flex: 1,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff",
    borderRadius: 15,
    marginHorizontal: 5, //flex 1이라도 가능,
    fontFamily:"NotoSansBlack",
    fontWeight:"500",
    textAlign: "center",
  },
});
