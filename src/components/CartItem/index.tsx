import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import QuantitySelector from '../QuantitySelector';
import {styles} from './styles';

interface IProductItem {
  cartItem: {
    id: string;
    quantity: number;
    option?: string;
    item: {
      id: string;
      title: string;
      image: string;
      avgRating: number;
      ratings: number;
      price: number;
      oldPrice?: number;
    };
  };
}

function CartItem({cartItem}: IProductItem) {
  const {quantity: quantityProp, item} = cartItem;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quantityProp) {
      setQuantity(quantityProp);
    }
  }, [quantityProp]);

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.rootContainer}>
          <Text style={styles.title}>{item.title}</Text>

          <Text style={styles.price}>
            ${item.price}
            {item.oldPrice && (
              <Text style={styles.oldPrice}> ${item.oldPrice}</Text>
            )}
          </Text>
        </View>
      </View>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
    </View>
  );
}

export default CartItem;
