import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';

interface IProductItem {
  item: {
    id: string;
    title: string;
    image: string;
    avgRating?: number;
    ratings: number;
    price: number;
    oldPrice?: number;
  };
}

function ProductItem({item}: IProductItem) {
  const navigation = useNavigation();
  function onPress() {
    navigation.navigate('productScreen' as never, {id: item.id} as never);
  }
  return (
    <Pressable onPress={onPress} style={styles.root}>
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
        <View style={styles.review}>
          {[...Array(5)].map((star, index) => {
            return (
              <FontAwesome
                key={`${item.id}-${index}`}
                style={styles.star}
                name={
                  item.avgRating
                    ? index < Math.floor(item?.avgRating)
                      ? 'star'
                      : 'star-o'
                    : 'star-o'
                }
                size={18}
                color={'#e47911'}
              />
            );
          })}
          <Text>{item.ratings}</Text>
        </View>
        <Text style={styles.price}>
          from ${item.price.toFixed(2)}
          {item.oldPrice && (
            <Text style={styles.oldPrice}>${item.oldPrice.toFixed(2)}</Text>
          )}
        </Text>
      </View>
    </Pressable>
  );
}

export default ProductItem;
