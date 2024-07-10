import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useCart } from './CartContext';
import { Ionicons } from '@expo/vector-icons';

function CartItem({ item, onRemove }) {
  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)} x {item.quantity}</Text>
        <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>
      <View style={styles.itemActions}>
        
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Ionicons name="close-circle-outline" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function CartScreen() {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center', textDecorationLine: 'underline', textDecorationColor: 'grey'}}>CHECKOUT</Text>
      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <CartItem item={item} onRemove={() => removeFromCart(item.id)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyCart}>
            <Ionicons name="cart-outline" size={48} color="#ccc" />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          </View>
        }
      />
      {cart.length > 0 && (
        <View style={styles.totalContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
          <Text style={{ fontSize: 20, marginBottom: 10}}>EST. TOTAL: </Text>
          <Text style={styles.totalText}>${totalPrice.toFixed(2)}</Text>
          </View>
          
          <TouchableOpacity style={styles.checkoutButton}>
            <View style={{ flexDirection: 'row', alignSelf: 'center', marginLeft: 90}}>
            <Ionicons name="bag-handle-outline" size={24} color="white" />
            <Text style={styles.checkoutButtonText}>Checkout</Text>
            </View>
            
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartItem: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 100,

    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  itemCategory: {
    color: '#666',
    fontSize: 14,
    marginBottom: 2,
  },
  itemPrice: {
    color: '#666',
    fontSize: 14,
  },
  itemActions: {
    alignItems: 'flex-end',
  },
  itemTotal: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: '#dd8560',
  },

  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  totalContainer: {
    backgroundColor: 'white',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#dd8560',
  },
  checkoutButton: {
    backgroundColor: 'black',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },

});

export default CartScreen;