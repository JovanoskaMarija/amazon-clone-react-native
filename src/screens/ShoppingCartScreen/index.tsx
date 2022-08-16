/* eslint-disable @typescript-eslint/no-shadow */
import {useNavigation} from '@react-navigation/native';
import {Auth, DataStore} from 'aws-amplify';
import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import Button from '../../components/Button';
import CartItem from '../../components/CartItem';
import {CartProduct} from '../../models';

function ShoppingCartScreen() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [shouldRerender, setShouldRerender] = useState(false);
  const navigation = useNavigation();

  async function fetchProducts() {
    const userData = await Auth.currentAuthenticatedUser();
    // fetch only products with userSub === UserId
    DataStore.query(CartProduct, cp =>
      cp.userSub('eq', userData.attributes.sub),
    ).then(data => {
      if (data.length) {
        let filteredData: CartProduct[] = [];

        data.forEach(p => {
          const productPresent = filteredData.find(
            item => (item?.productID ?? null) === p?.productID,
          );

          if (productPresent) {
            const oldEl = {...productPresent};
            const oldElIndex = filteredData.findIndex(
              item => (item?.productID ?? null) === p?.productID,
            );

            const newEl = {...oldEl, quantity: oldEl.quantity + p.quantity};
            filteredData[oldElIndex] = newEl;
          } else {
            filteredData.push(p);
          }
        });

        setCartProducts(filteredData);
        setShouldRerender(false);
      }
    });
  }

  useEffect(() => {
    setShouldRerender(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts();
    setLoading(false);
  }, [shouldRerender]);

  useEffect(() => {
    const subscriptions = cartProducts.map(cp =>
      DataStore.observe(CartProduct, cp.id).subscribe(msg => {
        if (msg.opType === 'UPDATE') {
          setCartProducts(curCartProducts =>
            curCartProducts.map(cp => {
              if (cp.id !== msg.element.id) {
                console.log('differnt id');
                return cp;
              }
              return {
                ...cp,
                ...msg.element,
              };
            }),
          );
        }
      }),
    );

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [cartProducts]);

  const totalPrice = useMemo(() => {
    return cartProducts.reduce(
      (sum, cartProduct) =>
        sum + (cartProduct.product?.price ?? 0) * cartProduct.quantity,
      0,
    );
  }, [cartProducts]);

  const totalItems = useMemo(() => {
    if (cartProducts.length) {
      return cartProducts.reduce(function (accumulator, curValue) {
        return accumulator + curValue.quantity;
      }, 0);
    }
  }, [cartProducts]);

  function onCheckout() {
    navigation.navigate('addressScreen');
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.page}>
      <View>
        <Text style={styles.subtotalInfo}>
          Subtotal ({totalItems} {(totalItems ?? 0) > 1 ? 'items' : 'item'}):
          <Text style={styles.subtotalPrice}> ${totalPrice.toFixed(2)}</Text>
        </Text>
        <Button
          text="Proceed to checkout"
          onPress={onCheckout}
          containerStyles={styles.checkOutBtn}
        />
      </View>
      <FlatList
        data={cartProducts}
        renderItem={({item}) => (
          <CartItem cartItem={item} setShouldRerender={setShouldRerender} />
        )}
        keyExtractor={({id}) => id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    marginBottom: 90,
  },
  subtotalInfo: {
    fontSize: 18,
  },
  subtotalPrice: {
    fontWeight: 'bold',
    color: '#8B0000',
  },
  checkOutBtn: {
    backgroundColor: '#f7e300',
    marginBottom: 20,
  },
});
export default ShoppingCartScreen;
