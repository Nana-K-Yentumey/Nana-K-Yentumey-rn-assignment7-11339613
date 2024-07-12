//AppNavigator.js

import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
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
        headerTitle: () => <CustomHeader />,
        headerTitleAlign: 'center',
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <Text style={{ fontSize: 25, marginLeft: 10 }}>Eric Atsu</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function CustomHeader() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60 }}>
      <Image
        source={require('./logo.png')}
        style={{ width: 120, height: 50, resizeMode: 'contain' }}
      />
    </View>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Products"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen 
          name="Products" 
          component={ProductStack}
          options={{
            headerShown: false,
          }}
        />
        <Drawer.Screen 
          name="Cart" 
          component={CartScreen}
          options={{
            headerRight: (props) => <CartIcon {...props} />,
            headerTitle: () => <CustomHeader />,
            headerTitleAlign: 'center',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;