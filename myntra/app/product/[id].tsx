import { getProductById } from "@/constants/catalog";
import { useShop } from "@/context/ShopContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Heart, Share2, ShoppingBag } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedSize, setSelectedSize] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { addToBag, toggleLike, isLiked } = useShop();
  const product = getProductById(String(id));

  if (!product) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const liked = isLiked(product.id);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${product.brand} ${product.name} for ₹${product.price} on Myntra. ${product.discount}`,
      });
    } catch {
      Alert.alert("Share", "Could not share this product");
    }
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      Alert.alert("Select size", "Please choose a size before adding to cart");
      return;
    }
    addToBag(product.id, selectedSize);
    Alert.alert("Added to cart", `${product.name} (${selectedSize}) is in your bag`, [
      { text: "Continue" },
      { text: "Go to bag", onPress: () => router.push("/bag") },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.carouselContainer}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setCurrentImageIndex(index);
            }}
            scrollEventThrottle={16}
          >
            {product.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={[styles.productImage, { width }]}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentImageIndex === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.brand}>{product.brand}</Text>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.meta}>
                {product.gender} · {product.collection}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => toggleLike(product.id)}
              >
                <Heart
                  size={22}
                  color={liked ? "#ff3f6c" : "#888"}
                  fill={liked ? "#ff3f6c" : "none"}
                />
                <Text style={styles.iconLabel}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} onPress={handleShare}>
                <Share2 size={22} color="#3e3e3e" />
                <Text style={styles.iconLabel}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price}</Text>
            <Text style={styles.discount}>{product.discount}</Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.sizeSection}>
            <Text style={styles.sizeTitle}>Select Size</Text>
            <View style={styles.sizeGrid}>
              {product.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSize,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addToBagButton} onPress={handleAddToBag}>
          <ShoppingBag size={20} color="#fff" />
          <Text style={styles.addToBagText}>ADD TO CART</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  carouselContainer: { position: "relative" },
  productImage: { height: 400 },
  pagination: {
    position: "absolute",
    bottom: 16,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: { backgroundColor: "#fff", width: 10, height: 10 },
  content: { padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between" },
  brand: { fontSize: 16, color: "#666", marginBottom: 5 },
  name: { fontSize: 20, fontWeight: "bold", color: "#3e3e3e" },
  meta: { marginTop: 4, color: "#888" },
  actions: { flexDirection: "row", gap: 8 },
  iconBtn: { alignItems: "center", padding: 8 },
  iconLabel: { fontSize: 11, marginTop: 4, color: "#666" },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  price: { fontSize: 20, fontWeight: "bold", marginRight: 10 },
  discount: { fontSize: 16, color: "#ff3f6c" },
  description: { fontSize: 16, color: "#666", lineHeight: 24, marginBottom: 20 },
  sizeSection: { marginBottom: 20 },
  sizeTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  sizeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  sizeButton: {
    minWidth: 60,
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedSize: { borderColor: "#ff3f6c", backgroundColor: "#fff4f4" },
  sizeText: { fontSize: 14, color: "#3e3e3e" },
  selectedSizeText: { color: "#ff3f6c" },
  footer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  addToBagButton: {
    backgroundColor: "#ff3f6c",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    gap: 10,
  },
  addToBagText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
