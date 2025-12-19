import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ProductSection from "@/components/ProductSection";
import QuickViewModal from "@/components/QuickViewModal";
import CartDrawer from "@/components/CartDrawer";
import Category from "@/components/Category";
import ChatbotWidget from "@/components/ChatbotWidget";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { LiaShippingFastSolid } from "react-icons/lia";
import BannerSlider from "@/components/BannerSlider";

import Tabs from "@mui/material/Tabs";


import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';





import { popularProducts } from "@/data/popularProducts";
import { latestProducts } from "@/data/latestProducts";
import { electronicsProducts } from "@/data/electronicsProducts";
import { groceriesProducts } from "@/data/groceriesProducts";
import { fashionProducts } from "@/data/fashionProducts";

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = (product: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success("Added to cart!");
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };



  // category navbar
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="container mx-auto px-4 py-6 space-y-12">
        {/* Hero Section */}
        <HeroSlider />

        <Category />


        <section className="py-5 bg-white rounded-sm">
          <div className="container">
            <div
              className="freeshipping p-4 border border-[#ff5252] flex items-center gap-8
        rounded-md overflow-x-auto whitespace-nowrap max-w-full">
              <div className="col1 flex items-center gap-4 min-w-max">
                <LiaShippingFastSolid size={30} />
                <span>Free Shipping on All order above ₹500.00</span>
              </div>

              <div className="col2 flex items-center gap-4 min-w-max">
                <p className="mb-0 font-[500]">
                  Free Delivery Now on Your first Order and over $200
                </p>
              </div>

              <p className="font-bold text-base min-w-max">
                - Only $200*
              </p>
            </div>
          </div>
        </section>


        <BannerSlider />

        {/* second navbar */}
        <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col  items-center lg:items-end gap-6 lg:gap-10">

              {/* LEFT SECTION */}
              <div className="leftsec w-full text-center ">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  Popular Products
                </h3>
                <p className="mt-1 text-sm sm:text-base font-medium text-gray-400">
                  Do not miss the current offers until the end of March.
                </p>
              </div>

              {/* RIGHT SECTION */}
              <div className="rightsec w-full lg:flex-1">
                <Box
                  sx={{
                    maxWidth: "100%",
                    bgcolor: "background.paper",
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                    aria-label="popular product categories"
                  >
                    <Tab label="Fashion" className="" />
                    <Tab label="Electronics" />
                    <Tab label="Bags" />
                    <Tab label="Footwear" />
                    <Tab label="Groceries" />
                    <Tab label="Wellness" />
                    <Tab label="Toys" />
                    <Tab label="Mobiles & Laptops" />
                    <Tab label="Kids & Baby" />
                    <Tab label="Jewellery" />
                  </Tabs>
                </Box>
              </div>

            </div>
          </div>
        </section>



        {/* Popular Products */}
        <ProductSection
          title="Popular Products"
          icon="🔥"
          products={popularProducts}
          onQuickView={handleQuickView}
          onAddToCart={handleAddToCart}
        />

        {/* Latest Products - Special Layout */}
        <section className="py-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✨</span>
            <h2 className="text-2xl md:text-3xl font-bold relative">
              Latest Products
              <div className="absolute -bottom-1 left-0 w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {/* Large featured product */}
            <div className="lg:row-span-2">
              <div className="h-full rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <h3 className="text-4xl font-bold">New Arrivals</h3>
                  <p className="text-lg text-muted-foreground">
                    Check out our latest collection
                  </p>
                  <button className="px-8 py-3 gradient-primary text-primary-foreground rounded-full font-semibold hover-lift">
                    Explore Now
                  </button>
                </div>
              </div>
            </div>

            {/* Two smaller product showcases */}
            <div className="grid gap-4">
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6">
                <h4 className="text-2xl font-bold mb-2">Tech Gadgets</h4>
                <p className="text-muted-foreground">Starting at ₹999</p>
              </div>
              <div className="rounded-xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-red-500/20 p-6">
                <h4 className="text-2xl font-bold mb-2">Fashion Sale</h4>
                <p className="text-muted-foreground">Up to 70% OFF</p>
              </div>
            </div>
          </div>
        </section>

        {/* Electronics */}
        <ProductSection
          title="Electronics"
          icon="📱"
          products={electronicsProducts}
          onQuickView={handleQuickView}
          onAddToCart={handleAddToCart}
        />

        {/* Groceries */}
        <ProductSection
          title="Groceries"
          icon="🛒"
          products={groceriesProducts}
          onQuickView={handleQuickView}
          onAddToCart={handleAddToCart}
        />

        {/* Fashion */}
        <ProductSection
          title="Fashion"
          icon="👕"
          products={fashionProducts}
          onQuickView={handleQuickView}
          onAddToCart={handleAddToCart}
        />
      </main>

      <Footer />

      {/* Chatbot Widget */}
      <ChatbotWidget />

      {/* Modals */}
      <QuickViewModal
        product={selectedProduct}
        open={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Index;
