import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector, useDispatch } from 'react-redux'; 
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from './store';
import { hydrateCart } from './store/cartSlice'; 
import ProductList from './screens/ProductList';
import CartScreen from './screens/CartScreen';

const Tab = createBottomTabNavigator();

function MainLayout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const badgeCount = cartItems.length;

  useEffect(() => {
    const loadSavedCart = async () => {
      try {
        const savedData = await AsyncStorage.getItem('cart_data');
        if (savedData !== null) {
          dispatch(hydrateCart(JSON.parse(savedData)));
        }
      } catch (e) {
        console.log("Error loading data", e);
      }
    };
    loadSavedCart();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = route.name === 'Home' ? 'home' : 'cart';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={ProductList} 
          options={{ title: 'Daftar Produk' }} 
        />
        <Tab.Screen 
          name="Cart" 
          component={CartScreen} 
          options={{ 
            title: 'Keranjang Saya',
            tabBarBadge: badgeCount > 0 ? badgeCount : null 
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainLayout />
    </Provider>
  );
}