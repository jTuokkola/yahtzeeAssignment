import React from 'react';
import { View, Text } from 'react-native';

export default function Header() {
    return (
        <View style={{
            backgroundColor: '#fff47c',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            height: '47px',
        }}>
            <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold', fontFamily: "comic sans ms"}}>Mini-Yahtzee</Text>
        </View>
    );
}
