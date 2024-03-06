import React from 'react';
import { View, Text } from 'react-native';

export default function Footer() {
  return (
    <View style={{
      backgroundColor: '#fff47c',
      justifyContent: 'center',
      padding: 10,
      height: '47px',
    
    }}>
      <Text style={{ color: 'black', fontSize: 15, fontFamily: "comic sans ms" }}> Author: Jaakko Tuokkola</Text>
    </View>
  );
}