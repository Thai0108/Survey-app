import * as React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabTwoScreen from './screens/TabTwoScreen'
import TabOneScreen from './screens/TabOneScreen'
function HomeScreen() {
  return (
    <TabOneScreen/>
  );
}

function SettingsScreen() {
  return (
    <TabTwoScreen/>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Home') {
              return (
                // <MaterialCommunityIcons name={focused ? "inbox-multiple" : "inbox-multiple-outline"} size={24} color="black" />
                <MaterialCommunityIcons name="inbox-multiple" size={24} color={focused ? "red" : "black"} />
              );
            } else if (route.name === 'SMS') {
              return (
                // <MaterialIcons name="sms" size={24} color={focused ? "blue" : "black"} />
                <MaterialCommunityIcons name="send" size={24} color={focused ? "red" : "black"} />

              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'tomato',
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            // tabBarBadge: 3 
            headerShown:false
          }}
        />
        <Tab.Screen 
        name="SMS" 
        component={SettingsScreen} 
        options={{ 
            // tabBarBadge: 3 
            headerShown:false
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}