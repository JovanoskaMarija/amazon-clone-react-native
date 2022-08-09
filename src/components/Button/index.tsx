import React from 'react';
import {Text, Pressable} from 'react-native';
import {styles} from './styles';

interface IButton {
  text: string;
  onPress: () => void;
  containerStyles?: object;
}

function Button({text, onPress, containerStyles}: IButton) {
  return (
    <Pressable onPress={onPress} style={[styles.root, containerStyles]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

export default Button;
