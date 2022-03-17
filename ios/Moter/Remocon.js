import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import * as Animatable from 'react-native-animatable';
import Backicon from '../Config/Backicon';

import img1 from '../IMG/1.png';
import img2 from '../IMG/2.png';
import img3 from '../IMG/3.png';
import img4 from '../IMG/4.png';
import img5 from '../IMG/5.png';
import img6 from '../IMG/6.png';
import img7 from '../IMG/7.png';

function OnOff(){
    let dataObj = { "on_off" : 1 };
    console.log(dataObj.on_off);
    fetch(global.url+'on_off',
    {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(dataObj),
    });
    
}

function Strong(){
    let dataObj = { "strong" : 1 };
    console.log(dataObj.strong);
    fetch(global.url+'strong',
    {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(dataObj),
    });
    
}

function Timer(){
    let dataObj = { "timer" : 1 };
    console.log(dataObj.timer);
    fetch(global.url+'timer',
    {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(dataObj),
    });
    
}

function Turn(){
    let dataObj = { "turn" : 1 };
    console.log(dataObj.turn);
    fetch(global.url+'turn',
    {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(dataObj),
    });
    
}

function TempDown(){
    let dataObj = { "temp_down" : 1 };
    console.log(dataObj.temp_down);
    fetch(global.url+'temp_down',
    {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(dataObj),
    });
    
}

function TempUP(){
    let dataObj = { "temp_up" : 1 };
    console.log(dataObj.temp_up);
    fetch(global.url+'temp_up',
    {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(dataObj),
    });
    
}


export default class Remocon extends React.Component {
    static sharedElements = (route, otherRoute, showing) => {
        const { item } = route.params;
        return [`item.${item.key}.image`,];;
      }
    render() {
        
        const { navigation } = this.props;
        const { route } = this.props;
        const { item } = route.params;

        return(
            <SafeAreaView style={{flex:1, flexDirection: 'column', justifyContent: 'center',}}>
                
                <View style={{position: 'relative', top: -125}}>
                <Backicon onPress={()=> navigation.goBack()}/>
                </View> 
                
                <Animatable.View style={styles.Container}
                            animation='bounceIn'
                            duration={3000}
                            delay={1000}
                >

                <SharedElement id={`item.${item.key}.image`}>
                <Image source={item.img} style={{ position: 'absolute', top: -30 ,right: -174, width: 550, height: 550, opacity: 0, }} />
                </SharedElement>
                    
                    
                    <TouchableOpacity onPress={()=>{OnOff()}} style={{ padding: 3, position: 'absolute', top: '10%', left: 20, }}>
                    <View style={[styles.Btn,{backgroundColor: 'red'}]}>
                        <Image source={img1} style={{ width: 30, height: 30, }} />
                    </View>
                    <Text style={styles.BtnText}>전원</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>{Strong()}} style={{ padding: 3, position: 'absolute', top: '10%', right: 20, }} >
                    <View style={styles.Btn}>
                        <Image source={img2} style={{ width: 30, height: 30, tintColor: '#4d5351' }} />
                    </View>
                    <Text style={styles.BtnText}>강약조절</Text>
                    </TouchableOpacity>          
                    
                    <TouchableOpacity onPress={()=>{Timer()}} style={{ padding: 3, position: 'absolute', top: '40%', left: 20, }}>
                    <View style={styles.Btn}>
                        <Image source={img3} style={{ width: 30, height: 30, tintColor: '#4d5351' }} />
                    </View>
                    <Text style={styles.BtnText}>타이머</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=>{Turn()}} 
                    style={{ padding: 3, position: 'absolute', top: '40%', right: 20, }}>
                    <View style={styles.Btn}>
                        <Image source={img4} style={{ width: 30, height: 30, tintColor: '#4d5351' }} />
                    </View>
                    <Text style={styles.BtnText}>회전</Text>
                    </TouchableOpacity>

                    <View style={styles.Control}>
                        
                        <TouchableOpacity onPress={()=>{TempDown()}}>
                        <View style={{borderWidth: 3, borderColor: '#888983', borderRadius: 20, width: 38, height: 38, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={img5} style={{ width: 20, height: 20,  }} />
                        </View>
                        </TouchableOpacity>
                        
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={img6} style={{ width: 20, height: 20, tintColor: '#474a51' }} />
                        <Text style={{fontSize: 9, fontWeight: 'bold', textAlign: 'center'}}>온도조절</Text>
                        </View>

                        <TouchableOpacity onPress={()=>{TempUP()}}>
                        <View style={{borderWidth: 3, borderColor: 'gray', borderRadius: 20, width: 38, height: 38, alignItems: 'center', justifyContent: 'center'}}>
                            <Image source={img7} style={{ width: 20, height: 20, tintColor: '#474a51' }} />
                        </View>
                        </TouchableOpacity>

                    </View>
                
                </Animatable.View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        width: '55%',
        height: '60%',
        alignSelf: 'center',
        alignContent: 'center',
        borderRadius: 40,
        borderWidth: 4,
    },
    Control: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: 190, 
        height: 50, 
        position: 'absolute',
        top: '70%',
        alignSelf: 'center',
        borderRadius: 32,
        borderWidth: 2,
    },

    Btn: {
        width: 45, 
        height: 45, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#888983',
        borderRadius: 20,
    },

    BtnText: {
        marginTop: 5,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 13,
    },
})