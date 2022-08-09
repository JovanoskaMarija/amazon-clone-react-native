import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  title: {},
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  description: {
    marginVertical: 10,
    lineHeight: 20,
  },
  picker: {
    backgroundColor: '#ededed',
  },
  btnContainer: {
    marginBottom: 30,
  },
  btnColor: {
    backgroundColor: '#e3c905',
  },
});
