import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import ProductItem from '../../components/ProductItem';
import products from '../../data/products';
function HomeScreen({searchValue: string}) {
  return (
    <View style={styles.page}>
      <FlatList
        data={products}
        renderItem={({item}) => <ProductItem item={item} />}
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
});
export default HomeScreen;
