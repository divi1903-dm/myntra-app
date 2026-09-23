import {
  COLLECTIONS,
  Gender,
  GENDERS,
  getProductsByCollection,
  getProductsByGender,
  PRODUCTS,
} from "@/constants/catalog";
import { useShop } from "@/context/ShopContext";
import { useRouter } from "expo-router";
import { Heart, Search } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const { isLiked, toggleLike } = useShop();
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;
  const [gender, setGender] = useState<Gender>("Women");
  const [collection, setCollection] = useState<string | null>(null);

  const products = useMemo(() => {
    if (collection) return getProductsByCollection(gender, collection);
    return getProductsByGender(gender);
  }, [gender, collection]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>MYNTRA</Text>
          <Text style={styles.tagline}>Fashion like Meesho</Text>
        </View>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => router.push("/categories")}
        >
          <Search size={22} color="#3e3e3e" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genderRow}
      >
        {GENDERS.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.genderChip,
              gender === item.key && styles.genderChipActive,
            ]}
            onPress={() => {
              setGender(item.key);
              setCollection(null);
            }}
          >
            <Text
              style={[
                styles.genderText,
                gender === item.key && styles.genderTextActive,
              ]}
            >
              {item.key}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.heroWrap}>
        {GENDERS.filter((item) => item.key === gender).map((item) => (
          <Image
            key={item.key}
            source={{ uri: item.image }}
            style={styles.banner}
          />
        ))}
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>{gender} Fashion</Text>
          <Text style={styles.heroSub}>
            {GENDERS.find((item) => item.key === gender)?.subtitle}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>COLLECTIONS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {COLLECTIONS[gender].map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.collectionCard,
                collection === item.name && styles.collectionActive,
              ]}
              onPress={() =>
                setCollection(collection === item.name ? null : item.name)
              }
            >
              <Image
                source={{ uri: item.image }}
                style={styles.collectionImage}
              />
              <Text style={styles.collectionName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {collection ? collection.toUpperCase() : "TRENDING NOW"}
          </Text>
          <Text style={styles.count}>{products.length} items</Text>
        </View>
        <View
          style={[
           styles.productsGrid,
            isWeb && styles.productsGridWeb,
           ]}
          >
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/product/${product.id}`)}
            >
              <View>
                <Image
                  source={{ uri: product.images[0] }}
                  style={styles.productImage}
                />
                <TouchableOpacity
                  style={styles.likeFab}
                  onPress={() => toggleLike(product.id)}
                >
                  <Heart
                    size={16}
                    color={isLiked(product.id) ? "#ff3f6c" : "#666"}
                    fill={isLiked(product.id) ? "#ff3f6c" : "none"}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.brandName}>{product.brand}</Text>
                <Text numberOfLines={1} style={styles.productName}>
                  {product.name}
                </Text>
                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>₹{product.price}</Text>
                  <Text style={styles.discount}>{product.discount}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        {!collection ? (
          <Text style={styles.hint}>
            Showing {gender} fashion · {PRODUCTS.length} styles in store
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff7f9",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff3f6c",
  },
  tagline: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },
  searchButton: {
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  genderRow: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: "#fff",
  },
  genderChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 8,
  },
  genderChipActive: {
    backgroundColor: "#ff3f6c",
  },
  genderText: {
    fontWeight: "700",
    color: "#3e3e3e",
  },
  genderTextActive: {
    color: "#fff",
  },
  heroWrap: {
    position: "relative",
  },
  banner: {
    width: "100%",
    height: 180,
  },
  heroOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
  },
  heroSub: {
    color: "#fff",
    marginTop: 4,
  },
  section: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#3e3e3e",
    marginBottom: 12,
  },
  count: {
    color: "#888",
    marginBottom: 12,
  },
  collectionCard: {
    width: 110,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "transparent",
  },
  collectionActive: {
    borderColor: "#ff3f6c",
  },
  collectionImage: {
    width: 110,
    height: 90,
  },
  collectionName: {
    textAlign: "center",
    paddingVertical: 8,
    fontSize: 12,
    fontWeight: "600",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },
  productsGridWeb: {
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  productCard: {
    width: "48%",
    marginHorizontal: "1%",
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: "100%",
    height: 190,
  },
  likeFab: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 6,
  },
  productInfo: {
    padding: 10,
  },
  brandName: {
    fontSize: 12,
    color: "#666",
  },
  productName: {
    fontSize: 14,
    marginTop: 2,
    color: "#3e3e3e",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 8,
  },
  discount: {
    fontSize: 12,
    color: "#ff3f6c",
    fontWeight: "600",
  },
  hint: {
    textAlign: "center",
    color: "#999",
    marginTop: 8,
  },
});
