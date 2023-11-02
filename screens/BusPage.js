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

const TabMyTab = ({}) => ( //탭바 함수 내부에서 탭바 컴포넌트 사용 = 오류 = 글자안보임
    <Tab.Navigator
        tabBar = {props => (
            <LinearGradient colors={['#018242', '#00D26A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} >
                <View>
                    <TabBar {...props} style={{backgroundColor: 'transparent',shadowColor:'#000'}} indicatorStyle={{ backgroundColor: 'white' }} labelStyle={{color:'white'}} />
                </View>
            </LinearGradient>
        )}
        >
        <Tab.Screen name="전체 정류장" component={FirstRoute} />
        <Tab.Screen name="옥계 정류장" component={SecondRoute} />
    </Tab.Navigator>
);

const TabMyTab1 = () => (
    <Tab.Navigator
      tabBar={(props) => ( //커스텀 탭바 = props
        <LinearGradient colors={['#018242', '#00D26A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flexDirection: 'row' }}>
          {props.state.routes.map((route, index) => ( //각 탭을 흩뿌리기
            <TouchableOpacity
              key={route.key} //탭에 고유한 id
              onPress={() => props.navigation.navigate(route.name)} //클릭시 이동
              style={{ flex: 1, alignItems: 'center', padding: 10 }}
            >
              <Text style={{ color: 'white' }}>{route.name}</Text>
              {props.state.index === index && <View style={{ width: '100%', height: 2, backgroundColor: 'white' }} />}
            </TouchableOpacity>
          ))}
        </LinearGradient>
      )}
    >
      <Tab.Screen name="전체 정류장" component={FirstRoute} />
      <Tab.Screen name="옥계 정류장" component={SecondRoute} />
    </Tab.Navigator>
  );
  



export default function BusPage({navigation}){
    return(
        <View style={styles.fullcontainer}> 
            <LogoGradient></LogoGradient>
            <View style={{flex: 1}}>
                <TabMyTab1></TabMyTab1>
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
      tabbarmystyle: {
        backgroundColor: 'transparent',
      }
})