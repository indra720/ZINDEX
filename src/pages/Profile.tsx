import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
  Trash2,
  Edit,
  Plus,
  X,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BackButton from "@/components/BackButton";

type MenuSection = "orders" | "wishlist" | "addresses" | "payment";

const Profile = () => {
  const [activeSection, setActiveSection] = useState<MenuSection>("orders");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  // Mock data
  const orders = [
    {
      id: "ORD001",
      product: "Premium Wireless Headphones",
      price: "₹12,999",
      status: "Delivered",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
      date: "Dec 15, 2024",
    },
    {
      id: "ORD002",
      product: "Smart Watch Series 5",
      price: "₹24,999",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
      date: "Dec 18, 2024",
    },
  ];

  const wishlistItems = [
    {
      id: "W001",
      name: "Gaming Laptop",
      price: "₹89,999",
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=200",
    },
    {
      id: "W002",
      name: "Camera DSLR",
      price: "₹45,999",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200",
    },
  ];

  const addresses = [
    {
      id: "A001",
      name: "Home",
      address: "123 Main Street, Mumbai, Maharashtra, 400001",
      phone: "+91 98765 43210",
    },
    {
      id: "A002",
      name: "Office",
      address: "456 Business Park, Bangalore, Karnataka, 560001",
      phone: "+91 98765 43211",
    },
  ];

  const paymentMethods = [
    { id: "P001", type: "Visa", last4: "4242", expiry: "12/25" },
    { id: "P002", type: "Mastercard", last4: "8888", expiry: "06/26" },
  ];

  const menuItems = [
    { id: "orders" as MenuSection, label: "My Orders", icon: Package },
    { id: "wishlist" as MenuSection, label: "Wishlist", icon: Heart },
    { id: "addresses" as MenuSection, label: "Saved Addresses", icon: MapPin },
    { id: "payment" as MenuSection, label: "Payment Methods", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden mb-6">
          <Tabs value={activeSection} onValueChange={(v) => setActiveSection(v as MenuSection)}>
            <TabsList className="w-full grid grid-cols-4 h-auto p-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className="flex flex-col gap-1 py-2 text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden lg:block w-64 space-y-2"
          >
            <Card className="backdrop-blur-lg bg-card/50 border-border/50">
              <CardContent className="p-4 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.button>
                  );
                })}
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-destructive/10 text-destructive transition-all duration-300"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </motion.button>
              </CardContent>
            </Card>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex-1"
          >
            <AnimatePresence mode="wait">
              {/* My Orders */}
              {activeSection === "orders" && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    My Orders
                  </h2>
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="backdrop-blur-lg bg-card/50 border-border/50 overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={order.image}
                              alt={order.product}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{order.product}</h3>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="font-bold text-primary">{order.price}</span>
                                <Badge
                                  variant={
                                    order.status === "Delivered" ? "default" : "secondary"
                                  }
                                >
                                  {order.status}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Wishlist */}
              {activeSection === "wishlist" && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Wishlist
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {wishlistItems.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="backdrop-blur-lg bg-card/50 border-border/50 overflow-hidden group">
                          <CardContent className="p-4">
                            <div className="relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                              />
                              <Button
                                size="icon"
                                variant="destructive"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-primary font-bold mt-1">{item.price}</p>
                            <Button className="w-full mt-3" variant="outline">
                              Move to Cart
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Saved Addresses */}
              {activeSection === "addresses" && (
                <motion.div
                  key="addresses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Saved Addresses
                    </h2>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Address
                    </Button>
                  </div>
                  {addresses.map((address) => (
                    <motion.div
                      key={address.id}
                      whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                    >
                      <Card className="backdrop-blur-lg bg-card/50 border-border/50">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                {address.name}
                              </h3>
                              <p className="text-muted-foreground mt-1">{address.address}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {address.phone}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="icon" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="icon" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Payment Methods */}
              {activeSection === "payment" && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Payment Methods
                    </h2>
                    <Button onClick={() => setIsAddCardOpen(true)} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Card
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Card className="backdrop-blur-lg bg-gradient-to-br from-primary/10 to-secondary/10 border-border/50 overflow-hidden">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm text-muted-foreground">Card Type</p>
                                <h3 className="text-xl font-bold mt-1">{method.type}</h3>
                                <p className="text-2xl font-mono mt-4">•••• {method.last4}</p>
                                <p className="text-sm text-muted-foreground mt-2">
                                  Expires: {method.expiry}
                                </p>
                              </div>
                              <Button size="icon" variant="ghost">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <img
                src={selectedOrder.image}
                alt={selectedOrder.product}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-lg">{selectedOrder.product}</h3>
                <p className="text-muted-foreground">Order ID: {selectedOrder.id}</p>
                <p className="text-muted-foreground">Date: {selectedOrder.date}</p>
                <p className="text-2xl font-bold text-primary mt-2">{selectedOrder.price}</p>
                <Badge className="mt-2">{selectedOrder.status}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Card Modal */}
      <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Card Number</Label>
              <Input placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Expiry Date</Label>
                <Input placeholder="MM/YY" />
              </div>
              <div>
                <Label>CVV</Label>
                <Input placeholder="123" type="password" />
              </div>
            </div>
            <div>
              <Label>Cardholder Name</Label>
              <Input placeholder="John Doe" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCardOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddCardOpen(false)}>Add Card</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
