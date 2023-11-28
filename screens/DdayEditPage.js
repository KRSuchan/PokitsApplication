//설정 조회를 위해 필요함
import React, { useState, useEffect } from "react";
import { Dimensions,ScrollView } from "react-native";
//설정 저장을 위해 필요함
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
//datepicker은 expo 에서 지원하지 않으므로, datetimepicker 을 사용할 것임

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


//React navigation 에서 route 랑 navigation 을 인자로 받음
export default function DdayEditPage({route, navigation}){

    const [dday,setDday] = useState(route.params); 
    //이전 페이지에서 ddays를 "객체" 로 전달해 주었으므로, 여기서도 그 객체를 그대로 사용할 것임.
    const [date,setDate] = useState(new Date(dday.ddayDate));
    //datepicker 에 사용되는 date 스테이트
    const [show, setShow] = useState(false);
    //피커를 보이게할까? 안드로이드에서 필요한 함수임

    // console.log(dday)

    //텍스트 변경
    const onChangeText = (editedText) => {
        setDday({...dday,ddayName:editedText || ''})
        //디데이 객체에서, 이름 부분만 받은 걸로 변경할 것임.
        //텍스트가 빈값일때 빈 문자열로 설정해둠
    }

    //날짜 변경
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDday({...dday, ddayDate: currentDate});
    };

    //datepicker 를 표시함
    const showDatepicker = () => {
        setShow(true);
    }

    const deleteDdays = async() => {
        try{
            //로컬에 저장된 디데이 불러옴
            let jsonValue = await AsyncStorage.getItem('ddays')
            //비어있지 않다면 json 파싱
            let data = jsonValue != null ? JSON.parse(jsonValue) : [];
            //선택된 디데이 id를 필터링한 값이 newData
            let newData = data.filter(item=> item.id!=dday.id);
            //그걸 로컬 디데이에 넣고
            await AsyncStorage.setItem('ddays',JSON.stringify(newData));
            //앞 페이지로 이동
            navigation.navigate('디데이 설정')
            
        }catch(e){
            console.log(e);
        }
    };

    //디데이를 저장함
    const saveDdays = async() => {
        
        try{
            // console.log("DdayEditPage 에서 saveDdays 내부 dday")
            // console.log(dday)
            //로컬 디데이 불러옴
            let jsonValue = await AsyncStorage.getItem('ddays')
            // console.log(jsonValue)
            //비어있지 않다면 json 파싱
            let data = jsonValue != null ? JSON.parse(jsonValue) : [];
            //지금 현 디데이 id랑 일치하는 디데이 있는지 찾음, 그리고 업데이트함, 없으면 그냥 아이템만
            //콜백함수 내에 return 필수...
            let newData = data.map(item=>{
                return item.id === dday.id?{...item,ddayName: dday.ddayName, ddayDate:date}:item});
            //그걸 로컬 디데이에 넣고
            await AsyncStorage.setItem('ddays',JSON.stringify(newData));
            //앞 페이지로 이동
            navigation.navigate('디데이 설정')
            
        }catch(e){
            console.log(e)
        }
    }

    return(
        <View style={styles.container}>
          <ScrollView style={styles.scrollbox}>

          
            <Text style={styles.h1}>디데이 수정</Text>
            <View style={styles.inputbox}>
                <TextInput 
                    style={styles.itemdescribe}
                    value={dday.ddayName}
                    placeholder='디데이 이름을 정해 보세요.'
                    onChangeText={onChangeText}
                />
            </View>
            {/* <TouchableOpacity style={styles.inputbox} onPress={showMode}>
                <Text style={styles.itemdescribe}>{dday.ddayDate}</Text>
            </TouchableOpacity> */}
            
            <TouchableOpacity style={styles.dateinputbox} onPress={showDatepicker}>
              <View style={styles.hbox_nomargin}>
                <Text style={styles.itemdescribe}>{`${new Date(dday.ddayDate).getFullYear() + 1}년${new Date(dday.ddayDate).getMonth() + 1}월${new Date(dday.ddayDate).getDate()}일`}</Text> 
                {show && (<DateTimePicker
                      testID="dateTimePicker"
                      value={date} //초기값과 선택값 모두
                      mode={"date"} //날짜 선택 모드임
                      is24Hour={true} 
                      display="default" //안드로이드에서 어떤 모드로 출력할까
                      onChange={onChangeDate} />)}
              </View>
            </TouchableOpacity>
            <View style={styles.hbox}>
                <Button title="삭제" onPress={()=>deleteDdays()}/>
                <Button title="저장" onPress={()=>saveDdays()}/>
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start", //세로 정렬
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

  hbox_nomargin: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

  inputbox: {
    padding: 10,
    backgroundColor: "#E5E5EA",
    width: "100%",
    borderRadius: 10,
    marginBottom: 15,
  },

  dateinputbox: {
    padding: 10,
    alignItems: "flex-end",
    width: "100%",
    backgroundColor: "#ECEDEE",
    borderRadius: 15,
  },
  scrollbox:{
    flex:1,
    width:'100%',
},

});
