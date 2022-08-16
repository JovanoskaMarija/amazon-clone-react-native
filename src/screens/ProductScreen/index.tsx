import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import {styles} from './styles';
import {Auth, DataStore} from 'aws-amplify';
import {Product, CartProduct} from '../../models';
import {ActivityIndicator} from 'react-native';

function ProductScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [product, setProduct] = useState<Product | undefined>();
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params?.id).then(data => {
      setProduct(data);
    });
  }, [route.params]);

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product?.options[0]);
    }
  }, [product?.options]);

  async function onAddToCart() {
    if (!product) {
      return;
    }

    const original = await DataStore.query(CartProduct, p =>
      p.productID('eq', product.id),
    );

    if (original.length) {
      //update the existing obj
      await DataStore.save(
        CartProduct.copyOf(original[0], updated => {
          updated.quantity = original[0].quantity + quantity;
        }),
      );
    } else {
      //add new one
      const userData = await Auth.currentAuthenticatedUser();

      const newCartProduct = new CartProduct({
        userSub: userData.attributes.sub,
        quantity: quantity,
        option: selectedOption,
        product: product,
        productID: product.id,
      });

      await DataStore.save(newCartProduct);
    }

    navigation.navigate('shoppingCart');
  }

  function handleQuantityUpdate(newQuantity: number) {
    setQuantity(newQuantity);
    // //update the dataStore
    // const original = await DataStore.query(CartProduct, p =>
    //   p.productID('eq', product.id),
    // );

    // await DataStore.save(
    //   CartProduct.copyOf(original[0], updated => {
    //     updated.quantity = newQuantity;
    //   }),
    // );
    // setShouldRerender(true);
  }

  if (product === undefined) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      <ImageCarousel images={product.images} />
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}
        style={styles.picker}>
        {product?.options &&
          product?.options.map((opton, index) => (
            <Picker.Item
              label={opton}
              value={opton}
              key={`${opton}-${index}`}
            />
          ))}
      </Picker>

      <Text style={styles.price}>
        from ${product.price.toFixed(2)}
        {product.oldPrice && (
          <Text style={styles.oldPrice}>${product.oldPrice.toFixed(2)}</Text>
        )}
      </Text>

      <Text style={styles.description}>{product.description}</Text>
      <QuantitySelector
        quantity={quantity}
        handleQuantityUpdate={handleQuantityUpdate}
      />

      <View style={styles.btnContainer}>
        <Button
          text="Add to Card"
          onPress={onAddToCart}
          containerStyles={styles.btnColor}
        />
        <Button text="Buy now" onPress={() => console.log('click')} />
      </View>
    </ScrollView>
  );
}

export default ProductScreen;
