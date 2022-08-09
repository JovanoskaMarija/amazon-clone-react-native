import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import Button from '../../components/Button';
import CartItem from '../../components/CartItem';
import cart from '../../data/cart';

function ShoppingCartScreen() {
  const navigation = useNavigation();
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (sum, product) => sum + product.item.price * product.quantity,
      0,
    );
  }, []);

  function onCheckout() {
    navigation.navigate('addressScreen');
  }

  return (
    <View style={styles.page}>
      <View>
        <Text style={styles.subtotalInfo}>
          Subtotal ({cart.length} {cart.length > 1 ? 'items' : 'item'}):
          <Text style={styles.subtotalPrice}> ${totalPrice.toFixed(2)}</Text>
        </Text>
        <Button
          text="Proceed to checkout"
          onPress={onCheckout}
          containerStyles={{backgroundColor: '#f7e300'}}
        />
      </View>
      <FlatList
        data={cart}
        renderItem={({item}) => <CartItem cartItem={item} />}
        keyExtractor={({id}) => id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
  subtotalInfo: {
    fontSize: 18,
  },
  subtotalPrice: {
    fontWeight: 'bold',
    color: '#8B0000',
  },
});
export default ShoppingCartScreen;
