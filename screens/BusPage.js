import React from 'react';
import { StyleSheet, View, Text, Button, StyleSheetm, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Divider } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#ff4081' }]}>
    <Text>
        안녕
    </Text>
  </View>
  
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const LogoGradient = ({}) => (
    <LinearGradient colors={['#018242', '#00D26A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topView}>
        <Text style={styles.h1}>
            Pokit's
        </Text>
    </LinearGradient>
);

export default function BusPage({navigation}){
    return(
        <View style={styles.fullcontainer}> 
            <LogoGradient></LogoGradient>
            <View style={{flex: 1}}>
                <Tab.Navigator
                    tabBar = {props => (
                    <View>
                        <LinearGradient colors={['#018242', '#00D26A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                            <TabBar {...props} style={{backgroundColor: 'transparent'}} />
                        </LinearGradient>
                        </View>
                    )}
                    tabBarOptions={{
                        indicatorStyle: { backgroundColor: 'white' },
                    }}
                    >
                    <Tab.Screen name="전체 정류장" component={FirstRoute} />
                    <Tab.Screen name="옥계 정류장" component={SecondRoute} />
                </Tab.Navigator>
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
        padding: 20,
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
      },
      vbox: {
        flexDirection: "column",
      },
    
      hbox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 9,
      },
})