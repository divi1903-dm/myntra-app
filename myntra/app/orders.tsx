import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";
import { useRouter } from "expo-router";
import { ChevronRight, MapPin, Package, Banknote } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Orders() {
  const router = useRouter();
  const { user } = useAuth();
  const { orders } = useShop();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  if (!user) {
    router.replace("/login");
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>
      <ScrollView style={styles.content}>
        {orders.length === 0 ? (
          <View style={styles.empty}>
            <Package size={56} color="#ff3f6c" />
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <TouchableOpacity
                style={styles.orderHeader}
                onPress={() =>
                  setExpandedOrder(expandedOrder === order.id ? null : order.id)
                }
              >
                <View>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <Package size={16} color="#00b852" />
                  <Text style={styles.orderStatus}>{order.status}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.itemsContainer}>
                {order.items.map((item, index) => (
                  <View key={`${item.productId}-${index}`} style={styles.orderItem}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <View style={styles.itemInfo}>
                      <Text style={styles.brandName}>{item.brand}</Text>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPrice}>
                        ₹{item.price} · Size {item.size}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
              {expandedOrder === order.id && (
                <View style={styles.orderDetails}>
                  <View style={styles.detailHeader}>
                    <MapPin size={18} color="#3e3e3e" />
                    <Text style={styles.detailTitle}>Shipping Address</Text>
                  </View>
                  <Text style={styles.detailText}>{order.shippingAddress}</Text>
                  <View style={[styles.detailHeader, { marginTop: 12 }]}>
                    <Banknote size={18} color="#3e3e3e" />
                    <Text style={styles.detailTitle}>Payment Method</Text>
                  </View>
                  <Text style={styles.detailText}>{order.paymentMethod}</Text>
                </View>
              )}
              <View style={styles.orderFooter}>
                <Text style={styles.totalAmount}>₹{order.total}</Text>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={() =>
                    setExpandedOrder(
                      expandedOrder === order.id ? null : order.id
                    )
                  }
                >
                  <Text style={styles.detailsButtonText}>
                    {expandedOrder === order.id ? "Hide Details" : "View Details"}
                  </Text>
                  <ChevronRight size={20} color="#ff3f6c" />
                </TouchableOpacity>
              </View>
            </View>
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
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  content: { flex: 1, padding: 15 },
  empty: { alignItems: "center", paddingTop: 80 },
  emptyText: { marginTop: 12, color: "#666", fontSize: 16 },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    overflow: "hidden",
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  orderId: { fontSize: 16, fontWeight: "bold" },
  orderDate: { fontSize: 13, color: "#666", marginTop: 2 },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e6f4ea",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  orderStatus: { fontSize: 13, color: "#00b852", marginLeft: 5 },
  itemsContainer: { padding: 15 },
  orderItem: { flexDirection: "row", marginBottom: 12 },
  itemImage: { width: 70, height: 90, borderRadius: 6 },
  itemInfo: { marginLeft: 12, flex: 1 },
  brandName: { color: "#666" },
  itemName: { fontSize: 15, marginTop: 2 },
  itemPrice: { marginTop: 6, fontWeight: "700" },
  orderDetails: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  detailHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  detailTitle: { fontWeight: "700" },
  detailText: { color: "#666", marginTop: 6, lineHeight: 20 },
  orderFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalAmount: { fontSize: 18, fontWeight: "bold" },
  detailsButton: { flexDirection: "row", alignItems: "center" },
  detailsButtonText: { color: "#ff3f6c", marginRight: 4, fontWeight: "600" },
});
