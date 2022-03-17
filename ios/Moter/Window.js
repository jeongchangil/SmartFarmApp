import React from 'react';
import { Image, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import { width, SPACING } from '../Config/Dimensions';
import * as Animatable from 'react-native-animatable';
import Backicon from '../Config/Backicon';
import { Switch ,State } from '../Config/moterdata';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RowButton from '../Components/RowButton';

const animation = {
    0: {opacity: 0, translateX: 50},
    1: {opacity: 1, translateX: 0},
}

const createAnimation = (from) => ({
    0: { opacity: 0, translateY: -100, translateX: from },
    1: { opacity: 1, translateY: 0, translateX: 0 },
});

const animations = [
    createAnimation(100),
    createAnimation(0),
    createAnimation(-100),
]

function PutDataOn() {
            
    let dataObj = {"up" : 1, "down" : 0, };
    console.log(dataObj.led);
    fetch(global.url+'up', 
   
    {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(dataObj),
    }); 

}

function PutDataStop(){
    let dataObj = {"up" : 0, "down" : 0 };
    console.log(dataObj.led);
    fetch(global.url+'up',
    {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(dataObj),
    });
    
}

function PutDataOff(){
            
    let dataObj = {"up" : 0, "down" : 1, };
    console.log(dataObj.led);
    fetch(global.url+'up', 
   
    {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(dataObj),
    }); 
    
}

export default class Window extends React.Component {

    static sharedElements = (route, otherRoute, showing) => {
        const { item } = route.params;
        return [`item.${item.key}.image`,`item.${item.key}.medel`,`item.${item.key}.description`];;
      }

    render() {
        const { navigation } = this.props;
        const { route } = this.props;
        const { item } = route.params;

        function Push_Data(item) {
           
            let key = item.key

            if( key == '1' ) {
                PutDataOn()
            }
            else if ( key == '2' ) {
                PutDataStop()
            }
            else if ( key == '3' ) {
                PutDataOff()
            }
        }

    return (
        <SafeAreaView style={{ flex:1, backgroundColor: '#fdfdfd' }} >
            <Backicon onPress={()=> navigation.goBack()}/>            
            <SharedElement id={`item.${item.key}.image`}>
            <Image source={item.img} style={styles.image} />
            </SharedElement>
            <View style={styles.meta}>
            <SharedElement id={`item.${item.key}.title`}>
            <Text style={styles.Title} numberOfLines={1} adjustsFontSizeToFit> {item.title} </Text>
            </SharedElement>
            <SharedElement id={`item.${item.key}.subtitle`}>
            <Text style={styles.SubTitle}> {item.subtitle} </Text>
            </SharedElement>
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
                {Switch.map((item, index)=>{
                    return (
                        <Animatable.View
                        animation={animations[index]}
                        delay={400}
                        iterationCount={1}
                        >
                            <TouchableOpacity onPress={()=>{Push_Data(item)}}>
                                <View style={{ borderRadius: SPACING + 40, width: 60, height: 60, backgroundColor: 'rgb(255, 123, 123)',}}>
                                <Image source={item.img} style={styles.Icon}/>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    );
                })}
            </View>

            <View>
                {State.map((item, index)=>{    
                    return <Animatable.View
                    useNativeDriver
                    animation={animation}
                    delay={300 + (index + 1) * 200}
                     style={{position: 'relative', bottom: -30}}>
                        <RowButton title={item.title} key={item.key} />
                    </Animatable.View>
                })}
            </View>


        </SafeAreaView>
    );
 }
}

const styles = StyleSheet.create({
    image: {
        width: width * 1.2,
        height: width,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    meta: {
        position: 'absolute',
        top: SPACING * 4,
        left: SPACING,
        width: width * 0.6,
    },
    Title: {
        fontSize: 32,
        fontWeight: '700',
        position: 'absolute',
        left: -10,
    },
    SubTitle: {
        fontSize: 12,
        opacity: 0.7,
        position: 'absolute',
        top: 32 + SPACING / 2, 
    },
    Icon: {
        alignSelf: 'center',
        width: 30,
        height: 30,
        position: 'absolute',
        bottom: 15,
    },
})