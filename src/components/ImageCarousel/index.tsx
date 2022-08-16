import React, {useRef, useState} from 'react';
import {View, Image, FlatList, useWindowDimensions} from 'react-native';
import {styles} from './styles';

interface IImageCarousel {
  images: string[];
}

function ImageCarousel({images}: IImageCarousel) {
  const [activeIndex, setActiveIndex] = useState(0);
  const windowWidth = useWindowDimensions().width;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    waitForInteraction: true,
    minimumViewTime: 5,
  });

  const onViewableItemsChanged = React.useRef(({changed}: any) => {
    if (changed && changed.length > 0) {
      setActiveIndex(changed[0].index);
    }
  });

  return (
    <View style={styles.root}>
      <FlatList
        data={images}
        renderItem={({item, index}) => (
          <View key={index}>
            <Image
              key={index}
              style={[styles.image, {width: windowWidth - 20}]}
              source={{uri: item}}
            />
          </View>
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth - 20}
        snapToAlignment={'center'}
        decelerationRate={'fast'}
        keyExtractor={(_, index) => index.toString()}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
      />

      <View style={styles.dots}>
        {images.map((image, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              // eslint-disable-next-line react-native/no-inline-styles
              {backgroundColor: index === activeIndex ? '#c9c9c9' : '#ededed'},
            ]}
          />
        ))}
      </View>
    </View>
  );
}

export default ImageCarousel;
