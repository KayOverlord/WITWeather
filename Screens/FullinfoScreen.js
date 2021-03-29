import React,{useState,useEffect} from 'react';
import { View,useColorScheme,StyleSheet,Text,Image } from 'react-native';
import {Colors} from "react-native/Libraries/NewAppScreen";
import * as Animatable from 'react-native-animatable';

const FullinfoScreen = ({route,navigation}) =>{ 

    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      };

      const { Deg,MaxDeg,MinDeg,Press,Humid,WinSpeed,WinDeg,name,desc,icon} = route.params;


   

return (
  <View style={[styles.Container, backgroundStyle]}>
    <Animatable.View animation="fadeInLeft" easing="ease-in"
      style={[
        styles.Card,
        {backgroundColor: isDarkMode ? '#003049' : '#eae2b7'},
      ]}>
  
        <View style={styles.Row1}>
        <View style={styles.Row1Col2}>
            <Text
              style={[
                styles.MainTextTitles,
                {color: isDarkMode ? Colors.lighter : Colors.black},
              ]}>
              {name}
            </Text>
            <Text style={[
              styles.extraStatsText,
              {marginLeft:2,color: isDarkMode ? Colors.lighter : Colors.black}]}>
              {desc}
            </Text>
          </View>
          <View style={styles.Row1Col1}>
            <Image
              source={{uri: `http://openweathermap.org/img/wn/${icon}@4x.png`}}
              style={styles.icon}
            />
            <Text
              style={[
                styles.MainDeg,
                {color: isDarkMode ? '#eb6d4d' : '#eb6d4d'},
              ]}>
              {Math.round(Deg)}{'\u2103'}
            </Text>
          </View>

      
        </View>

        <View style={styles.Row2}>
          <View style={styles.Row2Col1}>
            <Text
              style={[
                styles.extraStatsText,
                {color: isDarkMode ? Colors.lighter : Colors.black},
              ]}>
              Min
            </Text>
            <Text
              style={[
                styles.SubDeg,
                {color: isDarkMode ? '#eb6d4d' : '#eb6d4d'},
              ]}>
              {Math.round(MinDeg)}˚c
            </Text>
          </View>

          <View style={styles.Row2Col2}>
            <Text
              style={[
                styles.extraStatsText,
                {color: isDarkMode ? Colors.lighter : Colors.black},
              ]}>
              Max
            </Text>
            <Text
              style={[
                styles.SubDeg,
                {color: isDarkMode ? '#eb6d4d' : '#eb6d4d'},
              ]}>
              {Math.round(MaxDeg)}˚c
            </Text>
          </View> 
        </View>

          <View style={styles.Row2}>
          <View style={styles.Row2Col1}>
            <Text
              style={[
                styles.extraStatsText,
                {color: isDarkMode ? Colors.lighter : Colors.black},
              ]}>
              Pressure
            </Text>
            <Text
              style={[
                styles.SubDeg,
                {color: isDarkMode ? '#eb6d4d' : '#eb6d4d'},
              ]}>
              {Press} hPa
            </Text>
          </View>

          <View style={styles.Row2Col2}>
            <Text
              style={[
                styles.extraStatsText,
                {color: isDarkMode ? Colors.lighter : Colors.black},
              ]}>
              Humidity
            </Text>
            <Text
              style={[
                styles.SubDeg,
                {color: isDarkMode ? '#eb6d4d' : '#eb6d4d'},
              ]}>
              {Humid}%
            </Text>
          </View>

          
        </View>
        
        <View style={styles.Row2}>
          <View style={styles.Row2Col1}>
            <Text
              style={[
                styles.extraStatsText,
                {color: isDarkMode ? Colors.lighter : Colors.black},
              ]}>
              Wind Speed:  
            </Text>
            <Text
              style={[
                styles.SubDeg,
                {color: isDarkMode ? '#eb6d4d' : '#eb6d4d'},
              ]}>
               {WinSpeed} m/s
            </Text>
          </View>

          <View style={styles.Row2Col2}>
            <Text
              style={[
                styles.extraStatsText,
                {color: isDarkMode ? Colors.lighter : Colors.black},
              ]}>
              Wind Degrees
            </Text>
            <Text
              style={[
                styles.SubDeg,
                {color: isDarkMode ? '#eb6d4d' : '#eb6d4d'},
              ]}>
              {WinDeg}˚
            </Text>
          </View>

          
        </View>
    </Animatable.View>

  </View>
);
}
const styles = StyleSheet.create({
    Container: {
        flex:1,
        flexDirection: 'column',
    },
    Card: {
        width: '100%',
        height:'98%',
        padding: 2,
        alignSelf: 'center',
       
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.22,
        elevation: 4,
        backgroundColor: '#003049',
        borderRadius:10
    },
    icon: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    },
    Row1: {
        flexDirection:'column',
        justifyContent: 'space-around',
        paddingVertical:'10%'
    },
    Row1Col1: {
        flexDirection:'column',
        alignItems:'center'
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
        fontSize: 40,
        flexWrap:'wrap',
       
    },
    MainDeg: {
        fontSize: 60
    },
    SubDeg: {
        fontSize: 20
    },

    extraStatsText: {
        fontSize: 18
    },

});

export default FullinfoScreen;
