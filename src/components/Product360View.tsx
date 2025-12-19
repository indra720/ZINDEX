import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, RotateCw, ZoomIn, ZoomOut, Maximize } from "lucide-react";

interface Product360ViewProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

const Product360View = ({ product, isOpen, onClose }: Product360ViewProps) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setRotation(0);
      setZoom(1);
    }
  }, [isOpen]);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    setRotation((prev) => prev + delta * 0.5);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleAutoRotate = () => {
    let currentRotation = rotation;
    const interval = setInterval(() => {
      currentRotation += 2;
      setRotation(currentRotation);
    }, 16);

    setTimeout(() => {
      clearInterval(interval);
    }, 3000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 overflow-hidden bg-gradient-to-br from-background via-muted/50 to-background">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-background/95 to-transparent backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                360° Product View
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Drag to rotate • Pinch to zoom
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* 360 View Container */}
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/50" />
          
          {/* Product Image with 3D Effect */}
          <div
            className="relative transition-transform duration-100 ease-out"
            style={{
              transform: `
                perspective(1200px) 
                rotateY(${rotation}deg) 
                scale(${zoom})
                translateZ(50px)
              `,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Shadow Effect */}
            <div 
              className="absolute inset-0 blur-3xl opacity-30 bg-primary -z-10"
              style={{
                transform: 'translateZ(-100px) scale(0.8)',
              }}
            />
            
            {/* Main Product Image */}
            <img
              src={product?.image}
              alt={product?.name}
              className="max-w-md max-h-[60vh] object-contain drop-shadow-2xl"
              draggable={false}
            />
            
            {/* Reflection Effect */}
            <div 
              className="absolute inset-x-0 -bottom-20 h-40 opacity-20"
              style={{
                background: `linear-gradient(to bottom, transparent, rgba(255,255,255,0.1))`,
                maskImage: `url(${product?.image})`,
                maskSize: 'contain',
                maskPosition: 'top',
                maskRepeat: 'no-repeat',
                transform: 'scaleY(-1) translateZ(-50px)',
              }}
            />
          </div>

          {/* Rotation Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-background/80 backdrop-blur-md rounded-full border border-primary/20 shadow-lg">
            <p className="text-sm font-medium text-primary">
              Rotation: {Math.round(rotation % 360)}°
            </p>
          </div>
        </div>

        {/* Control Panel */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/95 to-transparent backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomOut}
              className="rounded-full hover:scale-110 transition-transform bg-background/50 backdrop-blur"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleZoomIn}
              className="rounded-full hover:scale-110 transition-transform bg-background/50 backdrop-blur"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleAutoRotate}
              className="rounded-full hover:scale-110 transition-transform bg-gradient-to-r from-primary to-secondary text-white border-0"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoom(1)}
              className="rounded-full hover:scale-110 transition-transform bg-background/50 backdrop-blur"
            >
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product Info Overlay */}
        <div className="absolute top-20 left-4 right-4 md:left-auto md:right-4 md:w-72 p-4 bg-background/80 backdrop-blur-xl rounded-2xl border border-primary/20 shadow-2xl">
          <h3 className="font-bold text-lg mb-2">{product?.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-primary">
              ₹{product?.price?.toLocaleString()}
            </span>
            {product?.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{product?.originalPrice?.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 gradient-primary text-white font-semibold">
              🛒 Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Product360View;
