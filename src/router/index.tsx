import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNav from './BottomTabNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={BottomTabNav} name="tabs" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
