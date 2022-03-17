import React from 'react';
import { Image, StyleSheet, Text, View, Animated} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SharedElement } from 'react-navigation-shared-element';
import { width, SPACING } from '../Config/Dimensions';
import * as Animatable from 'react-native-animatable';
import Backicon from '../Config/Backicon';
import { Icon, State } from '../Config/moterdata';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RowButton from '../Components/RowButton';
import Icon1 from 'react-native-vector-icons/Entypo';
const animation = {
    0: {opacity: 0, translateX: 50},
    1: {opacity: 1, translateX: 0},
}

const createAnimation = (from) => ({
    0: { opacity: 0, translateY: -100, translateX: from },
    1: { opacity: 1, translateY: 0, translateX: 0 },
});

const animations = [
    createAnimation(50),
    createAnimation(-50)
]

export default class fan extends React.Component {
    componentDidMount(){
        this.motorstate()
    }

    PutDataOn = () => { 
        let dataObj = {"fan" : 1 };
        console.log(dataObj.fan);
        fetch(global.url+'fan', 
        {
          method: "PUT",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(dataObj),
        }); 
        this.spin()
        this.setState({check:1})
    }

     PutDataOff = () =>{
                
        let dataObj = {"fan" : 0 };
        console.log(dataObj.fan);
        fetch(global.url+'fan', 
       
        {
          method: "PUT",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(dataObj),
        }); 
        this.setState({spin:new Animated.Value(0)})
        this.setState({check:0})
    }

    motorstate = () =>{
        fetch(global.url+'control')
        .then(response => response.json())
        .then((responseJson)=> {
          this.setState({
           dataSource: responseJson.rows,
          })
          this.setState({ 
            check : this.state.dataSource.map(element => element.fan),
          })
          console.log(this.state.check)
        })
        .catch(error=>console.log(error))
      
      }
      spin=()=>{
        Animated.loop(
            Animated.sequence([
            Animated.timing(this.state.spin, {
            duration: 1000,
            toValue: 1}),
            Animated.timing(this.state.spin, {
            duration: 1000,
            toValue: 0}),
            ])).start();
      }
      constructor() {
        super();
        this.state = {
            dataSource:null,
            check:null,
            spin: new Animated.Value(0)
        }
    }
    Push_Data = (item) => {
     
        let key = item.key
        if( key == '1' ) {
            this.PutDataOn()
        }
        else if ( key == '2' ) {
            this.PutDataOff()
        }}

    static sharedElements = (route, otherRoute, showing) => {
        const { item } = route.params;
        return [`item.${item.key}.image`,`item.${item.key}.medel`,`item.${item.key}.description`];;
      }

    render() {
        const { navigation } = this.props;
        const { route } = this.props;
        const { item } = route.params;

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
                {Icon.map((item, index)=>{
                    return (
                        <Animatable.View
                        animation={animations[index]}
                        delay={400}
                        iterationCount={1}
                        >
                            <TouchableOpacity onPress={()=>{this.Push_Data(item)}}>
                                <View style={{backgroundColor: item.color , borderRadius: SPACING + 18,}}>
                                <Image source={item.img} style={styles.Icon}/>
                                </View>
                            </TouchableOpacity>
                        </Animatable.View>
                    );
                })}
            </View>
            <View style={{flex:1, justifyContent:'center'}}>
                            <Animated.View style={{ flexDirection:'row',justifyContent:'center',}}>

            <View style={{marginBottom:50}}>{this.state.check==1?<Text style={{fontSize:35}}>작동중</Text>:<Text style={{fontSize:35}}>정지함</Text>}</View>
            <Animated.View style={{marginLeft:30}}>
                <Animated.View style={{transform: [{
                                        rotate: this.state.spin.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '360deg']})}],}}>
                                            
                <Icon1   name="cog" size={50} color="black" />
                </Animated.View>
           
            </Animated.View>

            </Animated.View>
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
        width: 60,
        height: 60,
        tintColor: '#fdfdfd',
    },
})