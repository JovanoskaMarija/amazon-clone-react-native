import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import AddressScreen from '../screens/AddressScreen';

const Stack = createNativeStackNavigator();

function ShoppingCardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={ShoppingCartScreen}
        name="shoppingCartScreen"
        options={{title: 'Shopping Cart'}}
      />
      <Stack.Screen
        component={AddressScreen}
        name="addressScreen"
        options={{title: 'Address'}}
      />
    </Stack.Navigator>
  );
}

export default ShoppingCardStack;
