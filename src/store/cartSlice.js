import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToStorage = async (items, total) => {
  try {
    const data = JSON.stringify({ items, total });
    await AsyncStorage.setItem('cart_data', data);
  } catch (e) {
    console.log("Gagal simpan data");
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    hydrateCart: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.total += action.payload.price;
      saveToStorage(state.items, state.total); 
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.total -= state.items[itemIndex].price;
        state.items.splice(itemIndex, 1);
        saveToStorage(state.items, state.total); 
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      AsyncStorage.removeItem('cart_data');
    },
  },
});

export const { addToCart, removeFromCart, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;