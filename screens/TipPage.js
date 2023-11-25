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
import tipsjson from '../assets/data/tips.json';


//화면의 높이
HEIGHT = Dimensions.get("window").height;

//화면의 너비
WIDTH = Dimensions.get("window").width;




const Tab = createMaterialTopTabNavigator();



const LogoGradient = ({navigation}) => (
    <LinearGradient colors={['#FFA462', '#BA4E00']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topView}>
      <TouchableOpacity onPress={()=> navigation.navigate("메인화면")} >
        <Text style={styles.h1}>
            Pokit's
        </Text>
      </TouchableOpacity>
    </LinearGradient>
);



const TabMyTab1 = ({TipText}) => (
    <View style={styles.container}>
        <ScrollView style={{flex:5}}>
            <Text style={styles.MenuTextTitle}>
                삼색냥
            </Text>
            <View style={{ width:"100%" ,backgroundColor:"#FFA462",marginTop:5, borderRadius: 10, padding:20, marginBottom:20, }}>
                <Text style={styles.MenuText}>
                    {TipText}
                </Text>
            </View>
        </ScrollView>
        
        <Image
                  source={require("../assets/images/highQualityImg/OIG1.png")}
                  style={{resizeMode:"contain", height:"25%",width:"100%"}}
                />
        
    </View>
  );
  


export default function TipPage({navigation,route}){

    const [tipText, setTipText] = useState(''); // Tip text를 저장할 state 추가

    const insets = useSafeAreaInsets(); //어디까지 안전해?

    const [loading, setLoading] = useState(false); // 데이터 로딩 상태

    const initialTab = route.params?.initialTab ?? '교내식당'; //

    

    useEffect(() => {
        const loadSettings = async () => {
            try {

              const tips = tipsjson;
          
              // tips에서 랜덤한 키를 선택
              const keys = Object.keys(tips);
              const randomKey = keys[Math.floor(Math.random() * keys.length)];
          
              // 선택된 키에 해당하는 tip을 state에 저장
              setTipText(tips[randomKey]);
            } catch (error) {
              console.error(error);
            }
          };

        loadSettings(); //이걸 해줘야 실제로 작동한다.
    }, []);

    if (loading) { // 데이터가 아직 로드되지 않은 경우 로딩 인디케이터를 표시합니다.
        return <ActivityIndicator />;
        
    }else{
        return(
            <View style={styles.fullcontainer}>
                <LinearGradient
                    colors={['#FFA462', '#BA4E00']}
                    style={{ height: insets.top }}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}  
                />
                <View style={styles.fullcontainer}> 
                    <LogoGradient navigation={navigation}></LogoGradient>
                        <View style={{flex: 1}}>
                            <TabMyTab1 TipText={tipText}>
                            </TabMyTab1>
                        </View>
                </View>
            </View>
        );
    }

    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'flex-start',
      justifyContent: 'flex-start', 
      padding: 20,
    },
    topView:{
        // flex: 1,
        paddingTop: 0,
        paddingHorizontal: 20,
        paddingBottom:10,
    },
    fullcontainer:{
        flex: 1, //화면 꽉채워줭, 
        backgroundColor: '#fff',
    },
    h1: {
        fontFamily: "Lobster",
        fontSize: 40,
        color: "black",
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
      MenuText: {
        // fontSize: (HEIGHT / 1000) * 13,
        // fontWeight: "500",
        color: "#000000",
        lineHeight: 20,
        fontSize: 16,
        fontWeight: "600",
        fontFamily: "NotoSansBlack",
      },

      MenuTextTitle: {
        // fontSize: (HEIGHT / 1000) * 13,
        // fontWeight: "500",
        color: "black",
        lineHeight: 23,
        fontSize: 19,
        fontWeight: "600",
        fontFamily: "NotoSansBlack",
      },
      
      
})