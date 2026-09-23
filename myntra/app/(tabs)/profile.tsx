import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";
import { useRouter } from "expo-router";
import {
  Banknote,
  ChevronRight,
  Heart,
  LogOut,
  Package,
  User,
} from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { orders, wishlist } = useShop();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <View style={styles.emptyState}>
          <User size={64} color="#ff3f6c" />
          <Text style={styles.emptyTitle}>Please login to view your profile</Text>
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
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <User size={40} color="#fff" />
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.method}>
              {user.method === "google" ? "Signed in with Google" : "Email login"}
            </Text>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{orders.length}</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{wishlist.length}</Text>
            <Text style={styles.statLabel}>Liked</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNum}>COD</Text>
            <Text style={styles.statLabel}>Payment</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/orders")}
        >
          <View style={styles.menuItemLeft}>
            <Package size={24} color="#3e3e3e" />
            <Text style={styles.menuItemLabel}>My Orders</Text>
          </View>
          <ChevronRight size={24} color="#3e3e3e" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => router.push("/wishlist")}
        >
          <View style={styles.menuItemLeft}>
            <Heart size={24} color="#3e3e3e" />
            <Text style={styles.menuItemLabel}>Liked items</Text>
          </View>
          <ChevronRight size={24} color="#3e3e3e" />
        </TouchableOpacity>
        <View style={styles.menuItem}>
          <View style={styles.menuItemLeft}>
            <Banknote size={24} color="#3e3e3e" />
            <View>
              <Text style={styles.menuItemLabel}>Payment</Text>
              <Text style={styles.menuHint}>Cash on Delivery only</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={24} color="#ff3f6c" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  content: { flex: 1 },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: { fontSize: 18, color: "#3e3e3e", marginTop: 20, marginBottom: 20 },
  loginButton: {
    backgroundColor: "#ff3f6c",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  loginButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ff3f6c",
    justifyContent: "center",
    alignItems: "center",
  },
  userDetails: { marginLeft: 15, flex: 1 },
  userName: { fontSize: 20, fontWeight: "bold", color: "#3e3e3e" },
  userEmail: { fontSize: 14, color: "#666", marginTop: 4 },
  method: { fontSize: 12, color: "#ff3f6c", marginTop: 6, fontWeight: "600" },
  stats: {
    flexDirection: "row",
    marginHorizontal: 15,
    backgroundColor: "#fff4f6",
    borderRadius: 12,
    padding: 12,
  },
  stat: { flex: 1, alignItems: "center" },
  statNum: { fontSize: 18, fontWeight: "800", color: "#ff3f6c" },
  statLabel: { color: "#666", marginTop: 4 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    marginTop: 4,
  },
  menuItemLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  menuItemLabel: { fontSize: 16, color: "#3e3e3e" },
  menuHint: { fontSize: 12, color: "#888", marginTop: 2 },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ff3f6c",
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#ff3f6c",
    fontWeight: "bold",
  },
});
