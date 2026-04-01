import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';

const CartScreen = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CartItem item={item} onRemove={(val) => dispatch(removeFromCart(val))} />
        )}
        ListEmptyComponent={<Text style={styles.empty}>Keranjang Kosong</Text>}
      />
      
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: Rp {total.toLocaleString()}</Text>
        <Button title="Clear Cart" color="orange" onPress={() => dispatch(clearCart())} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 18, color: 'grey' },
  footer: { padding: 20, borderTopWidth: 1, borderColor: '#ddd', backgroundColor: '#fff' },
  totalText: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});

export default CartScreen;