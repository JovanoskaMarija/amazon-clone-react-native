import React, {Dispatch, SetStateAction, useState} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Feather from 'react-native-vector-icons/Feather';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();

interface HeaderComponentProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const HeaderComponent = ({
  searchValue,
  setSearchValue,
}: HeaderComponentProps) => {
  return (
    <SafeAreaView style={styles.headerBg}>
      <View style={styles.header}>
        <Feather name="search" size={20} />
        <TextInput
          style={styles.headerInput}
          placeholder="Search..."
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>
    </SafeAreaView>
  );
};

function HomeStack() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <SafeAreaView style={styles.navigatorWrapper}>
      <Stack.Navigator
        screenOptions={{
          header: () => (
            <HeaderComponent
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          ),
        }}>
        <Stack.Screen name="homeScreen" options={{title: 'Home'}}>
          {() => <HomeScreen searchValue={searchValue} />}
        </Stack.Screen>
        <Stack.Screen component={ProductScreen} name="productScreen" />
      </Stack.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerBg: {
    backgroundColor: '#22e3dd',
  },
  header: {
    margin: 10,
    padding: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInput: {
    height: 40,
    marginLeft: 10,
  },
  navigatorWrapper: {
    flex: 1,
  },
});

export default HomeStack;
