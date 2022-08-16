/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import countries from 'country-list';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ErrorMsg from '../../components/ErrorMsg';
import {Order, OrderProduct, CartProduct} from '../../models';
import {Auth, DataStore} from 'aws-amplify';
import {useNavigation} from '@react-navigation/native';

interface ICountry {
  code: string;
  name: string;
}

function AddressScreen() {
  const [inputs, setInputs] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });
  const [countrySelected, setCountrySelected] = useState();
  const [aptNo, setAptNo] = useState('');
  const [error, setError] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });
  const navigation = useNavigation();
  const countryList = countries.getData();

  const handleOnchange = (text: string, name: string) => {
    setInputs(prevState => ({...prevState, [name]: text}));
    setError(prevState => ({...prevState, [name]: ''}));
  };

  function handleError(name: string, error: string) {
    setError(prevState => ({...prevState, [name]: error}));
  }

  function handleCheckout() {
    let isValid = true;
    if (!inputs.name) {
      handleError('name', 'Name is required');
      isValid = false;
    }
    if (!inputs.address) {
      handleError('address', 'Address is required');
      isValid = false;
    }
    if (!inputs.phone) {
      handleError('phone', 'Phone is required');
      isValid = false;
    }
    if (!inputs.city) {
      handleError('city', 'City is required');
      isValid = false;
    }
    if (!inputs.zip) {
      handleError('zip', 'Zip is required');
      isValid = false;
    }

    if (isValid) {
      console.log('Success');
    }

    onSaveOrder();
  }

  async function onSaveOrder() {
    // get user details
    const userData = await Auth.currentAuthenticatedUser();
    // create a new order
    console.log(userData.attributes.sub);

    const newOrder = await DataStore.save(
      new Order({
        userSub: userData.attributes.sub,
        fullName: inputs.name,
        phoneNumber: inputs.phone,
        country: countrySelected,
        city: inputs.city,
        address: inputs.address,
      }),
    );

    // fetch all cart items
    const cartItems = await DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    );

    // attach all cart items to the order
    await Promise.all(
      cartItems.map(cartItem =>
        DataStore.save(
          new OrderProduct({
            quantity: cartItem.quantity,
            option: cartItem.option,
            productID: cartItem.productID,
            orderID: newOrder.id,
          }),
        ),
      ),
    );

    // delete all cart items
    await Promise.all(cartItems.map(cartItem => DataStore.delete(cartItem)));

    // redirect home
    navigation.navigate('home');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 150 : 0}>
      <ScrollView style={styles.root}>
        <View>
          <Picker
            selectedValue={countrySelected}
            onValueChange={item => setCountrySelected(item)}
            style={styles.picker}>
            {countryList.map((country: ICountry) => (
              <Picker.Item
                key={country.code}
                value={country.code}
                label={country.name}
              />
            ))}
          </Picker>
        </View>

        <ErrorMsg text={error.name}>
          <Input
            name="name"
            text="Full Name (First and Last name)"
            value={inputs.name}
            handleOnchange={handleOnchange}
          />
        </ErrorMsg>

        <ErrorMsg text={error.phone}>
          <Input
            name="phone"
            handleOnchange={handleOnchange}
            text="Phone Number"
            value={inputs.phone}
            keyboardType="numeric"
          />
        </ErrorMsg>

        <ErrorMsg text={error.address}>
          <Input
            text="Address"
            value={inputs.address}
            name="address"
            handleOnchange={handleOnchange}
            isAddressField={true}
            aptNo={aptNo}
            setAptNo={setAptNo}
            placeHolder="Street address or P.O. Box"
          />
        </ErrorMsg>

        <ErrorMsg text={error.address}>
          <Input
            text="City"
            value={inputs.city}
            name="city"
            handleOnchange={handleOnchange}
          />
        </ErrorMsg>

        <View style={styles.row}>
          <View style={styles.rowElement}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>State</Text>
            </View>
            <Picker
              selectedValue={countrySelected}
              onValueChange={item => setCountrySelected(item)}
              style={styles.picker}>
              {countryList.map((country: ICountry) => (
                <Picker.Item
                  key={country.code}
                  value={country.code}
                  label={country.name}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.rowElement}>
            <ErrorMsg text={error.zip}>
              <Input
                text="ZIP code"
                value={inputs.zip}
                name="zip"
                handleOnchange={handleOnchange}
              />
            </ErrorMsg>
          </View>
        </View>

        <Button
          text="Checkout"
          onPress={handleCheckout}
          containerStyles={styles.checkoutBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AddressScreen;
