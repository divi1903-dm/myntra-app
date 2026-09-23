import { getProductById } from "@/constants/catalog";
import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";
import { useRouter } from "expo-router";
import { Heart, Trash2 } from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Wishlist() {
  const router = useRouter();
  const { user } = useAuth();
  const { wishlist, toggleLike } = useShop();
  const items = wishlist
    .map((id) => getProductById(id))
    .filter(Boolean);

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Wishlist</Text>
        </View>
        <View style={styles.emptyState}>
          <Heart size={64} color="#ff3f6c" />
          <Text style={styles.emptyTitle}>Please login to view liked items</Text>
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
        <Text style={styles.headerTitle}>Liked items</Text>
      </View>
      <ScrollView style={styles.content}>
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Heart size={64} color="#ff3f6c" />
            <Text style={styles.emptyTitle}>No liked products yet</Text>
          </View>
        ) : (
          items.map((item) => (
            <TouchableOpacity
              key={item!.id}
              style={styles.wishlistItem}
              onPress={() => router.push(`/product/${item!.id}`)}
            >
              <Image
                source={{ uri: item!.images[0] }}
                style={styles.itemImage}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.brandName}>{item!.brand}</Text>
                <Text style={styles.itemName}>{item!.name}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>₹{item!.price}</Text>
                  <Text style={styles.discount}>{item!.discount}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => toggleLike(item!.id)}
              >
                <Trash2 size={22} color="#ff3f6c" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyTitle: { fontSize: 16, color: "#3e3e3e", marginTop: 16 },
  loginButton: {
    backgroundColor: "#ff3f6c",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 16,
  },
  loginButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  wishlistItem: {
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
  itemImage: { width: 100, height: 120 },
  itemInfo: { flex: 1, padding: 15 },
  brandName: { fontSize: 14, color: "#666" },
  itemName: { fontSize: 16, marginVertical: 6 },
  priceContainer: { flexDirection: "row", alignItems: "center" },
  price: { fontSize: 16, fontWeight: "bold", marginRight: 10 },
  discount: { fontSize: 14, color: "#ff3f6c" },
  removeButton: { padding: 15, justifyContent: "center" },
});
