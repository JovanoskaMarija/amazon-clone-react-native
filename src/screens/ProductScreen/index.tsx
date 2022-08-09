import React, {useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useRoute} from '@react-navigation/native';
import product from '../../data/product';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';
import {styles} from './styles';

function ProductScreen() {
  const route = useRoute();
  console.log('route: ', route);
  const [selectedOption, setSelectedOption] = useState();
  const [quantity, setQuantity] = useState(1);

  return (
    <ScrollView style={styles.root}>
      <Text style={styles.title}>{product.title}</Text>

      <ImageCarousel images={product.images} />
      <Picker
        selectedValue={selectedOption}
        onValueChange={itemValue => setSelectedOption(itemValue)}
        style={styles.picker}>
        {product.options.map((opton, index) => (
          <Picker.Item label={opton} value={opton} key={`${opton}-${index}`} />
        ))}
      </Picker>

      <Text style={styles.price}>
        from ${product.price}
        {product.oldPrice && (
          <Text style={styles.oldPrice}>${product.oldPrice}</Text>
        )}
      </Text>

      <Text style={styles.description}>{product.description}</Text>
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      <View style={styles.btnContainer}>
        <Button
          text="Add to Card"
          onPress={() => console.log('click')}
          containerStyles={styles.btnColor}
        />
        <Button text="Buy now" onPress={() => console.log('click')} />
      </View>
    </ScrollView>
  );
}

export default ProductScreen;
