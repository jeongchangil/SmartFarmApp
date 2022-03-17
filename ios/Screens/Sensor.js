import React, {} from 'react';
import { StyleSheet, Text, View, Image, FlatList, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {width, height, SPACING } from '../Config/Dimensions';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DATA } from '../Config/sensordata';
import Backicon from '../Config/Backicon';
import { SharedElement } from 'react-navigation-shared-element';
import { image } from 'faker';

const zoomIn = {
    0: {
        opacity: 0,
        scale: 0,
    },
    1: {
        opacity: 1,
        scale: 1,
    },
}

const ITEM_HIGHT = height * 0.18;

export default class Sensor extends React.Component {   
    
render() {

const { navigation } = this.props;

        function oneclick_item(item)
        {
          let key = item.key
          if ( key == '1' ) 
          {
            navigation.push('Wind', {item})
          }
          else if ( key == '2' )
          {
            navigation.push('Rain', {item})
          }
          else if ( key == '3' )
          {
            navigation.push('Photo', {item})
          }
          else if ( key == '4' )
          {
            navigation.push('Temp', {item})
          }
          else if ( key == '5' )
          {
            navigation.push('Soil', {item})
          }
          else if ( key == '6' )
          {
            navigation.push('Co2', {item})
          }
        }
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fdfdfd'}}>
        <Backicon onPress={()=> navigation.goBack()}/>
      
      <FlatList 
      data={DATA}
      keyExtractor={item => item.key}
      contentContainerStyle={{ padding: SPACING, }}
      renderItem={({item, index})=>{
        return(
          <Animatable.View
          animation={zoomIn}
          duration={800}
          delay={400 + index * 100}
          >
          <TouchableOpacity onPress={()=>{oneclick_item(item)}} style={{ marginBottom: SPACING, height: ITEM_HIGHT }}>
            <View style={{ flex:1, padding: SPACING, marginTop: 5, marginBottom: 5,}}>
              
              <SharedElement id={`item.${item.key}.bg`} style={[StyleSheet.absoluteFillObject, {backgroundColor: item.color, borderRadius: 16}]}>
              <View style={[StyleSheet.absoluteFillObject, {backgroundColor: item.color, borderRadius: 16}]} />
              </SharedElement>

              <SharedElement id={`item.${item.key}.title`} >
              <Text style={styles.title}> {item.title} </Text>
              </SharedElement>

              <Text style={styles.subtitle}> {item.subtitle} </Text>
              
              <SharedElement id={`item.${item.key}.image`} style={styles.image}>
              <Image source={item.image} style={styles.image} />
              </SharedElement>
            
            </View>
          </TouchableOpacity>
          </Animatable.View>
        );
      }}
      />

        <SharedElement id='general.bg'>
        <View style={styles.bg}/>
        </SharedElement> 

      </SafeAreaView>
  );
 }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 18,
    position: 'absolute',
  },
  subtitle: {
    fontSize: 11,
    opacity: 0.7,
    marginTop: 18 * 1.3
  },
  image: {
    width: ITEM_HIGHT * 0.5,
    height: ITEM_HIGHT * 0.5,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 14,
    right: 7,
  },
  bg: {
    position: 'absolute',
    width,
    height,
    transform: [{translateY: height}],
    borderRadius: 32,
  },
})