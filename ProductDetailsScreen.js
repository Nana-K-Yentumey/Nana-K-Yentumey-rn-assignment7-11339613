import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

function ProductDetailsScreen({ route }) {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.title}</Text>
        
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Image source={require('./1.png')} style={styles.secSect}/>
        <Image source={require('./2.png')} style={styles.lastSect}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  image: {
    width: 350,
    height: 450,
    marginTop: 5,
    alignSelf: 'center',

  },
  lastSect: {
    width: 400,
    marginRight: 30,
    marginTop: 60,
    alignSelf: 'center',

  },
  secSect: {
    width: 400,
    marginLeft: 40,
    alignSelf: 'center',
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dd8560',
    marginBottom: 20,
  },
  description: {
    color: 'grey',
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'light',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default ProductDetailsScreen;