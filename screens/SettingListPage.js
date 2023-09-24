import React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';


// Setting item component
const SettingItem = ({ title, onPress }) => (
    <Button title={title} onPress={onPress} />
  );  

export default function Homepage() {
}