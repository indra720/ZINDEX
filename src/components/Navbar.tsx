import { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  ChevronDown,
  Wallet,
  Bell,
  Mic,
  Moon,
  Sun,
  Smartphone,
  Shirt,
  ShoppingBasket,
  Plug,
  BookOpen,
  Dumbbell,
  Home,
  Sparkles,
  ChevronRight,
  LogIn,
  OrbitIcon,
  ClipboardCheck,
  Menu
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { MegaMenu, MobileMegaMenu, megaMenuData } from "./MegaMenu";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const categories = [
  { name: "Electronics", icon: Smartphone, hasMegaMenu: true, link: "/products?category=electronics" },
  { name: "Fashion", icon: Shirt, hasMegaMenu: true, link: "/products?category=fashion" },
  { name: "Groceries", icon: ShoppingBasket, hasMegaMenu: true, link: "/products?category=groceries" },
  { name: "Appliances", icon: Plug, hasMegaMenu: true, link: "/products?category=appliances" },
  { name: "Books", icon: BookOpen, hasMegaMenu: true, link: "/products?category=books" },
  { name: "Sports", icon: Dumbbell, hasMegaMenu: true, link: "/products?category=sports" },
  { name: "Home & Living", icon: Home, hasMegaMenu: true, link: "/products?category=home-living" },
  { name: "Beauty", icon: Sparkles, hasMegaMenu: true, link: "/products?category=beauty" },
  
];

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCategoryHover = (categoryName: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (megaMenuData[categoryName]) {
      setHoveredCategory(categoryName);
    }
  };

  const handleCategoryLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 150);
  };

  const handleMegaMenuEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleMegaMenuLeave = () => {
    setHoveredCategory(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "backdrop-blur-xl bg-card/80 shadow-lg"
        : "backdrop-blur-lg bg-card/60"
        }`}
      style={{
        borderBottom: "2px solid transparent",
        borderImage: "linear-gradient(90deg, hsl(217 91% 60%), hsl(32 100% 50%)) 1",
      }}
    >
      {/* Top Bar */}
      <div className="gradient-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 hover:underline"
          >
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Select Location</span>
          </motion.button>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-1 hover:underline"
                >
                  English <ChevronDown className="h-3 w-3" />
                </motion.button>
              </DropdownMenuTrigger>
              <AnimatePresence>
                <DropdownMenuContent className="bg-popover backdrop-blur-xl">
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>हिन्दी</DropdownMenuItem>
                  <DropdownMenuItem>தமிழ்</DropdownMenuItem>
                </DropdownMenuContent>
              </AnimatePresence>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap">
              ShoppingCart
            </h1>
          </motion.div>

          {/* Search Bar - Desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="hidden md:flex flex-1 max-w-2xl relative group gap-3"
          >
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, brands and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-20 rounded-full backdrop-blur-lg bg-muted/50 border-border/50 focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 group-hover:shadow-lg"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-primary/10"
                >
                  <Mic className="h-4 w-4 text-primary" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 rounded-full hover:bg-primary/10"
                >
                  <Search className="h-4 w-4 text-primary" />
                </Button>
              </div>
            </div>
            <div className=" justify-center items-center hidden md:flex ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1 }}>
                    <Button className="hover-glow rounded-full">
                      <Link to="/login" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>Login</span>
                      </Link>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>

              </DropdownMenu>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 md:gap-3"
          >
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="relative hover-glow rounded-full"
                >
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/pay">
                  <Button variant="ghost" size="icon" className="relative hover-glow rounded-full">
                    <Wallet className="h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link to="/notifications">
                  <Button variant="ghost" size="icon" className="relative hover-glow rounded-full">
                    <Bell className="h-5 w-5" />
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-0 -right-1 bg-destructive text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold"
                    >
                      3
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover-glow rounded-full"
                  onClick={onCartClick}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </Button>
              </motion.div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="ghost" size="icon" className="hover-glow rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <AnimatePresence>
                  <DropdownMenuContent className="bg-popover backdrop-blur-xl z-50">
                    <DropdownMenuItem>
                      <Link to="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                    <DropdownMenuItem  >
                      <Link to="/login" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        Login
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </AnimatePresence>
              </DropdownMenu>
            </div>

            {/* Mobile Icons with Text Below */}
            <div className="flex md:hidden items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="flex flex-col  items-center gap-0.5"
              >
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="text-[9px] font-medium">Theme</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onCartClick}
                className="flex flex-col items-center gap-0.5 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">
                    {cartCount}
                  </span>
                )}
                <span className="text-[9px] font-medium">Cart</span>
              </motion.button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center gap-0.5"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-[9px] font-medium">Profile</span>
                  </motion.button>
                </DropdownMenuTrigger>
                <AnimatePresence>
                  <DropdownMenuContent className="bg-popover backdrop-blur-xl z-50">
                    <DropdownMenuItem>
                      <Link to="/profile" className="flex items-center w-full">
                        <User className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/pay" className="flex items-center w-full">
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Wallet</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/notifications" className="flex items-center w-full">
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Notifications</span>
                        <span className="ml-auto text-xs bg-destructive text-destructive-foreground rounded-full px-1.5 py-0.5">3</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <OrbitIcon className="mr-2 h-4 w-4"/>
                      <span>Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/login" className="flex items-center w-full">
                        <LogIn className="mr-2 h-4 w-4"/>
                        <span>Login</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </AnimatePresence>
              </DropdownMenu>
            </div>
          </motion.div>
        </div>

        {/* Mobile Search */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-3 relative group"
        >
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-20 rounded-full backdrop-blur-lg bg-muted/50 border-border/50"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
              <Mic className="h-4 w-4 text-primary" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
              <Search className="h-4 w-4 text-primary" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Categories - Desktop: Centered Row, Mobile: Horizontal Scroll */}
      <div className="border-t border-border/50 backdrop-blur-lg relative">
        <div className="container mx-auto px-4">
          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center justify-between py-2">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              <Menu className="h-5 w-5" />
              <span>All Categories</span>
            </button>
          </div>

          {/* Desktop Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden flex-wrap  lg:flex items-center justify-center  py-3"
          >
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isHovered = hoveredCategory === category.name;
              const hasMegaMenu = category.hasMegaMenu && megaMenuData[category.name];
              
              const ButtonContent = (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.name)}
                  onMouseEnter={() => handleCategoryHover(category.name)}
                  onMouseLeave={handleCategoryLeave}
                  className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 px-4 py-2.5 rounded-lg group relative ${
                    activeCategory === category.name || isHovered
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.name}</span>
                  {hasMegaMenu && (
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isHovered ? "rotate-180" : ""}`} />
                  )}
                  {/* Hover underline effect */}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${isHovered ? "w-3/4" : "w-0"}`} />
                </motion.button>
              );
              
              return category.link ? (
                <Link key={category.name} to={category.link}>
                  {ButtonContent}
                </Link>
              ) : (
                <div key={category.name}>{ButtonContent}</div>
              );
            })}
          </motion.div>

          {/* Mega Menu */}
          {hoveredCategory && megaMenuData[hoveredCategory] && (
            <div
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
            >
              <MegaMenu
                category={hoveredCategory}
                isOpen={true}
                onClose={() => setHoveredCategory(null)}
              />
            </div>
          )}

          {/* Mobile Horizontal Scroll Categories */}
          <div className="lg:hidden relative py-3">
            <div className="flex items-center gap-3 overflow-x-auto scroll-smooth scrollbar-hide pb-2 snap-x snap-mandatory  ">
              {categories.map((category, index) => {
                const Icon = category.icon;
                const MobileButtonContent = (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveCategory(category.name)}
                    className={`flex flex-col items-center gap-1 text-xs font-medium whitespace-nowrap px-3 py-2 rounded-lg snap-start transition-all duration-300 ${activeCategory === category.name
                      ? "text-primary-foreground bg-gradient-to-r from-primary to-secondary shadow-lg scale-105"
                      : "text-foreground bg-muted/50 hover:bg-muted"
                      }`}
                  >
                    <Icon className="h-5 w-5 " />
                    <span className="text-[10px]">{category.name}</span>
                  </motion.button>
                );
                
                return category.link ? (
                  <Link key={category.name} to={category.link}>
                    {MobileButtonContent}
                  </Link>
                ) : (
                  <div key={category.name}>{MobileButtonContent}</div>
                );
              })}
            </div>

            {/* Scroll Indicator */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
            >
              <ChevronRight className="h-5 w-5 text-primary/50" />
            </motion.div>

            {/* Fade Shadow on Left */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-card to-transparent pointer-events-none" />

            {/* Fade Shadow on Right */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Mobile Mega Menu */}
      <MobileMegaMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </motion.nav>
  );
};

export default Navbar;
