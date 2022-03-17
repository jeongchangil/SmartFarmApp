import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Alert, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import Backicon from '../Config/Backicon';

export default class CCTV extends React.Component{
  render(){
    
    const { navigation } = this.props;


    return(
        
        <View style={{flex:1, backgroundColor: '#fff'}}>
         <Backicon onPress={()=> navigation.goBack()}/>
        
        <View style={{ flex: 0.5 }}>
          <Text style={{textAlign: 'center', fontSize: 25, color: '#2f2f2f', fontWeight: 'bold'}}>CCTV1</Text>
          <WebView
          style={{ marginLeft: 14, }}
          source={{uri:'http://ccit2.jp.ngrok.io/stream'}}/>
        </View>
       
        <View style={{ flex: 0.5 }}>
          <Text style={{ textAlign: 'center', fontSize: 25, color: '#2f2f2f', fontWeight: 'bold' }}>CCTV2</Text>
        <WebView
          source={{uri:'http://ccit3.jp.ngrok.io/stream'}}
          style={{ marginLeft: 14, }}
          />
        </View>

        </View>
      
    );
  }
}