import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const FirstRoute = ({buses}) => (
    <ScrollView style={styles.scrollbox}>
      <View style={[styles.scene]}>
      </View>
    </ScrollView>
  );
  
const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const LogoGradient = ({navigation}) => (
    <LinearGradient colors={['#018242', '#00D26A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topView}>
      <TouchableOpacity onPress={()=> navigation.navigate("메인화면")} >
        <Text style={styles.h1}>
            Pokit's
        </Text>
      </TouchableOpacity>
    </LinearGradient>
);

const TabMyTab1 = ({buses}) => (
    <Tab.Navigator
      tabBar={(props) => ( //커스텀 탭바 = props
        <LinearGradient colors={['#018242', '#00D26A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flexDirection: 'row',paddingLeft: 20,paddingTop: 10}}>
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
        <Tab.Screen name="전체 정류장">
          {props => <FirstRoute {...props} buses = {buses}/>}
        </Tab.Screen>
      <Tab.Screen name="옥계 정류장" component={SecondRoute} />
    </Tab.Navigator>
  );
  


export default function BusPage({navigation}){


    return(
        <View style={styles.fullcontainer}>
            <LinearGradient
                colors={['#018242', '#00D26A']}
                style={{ height: insets.top }}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}  
            />
            <View style={styles.fullcontainer}> 
                <LogoGradient navigation={navigation}></LogoGradient>
                    <View style={{flex: 1}}>
                        <TabMyTab1 buses = {buses}>

                        </TabMyTab1>
                    </View>
            </View>
        </View>
    );
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