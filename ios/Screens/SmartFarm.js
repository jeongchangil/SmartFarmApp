import React, {useRef} from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Animated  } from 'react-native';
import { DATA } from '../Config/Smartdata';
import { ICON_SIZE, Spec } from '../Config/Dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import LOGO from '../IMG/Logo.png'

const { ITEM_HEIGHT, ITEM_WITDH, RADIUS, FULL_SIZE, SPACING, LOGO_HEIGHT, LOGO_WITDH } = Spec

export default function SmartFarm({ navigation }) {
  
  const scrollX = React.useRef(new Animated.Value(0)).current;

  function onclick_item(item)
  {
      let key = item.key
      if (key == '1')
      {
          navigation.push("Sensor")
      }
      else if(key == '2')
      {
          navigation.push("Motor")
      }
      else if(key == '3')
      {
          navigation.push("CCTV")
      }
      else if(key == '4')
      {
          navigation.push("Setting")
      }
      else if(key == '5')
      {
        navigation.push("Calendar")
      }
  }

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fdfdfd', }}>

      <View>
        <Text style={{fontSize: 50, margin: SPACING * 2, fontWeight: 'bold', textTransform: 'uppercase', position: 'relative', top: 10, }}>Smart Farm</Text>
      </View>
      
      <Animated.FlatList
       data={DATA}
       keyExtractor={item => item.key}
       horizontal
       showsHorizontalScrollIndicator={false}
       snapToInterval={FULL_SIZE}
       decelerationRate= 'fast'
       onScroll={Animated.event(
         [{ nativeEvent: { contentOffset: { x: scrollX } } }],
         { useNativeDriver: true }
       )}
       renderItem= { ({item, index}) => {
         const inputRange = [ (index-1) * FULL_SIZE, index * FULL_SIZE, (index+1) * FULL_SIZE ];
         const translateX = scrollX.interpolate({
           inputRange,
           outputRange: [ITEM_WITDH, 0, -ITEM_WITDH]
         });
         const scale = scrollX.interpolate({
           inputRange,
           outputRange: [1, 1.1, 1],
         })
         return <TouchableOpacity onPress={ () => {onclick_item(item)} } style={styles.ItemContainer} >
            
            
            <View style={[StyleSheet.absoluteFillObject, { overflow: 'hidden', borderRadius: RADIUS }]}>
            <Animated.Image source={{ uri: item.img }} style={[StyleSheet.absoluteFillObject, {resizeMode: 'cover', transform:[{scale}] }]}/>
            </View>

         

         <Animated.Text style={[styles.Name, {transform: [{ translateX }], }]}> {item.name} </Animated.Text>

         <View style={styles.Index}>
           <Text style={styles.TextPont}> {item.key} </Text>
           <Text style={styles.TextLabel}> Index </Text>
         </View>
         </TouchableOpacity>
       }}
      />
      <View>
        <Image source={LOGO} style={{width: ICON_SIZE * 2.5, height: ICON_SIZE * 3.5, alignSelf: 'flex-end' }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ItemContainer: {
    width: ITEM_WITDH,
    height: ITEM_HEIGHT,
    margin: SPACING,
  },
  Name: {
    fontSize: 30,
    color: '#fdfdfd',
    fontWeight: 'bold',
    width: ITEM_WITDH * 0.8,
    textTransform: 'uppercase',
    position: 'absolute',
    top: SPACING * 2,
    left: SPACING,
  },
  Index: {
    position: 'absolute',
    bottom: SPACING,
    left: SPACING,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextPont: {
    fontWeight: '800',
    color: '#fff',
  },
  TextLabel: {
    color: '#fff',
    fontSize: 15,
  }
});