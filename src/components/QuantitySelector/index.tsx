import React, {Dispatch, SetStateAction} from 'react';
import {View, Text, Pressable} from 'react-native';
import {styles} from './styles';

interface IQuantitySelector {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}

function QuantitySelector({quantity, setQuantity}: IQuantitySelector) {
  function onMinus() {
    setQuantity(quantity - 1);
  }

  function onPlus() {
    setQuantity(quantity + 1);
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
