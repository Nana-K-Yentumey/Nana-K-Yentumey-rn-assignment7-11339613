import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView } from 'react-native';
import ProductItem from './ProductItem';
import { fetchProducts } from './productApi';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const numColumns = 2;
const itemWidth = (width - 30) / numColumns; // 30 is the total horizontal padding

function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <ProductItem
        product={item}
        onPress={() => handleProductPress(item)}
        style={{ width: itemWidth }}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.ourStory}>Our Story</Text>
      <View style={{ flexDirection: 'row'}}>
      <Ionicons name="list-outline" size={27} color="grey" />
      <Ionicons name="filter-outline" size={27} color="grey" style={{marginLeft: 10}}/>
      </View>
      </View>
      
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
      />
      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  itemContainer: {
    flex: 1,
    margin: 5,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ourStory: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;