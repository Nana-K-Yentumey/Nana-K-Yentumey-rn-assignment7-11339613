//AppNavigator.js

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import ProductDetailsScreen from './ProductDetailsScreen';
import CartScreen from './CartScreen';
import { useCart } from './CartContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CartIcon({ navigation }) {
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 15 }}>
      <Ionicons name="cart-outline" size={24} color="black" />
      {cartItemsCount > 0 && (
        <View style={{
          position: 'absolute',
          right: -6,
          top: -3,
          backgroundColor: 'red',
          borderRadius: 7,
          width: 14,
          height: 14,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {cartItemsCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function ProductStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginLeft: 15 }}>
            <Ionicons name="menu-outline" size={24} color="black" />
          </TouchableOpacity>
        ),
        headerRight: () => <CartIcon navigation={navigation} />,
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Products' }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Products">
        <Drawer.Screen 
          name="Products" 
          component={ProductStack}
          options={{
            headerShown: false,
            title: 'Products',
          }}
        />
        <Drawer.Screen 
          name="Cart" 
          component={CartScreen}
          options={{
            headerRight: (props) => <CartIcon {...props} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;