import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import {useColorScheme } from 'react-native';
import {Colors} from "react-native/Libraries/NewAppScreen";
import MainScreen from "./Screens/MainScreen";
import FullinfoScreen from "./Screens/FullinfoScreen";

const App=() => {
  const isDarkMode = useColorScheme() === 'dark';

  const HeaderStyle = {
    backgroundColor: isDarkMode ?"#eb6d4d" :"#eb6d4d",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 6
  };

  const TitleStyle={
    color: isDarkMode ? "#003049": Colors.white
  }

  const Stack = createStackNavigator();
  return (
    <NavigationContainer  >

      <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} options={{ headerShown:true,headerTitle:"WIT",headerStyle:HeaderStyle,headerTitleStyle:TitleStyle }} />
      <Stack.Screen name="Stats" component={FullinfoScreen} options={{ headerShown: true,headerTitle:"WIT",headerStyle:HeaderStyle,headerTitleStyle:TitleStyle }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};



export default App;
