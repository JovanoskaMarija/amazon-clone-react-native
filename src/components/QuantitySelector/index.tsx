import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from './styles';

interface IQuantitySelector {
  quantity: number;
  handleQuantityUpdate: (newQuantity: number) => void;
}

function QuantitySelector({quantity, handleQuantityUpdate}: IQuantitySelector) {
  function onMinus() {
    const newQuantity = quantity - 1;
    handleQuantityUpdate(newQuantity);
  }

  function onPlus() {
    const newQuantity = quantity + 1;
    handleQuantityUpdate(newQuantity);
  }
  return (
    <View style={styles.root}>
      <Pressable
        onPress={onMinus}
        style={styles.button}
        disabled={quantity === 1 ? true : false}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable onPress={onPlus} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

export default QuantitySelector;
