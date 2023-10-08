//설정 조회를 위해 필요함
import React, { useState, useEffect } from "react";
//설정 저장을 위해 필요함
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  View,
  Text,
  Button,
  StyleSheetm,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Divider } from "react-native-elements";

//날짜 선택을 위한

class Dday {
  constructor(id, ddayName, ddayDate) {
    this.id = id;
    this.ddayName = ddayName;
    this.ddayDate = ddayDate;
  }
}

export default function DdayEditPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>디데이 수정</Text>
      <TextInput
        style={styles.input}
        value={"nice to meet you"}
        placeholder="hello"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
  },

  h1: {
    fontWeight: "bold",
    fontSize: 35, // 글자 크기를 설정하는 스타일
    marginBottom: 10,
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

  input: {
    height: 40,
  },
});
