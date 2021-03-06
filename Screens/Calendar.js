import React from 'react';
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spec, width } from '../Config/Dimensions';
import Backicon from '../Config/Backicon';
import {Agenda} from 'react-native-calendars';
import {flower} from './plant'
const testIDs = require('./testIDs');

const { ITEM_HIGHT, ITEM_WITDH, RADIUS, FULL_SIZE, SPACING } = Spec

export default class Notice extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      day: new Date().getDate(),
      dataSource:[],
      date:''
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
          date:this.state.dataSource.map(element => element.date),
        })
      })}

    render(){
        const {navigation} = this.props;
    return (
    
      
    <Agenda   
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.state.date}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = 0; i < 31; i++) {
        const time = +new Date(this.state.date).getTime() + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = 1
          for (let j = 0; j < numItems; j++) {
            if(i<1){
              this.state.items[strTime].push({
                day:'μνκΉμ§ D-'+(29-i),
                name:  flower.first,
                height: 150,
                color:'#AFCB3D'
              });
            }
            else if(i==7){
              this.state.items[strTime].push({
                day:'μνκΉμ§ D-'+(29-i),
                name: flower.born,
                height: 150,
                color:'#5ABEF5'
              });}
              else if(i==14){
                this.state.items[strTime].push({
                  day:'μνκΉμ§ D-'+(29-i),
                  name: flower.born2,
                  height: 150,
                  color:'#A0A0FF'
                });}
                else if(i==21){
                  this.state.items[strTime].push({
                    day:'μνκΉμ§ D-'+(29-i),
                    name: flower.qqq,
                    height: 150,
                    color:'#66EC66'
                  });}
            
            else if(i<29 && i%2==0){
            this.state.items[strTime].push({
              day:'μνκΉμ§ D-'+(29-i),
              name: flower.water,
              height: 150,
              color:'#FC7399'
            });}
            else if(i<29 && i%2==1){
              this.state.items[strTime].push({
                day:'μνκΉμ§ D-'+(29-i),
                name: 'μΌμ  μμ',
                height: 150,
                color:'#D3C0D3' 
              });}
              else if(i==29){
                this.state.items[strTime].push({
                  day:'μνμ λ  D-'+(29-i),
                  name: flower.last,
                  height: 150,
                  color:'red'
                });}
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}>
        <Text></Text>
        <Text style={{color:item.color, fontFamily:'NanumBrush',fontSize:30}}>{item.day}</Text>
        <Text style={{color:item.color, fontFamily:'qwer',fontSize:30}}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text style={{fontFamily:'NanumBrush',fontSize:30}}>μΌμ μ΄ μμ΅λλ€.</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}
const styles = StyleSheet.create({ 
item: {
  backgroundColor: 'white',
  flex: 1,
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  marginTop: 17
},
emptyDate: {
  height: 15,
  flex: 1,
  paddingTop: 30
}
});