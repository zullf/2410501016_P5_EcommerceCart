import { View, Text, StyleSheet, Button } from 'react-native';

const ProductCard = ({ product, onAdd }) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>Rp {product.price.toLocaleString()}</Text>
      </View>
      <Button title="Add" onPress={() => onAdd(product)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { color: '#888' },
});

export default ProductCard;