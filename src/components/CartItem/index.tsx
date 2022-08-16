import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {View, Text, Image, ActivityIndicator} from 'react-native';
import {DataStore} from 'aws-amplify';
import {CartProduct} from '../../models';
import QuantitySelector from '../QuantitySelector';
import {styles} from './styles';

interface IProductItem {
  cartItem: {
    id: string;
    quantity: number;
    option?: string;
    product: {
      id: string;
      title: string;
      image: string;
      avgRating: number;
      ratings: number;
      price: number;
      oldPrice?: number;
    };
  };
  setShouldRerender: Dispatch<SetStateAction<boolean>>;
}

function CartItem({cartItem, setShouldRerender}: IProductItem) {
  const {quantity: quantityProp, product} = cartItem;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quantityProp) {
      setQuantity(quantityProp);
    }
  }, [quantityProp]);

  if (cartItem === undefined) {
    return <ActivityIndicator />;
  }

  async function handleQuantityUpdate(newQuantity: number) {
    setQuantity(newQuantity);
    //update the dataStore
    const original = await DataStore.query(CartProduct, p =>
      p.productID('eq', product.id),
    );

    await DataStore.save(
      CartProduct.copyOf(original[0], updated => {
        updated.quantity = newQuantity;
      }),
    );
    setShouldRerender(true);
  }

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: product?.image,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.rootContainer}>
          <Text style={styles.title}>{product?.title}</Text>

          <Text style={styles.price}>
            ${product?.price.toFixed(2)}
            {product?.oldPrice && (
              <Text style={styles.oldPrice}>
                {' '}
                ${product?.oldPrice.toFixed(2)}
              </Text>
            )}
          </Text>
        </View>
      </View>
      <QuantitySelector
        quantity={quantity}
        handleQuantityUpdate={handleQuantityUpdate}
      />
    </View>
  );
}

export default CartItem;
