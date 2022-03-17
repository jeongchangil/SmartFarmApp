import React, {} from 'react';
import { StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity,AppRegistry, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spec, width } from '../Config/Dimensions';
import Backicon from '../Config/Backicon';
import Input from 'react-native-gmailtype-textinput';
import { ScrollView } from 'react-native-gesture-handler';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
 
import moment from 'moment';


const { ITEM_HIGHT, ITEM_WITDH, RADIUS, FULL_SIZE, SPACING } = Spec

export default class EX extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          set_temp:null,
          set_hum:null,
          set_wind:null,
          set_sun:null,
          set_soilhum:null,
          set_co2:null,
          date:null,
          dataSource:[],
          DateText:['눌러서 씨앗 심을 날짜를 정해주세요'],
          DateHolder: null,
          
        };
      }
      componentDidMount(){
        
            fetch(global.url+'setting')
            .then(response => response.json())
            .then((responseJson)=> {
              this.setState({
               dataSource: responseJson.rowx
              })
              this.setState({
                set_temp:this.state.dataSource.map(element => element.set_temp),
                set_hum:this.state.dataSource.map(element=>element.set_hum),
                set_wind:this.state.dataSource.map(element => element.set_wind),
                set_sun:this.state.dataSource.map(element=>element.set_sun),
                set_soilhum:this.state.dataSource.map(element => element.set_soilhum),
                set_co2:this.state.dataSource.map(element=>element.set_co2),
                date:this.state.dataSource.map(element => element.date),
              })
            })
      }

      DatePickerMainFunctionCall = () => {
 
        let DateHolder = this.state.DateHolder;
     
        if(!DateHolder || DateHolder == null){
     
          DateHolder = new Date();
          this.setState({
            DateHolder: DateHolder
          });
        }
     
        //To open the dialog
        this.refs.DatePickerDialog.open({
     
          date: DateHolder,
     
        });
     
      }

      onDatePickedFunction = (date) => {
    
   
        this.setState({
          dobDate: date,
    
          DateText: moment(date).format('YYYY-MM-DD')
        });
        console.log(this.state.DateText)
        this.getData()
        
      }
     

    render () {
    const { navigation } = this.props;
    return (
      
      <SafeAreaView style={{flex: 1, backgroundColor:'white'}}>
          <ScrollView>

              <View style={{marginTop:30}}>
              <TouchableOpacity  onPress={this.DatePickerMainFunctionCall.bind(this)} >
 
 <View style={styles.datePickerBox}>

   <Text style={styles.datePickerText}>{this.state.DateText}</Text>

 </View>

</TouchableOpacity>
      <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
        
              </View>
       


        <View style={{width:'90%', marginTop:10, marginLeft: 10,}}>
                     <Input label='온도 설정'
                        onChangeText={(text) => {this.setState({set_temp:text})}}
                        keyboardType="number-pad"
                        hideLabel={this.state.set_temp !== ''}
                     />
                     <Text style={{marginLeft:20, fontFamily:'qwer'}}>현재 온도설정 값: {this.state.set_temp}</Text>
        </View>

        <View style={{width:'90%', marginTop:10, marginLeft: 10}}>
                     <Input label='습도 설정'
                        onChangeText={(text) => {this.setState({set_hum:text})}}
                        keyboardType="number-pad"
                        hideLabel={this.state.set_hum !== ''}
                     />
                     <Text style={{marginLeft:20, fontFamily:'qwer'}}>현재 습도설정 값: {this.state.set_hum}</Text>
        </View>

        <View style={{width:'90%', marginTop:10, marginLeft: 10}}>
                     <Input label='풍속 설정'
                        onChangeText={(text) => {this.setState({set_wind:text})}}
                        keyboardType="number-pad"
                        hideLabel={this.state.set_wind !== ''}
                     />
                     <Text style={{marginLeft:20, fontFamily:'qwer'}}>현재 풍속설정 값: {this.state.set_wind}</Text>
        </View>
        
        <View style={{width:'90%', marginTop:10, marginLeft: 10}}>
                     <Input label='조도 설정'
                        onChangeText={(text) => {this.setState({set_sun:text})}}
                        keyboardType="number-pad"
                        hideLabel={this.state.set_sun !== ''}
                     />
                     <Text style={{marginLeft:20, fontFamily:'qwer'}}>현재 조도설정 값: {this.state.set_sun}</Text>
        </View>

        <View style={{width:'90%', marginTop:10, marginLeft: 10}}>
                     <Input label='토양습도 설정'
                        onChangeText={(text) => {this.setState({set_soilhum:text})}}
                        keyboardType="number-pad"
                        hideLabel={this.state.set_soilhum !== ''}
                     />
                     <Text style={{marginLeft:20, fontFamily:'qwer'}}>현재 토양습도 설정 값: {this.state.set_soilhum}</Text>
        </View>

        <View style={{width:'90%', marginTop:10, marginLeft: 10}}>
                     <Input label='이산화탄소 설정'
                        onChangeText={(text) => {this.setState({set_co2:text})}}
                        keyboardType="number-pad"
                        hideLabel={this.state.set_co2 !== ''}
                     />
                     <Text style={{marginLeft:20, fontFamily:'qwer'}}>현재 이산화탄소 설정 값: {this.state.set_co2}</Text>
        </View>

        
        <View style={{alignSelf:'center', justifyContent:'center', width:'40%', backgroundColor:'#a1c4fd', borderRadius:10, height:40, marginTop:20}}>
        <TouchableOpacity onPress={() => { 
            if (this.state.DateText == '눌러서 씨앗 심을 날짜를 정해주세요') 
            {
              Alert.alert("날짜를 설정해주세요.")
            }
            else {
            fetch(global.url+'setting', {
                    method: 'PUT', 
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
            
                        set_temp:this.state.set_temp,
                        set_hum:this.state.set_hum,
                        set_wind:this.state.set_wind,
                        set_sun:this.state.set_sun,
                        set_soilhum:this.state.set_soilhum,
                        set_co2:this.state.set_co2,
                        date:this.state.DateText,
                    })
                })
            Alert.alert('설정했습니다')}}}>
            <Text style={{textAlign:'center', color:'white', fontSize:30, fontFamily:'Pen'}}>설정하기</Text>
        </TouchableOpacity>
        </View>
      
        </ScrollView>
      </SafeAreaView>
  );
 }
}

const styles = StyleSheet.create({
    
    name: {
        fontSize: 30,
        color: '#fff',
        fontWeight: '800',
        width: ITEM_WITDH * 0.8,
        textTransform: 'uppercase',
        position: 'absolute',
        bottom: 100,
        left: SPACING * 2,
      },
      container: {
        paddingTop: 23
     },
     container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFFF'
      },
     
      content: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
      },
     
      datePickerBox:{
        marginTop: 9,
        borderColor: 'black',
        borderWidth: 0,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 30,
       
        
      },
     
      datePickerText: {
        fontSize: 25,
        marginLeft: 5,
        borderWidth: 0,
        color: '#000',
        alignSelf:'center',
        fontFamily:'Pen'
        
     
      },
})

AppRegistry.registerComponent('Mainproject', () => Mainproject);