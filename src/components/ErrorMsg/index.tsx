import React, {useMemo} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';

type Props = {
  text: string;
  children: JSX.Element;
};

function ErrorMsg({children, text}: Props) {
  const msg = useMemo(() => {
    if (text.length) {
      return (
        <View style={styles.msgContainer}>
          <Text style={styles.msg}>{text}</Text>
        </View>
      );
    }
  }, [text]);

  return (
    <View>
      {children}
      {msg}
    </View>
  );
}

export default ErrorMsg;
