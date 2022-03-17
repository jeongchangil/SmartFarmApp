console.disableYellowBox = true;
import React, {} from 'react';
import { Easing, Animated } from 'react-native';
import {enableScreens} from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native'
import { ease } from 'react-native/Libraries/Animated/src/Easing';

import SmartFarm from './Screens/SmartFarm';
import Sensor from './Screens/Sensor';
import Motor from './Screens/Motor';
import CCTV from './Screens/CCTV';
import Setting from './Screens/Setting';
import Calendar from './Screens/Calendar';

import Window from './Moter/Window';
import Light from './Moter/Light';
import Water from './Moter/Water';
import Fan from './Moter/Fan';
import Remocon from './Moter/Remocon';

import Wind from './Sensor/Wind';
import Rain from './Sensor/Rain';
import Photo from './Sensor/Photo';
import Temp from './Sensor/Temp';
import Soil from './Sensor/Soil';
import Co2 from './Sensor/Co2';

enableScreens();
const Stack = createSharedElementStackNavigator();
const options = () => ({
  gestureEnabled: false,
  transitionSpec: {
    open: {animation: 'timing',
           config: { duration: 600, easing: Easing.inOut(ease) } },
    close: {animation: 'timing',
           config: { duration: 600, easing: Easing.inOut(ease) } },
  },

  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      }}}})
export default class App extends React.Component{
  render(){
  return(
    <NavigationContainer>
      <Stack.Navigator headerMode='none' >
      <Stack.Screen name="SmartFarm" component={SmartFarm} options={options}/>
        <Stack.Screen name="Sensor" component={Sensor} options={options}/>
        <Stack.Screen name="Motor" component={Motor} options={options}/>
        <Stack.Screen name="CCTV" component={CCTV} options={options}/>
        <Stack.Screen name="Setting" component={Setting} options={options}/>
        <Stack.Screen name="Calendar" component={Calendar} options={options}/>

        <Stack.Screen name="Window" component={Window} options={options}/>
        <Stack.Screen name="Light" component={Light} options={options}/>
        <Stack.Screen name="Water" component={Water} options={options}/>
        <Stack.Screen name="Fan" component={Fan} options={options}/>
        <Stack.Screen name="Remocon" component={Remocon} options={options}/>  

        <Stack.Screen name="Wind" component={Wind} options={options}/>  
        <Stack.Screen name="Rain" component={Rain} options={options}/>  
        <Stack.Screen name="Photo" component={Photo} options={options}/>  
        <Stack.Screen name="Temp" component={Temp} options={options}/>  
        <Stack.Screen name="Soil" component={Soil} options={options}/>  
        <Stack.Screen name="Co2" component={Co2} options={options}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
 }
}