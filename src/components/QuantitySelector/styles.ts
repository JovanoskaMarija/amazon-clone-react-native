import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 5,
    width: 100,
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: '#d1d1d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
  quantity: {
    color: '#007eb9',
  },
});
