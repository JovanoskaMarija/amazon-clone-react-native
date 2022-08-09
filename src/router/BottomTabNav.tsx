import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeStack from './HomeStack';
import ShoppingCardStack from './ShoppingCardStack';

const Tab = createBottomTabNavigator();

function BottomTabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#ffbd7d',
        tabBarActiveTintColor: '#e47911',
        headerShown: false,
      }}>
      <Tab.Screen
        component={HomeStack}
        name="home"
        options={{
          tabBarIcon: ({color}) => {
            return <Entypo name="home" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name="profile"
        options={{
          tabBarIcon: ({color}) => {
            return <Entypo name="user" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        component={ShoppingCardStack}
        name="shoppingCart"
        options={{
          tabBarIcon: ({color}) => {
            return <Entypo name="shopping-cart" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        component={HomeScreen}
        name="more"
        options={{
          tabBarIcon: ({color}) => {
            return <Entypo name="menu" size={24} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNav;
