import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  root: {
    borderBottomWidth: 1,
    borderColor: '#d1d1d1',
    backgroundColor: '#ffffff',
    padding: 10,
    marginBottom: 20,
  },
  container: {
    flexDirection: 'row',
  },
  imgContainer: {
    height: 160,
  },
  image: {
    width: 150,
    height: '100%',
    resizeMode: 'contain',
  },
  rootContainer: {
    padding: 10,
    flex: 3,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B0000',
  },
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  star: {
    margin: 2,
  },
});
