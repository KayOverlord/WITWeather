import React,{useState,useEffect} from 'react';
import { View,useColorScheme,TouchableOpacity,StyleSheet,Text,Image,FlatList,ImageBackground,ActivityIndicator } from 'react-native';
import {Colors} from "react-native/Libraries/NewAppScreen";
import Geolocation from '@react-native-community/geolocation';
import { API_KEY } from '../Utils/weatherdata';
import * as Animatable from 'react-native-animatable';

const MainScreen = ({navigation}) =>{

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = isDarkMode ? require('../Utils/mount2.png') : require('../Utils/mount1.png');
      
   

    const [LocalDeg,setLocalDeg ]=useState("30");
    const [LocalMaxDeg,setLocalMaxDeg ]=useState("20");
    const [LocalMinDeg,setLocalMinDeg ]=useState("20");
    const [LocalPressure,setLocalPressure ]=useState("20");
    const [LocalWindSpeed,setLocalWindSpeed ]=useState("20");
    const [LocalHumidity,setLocalHumidity ]=useState("20");
    const [LocalWinDeg,setLocalWinDeg ]=useState("20");
    const [Localname,setLocalname ]=useState("");
    const [Localdesc,setLocaldesc ]=useState("");
    const [Localicon,setLocalicon ]=useState("01d");
    const [Locdata,setLocdata]=useState([]);

  const [loading, setLoading] = useState(true);

  const getLocationFromApi = (lat,long) => {

//using current location(lat,long) the first api call gets data for the current location
     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`)
      .then((response) =>response.json())
      .then((json) => {
     
       setLocalDeg(Math.round(json.main.temp));
       setLocalMaxDeg(Math.round(json.main.temp_max));
       setLocalMinDeg(Math.round(json.main.temp_min));
       setLocalPressure(json.main.pressure);
       setLocalHumidity(json.main.humidity);
       setLocalWindSpeed(json.wind.speed);
       setLocalWinDeg(json.wind.deg);
       setLocalname(json.name);
       setLocaldesc(json.weather[0].description);
       setLocalicon(json.weather[0].icon)
      })
      .catch((error) => {
        console.error(error);
      });
//using 10 IDs of 10 locations to get weather data of each location 
      fetch(`https://api.openweathermap.org/data/2.5/group?id=2267057,2968815,3117735,2950159,2618425,3169070,2643743,2964574,3067696,2761369&appid=${API_KEY}&units=metric`)
      .then((response) =>response.json())
      .then((json) => {
      setLocdata(json.list);
      setLoading(false)
      })
      .catch((error) => {
        console.error(error);
      });

     
  };
      useEffect(() => {
          //isMounted is used to only get the current position once
      let isMounted = true 
       const geolocation= Geolocation.getCurrentPosition(
            position => {
              if(isMounted){
              const initialLat = JSON.stringify(position.coords.latitude);
              const initialLong = JSON.stringify(position.coords.longitude);
             
              getLocationFromApi(initialLat,initialLong)
              }     
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );
          
          const watchID = Geolocation.watchPosition(position => {
            const lastPosition = JSON.stringify(position);
           
          });
          
         

          return () => {
           isMounted=false
           watchID.clearWatch();
           geolocation.stopObserving();
           
          }
      }, [])

return (
  <Animatable.View animation="zoomIn" easing="ease-out" style={styles.Container}>
  <ImageBackground
  source={backgroundStyle}
  style={{width:'100%',height:'100%'}}
  >
    <Animatable.View animation="fadeInDown" easing="ease-in" duration={2000}
      style={[
        styles.Card,
        {backgroundColor: isDarkMode ? '#003049' : '#eae2b7'},
      ]}>
      <TouchableOpacity onPress={() =>navigation.navigate('Stats',{
            Deg:LocalDeg,
            MaxDeg:LocalMaxDeg,
            MinDeg:LocalMinDeg,
            Press:LocalPressure,
            Humid:LocalHumidity,
            WinSpeed:LocalWindSpeed,
            WinDeg:LocalWinDeg,
            name:Localname,
            desc:Localdesc,
            icon:Localicon
        })}>
        <View style={styles.Row1}>
          <View style={styles.Row1Col1}>
            <Image
              source={{uri: `http://openweathermap.org/img/wn/${Localicon}@4x.png`}}
              style={styles.icon}
            />
            <Text
              style={[
                styles.MainDeg,
                {color: isDarkMode ? '#eb6d4d' : '#eb6d4d'},
              ]}>
              {LocalDeg}˚c
            </Text>
          </View>

          <View style={styles.Row1Col2}>
            <Text
              style={[
                styles.MainTextTitles,
                {color: isDarkMode ? Colors.lighter : Colors.black},
              ]}>
              {Localname}
            </Text>
            <Text style={[{color: isDarkMode ? Colors.lighter : Colors.black}]}>
              {Localdesc}
            </Text>
          </View>
        </View>

        <View style={styles.Row2}>
          <View style={styles.Row2Col1}>
            <Text
              style={[
                styles.MainTextTitles,
                {color: isDarkMode ? Colors.lighter : Colors.black},
              ]}>
              Min
            </Text>
            <Text
              style={[
                styles.MinDeg,
                {color: isDarkMode ? '#eb6d4d' : '#eb6d4d'},
              ]}>
              {LocalMinDeg}˚c
            </Text>
          </View>

          <View style={styles.Row2Col2}>
            <Text
              style={[
                styles.MainTextTitles,
                {color: isDarkMode ? Colors.lighter : Colors.black},
              ]}>
              Max
            </Text>
            <Text
              style={[
                styles.MaxDeg,
                {color: isDarkMode ? '#eb6d4d' : '#eb6d4d'},
              ]}>
              {LocalMaxDeg}˚c
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>


<View style={{flex:1}}>

{ loading? <ActivityIndicator color = '#eb6d4d' size ={50} />:

    <FlatList

      data={Locdata}

      renderItem={({ item }) => {
        
        return (
          <Animatable.View animation="fadeInLeft" easing="ease-in" duration={2000}
          style={[
            styles.CardList,
            {backgroundColor: isDarkMode ? '#003049' : '#eae2b7'},
          ]}>
          <TouchableOpacity onPress={() => navigation.navigate('Stats',{
            Deg:item.main.temp,
            MaxDeg:item.main.temp_max,
            MinDeg:item.main.temp_min,
            Press:item.main.pressure,
            Humid:item.main.humidity,
            WinSpeed:item.wind.speed,
            WinDeg:item.wind.deg,
            name:item.name,
            desc:item.weather[0].description,
            icon:item.weather[0].icon
        })}>
            <View style={styles.ListRow}>
              <Animatable.Image animation="slideInUp" easing="ease-in" duration={1000}
                source={{uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}}
                style={styles.icon}
              />
    
              <Animatable.View style={styles.ListCol} animation="slideInRight" easing="ease-in" duration={1000}>
                <Text
                  style={[
                    styles.ListTextTitles,
                    {color: isDarkMode ? Colors.lighter : Colors.black},
                  ]}>
                  {item.name}
                </Text>
                <Text style={[{color: isDarkMode ? Colors.lighter : Colors.black}]}>
                  {item.weather[0].description}
                </Text>
              </Animatable.View>
    
              <Animatable.Text animation="slideInDown" easing="ease-in" duration={1000}
                style={[
                  styles.MinDeg,
                  {color: isDarkMode ? '#eb6d4d' : '#eb6d4d'},
                ]}>
                {Math.round(item.main.temp)}˚c
              </Animatable.Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>


    )
              

      }}

      keyExtractor={(item)=>item.id}
      contentContainerStyle={{flexGrow:1}}
    />}
</View>
</ImageBackground>
  </Animatable.View>
);
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'column',
    },
    Card: {
        width: '98%',
        padding: 2,
        alignSelf: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.22,
        elevation: 4,
        backgroundColor: '#003049',
        borderRadius:5
    },
    CardList: {
        width: '96%',
        padding: 2,
        alignSelf: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.22,
        elevation: 4,
        backgroundColor: '#003049',
        borderRadius:15
    },
    Row1: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    Row1Col1: {
        flexDirection: 'row'
    },

    Row1Col2: {
        flexDirection: 'column',
        flexShrink:1
    },


    Row2: {
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },

    Row2Col1: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    Row2Col2: {
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    MainTextTitles: {
        fontSize: 25,
        flexWrap:'wrap'
    },
    ListTextTitles: {
        fontSize: 20,
        flexWrap:'wrap'
    },
    ListRow: {
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    ListCol: {
        flexDirection: 'column',
        flexShrink:1
    },
    icon: {
        width: 100,
        height: 100,
        alignSelf: 'center'
    },

    MainDeg: {
        fontSize: 35
    },
    MaxDeg: {
        fontSize: 30
    },
    MinDeg: {
        fontSize: 30
    }

});

export default MainScreen;
