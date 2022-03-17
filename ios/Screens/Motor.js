import React, {} from 'react';
import { StyleSheet, Text, View, Image, FlatList, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import { Spec, width } from '../Config/Dimensions';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DATA } from '../Config/moterdata';
import Backicon from '../Config/Backicon';
import Auto from '../IMG/Auto.png';

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

function PutAutoData() {
            
  let dataObj = {"" : null };
  console.log(dataObj.led);
  fetch('', 
 
  {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(dataObj),
  }); 

}

const ICON_WIDTH = width * 0.64;
const BG_COLOR = '#C1CEE077';

const { ITEM_HIGHT, ITEM_WITDH, RADIUS, FULL_SIZE, SPACING } = Spec

export default class Moter extends React.Component {   
    
    render() {

        const { navigation } = this.props;

        function oneclick_item(item)
        {
          let key = item.key
          if ( key == '1' ) 
          {
            navigation.push('Window', {item})
          }
          else if ( key == '2' )
          {
            navigation.push('Light', {item})
          }
          else if ( key == '3' )
          {
            navigation.push('Water', {item})
          }
          else if ( key == '4' )
          {
            navigation.push('Fan', {item})
          }
          else if ( key == '5' )
          {
            navigation.push('Remocon', {item})
          }
        }
  
    return (
      
      <SafeAreaView style={{flex: 1, backgroundColor: '#fdfdfd'}}>
          
          <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>
          <Backicon onPress={()=> navigation.goBack()}/>
          
          <Animatable.View
          animation={zoomIn}
          duration={800}
          delay={400}>
          <TouchableOpacity onPress={()=>{PutAutoData()}} style={{ padding: SPACING }}>
          <Image source={Auto} style={{width: 50, height: 50,}}/>
          </TouchableOpacity>
          </Animatable.View>
          
          </View>
          <FlatList 
             data={DATA}
             keyExtractor={item => item.key}
             contentContainerStyle={{ padding: SPACING, marginTop: 10, }}
             renderItem={({item, index})=> {
                 return <Animatable.View 
                 animation={zoomIn}
                 duration={800}
                 delay={400 + index * 100}>
             <TouchableOpacity onPress={()=>{oneclick_item(item)}}>
                 <View style={styles.Itemcontainer}>
                     
                     <SharedElement id={`item.${item.key}.title`}>
                     <Text style={styles.Title}> {item.title} </Text>
                     </SharedElement>
                     <SharedElement id={`item.${item.key}.subtitle`}>
                     <Text style={styles.SubTitle}> {item.subtitle} </Text>
                     </SharedElement>
                    
                     <SharedElement id={`item.${item.key}.image`}
                       style={styles.Image}
                     >
                     <Image source={item.img} style={styles.Image} />
                     </SharedElement>
                 </View>
             </TouchableOpacity>
                 </Animatable.View>
             }}
          />
          
          </SafeAreaView>
  );
 }
}

const styles = StyleSheet.create({
    Name: {
        fontSize: 30,
        color: '#fff',
        fontWeight: '800',
        width: ITEM_WITDH * 0.8,
        textTransform: 'uppercase',
        position: 'absolute',
        bottom: 100,
        left: SPACING * 2,
    },
    Itemcontainer: {
        width: width * 0.95,
        height: width * 0.3,
        backgroundColor: BG_COLOR,
        padding: SPACING,
        marginVertical: SPACING,
        borderRadius: SPACING,
    },
    Title: {
        fontSize: 18,
        fontWeight: '700',
        position: 'absolute',
        left: -5,
    },
    SubTitle: {
        fontSize: 12,
        opacity: 0.7,
        position: 'absolute',
        top: 20 + SPACING / 2,
    },
    Image: {
        width: ICON_WIDTH * 0.55,
        height: ICON_WIDTH * 0.55,
        resizeMode: 'contain',
        position: 'absolute',
        right: '-4%',
        top: '-3%',
      },
})