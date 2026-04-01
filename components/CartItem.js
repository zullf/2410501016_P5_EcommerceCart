import { View, Text, StyleSheet, Button } from 'react-native';

const CartItem = ({ item, onRemove }) => {
  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text>Rp {item.price.toLocaleString()}</Text>
      </View>
      <Button title="Remove" color="red" onPress={() => onRemove(item)} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 16 },
});

export default CartItem;