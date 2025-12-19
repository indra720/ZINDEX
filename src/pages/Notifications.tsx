import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  ShoppingBag,
  Percent,
  Settings,
  X,
  Check,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/BackButton";

type NotificationType = "all" | "offers" | "orders" | "system";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: "offer" | "order" | "system";
  isRead: boolean;
  icon: any;
}

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<NotificationType>("all");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "N001",
      title: "Flash Sale Alert!",
      message: "Get 50% off on electronics - Limited time offer",
      timestamp: "2h ago",
      type: "offer",
      isRead: false,
      icon: Percent,
    },
    {
      id: "N002",
      title: "Order Delivered",
      message: "Your order #ORD001 has been delivered successfully",
      timestamp: "3h ago",
      type: "order",
      isRead: false,
      icon: ShoppingBag,
    },
    {
      id: "N003",
      title: "Welcome Offer",
      message: "Enjoy 20% off on your first purchase with code WELCOME20",
      timestamp: "5h ago",
      type: "offer",
      isRead: true,
      icon: Percent,
    },
    {
      id: "N004",
      title: "Order Shipped",
      message: "Your order #ORD002 is on the way",
      timestamp: "1d ago",
      type: "order",
      isRead: true,
      icon: ShoppingBag,
    },
    {
      id: "N005",
      title: "System Update",
      message: "We've updated our privacy policy",
      timestamp: "2d ago",
      type: "system",
      isRead: false,
      icon: Settings,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter((n) => n.type === activeTab);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton showHomeButton={false} />
            <h1 className="text-xl font-semibold">Notifications</h1>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8  max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-10 backdrop-blur-xl bg-background/80 -mx-4 px-4 py-4 mb-6 border-b border-border/50"
        >
          <div className="grid grid-cols-1 md:flex md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="h-8 w-8 text-primary" />
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </div>
              <div className="">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Notifications
                </h1>
                <p className="text-sm text-muted-foreground">
                  {unreadCount} unread notifications
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as NotificationType)}
            className="mt-4"
          >
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="offers">Offers</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="text-center py-12"
              >
                <Bell className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-lg font-medium text-muted-foreground">
                  No notifications yet
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  We'll notify you when something arrives
                </p>
              </motion.div>
            ) : (
              filteredNotifications.map((notification, index) => {
                const Icon = notification.icon;
                return (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <motion.div
                      whileTap={{ scale: 1.02, x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className={`backdrop-blur-lg border-border/50 hover:shadow-md  overflow-hidden cursor-pointer transition-all duration-300 ${notification.isRead
                            ? "bg-card/30"
                            : "bg-gradient-to-r from-primary/10 via-card/50 to-secondary/10 shadow-lg"
                          }`}
                        onClick={() => !notification.isRead && markAsRead(notification.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <div
                              className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${notification.type === "offer"
                                  ? "bg-primary/20 text-primary"
                                  : notification.type === "order"
                                    ? "bg-secondary/20 text-secondary"
                                    : "bg-muted text-foreground"
                                }`}
                            >
                              <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-base">
                                      {notification.title}
                                    </h3>
                                    {!notification.isRead && (
                                      <div className="w-2 h-2 rounded-full bg-primary" />
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge
                                      variant={
                                        notification.type === "offer"
                                          ? "default"
                                          : "secondary"
                                      }
                                      className="text-xs"
                                    >
                                      {notification.type}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                      {notification.timestamp}
                                    </span>
                                  </div>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dismissNotification(notification.id);
                                  }}
                                  className="flex-shrink-0 p-1 hover:bg-destructive/10 rounded-full transition-colors"
                                >
                                  <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Notifications;
