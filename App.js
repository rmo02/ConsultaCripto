import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import  useWebSocket  from 'react-use-websocket';
import { Input, Text } from 'react-native-elements'
import {Feather as Icon} from '@expo/vector-icons'

export default function App() {
  const [data, setData] = useState({});
  const [ text, setText ] = useState('BTCUSDT')
  const [ symbol, setSymbol ] = useState('btcusdt')

  //conecta ao serviço da binance
  const {lastJsonMessage} = useWebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`, {
    shouldReconnect: () => true,
    reconnectInterval: 3000,
    onError: (event)=> alert(event),
    onMessage: () => {
      if(lastJsonMessage){
          setData(lastJsonMessage);
      }
    }
  })

  //icone de pesquisa
  const searchButton = <Icon.Button
  name='search'
  size={24}
  color='#F5CE55'
  backgroundColor="transparent"
  onPress={evt => setSymbol(text.toLocaleLowerCase())}
  />

  return (
    <View style={styles.container}>
    <View style={styles.container1}>
      <Text style={styles.h1} h1>Crypto</Text>
      <View style={styles.Boxinput}>
        <Input
        style={styles.input}
        value={text}
        onChangeText={setText}
        autoCapitalize='characters'
        leftIcon={<Icon name='dollar-sign' size={24} color='#F5CE55'/>}
        rightIcon={searchButton}/>
      </View>
    </View>

    <View style={{flexDirection:'column', justifyContent:'center',}}>

      <View style={{flexDirection:'row', justifyContent:'space-around', marginHorizontal:10, marginBottom:20}}>

        <View style={{backgroundColor:'#161B22', width:120, height:90, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
        <Text style={styles.text1}>Symbol</Text>
        <Text style={styles.text2}>{data.s}</Text>
        </View>

        <View style={{backgroundColor:'#161B22', width:120, height:90, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
        <Text style={styles.text1}>Last Price</Text>
        <Text style={styles.text2}>{data.c}</Text>
        </View>

        <View style={{backgroundColor:'#161B22', width:120, height:90, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
        <Text style={styles.text1}>Price change</Text>
        <Text style={styles.text2}>{data.P}%</Text>
        </View>

        
      </View>

      <View style={{flexDirection:'row', justifyContent:'space-around', marginHorizontal:10, marginBottom:20}}>

      <View style={{backgroundColor:'#161B22', width:120, height:90, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
      <Text style={styles.text1}>Open price</Text>
      <Text style={styles.text2}>{data.o}</Text>
      </View>

      <View style={{backgroundColor:'#161B22', width:120, height:90, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
      <Text style={styles.text1}>High price</Text>
      <Text style={styles.text2}>{data.h}</Text>
      </View>

      <View style={{backgroundColor:'#161B22', width:120, height:90, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
      <Text style={styles.text1}>Low price</Text>
      <Text style={styles.text2}>{data.l}</Text>
      </View>

      
      </View>

      <View style={{flexDirection:'row', justifyContent:'space-around', marginHorizontal:10, marginBottom:20}}>

      <View style={{backgroundColor:'#161B22', width:120, height:90, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
      <Text style={styles.text1}>Best bid price</Text>
      <Text style={styles.text2}>{data.b}</Text>
      </View>

      <View style={{backgroundColor:'#161B22', width:120, height:90, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
      <Text style={styles.text1}>Best bid quantity</Text>
      <Text style={styles.text2}>{data.B}</Text>
      </View>

      <View style={{backgroundColor:'#161B22', width:120, height:90, borderRadius:20, alignItems:'center', justifyContent:'center'}}>
      <Text style={styles.text1}>Best ask price</Text>
      <Text style={styles.text2}>{data.a}</Text>
      </View>

      
      </View>

    </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#0D1117'
   },
   h1:{
    color:'#F5CE55'
   },
    container1: {
    flexDirection:'column',
    marginTop:60,
    margin: 20,
    alignItems:'center',
    },
    Boxinput:{
      marginTop:20,
      backgroundColor:'#161B22',
      width:'100%',
      borderRadius:20
    },
    input:{
      color:'white'
    },
    cards:{
      backgroundColor:'#161B22',
      flexDirection:'row',
    },
    text1:{
      color: 'white'
    },
    text2:{
      color: 'gray'
    }
});
