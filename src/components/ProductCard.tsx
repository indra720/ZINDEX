import { useState } from "react";
import { Heart, Share2, Eye, RotateCw, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Product360View from "./Product360View";




// images for card
import img1 from "../assets/product1.1.jpg"
import img1second from "../assets/product1.2.jpg"

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    image: string;        // default image
    hoverImage: string;   // hover image
  };
  onQuickView: (product: any) => void;
  onAddToCart: (product: any) => void;
}

const ProductCard = ({ product, onQuickView, onAddToCart }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [is360ViewOpen, setIs360ViewOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleShare = () => {
    toast.success("Link copied to clipboard!");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;



const staticProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Placeholder Product ${i + 1}`,
  price: Math.floor(Math.random() * 5000) + 500,
  originalPrice: Math.floor(Math.random() * 7000) + 1000,
  rating: (Math.random() * 2 + 3).toFixed(1),
  image: `https://images.unsplash.com/photo-15${(i * 100000 + 10000000).toString().substring(0, 8)}?w=400&h=400&fit=crop&auto=format&q=80`,
  hoverImage: `https://images.unsplash.com/photo-15${((i + 1) * 100000 + 10000000).toString().substring(0, 8)}?w=400&h=400&fit=crop&auto=format&q=80`,
}));

  return (
    <>
      <Card
        className="group relative overflow-hidden cursor-pointer rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 bg-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          {/* Product Image */}
          <img
            src={isHovered ? product.hoverImage : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <div className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                {discount}% OFF
              </div>
            </div>
          )}

          {/* Action Icons - Slide from Right */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <Button
              size="icon"
              variant="secondary"
              className={`h-9 w-9 rounded-full shadow-md transition-all duration-300 ${isHovered ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
              style={{ transitionDelay: isHovered ? "100ms" : "0ms" }}
              onClick={handleWishlist}
            >
              <Heart
                className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
              />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className={`h-9 w-9 rounded-full shadow-md transition-all duration-300 ${isHovered ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
              style={{ transitionDelay: isHovered ? "200ms" : "0ms" }}
              onClick={() => setIs360ViewOpen(true)}
            >
              <RotateCw className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className={`h-9 w-9 rounded-full shadow-md transition-all duration-300 ${isHovered ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
              style={{ transitionDelay: isHovered ? "300ms" : "0ms" }}
              onClick={() => onQuickView(product)}
            >
              <Eye className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="secondary"
              className={`h-9 w-9 rounded-full shadow-md transition-all duration-300 ${isHovered ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
              style={{ transitionDelay: isHovered ? "400ms" : "0ms" }}
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted"
                    }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.rating}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="w-full"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </Card>

      <Product360View
        product={product}
        isOpen={is360ViewOpen}
        onClose={() => setIs360ViewOpen(false)}
      />
    </>
  );
};

export default ProductCard;
