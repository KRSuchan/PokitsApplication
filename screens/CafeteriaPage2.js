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
import { ActivityIndicator,Dimensions } from 'react-native';

//기존식당 임포트
import { StatusBar } from "expo-status-bar";
import { getCtrlMenu } from "../controller/CafeteriaService";


//화면의 높이
HEIGHT = Dimensions.get("window").height;

//화면의 너비
WIDTH = Dimensions.get("window").width;


const TabMyTab1 = (
    {
        studentBf,
        studentLunch,
        facultyLunch,
        facultyDinner,
        snackbarMenu,
        puroomLunch,
        puroomDinner,
        oreum1Lunch,
        oreum1Dinner,
        oreum3Lunch,
        oreum3Dinner
      }
) => (
    <Tab.Navigator 
      tabBar={(props) => (
        <LinearGradient colors={['#DA121D', '#FF6725']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flexDirection: 'row',paddingLeft: 20,paddingTop: 10}}>
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
      <Tab.Screen name="교내식당">
        {() => <FirstRoute 
          studentBf={studentBf}
          studentLunch={studentLunch}
          facultyLunch={facultyLunch}
          facultyDinner={facultyDinner}
          snackbarMenu={snackbarMenu}
        />}
      </Tab.Screen>
      <Tab.Screen name="기숙사식당">
        {() => <SecondRoute 
          puroomLunch={puroomLunch}
          puroomDinner={puroomDinner}
          oreum1Lunch={oreum1Lunch}
          oreum1Dinner={oreum1Dinner}
          oreum3Lunch={oreum3Lunch}
          oreum3Dinner={oreum3Dinner}
        />}
      </Tab.Screen>
    </Tab.Navigator>
  );

const Tab = createMaterialTopTabNavigator();

// 교내 식당에 해당하는 FirstRoute 
const FirstRoute = ({ 
    studentBf,
    studentLunch,
    facultyLunch,
    facultyDinner,
    snackbarMenu,
  }) => (
    <UnivCafeteriaRoute
      studentBf={studentBf}
      studentLunch={studentLunch}
      facultyLunch={facultyLunch}
      facultyDinner={facultyDinner}
      snackbarMenu={snackbarMenu}
    />
  );
  
  // 기숙사 식당에 해당하는 SecondRoute
  const SecondRoute = ({ 
    puroomLunch,
    puroomDinner,
    oreum1Lunch,
    oreum1Dinner,
    oreum3Lunch,
    oreum3Dinner,
  }) => (
    <DormiCafeteriaRoute
      puroomLunch={puroomLunch}
      puroomDinner={puroomDinner}
      oreum1Lunch={oreum1Lunch}
      oreum1Dinner={oreum1Dinner}
      oreum3Lunch={oreum3Lunch}
      oreum3Dinner={oreum3Dinner}
    />
  );

const LogoGradient = ({navigation}) => (
    <LinearGradient colors={['#DA121D', '#FF6725']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topView}>
      <TouchableOpacity onPress={()=> navigation.navigate("메인화면")} >
        <Text style={styles.h1}>
            Pokit's
        </Text>
      </TouchableOpacity>
    </LinearGradient>
);

  //여기서부터 기존 식당 코드

  // 교내식당 탭 내용
const UnivCafeteriaRoute = ({
    studentBf = [],
    studentLunch = [],
    facultyLunch = [],
    facultyDinner = [],
    snackbarMenu = []
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
    puroomLunch = [],
    puroomDinner = [],
    oreum1Lunch = [],
    oreum1Dinner = [],
    oreum3Lunch = [],
    oreum3Dinner = [],
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

export default function CafeteriaPage2({navigation,route}){

    

    const insets = useSafeAreaInsets(); //어디까지 안전해?

    const [loading, setLoading] = useState(false); // 데이터 로딩 상태

    const initialTab = route.params?.initialTab ?? '교내식당'; //

    // 각 식당 메뉴별 useState
    const [studentBf, setStudentBf] = useState([]);
    const [studentLunch, setStudentLunch] = useState([]);
    const [facultyLunch, setFacultyLunch] = useState([]);
    const [facultyDinner, setFacultyDinner] = useState([]);
    const [snackbarMenu, setSnackbarMenu] = useState([]);
    const [puroomLunch, setPuroomLunch] = useState([]);
    const [puroomDinner, setPuroomDinner] = useState([]);
    const [oreum1Lunch, setOreum1Lunch] = useState([]);
    const [oreum1Dinner, setOreum1Dinner] = useState([]);
    const [oreum3Lunch, setOreum3Lunch] = useState([]);
    const [oreum3Dinner, setOreum3Dinner] = useState([]);

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
// 아래에서 renderScene 부분을 수정
const renderScene = SceneMap({
    FirstRoute: () => (
      <FirstRoute
        studentBf={studentBf}
        studentLunch={studentLunch}
        facultyLunch={facultyLunch}
        facultyDinner={facultyDinner}
        snackbarMenu={snackbarMenu}
      />
    ),
    SecondRoute: () => (
      <SecondRoute
        puroomLunch={puroomLunch}
        puroomDinner={puroomDinner}
        oreum1Lunch={oreum1Lunch}
        oreum1Dinner={oreum1Dinner}
        oreum3Lunch={oreum3Lunch}
        oreum3Dinner={oreum3Dinner}
      />
    ),
  });

    if (loading) { // 데이터가 아직 로드되지 않은 경우 로딩 인디케이터를 표시합니다.
        return <ActivityIndicator />;
        
    }else{
        return(
            <View style={styles.fullcontainer}>
                <LinearGradient
                    colors={['#DA121D', '#FF6725']}
                    style={{ height: insets.top }}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}  
                />
                <View style={styles.fullcontainer}> 
                    <LogoGradient navigation={navigation}></LogoGradient>
                        <View style={{flex: 1}}>
                        <TabMyTab1
              studentBf={studentBf}
              studentLunch={studentLunch}
              facultyLunch={facultyLunch}
              facultyDinner={facultyDinner}
              snackbarMenu={snackbarMenu}
              puroomLunch={puroomLunch}
              puroomDinner={puroomDinner}
              oreum1Lunch={oreum1Lunch}
              oreum1Dinner={oreum1Dinner}
              oreum3Lunch={oreum3Lunch}
              oreum3Dinner={oreum3Dinner}
            />
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
        fontWeight:'600',
        color:"black",
        textAlign:"right",
      },
      busitemlefttext:{
        fontSize:18,
        fontWeight:'600',
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
        padding: 20,
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
        fontSize: WIDTH / 25,
        margin: 5,
        fontWeight: "600",
        fontFamily: "NotoSansBlack",
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
        fontWeight: "300",
        textAlign: "center",
        fontFamily: "NotoSansB",
        fontSize: 15,
      },
      
      
})