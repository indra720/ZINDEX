import { X, Star, Heart, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface QuickViewModalProps {
  product: any;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: any) => void;
}

const QuickViewModal = ({
  product,
  open,
  onClose,
  onAddToCart,
}: QuickViewModalProps) => {
  if (!product) return null;

  const handleBuyNow = () => {
    onAddToCart(product);
    toast.success("Redirecting to checkout...");
    onClose();
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mt-4">
          {/* Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-md font-bold">
                {discount}% OFF
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} Rating
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-foreground">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-green-600 font-semibold">
                  You save ₹
                  {(product.originalPrice - product.price).toLocaleString()} (
                  {discount}%)
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Product Details</h3>
              <p className="text-muted-foreground leading-relaxed">
                Premium quality product with excellent features. Fast delivery
                available. 100% genuine product with warranty included.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Key Features</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>High quality materials</li>
                <li>Fast shipping available</li>
                <li>Easy returns within 30 days</li>
                <li>Warranty included</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                className="flex-1 gradient-primary hover:opacity-90 text-lg h-12"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                Add to Cart
              </Button>
              <Button
                className="flex-1 gradient-secondary hover:opacity-90 text-lg h-12"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            {/* Secondary Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 hover-glow"
                onClick={() => toast.success("Added to wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
              </Button>
              <Button
                variant="outline"
                className="flex-1 hover-glow"
                onClick={() => toast.success("Link copied!")}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
