import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginVertical: 5,
  },
  imgContainer: {
    height: 160,
  },
  image: {
    width: 150,
    height: '100%',
    resizeMode: 'contain',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  rootContainer: {
    padding: 10,
    flex: 3,
  },
  title: {
    fontSize: 18,
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
  star: {
    margin: 2,
  },
});
