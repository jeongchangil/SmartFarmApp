import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { width, SPACING, height } from '../Config/Dimensions';
import * as Animatable from 'react-native-animatable';
import SubPhoto1 from './subscreen/subPhoto1';
import SubPhoto2 from './subscreen/subPhoto2';
import Icon from 'react-native-vector-icons/Octicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { SharedElement } from 'react-navigation-shared-element';
import Back from 'react-native-vector-icons/AntDesign';

const DURATION = 400;

const ITEM_HIGHT = height * 0.18;
const TOP_HEADER_HEIGHT = height * 0.3;

export default class Photo extends React.Component {

    constructor(props){
 
        super(props);
        this.state = {  
        select: null,
        }
    }

    static sharedElements = (route, otherRoute, showing) => {
        const { item } = route.params;
        return [`item.${item.key}.bg`,`item.${item.key}.title`,`item.${item.key}.image`,`general.bg`];;
      }

    render() {
        
        const { navigation } = this.props;
        const { route } = this.props;
        const { item } = route.params;
        const select = this.state.select

        function Selectscreen() {
            if (select == 1)
            return <SubPhoto1/>
          else if (select == 2)
            return <SubPhoto2/>
            else
            return <SubPhoto1/>
          }

    return (
        
        <SafeAreaView style={{ flex: 1 }} >
            
        <Back name='arrowleft' onPress={()=> navigation.goBack() } size={28} style={{padding: 12, position: 'absolute', zIndex: 2,}}/> 

        <SharedElement id={`item.${item.key}.bg`}>
        <View style={[StyleSheet.absoluteFillObject,{ backgroundColor: item.color, borderRadius: 0, height: TOP_HEADER_HEIGHT + 32, }]} />
        </SharedElement>

        <SharedElement id={`item.${item.key}.title`}>
        <Text style={styles.title}> {item.title} </Text>
        </SharedElement>

            
        <SharedElement id={`item.${item.key}.image`}>
        <Image source = {item.image} style={styles.image}/>
        </SharedElement>

        <SharedElement id='general.bg'>
        <View style={styles.bg}>
        
        <ScrollView>
            <Animatable.View 
            animation='bounceIn'
            duration={1500}
            delay={1100}
            >            
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', }}>
                    <View style={{ backgroundColor: '#F2988F', height: 64, width: 64, borderRadius: 26, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={()=>{this.setState({select:1})}}>
                    <Icon1 name="database-search" size={40} />
                </TouchableOpacity>
                </View>
                <View  style={{ backgroundColor: '#9FD7F1', height: 64, width: 64, borderRadius: 26, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={()=>{this.setState({select:2})}}>
                    <Icon name="graph" size={40} />
                </TouchableOpacity>
                   </View>
               </View>
            </Animatable.View>

            <View style={{ marginVertical: 30 }}>
                <Selectscreen/>
            </View>
        </ScrollView>
        
        </View>
        </SharedElement>

        </SafeAreaView>
    );
 }
}

const styles = StyleSheet.create({
    bg: {
        width,
        height,
        backgroundColor: '#fff',
        transform: [{translateY: TOP_HEADER_HEIGHT}],
        borderRadius: 32,
        padding: SPACING,
        paddingTop: 32 + SPACING,
    },
    title: {
        fontWeight: '700',
        fontSize: 30,
        position: 'absolute',
        top: TOP_HEADER_HEIGHT - SPACING * 4.5,
        left: SPACING,
    },
    image: {
        width: ITEM_HIGHT * 0.8,
        height: ITEM_HIGHT * 0.8,
        resizeMode: 'contain',
        position: 'absolute',
        top: TOP_HEADER_HEIGHT - ITEM_HIGHT * 0.9,
        right: SPACING + 10,
    },
})