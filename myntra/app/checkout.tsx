import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";
import { useRouter } from "expo-router";
import { Banknote, MapPin, Truck } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Checkout() {
  const router = useRouter();
  const { user } = useAuth();
  const { bagProducts, bagTotal, placeOrder } = useShop();
  const [fullName, setFullName] = useState(user?.name || "");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const handleplaceorder = () => {
    if (!bagProducts.length) {
      Alert.alert("Bag is empty", "Add products before placing an order");
      return;
    }
    if (!fullName.trim() || !line1.trim() || !city.trim() || !pincode.trim()) {
      Alert.alert("Address needed", "Fill in your delivery address");
      return;
    }
    const shippingAddress = `${fullName}, ${line1}, ${city}, ${state} - ${pincode}`;
    placeOrder(shippingAddress);
    Alert.alert(
      "Order placed",
      "Your order is confirmed with Cash on Delivery.",
      [{ text: "View orders", onPress: () => router.replace("/orders") }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={24} color="#ff3f6c" />
            <Text style={styles.sectionTitle}>Shipping Address</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="Address Line"
            value={line1}
            onChangeText={setLine1}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="State"
              value={state}
              onChangeText={setState}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Pincode"
            value={pincode}
            onChangeText={setPincode}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Banknote size={24} color="#ff3f6c" />
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          <View style={styles.codCard}>
            <View style={styles.radioOuter}>
              <View style={styles.radioInner} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.codTitle}>Cash on Delivery</Text>
              <Text style={styles.codText}>
                Pay in cash when the order is delivered. Card and UPI are not
                available right now.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Truck size={24} color="#ff3f6c" />
            <Text style={styles.sectionTitle}>Order Summary</Text>
          </View>
          {bagProducts.map((item) => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                {item.product.name} x {item.quantity}
              </Text>
              <Text style={styles.summaryValue}>
                ₹{item.product.price * item.quantity}
              </Text>
            </View>
          ))}
          <View style={[styles.summaryRow, styles.total]}>
            <Text style={styles.totalLabel}>Total (COD)</Text>
            <Text style={styles.totalValue}>₹{bagTotal}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handleplaceorder}
        >
          <Text style={styles.placeOrderButtonText}>PLACE ORDER (COD)</Text>
        </TouchableOpacity>
      </View>
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
  section: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  halfInput: { width: "48%" },
  codCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#fff4f6",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ff3f6c",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ff3f6c",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff3f6c",
  },
  codTitle: { fontWeight: "800", fontSize: 16, color: "#3e3e3e" },
  codText: { color: "#666", marginTop: 4, lineHeight: 20 },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  summaryLabel: { fontSize: 15, color: "#666", flex: 1, paddingRight: 8 },
  summaryValue: { fontSize: 15, color: "#3e3e3e" },
  total: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    marginTop: 10,
    paddingTop: 10,
  },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#ff3f6c" },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  placeOrderButton: {
    backgroundColor: "#ff3f6c",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  placeOrderButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
