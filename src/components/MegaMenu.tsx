import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown, Sofa, Frame, Lamp, ShoppingBasket, Shirt, Smartphone, Plug, BookOpen, Dumbbell, Sparkles, Home as HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Mega Menu Data for all categories
const megaMenuData: Record<string, MegaMenuCategory> = {
  "Home & Living": {
    columns: [
      {
        title: "Furniture",
        icon: Sofa,
        items: ["Sofas & Sectionals", "Beds & Headboards", "Dining Tables & Chairs", "Wardrobes", "TV Units", "Coffee Tables"],
      },
      {
        title: "Home Décor",
        icon: Frame,
        items: ["Wall Art & Paintings", "Mirrors", "Clocks", "Vases", "Photo Frames", "Artificial Plants"],
      },
      {
        title: "Home Furnishing",
        icon: HomeIcon,
        items: ["Curtains & Drapes", "Bedsheets", "Cushions & Covers", "Rugs & Carpets", "Throws & Blankets"],
      },
      {
        title: "Lighting",
        icon: Lamp,
        items: ["Ceiling Lights", "Table Lamps", "Floor Lamps", "Wall Lights", "Smart Lighting"],
      },
      {
        title: "Daily Essentials",
        subtitle: "Groceries",
        icon: ShoppingBasket,
        isSubtle: true,
        items: ["Rice, Atta & Grains", "Pulses & Dal", "Cooking Oil & Ghee", "Spices & Masala", "Tea, Coffee & Sugar", "Cleaning & Kitchen Essentials"],
      },
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&h=300&fit=crop",
      headline: "Upgrade Your Home",
      subtext: "Upto 40% Off",
      cta: "Shop Now",
      link: "/products?category=home",
    },
  },
  "Electronics": {
    columns: [
      {
        title: "Mobiles",
        icon: Smartphone,
        items: ["Smartphones", "Feature Phones", "Mobile Accessories", "Power Banks", "Headphones", "Smartwatches"],
      },
      {
        title: "Laptops & Computers",
        icon: Smartphone,
        items: ["Laptops", "Desktop PCs", "Gaming Laptops", "Monitors", "Printers", "Computer Accessories"],
      },
      {
        title: "Audio & Video",
        icon: Smartphone,
        items: ["Bluetooth Speakers", "Soundbars", "Home Theatre", "Headphones", "Earbuds", "Microphones"],
      },
      {
        title: "Cameras",
        icon: Smartphone,
        items: ["DSLR Cameras", "Mirrorless", "Action Cameras", "Camera Lenses", "Tripods", "Memory Cards"],
      },
      {
        title: "Gaming",
        icon: Smartphone,
        items: ["Gaming Consoles", "Gaming Accessories", "VR Headsets", "Gaming Chairs", "Controllers"],
      },
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=300&fit=crop",
      headline: "Tech Fest Sale",
      subtext: "Up to 50% Off",
      cta: "Shop Now",
      link: "/products?category=electronics",
    },
  },
  "Fashion": {
    columns: [
      {
        title: "Men's Clothing",
        icon: Shirt,
        items: ["T-Shirts", "Shirts", "Jeans", "Trousers", "Jackets", "Ethnic Wear"],
      },
      {
        title: "Women's Clothing",
        icon: Shirt,
        items: ["Dresses", "Tops", "Sarees", "Kurtis", "Jeans", "Ethnic Wear"],
      },
      {
        title: "Footwear",
        icon: Shirt,
        items: ["Sneakers", "Formal Shoes", "Sandals", "Heels", "Sports Shoes", "Loafers"],
      },
      {
        title: "Accessories",
        icon: Shirt,
        items: ["Watches", "Sunglasses", "Belts", "Wallets", "Bags", "Jewelry"],
      },
      {
        title: "Kids Fashion",
        icon: Shirt,
        items: ["Boys Clothing", "Girls Clothing", "Kids Footwear", "School Uniforms", "Party Wear"],
      },
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      headline: "Fashion Week",
      subtext: "Min 30% Off",
      cta: "Shop Now",
      link: "/products?category=fashion",
    },
  },
  "Groceries": {
    columns: [
      {
        title: "Staples",
        icon: ShoppingBasket,
        items: ["Rice & Rice Products", "Atta & Flour", "Dal & Pulses", "Oil & Ghee", "Masala & Spices", "Salt & Sugar"],
      },
      {
        title: "Beverages",
        icon: ShoppingBasket,
        items: ["Tea", "Coffee", "Health Drinks", "Juices", "Soft Drinks", "Water"],
      },
      {
        title: "Snacks",
        icon: ShoppingBasket,
        items: ["Biscuits & Cookies", "Chips & Namkeen", "Chocolates", "Sweets", "Dry Fruits", "Breakfast Cereals"],
      },
      {
        title: "Dairy & Eggs",
        icon: ShoppingBasket,
        items: ["Milk", "Curd & Yogurt", "Butter & Cheese", "Paneer", "Eggs", "Cream"],
      },
      {
        title: "Household",
        icon: ShoppingBasket,
        items: ["Detergents", "Dishwash", "Cleaners", "Fresheners", "Tissues & Wipes", "Kitchen Accessories"],
      },
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      headline: "Fresh Groceries",
      subtext: "Free Delivery",
      cta: "Order Now",
      link: "/products?category=groceries",
    },
  },
  "Appliances": {
    columns: [
      {
        title: "Kitchen Appliances",
        icon: Plug,
        items: ["Mixer Grinders", "Microwave Ovens", "Air Fryers", "Electric Kettles", "Toasters", "Induction Cooktops"],
      },
      {
        title: "Large Appliances",
        icon: Plug,
        items: ["Refrigerators", "Washing Machines", "Air Conditioners", "Dishwashers", "Geysers", "Chimneys"],
      },
      {
        title: "Home Appliances",
        icon: Plug,
        items: ["Vacuum Cleaners", "Air Purifiers", "Fans", "Room Heaters", "Iron", "Sewing Machines"],
      },
      {
        title: "Personal Care",
        icon: Plug,
        items: ["Trimmers", "Shavers", "Hair Dryers", "Straighteners", "Massagers", "BP Monitors"],
      },
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      headline: "Appliance Sale",
      subtext: "Up to 45% Off",
      cta: "Shop Now",
      link: "/products?category=appliances",
    },
  },
  "Books": {
    columns: [
      {
        title: "Fiction",
        icon: BookOpen,
        items: ["Thriller & Mystery", "Romance", "Science Fiction", "Fantasy", "Historical Fiction", "Literary Fiction"],
      },
      {
        title: "Non-Fiction",
        icon: BookOpen,
        items: ["Biography", "Self-Help", "Business", "History", "Science", "Philosophy"],
      },
      {
        title: "Academic",
        icon: BookOpen,
        items: ["School Books", "Competitive Exams", "Engineering", "Medical", "Law", "Management"],
      },
      {
        title: "Children's Books",
        icon: BookOpen,
        items: ["Picture Books", "Story Books", "Activity Books", "Comics", "Educational", "Fairy Tales"],
      },
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
      headline: "Book Fair",
      subtext: "Buy 2 Get 1 Free",
      cta: "Browse Now",
      link: "/products?category=books",
    },
  },
  "Sports": {
    columns: [
      {
        title: "Fitness",
        icon: Dumbbell,
        items: ["Dumbbells", "Treadmills", "Exercise Bikes", "Yoga Mats", "Resistance Bands", "Gym Accessories"],
      },
      {
        title: "Team Sports",
        icon: Dumbbell,
        items: ["Cricket", "Football", "Basketball", "Volleyball", "Badminton", "Tennis"],
      },
      {
        title: "Outdoor Sports",
        icon: Dumbbell,
        items: ["Cycling", "Swimming", "Camping", "Hiking", "Fishing", "Skating"],
      },
      {
        title: "Sports Wear",
        icon: Dumbbell,
        items: ["Sports Shoes", "Track Pants", "T-Shirts", "Shorts", "Sports Bras", "Accessories"],
      },
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
      headline: "Fitness Goals",
      subtext: "Flat 25% Off",
      cta: "Shop Now",
      link: "/products?category=sports",
    },
  },
  "Beauty": {
    columns: [
      {
        title: "Makeup",
        icon: Sparkles,
        items: ["Lipsticks", "Foundations", "Eye Makeup", "Face Makeup", "Nail Polish", "Makeup Kits"],
      },
      {
        title: "Skincare",
        icon: Sparkles,
        items: ["Moisturizers", "Serums", "Sunscreens", "Face Wash", "Face Masks", "Toners"],
      },
      {
        title: "Haircare",
        icon: Sparkles,
        items: ["Shampoos", "Conditioners", "Hair Oil", "Hair Color", "Hair Styling", "Hair Treatment"],
      },
      {
        title: "Fragrances",
        icon: Sparkles,
        items: ["Perfumes", "Deodorants", "Body Mists", "Attars", "Gift Sets"],
      },
      {
        title: "Men's Grooming",
        icon: Sparkles,
        items: ["Beard Care", "Shaving", "Face Care", "Body Care", "Hair Care"],
      },
    ],
    promo: {
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      headline: "Beauty Bonanza",
      subtext: "Up to 60% Off",
      cta: "Shop Now",
      link: "/products?category=beauty",
    },
  },
};

interface MegaMenuColumn {
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  isSubtle?: boolean;
  items: string[];
}

interface MegaMenuPromo {
  image: string;
  headline: string;
  subtext: string;
  cta: string;
  link: string;
}

interface MegaMenuCategory {
  columns: MegaMenuColumn[];
  promo: MegaMenuPromo;
}

interface MegaMenuProps {
  category: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu = ({ category, isOpen, onClose }: MegaMenuProps) => {
  const menuData = megaMenuData[category];

  if (!menuData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 right-0 top-full w-full bg-card shadow-2xl rounded-b-2xl border-t border-border z-50"
          onMouseLeave={onClose}
        >
          <div className="container mx-auto px-6 py-8">
            <div className="flex gap-8">
              {/* Menu Columns */}
              <div className="flex-1 grid grid-cols-5 gap-6">
                {menuData.columns.map((column, idx) => (
                  <motion.div
                    key={column.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={column.isSubtle ? "opacity-80" : ""}
                  >
                    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
                      <column.icon className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                          {column.title}
                        </h3>
                        {column.subtitle && (
                          <span className="text-xs text-muted-foreground">({column.subtitle})</span>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {column.items.map((item) => (
                        <li key={item}>
                          <Link
                            to={`/products?search=${encodeURIComponent(item)}`}
                            className="group flex items-center text-sm text-muted-foreground hover:text-primary transition-all duration-200"
                            onClick={onClose}
                          >
                            <ChevronRight className="h-3 w-3 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                            <span className="group-hover:underline underline-offset-2">{item}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              {/* Promo Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="w-72 flex-shrink-0"
              >
                <div className="relative rounded-xl overflow-hidden group cursor-pointer h-full">
                  <img
                    src={menuData.promo.image}
                    alt={menuData.promo.headline}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-card">
                    <h4 className="text-2xl font-bold mb-1">{menuData.promo.headline}</h4>
                    <p className="text-lg font-medium text-secondary mb-4">{menuData.promo.subtext}</p>
                    <Link
                      to={menuData.promo.link}
                      onClick={onClose}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-colors"
                    >
                      {menuData.promo.cta}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Mobile Accordion Menu
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMegaMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedColumn, setExpandedColumn] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
    setExpandedColumn(null);
  };

  const toggleColumn = (column: string) => {
    setExpandedColumn(expandedColumn === column ? null : column);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-card z-50 overflow-y-auto"
          >
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Categories</h2>
            </div>

            <div className="divide-y divide-border">
              {Object.entries(megaMenuData).map(([categoryName, data]) => (
                <div key={categoryName}>
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(categoryName)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-foreground">{categoryName}</span>
                    <motion.div
                      animate={{ rotate: expandedCategory === categoryName ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  </button>

                  {/* Category Content */}
                  <AnimatePresence>
                    {expandedCategory === categoryName && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden bg-muted/30"
                      >
                        {data.columns.map((column) => (
                          <div key={column.title}>
                            {/* Column Header */}
                            <button
                              onClick={() => toggleColumn(column.title)}
                              className="w-full flex items-center justify-between p-3 pl-6 hover:bg-muted/50 transition-colors"
                            >
                              <span className="text-sm font-medium text-foreground">{column.title}</span>
                              <motion.div
                                animate={{ rotate: expandedColumn === column.title ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                              </motion.div>
                            </button>

                            {/* Column Items */}
                            <AnimatePresence>
                              {expandedColumn === column.title && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <ul className="py-2 pl-10 pr-4 space-y-2">
                                    {column.items.map((item) => (
                                      <li key={item}>
                                        <Link
                                          to={`/products?search=${encodeURIComponent(item)}`}
                                          onClick={onClose}
                                          className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                                        >
                                          {item}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}

                        {/* Promo Banner */}
                        <div className="p-4">
                          <Link
                            to={data.promo.link}
                            onClick={onClose}
                            className="block relative rounded-lg overflow-hidden"
                          >
                            <img
                              src={data.promo.image}
                              alt={data.promo.headline}
                              className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 text-card">
                              <p className="font-bold">{data.promo.headline}</p>
                              <p className="text-sm text-secondary">{data.promo.subtext}</p>
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export { megaMenuData };
