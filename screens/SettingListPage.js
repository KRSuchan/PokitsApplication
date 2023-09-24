import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';



// Setting item component
const SettingItem = ({ title, onPress }) => (
    <Button title={title} onPress={onPress} />
  );  

export default function SettingListPage({navigation}) {

    return (
        <View>
          <Text>Setting List Page</Text>
          <SettingItem title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      );

}