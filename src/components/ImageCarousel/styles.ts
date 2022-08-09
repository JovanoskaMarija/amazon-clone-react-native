import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {},
  image: {
    height: 200,
    resizeMode: 'contain',
    margon: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 25,
    borderWidth: 1,
    backgroundColor: '#ededed',
    borderColor: '#c9c9c9',
    margin: 5,
  },
});
