import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, RotateCw, ZoomIn, ZoomOut, Maximize, ShoppingCart, Star, Minus, Plus, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface AdvancedQuickViewProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: any, quantity: number) => void;
}

const AdvancedQuickView = ({ product, isOpen, onClose, onAddToCart }: AdvancedQuickViewProps) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || null);
  const [selectedSize, setSelectedSize] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setRotation(0);
      setZoom(1);
      setQuantity(1);
      setSelectedSize("");
      setSelectedColor(product?.colors?.[0] || null)
    }
  }, [isOpen, product]);

  if (!product) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation((prev) => prev + delta * 0.5);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleAutoRotate = () => {
    let currentRotation = rotation;
    const interval = setInterval(() => {
      currentRotation += 1;
      setRotation(currentRotation);
    }, 16);
    setTimeout(() => clearInterval(interval), 5000);
  };

  const handleAddToCartClick = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      toast.error("Please select a size.");
      return;
    }
    onAddToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
    onClose();
  };
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-0 p-0">
        {/* Left Side: 360 View */}
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none bg-muted/50 overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="relative transition-transform duration-100 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${rotation}deg) scale(${zoom})`,
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="max-w-sm max-h-[60vh] object-contain drop-shadow-2xl"
              draggable={false}
            />
          </div>

          {/* 360 Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-background/80 backdrop-blur-md rounded-full border shadow-lg">
            <Button variant="ghost" size="icon" onClick={handleZoomOut} className="rounded-full"><ZoomOut className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" onClick={handleZoomIn} className="rounded-full"><ZoomIn className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" onClick={handleResetZoom} className="rounded-full"><Maximize className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" onClick={handleAutoRotate} className="rounded-full"><RotateCw className="h-4 w-4" /></Button>
          </div>
           {discount > 0 && (
            <Badge variant="destructive" className="absolute top-4 left-4">
              {discount}% OFF
            </Badge>
          )}
        </div>

        {/* Right Side: Product Details */}
        <div className="p-8 flex flex-col h-full overflow-y-auto">
          <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
              ))}
              <span className="ml-1 text-sm text-muted-foreground">({product.rating})</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <Separator className="my-6" />

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Color: <span className="font-semibold">{selectedColor?.name}</span></label>
              <div className="flex gap-3">
                {product.colors.map((color: any, index: number) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all ${selectedColor?.hex === color.hex ? "border-primary scale-110 shadow-lg" : "border-border"}`}
                    style={{ backgroundColor: color.hex }}
                  >
                     {selectedColor?.hex === color.hex && <Check className="absolute inset-0 m-auto h-5 w-5 text-white" />}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Size</label>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size: string) => (
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

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-3 block">Quantity</label>
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></Button>
                <span className="w-10 text-center font-bold">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
          
          <div className="mt-auto pt-6">
             <Button size="lg" className="w-full font-semibold" onClick={handleAddToCartClick}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
            </Button>
          </div>

        </div>
        
        {/* Close Button */}
        <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-2 right-2 rounded-full z-50">
          <X className="h-5 w-5" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedQuickView;
