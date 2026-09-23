import {
  COLLECTIONS,
  Gender,
  GENDERS,
  getProductsByCollection,
  getProductsByGender,
} from "@/constants/catalog";
import { useRouter } from "expo-router";
import { Search, X } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function CategoriesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [gender, setGender] = useState<Gender>("Men");
  const [collection, setCollection] = useState<string | null>(null);

  const products = useMemo(() => {
    const base = collection
      ? getProductsByCollection(gender, collection)
      : getProductsByGender(gender);
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.collection.toLowerCase().includes(q)
    );
  }, [gender, collection, searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fashion</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Men, Women, Kids collections"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <X size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.genderTabs}>
        {GENDERS.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[styles.tab, gender === item.key && styles.tabActive]}
            onPress={() => {
              setGender(item.key);
              setCollection(null);
            }}
          >
            <Text
              style={[
                styles.tabText,
                gender === item.key && styles.tabTextActive,
              ]}
            >
              {item.key}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionLabel}>Collections</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.collectionRow}
        >
          <TouchableOpacity
            style={[styles.chip, !collection && styles.chipActive]}
            onPress={() => setCollection(null)}
          >
            <Text style={[styles.chipText, !collection && styles.chipTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          {COLLECTIONS[gender].map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.chip,
                collection === item.name && styles.chipActive,
              ]}
              onPress={() => setCollection(item.name)}
            >
              <Text
                style={[
                  styles.chipText,
                  collection === item.name && styles.chipTextActive,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.productsGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/product/${product.id}`)}
            >
              <Image
                source={{ uri: product.images[0] }}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.brandName}>{product.brand}</Text>
                <Text numberOfLines={1} style={styles.productName}>
                  {product.name}
                </Text>
                <View style={styles.priceRow}>
                  <Text style={styles.price}>₹{product.price}</Text>
                  <Text style={styles.discount}>{product.discount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
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
  searchContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 10,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 10, color: "#3e3e3e" },
  genderTabs: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingTop: 12,
    gap: 8,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  tabActive: { backgroundColor: "#ff3f6c" },
  tabText: { fontWeight: "700", color: "#3e3e3e" },
  tabTextActive: { color: "#fff" },
  content: { flex: 1, padding: 15 },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
    color: "#3e3e3e",
  },
  collectionRow: { paddingBottom: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
  },
  chipActive: { backgroundColor: "#ff3f6c" },
  chipText: { color: "#3e3e3e", fontWeight: "600" },
  chipTextActive: { color: "#fff" },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  productCard: {
    width: "48%",
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
  productImage: { width: "100%", height: 180 },
  productInfo: { padding: 10 },
  brandName: { fontSize: 13, color: "#666" },
  productName: { fontSize: 15, color: "#3e3e3e", marginVertical: 4 },
  priceRow: { flexDirection: "row", alignItems: "center" },
  price: { fontSize: 16, fontWeight: "bold", marginRight: 8 },
  discount: { fontSize: 13, color: "#ff3f6c" },
});
