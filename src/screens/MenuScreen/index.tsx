import React from 'react';
import {SafeAreaView} from 'react-native';
import {Auth} from 'aws-amplify';
import Button from '../../components/Button';

function MenuScreen() {
  function onLogout() {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }
  return (
    <SafeAreaView>
      <Button text="Sign Out" onPress={onLogout} />
    </SafeAreaView>
  );
}

export default MenuScreen;
