import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TouchableOpacity,Animated, Dimensions,ScrollView } from 'react-native';
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart } from "react-native-chart-kit";
 
export default class SubWind2 extends Component {
 
  constructor(props){
 
    super(props);
 
    this.state = {
      DateText: ['눌러서 날짜를 정해주세요'],
      DateHolder: null,
      dataSource:[],
      windsData:[0],
      tempData:[0],
      chart: new Animated.Value(0.1),
      chart2: new Animated.Value(0.1)
      
    }
  }

  componentDidMount(){
    Animated.parallel(
     [ Animated.timing(
        this.state.chart,{
          toValue:1,
          duration: 1000,
        }),
        Animated.timing(
          this.state.chart2,{
            toValue:1,
            duration: 1000,
          })]
    ).start()
  }

  


  getData = () =>{
    
    const {dataSource} = this.state
    const {windsData} = this.state
    const {tempData} = this.state
    const {hum} = this.state
    
    

   fetch(global.url+'wind', {
     method: 'POST', //post 방식 통신
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       date: this.state.DateText
       //통신 형식에 맞게 데이터들을 합쳐서 보냄
     })
   }).then((response) => response.json())
   .then((responseData) => {
    
    this.setState({dataSource:responseData.rowa})
    //이미지 url을 dataSource에 받아옴
    console.log(this.state.dataSource)
    this.setState({windsData:this.state.dataSource.map(dataSource=>dataSource.ws)})
    console.log(this.state.windsData)
    this.setState({chart:new Animated.Value(0)})
    this.setState({chart2:new Animated.Value(0)})
  Animated.sequence(
    [Animated.timing(
      this.state.chart,{
        toValue:1,
        duration: 500,
      }),
      Animated.timing(
        this.state.chart2,{
          toValue:1,
          duration: 500,
        })]
  ).start()
  })

         .then((responseJson) => {
         }).catch((error) => {
           console.error(error);
         })
       };
       

  onDatePickedFunction = (date) => {
    
   
    this.setState({
      dobDate: date,

      DateText: moment(date).format('YYYY-MM-DD')
    });
    console.log(this.state.DateText)
    this.getData()
    
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
 
 
  render() {


    return (
      <SafeAreaView style={{flex:1, }}>
          <View style={{flex:.8}}></View>
        <ScrollView>
        
         
         <TouchableOpacity  onPress={this.DatePickerMainFunctionCall.bind(this)} >
            <View style={styles.datePickerBox}>
              <Text style={styles.datePickerText}>{this.state.DateText}</Text>
            </View>
         </TouchableOpacity>


      <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />

      <Animated.View style={{flex:1,transform:[{scale:this.state.chart}]}}>
            <LineChart
            data={{
            labels: ["0시", "3시", "6시", "9시", "12시", "3시","6시","9시"],
            datasets: [
                        {
                        data: this.state.windsData
                        
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={200}
                yAxisLabel=""
                yAxisSuffix="%"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: 'rgba(255,255,255,0.7)', //"#e26a00",
                backgroundGradientFrom: 'rgba(0,0,0,0.7)',//"#fb8c00",
                backgroundGradientTo: 'rgba(200,200,220,0.7)',//"#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "0",
                    strokeWidth: "2",
                    stroke: 'rgba(0,0,0,0.7)'//"#ffa726"
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 0
                }}
            />
      </Animated.View>

      
      </ScrollView>

      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
    fontSize: 20,
    marginLeft: 5,
    borderWidth: 0,
    color: '#000',
    alignSelf:'center'
    
 
  },
});
 
AppRegistry.registerComponent('Mainproject', () => Mainproject);