import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Share2,
  Star,
  ShoppingCart,
  ZoomIn,
  RotateCw,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Product360View from "@/components/Product360View";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import BackButton from "@/components/BackButton";

const mockProduct = {
  id: 1,
  name: "Premium Cotton T-Shirt",
  price: 29.99,
  originalPrice: 49.99,
  rating: 4.5,
  reviews: 234,
  description:
    "Experience ultimate comfort with our premium cotton t-shirt. Made from 100% organic cotton, this t-shirt offers a perfect blend of style and comfort. The fabric is breathable, soft, and durable, making it ideal for everyday wear.",
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Navy", hex: "#1E3A8A" },
    { name: "Gray", hex: "#6B7280" },
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  stock: 45,
  features: [
    "100% Organic Cotton",
    "Machine Washable",
    "Breathable Fabric",
    "Preshrunk",
    "Eco-friendly",
  ],
  specifications: {
    Material: "100% Cotton",
    Fit: "Regular",
    Pattern: "Solid",
    Sleeve: "Half Sleeve",
    Neck: "Round Neck",
  },
};

const mockReviews = [
  {
    id: 1,
    user: "John Doe",
    rating: 5,
    date: "2 days ago",
    comment: "Amazing quality! Fits perfectly and the fabric is very soft.",
    verified: true,
  },
  {
    id: 2,
    user: "Sarah Smith",
    rating: 4,
    date: "1 week ago",
    comment: "Good product, but sizing runs slightly small.",
    verified: true,
  },
  {
    id: 3,
    user: "Mike Johnson",
    rating: 5,
    date: "2 weeks ago",
    comment: "Best t-shirt I've ever bought. Highly recommend!",
    verified: false,
  },
];

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [is360ViewOpen, setIs360ViewOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    const newItem = {
      id: Date.now(),
      name: mockProduct.name,
      price: mockProduct.price,
      image: mockProduct.images[selectedImage],
      quantity: quantity,
      size: selectedSize,
      color: mockProduct.colors[selectedColor].name,
    };
    setCartItems([...cartItems, newItem]);
    toast.success("Added to cart!", {
      description: `${quantity}x ${mockProduct.name}`,
    });
    setIsCartOpen(true);
  };

  const discount = Math.round(
    ((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100
  );

  const stockPercentage = (mockProduct.stock / 100) * 100;

  return (
    <>
      <Navbar cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} />
      
      <div className="min-h-screen bg-background pt-20">
        {/* Back Button & Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-2">
            <BackButton showHomeButton={false} />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{mockProduct.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image with Zoom */}
              <motion.div
                className="relative aspect-square bg-muted rounded-2xl overflow-hidden"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleImageHover}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={mockProduct.images[selectedImage]}
                    alt={mockProduct.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover"
                    style={{
                      transform: isZoomed ? "scale(2)" : "scale(1)",
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      transition: "transform 0.3s ease",
                    }}
                  />
                </AnimatePresence>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-destructive text-destructive-foreground">
                    {discount}% OFF
                  </Badge>
                  <Badge className="bg-primary text-primary-foreground">
                    Bestseller
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full shadow-lg"
                    onClick={() => setIs360ViewOpen(true)}
                  >
                    <RotateCw className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full shadow-lg"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </Button>
                </div>

                {/* Zoom Indicator */}
                {isZoomed && (
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    Hover to zoom
                  </div>
                )}
              </motion.div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-4 overflow-x-auto scrollbar-hide">
                {mockProduct.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary shadow-lg"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{mockProduct.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(mockProduct.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {mockProduct.rating} ({mockProduct.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">
                    ${mockProduct.price}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    ${mockProduct.originalPrice}
                  </span>
                  <Badge variant="destructive" className="text-sm">
                    Save ${(mockProduct.originalPrice - mockProduct.price).toFixed(2)}
                  </Badge>
                </div>
              </div>

              <Separator />

              {/* Color Selector */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Color: {mockProduct.colors[selectedColor].name}
                </label>
                <div className="flex gap-3">
                  {mockProduct.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(index)}
                      className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                        selectedColor === index
                          ? "border-primary scale-110 shadow-lg"
                          : "border-border hover:border-primary/50"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === index && (
                        <Check className="absolute inset-0 m-auto h-6 w-6 text-white drop-shadow-lg" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Size: {selectedSize || "Select a size"}
                </label>
                <div className="flex gap-3 flex-wrap">
                  {mockProduct.sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground shadow-lg"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <label className="text-sm font-medium mb-3 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {mockProduct.stock} items available
                  </span>
                </div>
              </div>

              {/* Stock Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Stock Status</span>
                  <span className="font-medium">
                    {mockProduct.stock > 20 ? "In Stock" : "Limited Stock"}
                  </span>
                </div>
                <Progress value={stockPercentage} className="h-2" />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Button
                    size="lg"
                    className="w-full text-lg font-semibold gradient-primary"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setIsWishlisted(!isWishlisted);
                      toast.success(
                        isWishlisted ? "Removed from wishlist" : "Added to wishlist"
                      );
                    }}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isWishlisted ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => toast.success("Link copied to clipboard")}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="h-6 w-6 text-primary" />
                  <span className="text-xs font-medium">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-xs font-medium">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RefreshCw className="h-6 w-6 text-primary" />
                  <span className="text-xs font-medium">30 Day Returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews ({mockReviews.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {mockProduct.description}
                  </p>
                  <h3 className="text-xl font-semibold mt-6 mb-4">Features</h3>
                  <ul className="space-y-2">
                    {mockProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="specifications" className="mt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(mockProduct.specifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between p-4 bg-muted rounded-lg"
                    >
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  {/* Rating Summary */}
                  <div className="flex items-center gap-8 p-6 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="text-5xl font-bold">{mockProduct.rating}</div>
                      <div className="flex items-center justify-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(mockProduct.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {mockProduct.reviews} reviews
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-6">{stars}★</span>
                          <Progress
                            value={stars === 5 ? 70 : stars === 4 ? 20 : 10}
                            className="flex-1 h-2"
                          />
                          <span className="text-sm text-muted-foreground w-12 text-right">
                            {stars === 5 ? "70%" : stars === 4 ? "20%" : "10%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {mockReviews.map((review) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 border border-border rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{review.user}</span>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Check className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-muted"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sticky Buy Now Bar */}
        <AnimatePresence>
          {showStickyBar && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border shadow-2xl z-40"
            >
              <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={mockProduct.images[selectedImage]}
                    alt={mockProduct.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold line-clamp-1">{mockProduct.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-primary">
                        ${mockProduct.price}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${mockProduct.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  size="lg"
                  className="gradient-primary font-semibold"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 360 View Modal */}
        <Product360View
          product={mockProduct}
          isOpen={is360ViewOpen}
          onClose={() => setIs360ViewOpen(false)}
        />

        {/* Cart Drawer */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={(id, qty) => {
            setCartItems(
              cartItems.map((item) =>
                item.id === id ? { ...item, quantity: qty } : item
              )
            );
          }}
          onRemoveItem={(id) => {
            setCartItems(cartItems.filter((item) => item.id !== id));
            toast.success("Item removed from cart");
          }}
        />
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
