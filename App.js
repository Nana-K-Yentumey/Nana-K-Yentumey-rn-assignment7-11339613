//App.js

import React from 'react';
import AppNavigator from './AppNavigator';
import { CartProvider } from './CartContext';

export default function App() {
  return (
    <CartProvider>
      <AppNavigator />
    </CartProvider>
  );
}