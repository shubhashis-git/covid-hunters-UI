import React from 'react';
import { View } from 'react-native';
import Navigation from './navigations/Navigation';
import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Navigation />
      <FlashMessage position="bottom" />
    </View>
  );
}
