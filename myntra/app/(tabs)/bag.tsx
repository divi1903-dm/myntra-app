import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";
import { useRouter } from "expo-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Bag() {
  const router = useRouter();
  const { user } = useAuth();
  const { bagProducts, bagTotal, updateQuantity, removeFromBag } = useShop();

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Bag</Text>
        </View>
        <View style={styles.emptyState}>
          <ShoppingBag size={64} color="#ff3f6c" />
          <Text style={styles.emptyTitle}>Please login to view your bag</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Bag</Text>
      </View>
      {bagProducts.length === 0 ? (
        <View style={styles.emptyState}>
          <ShoppingBag size={64} color="#ff3f6c" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <ScrollView style={styles.content}>
            {bagProducts.map((item) => (
              <View key={item.id} style={styles.bagItem}>
                <Image
                  source={{ uri: item.product.images[0] }}
                  style={styles.itemImage}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.brandName}>{item.product.brand}</Text>
                  <Text style={styles.itemName}>{item.product.name}</Text>
                  <Text style={styles.itemSize}>Size: {item.size}</Text>
                  <Text style={styles.itemPrice}>₹{item.product.price}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus size={18} color="#3e3e3e" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus size={18} color="#3e3e3e" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeFromBag(item.id)}
                    >
                      <Trash2 size={20} color="#ff3f6c" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>₹{bagTotal}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => router.push("/checkout")}
            >
              <Text style={styles.checkoutButtonText}>CHECKOUT · COD</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#3e3e3e" },
  content: { flex: 1, padding: 15 },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: { fontSize: 18, color: "#3e3e3e", marginTop: 20 },
  loginButton: {
    backgroundColor: "#ff3f6c",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 16,
  },
  loginButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  bagItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  itemImage: { width: 100, height: 130 },
  itemInfo: { flex: 1, padding: 15 },
  brandName: { fontSize: 14, color: "#666" },
  itemName: { fontSize: 16, color: "#3e3e3e", marginVertical: 4 },
  itemSize: { fontSize: 14, color: "#666" },
  itemPrice: { fontSize: 16, fontWeight: "bold", marginVertical: 6 },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  quantity: { marginHorizontal: 12, fontSize: 16 },
  removeButton: { marginLeft: "auto" },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  totalLabel: { fontSize: 16 },
  totalAmount: { fontSize: 18, fontWeight: "bold" },
  checkoutButton: {
    backgroundColor: "#ff3f6c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
