import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";

//화면의 높이
HEIGHT = Dimensions.get("window").height;

//화면의 너비
WIDTH = Dimensions.get("window").width;

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

const UnivCafeteriaRoute = () => (
  <View style={styles.pageViewContainer}>
    <View style={styles.cafeteriaContainer}>
      <View style={styles.cafeteriaType}>
        <Text style={styles.cafeteriaName}>학생식당</Text>
      </View>
      <View style={styles.cafeteriaMenuContainer}>
        <Text style={styles.cafeteriaMenu}></Text>
      </View>
    </View>
    <View style={styles.cafeteriaContainer}>
      <View style={styles.cafeteriaType}>
        <Text style={styles.cafeteriaName}>교직원</Text>
      </View>
      <View style={styles.cafeteriaMenuContainer}>
        <Text style={styles.cafeteriaMenu}></Text>
      </View>
    </View>
    <View style={styles.cafeteriaContainer}>
      <View style={styles.cafeteriaType}>
        <Text style={styles.cafeteriaName}>분식당</Text>
      </View>
      <View style={styles.cafeteriaMenuContainer}>
        <Text style={styles.cafeteriaMenu}></Text>
      </View>
    </View>
  </View>
);

const DormiCafeteriaRoute = () => (
  <View style={styles.pageViewContainer}>
    <View></View>
  </View>
);

const renderScene = SceneMap({
  UnivCafeteria: UnivCafeteriaRoute,
  DormiCafeteria: DormiCafeteriaRoute,
});

export default function SettingListPage({ navigation }) {
  const [textHeight, setTextHeight] = useState(0);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "UnivCafeteria", title: "교내식당" },
    { key: "DormiCafeteria", title: "기숙사식당" },
  ]);
  return (
    <SafeAreaProvider style={{ backgroundColor: "black" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          style={styles.outerGrad}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#DA121D", "#FF6725"]}>
          <StatusBar style="light" />
          <View style={styles.header}>
            <Text
              style={styles.hPokits}
              onLayout={event => {
                const { height } = event.nativeEvent.layout;
                setTextHeight(height);
              }}>
              Pokit's
            </Text>
          </View>
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
    padding: (WIDTH / 100) * 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cafeteriaContainer: {
    flexDirection: "row",
    backgroundColor: "blue",
  },
  cafeteriaType: { width: "30%", backgroundColor: "#DB141E" },
  cafeteriaName: { color: "#fff" },
  cafeteriaMenuContainer: { width: "70%" },
  cafeteriaMenu: {},
});
