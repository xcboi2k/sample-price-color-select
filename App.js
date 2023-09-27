import React, { useState, useEffect } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, Text } from 'react-native';
import { NumericFormat } from 'react-number-format';
import { ArrowIcon, ArrowKeys, BottomText, Container, ImageComponent, MenuContainer, MenuItem, MiddleContainer, RatingStars, TopText, UnderlinedText, Price, MenuText, ColorMenuItem, StarContainer, SubText } from './styles';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [productData, setProductData] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableStorageOptions, setAvailableStorageOptions] = useState([]);
  const [disabledStorageOptions, setDisabledStorageOptions] = useState([]);

  useEffect(() => {
    fetch('https://9xozpkins4.execute-api.ap-southeast-1.amazonaws.com/dev/api/product')
      .then((response) => response.json())
      .then((data) => {
        setProductData(data);

        const colorOptions = data?.product.options.find(
          (option) => option.name === 'color'
        )?.values || [];
        setAvailableColors(colorOptions);

        const storageOptions = data?.product.options.find(
          (option) => option.name === 'memory'
        )?.values || [];
        setAvailableStorageOptions(storageOptions);
      })

      .catch((error) => console.error('Error fetching product data:', error));
  }, []);

  const handleColorChange = async(color) => {
    setSelectedColor(color);

    try {
      const response = await fetch('https://9xozpkins4.execute-api.ap-southeast-1.amazonaws.com/dev/api/product');
      const data = await response.json();
  
      const availableStorageOptionsForColor = data?.product.variants
        .filter((variant) => variant.options.color === color)
        .map((variant) => variant.options.memory);
  
      const lowestAvailableStorage = availableStorageOptionsForColor.reduce(
        (lowestStorage, currentStorage) =>
          parseInt(currentStorage) < parseInt(lowestStorage) ? currentStorage : lowestStorage
      );
  
      setSelectedStorage(lowestAvailableStorage);
  
      const selectedVariant = data?.product.variants.find(
        (variant) => variant.options.color === color && variant.options.memory === lowestAvailableStorage
      );

      if (selectedVariant) {
        setSelectedPrice(selectedVariant.price);
      }

      const allStorageOptions = ['32GB', '64GB', '256GB'];
      const disabledOptions = allStorageOptions.filter(
        (storageOption) => !availableStorageOptionsForColor.includes(storageOption)
      );

      setDisabledStorageOptions(disabledOptions);

    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const handleStorageChange = (storage) => {
    setSelectedStorage(storage);

    const selectedVariant = productData?.product.variants.find(
      (variant) => variant.options.color === selectedColor && variant.options.memory === storage
    );
    
    if (selectedVariant) {
      setSelectedPrice(selectedVariant.price);
    }
    else {
      setSelectedPrice(0);
    }
  };

  const renderStars = rating => {
    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
        starIcons.push(
            <Ionicons 
            key={i} 
            name={i <= rating ? 'md-star' : 'md-star-outline'} 
            size={30} 
            color="#FFD700" />
        );
        }
        return starIcons;
    };

  return (
    <Container>
      <TopText>Shop / Mobile Phones / Samsung / {productData?.product.name}</TopText>
      <MiddleContainer>
        <ImageComponent source={{uri: `${productData?.product.image}`}}/>
      </MiddleContainer>
      <BottomText>Samsung {productData?.product.name} {selectedColor}/{selectedStorage}</BottomText>
      <UnderlinedText>Mobile Phones</UnderlinedText>
      <StarContainer>{renderStars(4)}</StarContainer>
      <Price>
        <NumericFormat
          value={selectedPrice}
          displayType={'text'}
          thousandSeparator={true}
          prefix={'₱'}
          decimalScale={2}
          renderText={value => <Text>{value}</Text>}
        />
      </Price>
      <SubText>Color</SubText>
      <MenuContainer>
      {availableColors.map((colorOption) => (
          <TouchableOpacity
            key={colorOption}
            onPress={() => handleColorChange(colorOption)}
          >
            <ColorMenuItem selected={selectedColor === colorOption}>
              {colorOption}
            </ColorMenuItem>
          </TouchableOpacity>
        ))}
      </MenuContainer>
      <SubText>Storage</SubText>
      <MenuContainer>
        {availableStorageOptions.map((storageOption) => (
            <TouchableOpacity
              key={storageOption}
              onPress={() => handleStorageChange(storageOption)}
              disabled={disabledStorageOptions.includes(storageOption)}
            >
              <MenuItem key={storageOption} available={selectedStorage === storageOption} selected={selectedStorage === storageOption}
              disabled={disabledStorageOptions.includes(storageOption)}
              >
                {storageOption}
              </MenuItem>
            </TouchableOpacity>
        ))}
      </MenuContainer>
      
    </Container>
  );
}