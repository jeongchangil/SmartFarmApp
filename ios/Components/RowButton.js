import React from 'react';
import  { View, TouchableOpacity, Text } from 'react-native';
import { SPACING } from '../Config/Dimensions';


export default function RowButton({ title, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} >
            <View style={{
                flexDirection: 'row',
                padding: SPACING * 2,
                justifyContent: 'space-between',
                borderColor: 'rgba(0,0,0,0.1)',
                borderBottomWidth: 1,
                borderTopWidth: 1,
            }}>
                <Text style={{ fontSize: 18, fontWeight: '200'}}> {title} </Text>
            </View>
        </TouchableOpacity>
    );
}