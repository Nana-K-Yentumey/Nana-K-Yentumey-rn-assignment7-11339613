import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext';

const { width } = Dimensions.get('window');
const itemWidth = (width - 30) / 2; // 30 is the total horizontal padding

function ProductItem({ product, onPress, style }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{product.title}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{product.category}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Ionicons name="bag-add-outline" size={24} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Ensure text color contrasts with background
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dd8560',
  },
  addToCartButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#dd8560',
    borderRadius: 20,
    padding: 5,
  },
});

export default ProductItem;