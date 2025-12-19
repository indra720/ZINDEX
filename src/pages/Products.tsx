import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Filter,
  Grid3x3,
  SlidersHorizontal,
  Star,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Eye,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import ChatbotWidget from "@/components/ChatbotWidget";
import BackButton from "@/components/BackButton";

type Category = "fashion" | "groceries";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  hoverImage?: string;
  rating: number;
  reviews: number;
  category: Category;
  sizes?: string[];
  stock?: number;
  maxStock?: number;
  offer?: string;
}

const fashionProducts: Product[] = [
  {
    id: "F001",
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 49.99,
    image: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
    rating: 4.5,
    reviews: 234,
    category: "fashion",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "F002",
    name: "Denim Jacket",
    price: 79.99,
    image: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
    rating: 4.8,
    reviews: 567,
    category: "fashion",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "F003",
    name: "Casual Sneakers",
    price: 89.99,
    originalPrice: 120.0,
    image: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
    rating: 4.6,
    reviews: 432,
    category: "fashion",
    sizes: ["S", "M", "L", "XL"],
    offer: "25% OFF",
  },
  {
    id: "F004",
    name: "Summer Dress",
    price: 59.99,
    image: "/placeholder.svg",
    hoverImage: "/placeholder.svg",
    rating: 4.7,
    reviews: 321,
    category: "fashion",
    sizes: ["S", "M", "L", "XL"],
  },
];

const groceryProducts: Product[] = [
  {
    id: "G001",
    name: "Organic Bananas",
    price: 2.99,
    image: "/placeholder.svg",
    rating: 4.3,
    reviews: 156,
    category: "groceries",
    stock: 15,
    maxStock: 50,
    offer: "20% OFF",
  },
  {
    id: "G002",
    name: "Fresh Milk",
    price: 3.49,
    image: "/placeholder.svg",
    rating: 4.8,
    reviews: 432,
    category: "groceries",
    stock: 8,
    maxStock: 20,
  },
  {
    id: "G003",
    name: "Whole Wheat Bread",
    price: 2.49,
    originalPrice: 3.49,
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 234,
    category: "groceries",
    stock: 25,
    maxStock: 30,
    offer: "Buy 1 Get 1",
  },
  {
    id: "G004",
    name: "Farm Fresh Eggs",
    price: 4.99,
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 678,
    category: "groceries",
    stock: 12,
    maxStock: 40,
  },
];

const Products = () => {
  const [category, setCategory] = useState<Category>("fashion");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const products = category === "fashion" ? fashionProducts : groceryProducts;

  const updateQuantity = (productId: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + delta),
    }));
  };

  const addToCart = (product: Product) => {
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Category Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground py-12"
      >
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="mb-4">
            <BackButton className="[&_button]:bg-white/10 [&_button]:text-white [&_button]:border-white/20 [&_button:hover]:bg-white/20" />
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4 opacity-90">
            <span>Home</span>
            <ChevronRight className="h-4 w-4" />
            <span className="font-semibold capitalize">{category}</span>
          </div>

          {/* Title and Category Selector */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 capitalize">{category}</h1>
              <p className="text-primary-foreground/80">
                Discover our premium collection
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant={category === "fashion" ? "secondary" : "outline"}
                onClick={() => setCategory("fashion")}
                className={
                  category === "fashion"
                    ? ""
                    : "bg-white/10 text-white hover:bg-white/20"
                }
              >
                Fashion
              </Button>
              <Button
                variant={category === "groceries" ? "secondary" : "outline"}
                onClick={() => setCategory("groceries")}
                className={
                  category === "groceries"
                    ? ""
                    : "bg-white/10 text-white hover:bg-white/20"
                }
              >
                Groceries
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden lg:block w-64 flex-shrink-0"
          >
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={200}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Brand</h3>
                  <div className="space-y-2">
                    {["Nike", "Adidas", "Puma", "Zara"].map((brand) => (
                      <div key={brand} className="flex items-center gap-2">
                        <Checkbox id={brand} />
                        <label
                          htmlFor={brand}
                          className="text-sm cursor-pointer"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <Checkbox id={`rating-${rating}`} />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="text-sm cursor-pointer flex items-center gap-1"
                        >
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {rating}+ Stars
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Offers */}
                <div>
                  <h3 className="font-medium mb-3">Offers</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Checkbox id="discount" />
                      <label htmlFor="discount" className="text-sm cursor-pointer">
                        Discounted Items
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="bogo" />
                      <label htmlFor="bogo" className="text-sm cursor-pointer">
                        Buy 1 Get 1
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden fixed bottom-4 right-4 z-50">
            <Button
              size="lg"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full shadow-lg"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Mobile Filter Dropdown */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-40 overflow-y-auto"
              >
                <div className="container mx-auto px-4 py-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Filters</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Price Range
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-50">$0 - $50</SelectItem>
                          <SelectItem value="50-100">$50 - $100</SelectItem>
                          <SelectItem value="100-200">$100 - $200</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Brand
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nike">Nike</SelectItem>
                          <SelectItem value="adidas">Adidas</SelectItem>
                          <SelectItem value="puma">Puma</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Rating
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4+ Stars</SelectItem>
                          <SelectItem value="3">3+ Stars</SelectItem>
                          <SelectItem value="2">2+ Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {category === "fashion" ? (
                    <FashionProductCard
                      product={product}
                      onQuickView={setQuickViewProduct}
                      onAddToCart={addToCart}
                      selectedSize={selectedSize}
                      onSelectSize={setSelectedSize}
                    />
                  ) : (
                    <GroceryProductCard
                      product={product}
                      quantity={quantities[product.id] || 0}
                      onUpdateQuantity={(delta) =>
                        updateQuantity(product.id, delta)
                      }
                      onAddToCart={addToCart}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <Dialog
        open={!!quickViewProduct}
        onOpenChange={() => setQuickViewProduct(null)}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{quickViewProduct?.name}</DialogTitle>
          </DialogHeader>
          {quickViewProduct && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">
                      {quickViewProduct.rating}
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    ({quickViewProduct.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold">
                    ${quickViewProduct.price}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${quickViewProduct.originalPrice}
                    </span>
                  )}
                </div>

                {quickViewProduct.sizes && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Select Size</h3>
                    <div className="flex gap-2">
                      {quickViewProduct.sizes.map((size) => (
                        <Button
                          key={size}
                          variant={selectedSize === size ? "default" : "outline"}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    addToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

// Fashion Product Card Component
const FashionProductCard = ({
  product,
  onQuickView,
  onAddToCart,
  selectedSize,
  onSelectSize,
}: {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  selectedSize: string;
  onSelectSize: (size: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setIsFlipped(false);
      }}
    >
      <Card className="group overflow-hidden border-2 border-transparent hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.offer && (
            <Badge className="absolute top-2 left-2 z-10 bg-destructive">
              {product.offer}
            </Badge>
          )}

          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-full h-full"
          >
            <img
              src={isFlipped ? product.hoverImage : product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>

          {/* Hover Actions */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/95 to-transparent"
              >
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => onQuickView(product)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Quick View
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-base mb-2 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Size Selector */}
          {product.sizes && (
            <div className="flex gap-1 mb-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => onSelectSize(size)}
                  className={`px-2 py-1 text-xs border rounded transition-colors ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <Button className="w-full" onClick={() => onAddToCart(product)}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Grocery Product Card Component
const GroceryProductCard = ({
  product,
  quantity,
  onUpdateQuantity,
  onAddToCart,
}: {
  product: Product;
  quantity: number;
  onUpdateQuantity: (delta: number) => void;
  onAddToCart: (product: Product) => void;
}) => {
  const stockPercentage = product.stock && product.maxStock 
    ? (product.stock / product.maxStock) * 100 
    : 100;

  return (
    <motion.div whileHover={{ y: -8 }}>
      <Card className="group overflow-hidden border-2 border-transparent hover:border-secondary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {product.offer && (
            <Badge className="absolute top-2 left-2 z-10 bg-secondary">
              {product.offer}
            </Badge>
          )}

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <CardContent className="p-4">
          <h3 className="font-semibold text-base mb-2 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Stock Progress Bar */}
          {product.stock !== undefined && product.maxStock && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Stock</span>
                <span>{product.stock} left</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${stockPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full ${
                    stockPercentage > 50
                      ? "bg-green-500"
                      : stockPercentage > 20
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                />
              </div>
            </div>
          )}

          {/* Quantity Control */}
          {quantity > 0 ? (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateQuantity(-1)}
                className="flex-shrink-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="flex-1 text-center font-semibold">{quantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateQuantity(1)}
                className="flex-shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={() => onAddToCart(product)}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Products;
