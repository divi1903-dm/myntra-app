import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProductById, Product } from "@/constants/catalog";
import { getStore, setStore } from "@/utils/storage";
import { useAuth } from "@/context/AuthContext";

export type BagItem = {
  id: string;
  productId: string;
  size: string;
  quantity: number;
};

export type Order = {
  id: string;
  date: string;
  status: string;
  items: {
    productId: string;
    name: string;
    brand: string;
    image: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  shippingAddress: string;
  paymentMethod: string;
};

type ShopContextType = {
  bag: BagItem[];
  wishlist: string[];
  orders: Order[];
  addToBag: (productId: string, size: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromBag: (itemId: string) => void;
  toggleLike: (productId: string) => void;
  isLiked: (productId: string) => boolean;
  placeOrder: (shippingAddress: string) => Order;
  bagTotal: number;
  bagProducts: (BagItem & { product: Product })[];
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [bag, setBag] = useState<BagItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const keyFor = (suffix: string) =>
    user ? `shop_${user._id}_${suffix}` : null;

  useEffect(() => {
    (async () => {
      if (!user) {
        setBag([]);
        setWishlist([]);
        setOrders([]);
        return;
      }
      const bagRaw = await getStore(keyFor("bag")!);
      const wishRaw = await getStore(keyFor("wishlist")!);
      const orderRaw = await getStore(keyFor("orders")!);
      setBag(bagRaw ? JSON.parse(bagRaw) : []);
      setWishlist(wishRaw ? JSON.parse(wishRaw) : []);
      setOrders(orderRaw ? JSON.parse(orderRaw) : []);
    })();
  }, [user?._id]);

  const persist = async (
    nextBag: BagItem[],
    nextWish: string[],
    nextOrders: Order[]
  ) => {
    if (!user) return;
    await setStore(keyFor("bag")!, JSON.stringify(nextBag));
    await setStore(keyFor("wishlist")!, JSON.stringify(nextWish));
    await setStore(keyFor("orders")!, JSON.stringify(nextOrders));
  };

  const addToBag = (productId: string, size: string) => {
    const existing = bag.find(
      (item) => item.productId === productId && item.size === size
    );
    const next = existing
      ? bag.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [
          ...bag,
          {
            id: `${productId}-${size}-${Date.now()}`,
            productId,
            size,
            quantity: 1,
          },
        ];
    setBag(next);
    persist(next, wishlist, orders);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    const next =
      quantity < 1
        ? bag.filter((item) => item.id !== itemId)
        : bag.map((item) => (item.id === itemId ? { ...item, quantity } : item));
    setBag(next);
    persist(next, wishlist, orders);
  };

  const removeFromBag = (itemId: string) => {
    const next = bag.filter((item) => item.id !== itemId);
    setBag(next);
    persist(next, wishlist, orders);
  };

  const toggleLike = (productId: string) => {
    const next = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];
    setWishlist(next);
    persist(bag, next, orders);
  };

  const isLiked = (productId: string) => wishlist.includes(productId);

  const placeOrder = (shippingAddress: string) => {
    const items = bag
      .map((item) => {
        const product = getProductById(item.productId);
        if (!product) return null;
        return {
          productId: product.id,
          name: product.name,
          brand: product.brand,
          image: product.images[0],
          size: item.size,
          price: product.price,
          quantity: item.quantity,
        };
      })
      .filter(Boolean) as Order["items"];

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const order: Order = {
      id: `ORD${Date.now()}`,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Confirmed",
      items,
      total,
      shippingAddress,
      paymentMethod: "Cash on Delivery",
    };
    const nextBag: BagItem[] = [];
    const nextOrders = [order, ...orders];
    setBag(nextBag);
    setOrders(nextOrders);
    persist(nextBag, wishlist, nextOrders);
    return order;
  };

  const bagProducts = useMemo(
    () =>
      bag
        .map((item) => {
          const product = getProductById(item.productId);
          return product ? { ...item, product } : null;
        })
        .filter(Boolean) as (BagItem & { product: Product })[],
    [bag]
  );

  const bagTotal = bagProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <ShopContext.Provider
      value={{
        bag,
        wishlist,
        orders,
        addToBag,
        updateQuantity,
        removeFromBag,
        toggleLike,
        isLiked,
        placeOrder,
        bagTotal,
        bagProducts,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext)!;
