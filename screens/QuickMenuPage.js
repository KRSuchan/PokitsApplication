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
import { ActivityIndicator } from 'react-native';

import departments from '../assets/data/departments.json';

const Tab = createMaterialTopTabNavigator();

const FirstRoute = () => (
    <WebView source={{ uri: 'https://www.kumoh.ac.kr/ko/sub06_01_01_01.do' }} style={styles.scrollbox} />
  );
  
const SecondRoute = () => (
    <WebView source={{ uri: 'https://www.kumoh.ac.kr/ko/sub06_01_01_02.do' }} style={styles.scrollbox} />
);

const ThirdRoute = () => (
    <WebView source={{ uri: 'https://www.kumoh.ac.kr/ko/sub06_01_01_03.do' }} style={styles.scrollbox} />
);

const FourthRoute = ({settingurl}) => (
    <WebView source={{ uri: settingurl}} style={styles.scrollbox} settingurl = {settingurl}/>
);

const LogoGradient = ({navigation}) => (
    <LinearGradient colors={['#00A0D2', '#6ED8FA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topView}>
      <TouchableOpacity onPress={()=> navigation.navigate("메인화면")} >
        <Text style={styles.h1}>
            Pokit's
        </Text>
      </TouchableOpacity>
    </LinearGradient>
);

const TabMyTab1 = ({settingurl,initialTab}) => (
    <Tab.Navigator initialRouteName={initialTab}
      tabBar={(props) => ( //커스텀 탭바 = props
        <LinearGradient colors={['#00A0D2', '#6ED8FA']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flexDirection: 'row',paddingLeft: 20,paddingTop: 10}}>
          {props.state.routes.map((route, index) => ( //각 탭을 흩뿌리기
            <TouchableOpacity
              key={route.key} //탭에 고유한 id
              onPress={() => props.navigation.navigate(route.name)} //클릭시 이동
              style={{ alignItems: 'center', paddingRight: 15 }}
            >
              <Text style={{ color: 'white',fontSize: 22, fontWeight: 'bold' ,paddingBottom:10}}>{route.name}</Text>
              {/* 텍스트 뿌리고 인디케이터 뿌릴게 */}
              {props.state.index === index && <View style={{ width: '100%', height: 4, backgroundColor: 'white' }} />} 
            </TouchableOpacity>
          ))}
        </LinearGradient>
      )}
    >
        <Tab.Screen name="학사" component={FirstRoute}>
        </Tab.Screen>
      <Tab.Screen name="행사" component={SecondRoute} />
      <Tab.Screen name="일반" component={ThirdRoute} />
      <Tab.Screen name="학과">
        {() => <FourthRoute settingurl={settingurl} />}
    </Tab.Screen>
    </Tab.Navigator>
  );
  


export default function QuickMenuPage({navigation,route}){

    const insets = useSafeAreaInsets(); //어디까지 안전해?

    const [selectedItem, setSelectedItem] = useState("http://se.kumoh.ac.kr/"); //학과 설정 저장되는 곳

    const [loading, setLoading] = useState(true); // 데이터 로딩 상태

    const initialTab = route.params?.initialTab ?? '학사'; //

    useEffect(() => {
        const loadSettings = async() => {
            try{
                let savedSetting = await AsyncStorage.getItem('departmentSetting');
                console.log('Saved Setting:', savedSetting); // savedSetting 값을 출력합니다.
                savedSetting = savedSetting.replace(/"/g, ''); // 따옴표를 제거합니다.
                const departmentUrl = departments[savedSetting];
                console.log(departmentUrl)
                if(departmentUrl !== undefined) { // departmentUrl이 undefined가 아닐 때만 selectedItem을 업데이트합니다.
                    setSelectedItem(departmentUrl);
                    console.log(departmentUrl)
                }
                setLoading(false); // 데이터 로딩이 완료되었음을 알립니다.
            } catch (error) {
                console.error(error);
            }
        }

        loadSettings(); //이걸 해줘야 실제로 작동한다.
    }, []);

    if (loading) { // 데이터가 아직 로드되지 않은 경우 로딩 인디케이터를 표시합니다.
        return <ActivityIndicator />;
        
    }else{
        return(
            <View style={styles.fullcontainer}>
                <LinearGradient
                    colors={['#00A0D2', '#6ED8FA']}
                    style={{ height: insets.top }}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}  
                />
                <View style={styles.fullcontainer}> 
                    <LogoGradient navigation={navigation}></LogoGradient>
                        <View style={{flex: 1}}>
                            <TabMyTab1 settingurl = {selectedItem} initialTab={initialTab}>
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
      
      
})