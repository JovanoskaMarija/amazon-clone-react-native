/* eslint-disable @typescript-eslint/no-shadow */
import React, {Dispatch, SetStateAction} from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from './styles';

interface IButton {
  name: string;
  text: string;
  value: string;
  handleOnchange: (text: string, name: string) => void;
  placeHolder?: string;
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  isAddressField?: boolean;
  aptNo?: string;
  setAptNo?: Dispatch<SetStateAction<string>>;
}

function Input({
  name,
  text,
  value,
  handleOnchange,
  placeHolder,
  isAddressField,
  aptNo,
  setAptNo,
  keyboardType,
}: IButton) {
  return (
    <View style={styles.row}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{text}</Text>
      </View>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={text => handleOnchange(text, name)}
        placeholder={placeHolder}
        keyboardType={keyboardType ? keyboardType : 'default'}
      />
      {isAddressField && (
        <TextInput
          style={styles.input}
          value={aptNo}
          onChangeText={setAptNo}
          placeholder="Apt, Suite,Unit, Building (Optional)"
        />
      )}
    </View>
  );
}

export default Input;
