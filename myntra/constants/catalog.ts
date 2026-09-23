export type Gender = "Men" | "Women" | "Kids";

export type Product = {
  id: string;
  name: string;
  brand: string;
  price: number;
  discount: string;
  description: string;
  sizes: string[];
  images: string[];
  gender: Gender;
  collection: string;
};

export const GENDERS: { key: Gender; image: string; subtitle: string }[] = [
  {
    key: "Men",
    subtitle: "Shirts, jeans & more",
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&auto=format&fit=crop",
  },
  {
    key: "Women",
    subtitle: "Kurtis, dresses & ethnic",
    image:
      "https://images.unsplash.com/photo-1618244972963-dbad0c4abf18?w=800&auto=format&fit=crop",
  },
  {
    key: "Kids",
    subtitle: "Boys, girls & infants",
    image:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop",
  },
];

export const COLLECTIONS: Record<Gender, { name: string; image: string }[]> = {
  Men: [
    {
      name: "T-Shirts",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
    },
    {
      name: "Shirts",
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop",
    },
    {
      name: "Jeans",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop",
    },
    {
      name: "Ethnic Wear",
      image:
        "https://images.unsplash.com/photo-1597983073493-321c2bdfe0c3?w=500&auto=format&fit=crop",
    },
    {
      name: "Footwear",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop",
    },
  ],
  Women: [
    {
      name: "Ethnic Wear",
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop",
    },
    {
      name: "Kurtis",
      image:
        "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop",
    },
    {
      name: "Dresses",
      image:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop",
    },
    {
      name: "Western Wear",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop",
    },
    {
      name: "Footwear",
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop",
    },
  ],
  Kids: [
    {
      name: "Boys Clothing",
      image:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&auto=format&fit=crop",
    },
    {
      name: "Girls Clothing",
      image:
        "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=500&auto=format&fit=crop",
    },
    {
      name: "Infants",
      image:
        "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=500&auto=format&fit=crop",
    },
    {
      name: "Footwear",
      image:
        "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=500&auto=format&fit=crop",
    },
  ],
};

export const PRODUCTS: Product[] = [
  {
    id: "m1",
    name: "Casual White T-Shirt",
    brand: "Roadster",
    price: 499,
    discount: "60% OFF",
    description:
      "Classic white t-shirt in premium cotton. Regular fit, perfect for everyday wear.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop",
    ],
    gender: "Men",
    collection: "T-Shirts",
  },
  {
    id: "m2",
    name: "Slim Fit Checked Shirt",
    brand: "Highlander",
    price: 899,
    discount: "45% OFF",
    description: "Cotton checked casual shirt with a slim fit and full sleeves.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop",
    ],
    gender: "Men",
    collection: "Shirts",
  },
  {
    id: "m3",
    name: "Blue Slim Jeans",
    brand: "Levis",
    price: 1899,
    discount: "35% OFF",
    description: "Stretch denim jeans with a modern slim silhouette.",
    sizes: ["30", "32", "34", "36"],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop",
    ],
    gender: "Men",
    collection: "Jeans",
  },
  {
    id: "m4",
    name: "Festive Kurta Set",
    brand: "Manyavar",
    price: 2499,
    discount: "40% OFF",
    description: "Embroidered kurta with pyjama. Ideal for weddings and festivals.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1597983073493-321c2bdfe0c3?w=800&auto=format&fit=crop",
    ],
    gender: "Men",
    collection: "Ethnic Wear",
  },
  {
    id: "m5",
    name: "Classic Sneakers",
    brand: "Nike",
    price: 3499,
    discount: "30% OFF",
    description: "Lightweight sneakers for daily wear and light workouts.",
    sizes: ["UK6", "UK7", "UK8", "UK9", "UK10"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop",
    ],
    gender: "Men",
    collection: "Footwear",
  },
  {
    id: "m6",
    name: "Denim Jacket",
    brand: "Levis",
    price: 2499,
    discount: "40% OFF",
    description: "Classic denim jacket with a comfortable regular fit.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=800&auto=format&fit=crop",
    ],
    gender: "Men",
    collection: "Jeans",
  },
  {
    id: "w1",
    name: "Floral Summer Dress",
    brand: "ONLY",
    price: 1299,
    discount: "50% OFF",
    description: "Flowy summer dress in lightweight fabric with a flattering cut.",
    sizes: ["XS", "S", "M", "L"],
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop",
    ],
    gender: "Women",
    collection: "Dresses",
  },
  {
    id: "w2",
    name: "Embroidered Kurti",
    brand: "Libas",
    price: 999,
    discount: "55% OFF",
    description: "Cotton kurti with thread embroidery. Pair with palazzos or jeans.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop",
    ],
    gender: "Women",
    collection: "Kurtis",
  },
  {
    id: "w3",
    name: "Banarasi Silk Saree",
    brand: "Soch",
    price: 3299,
    discount: "42% OFF",
    description: "Festive silk saree with zari border. Includes an unstitched blouse.",
    sizes: ["Free Size"],
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop",
    ],
    gender: "Women",
    collection: "Ethnic Wear",
  },
  {
    id: "w4",
    name: "High-Rise Skinny Jeans",
    brand: "Levis",
    price: 1699,
    discount: "38% OFF",
    description: "Stretch skinny jeans with a high-rise waist.",
    sizes: ["26", "28", "30", "32"],
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop",
    ],
    gender: "Women",
    collection: "Western Wear",
  },
  {
    id: "w5",
    name: "Block Heel Sandals",
    brand: "Inc.5",
    price: 1199,
    discount: "48% OFF",
    description: "Comfortable block heels for office and evening wear.",
    sizes: ["UK4", "UK5", "UK6", "UK7"],
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop",
    ],
    gender: "Women",
    collection: "Footwear",
  },
  {
    id: "w6",
    name: "Anarkali Suit Set",
    brand: "Biba",
    price: 2199,
    discount: "50% OFF",
    description: "Printed Anarkali with dupatta. Festive ethnic set.",
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1583391733981-5e9412ae1453?w=800&auto=format&fit=crop",
    ],
    gender: "Women",
    collection: "Ethnic Wear",
  },
  {
    id: "k1",
    name: "Boys Graphic Tee",
    brand: "H&M Kids",
    price: 399,
    discount: "40% OFF",
    description: "Soft cotton graphic t-shirt for everyday play.",
    sizes: ["3-4Y", "5-6Y", "7-8Y", "9-10Y"],
    images: [
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&auto=format&fit=crop",
    ],
    gender: "Kids",
    collection: "Boys Clothing",
  },
  {
    id: "k2",
    name: "Girls Party Frock",
    brand: "Babyhug",
    price: 799,
    discount: "45% OFF",
    description: "Net frock with bow detail for birthdays and celebrations.",
    sizes: ["2-3Y", "3-4Y", "5-6Y", "7-8Y"],
    images: [
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=800&auto=format&fit=crop",
    ],
    gender: "Kids",
    collection: "Girls Clothing",
  },
  {
    id: "k3",
    name: "Infant Romper Set",
    brand: "Carter's",
    price: 599,
    discount: "35% OFF",
    description: "Gentle cotton romper pack for newborns and infants.",
    sizes: ["0-3M", "3-6M", "6-9M", "9-12M"],
    images: [
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&auto=format&fit=crop",
    ],
    gender: "Kids",
    collection: "Infants",
  },
  {
    id: "k4",
    name: "Kids Velcro Sneakers",
    brand: "Campus",
    price: 899,
    discount: "30% OFF",
    description: "Easy velcro sneakers for school and play.",
    sizes: ["UK8C", "UK9C", "UK10C", "UK11C"],
    images: [
      "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&auto=format&fit=crop",
    ],
    gender: "Kids",
    collection: "Footwear",
  },
];

export const getProductById = (id: string) =>
  PRODUCTS.find((item) => item.id === String(id));

export const getProductsByGender = (gender: Gender) =>
  PRODUCTS.filter((item) => item.gender === gender);

export const getProductsByCollection = (gender: Gender, collection: string) =>
  PRODUCTS.filter(
    (item) => item.gender === gender && item.collection === collection
  );
