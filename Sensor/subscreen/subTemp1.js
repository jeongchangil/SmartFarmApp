
import React, { Component } from 'react';
import { Text, View, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Entypo';

export default class SubTemp1 extends Component {
  constructor(props){
    super(props);
    this.state = {
      hum: null ,
      Tem: null,
      dataSource2:[],
      Tran2: new Animated.Value(-1000),
      set_hum:null,
      set_temp:null
    }
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
        })
      })
      this.getone()
  }

  getone = () =>{
    const {dataSource2} = this.state
    fetch('http://34.64.151.255:3000/testtemp')
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       dataSource2: responseJson.rowd,
      })
      this.setState({
        hum:this.state.dataSource2.map(element => element.hum),
        Tem:this.state.dataSource2.map(element=>element.temp)
        
      })
      console.log(dataSource2)
    })
    .catch(error=>console.log(error))
  
       };
  render() {
    

    return (
      <SafeAreaView style={{flex:1,}}>
        
        <Animated.View style={{justifyContent:'center', alignItems:'center',flex:1,flexDirection:'row'}}>
                <Animated.View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                            <AnimatedCircularProgress
                            rotation={0} //처음 시작하는 곳
                            dashedBackground={{width:9, gap:2 }} //밖에 원 자르기
                            arcSweepAngle={360} //전체 각도
                            size={160} //사이즈
                            width={19}
                            fill={this.state.hum} //채움 정도
                            duration={2000} //애니메이션 시간
                            tintColor="black"//#3d5875
                            onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor="black"//#3d5875
                            >
                            {
                                (fill)=>(
                                    <Text style={{fontSize:25, color:(this.state.hum>this.state.set_hum+5)?'red':this.state.hum>this.state.set_hum-5?'black':'blue'}}>
                                        {this.state.hum} %
                                    </Text>
                                    
                                )
                            }
                            </AnimatedCircularProgress>
                </Animated.View>
                <Animated.View style={{flex:1,justifyContent:'center',alignItems:'center' ,transform:[{rotate: '-90 deg'}]}}>
            
                        <Progress.Bar 
                            progress={this.state.Tem/50} 
                            width={150}
                            height={30}
                            color='black' //'rgba(0,122,255,1)'
                            borderWidth={1}
                            borderColor='black'
                        />
                        <Animated.View style={{transform:[{rotate: '90 deg'}],marginTop:30,}}>
                              <Text style={{fontSize:25,color:(this.state.Tem>this.state.set_temp+5)?'red':this.state.Tem>this.state.set_temp-5?'black':'4F8EF7' }} >
                                   {this.state.Tem}°C
                              </Text>
                              
                            </Animated.View>
                </Animated.View>
                
                            
            </Animated.View>
            <View style={{flex:0.8,alignItems:'center', }}>
              <View style={{flexDirection:'row',marginTop:10}}>
              <Icon name="swarm" size={30} color="red" />
            <Text style={{fontSize:20}}>  수치 높음</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:10}}>
              <Icon name="swarm" size={30} color="black" />
            <Text style={{fontSize:20}}>  적정 수치</Text>
              </View>
              <View style={{flexDirection:'row',marginTop:10}}>
              <Icon name="swarm" size={30} color="#4F8EF7" />
            <Text style={{fontSize:20}}>  수치 낮음</Text>
              </View>
            
            
            </View>
      </SafeAreaView>
    );
  }
}
 
