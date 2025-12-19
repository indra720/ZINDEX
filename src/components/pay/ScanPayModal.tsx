import { QrCode, Upload, Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ScanPayModalProps {
  open: boolean;
  onClose: () => void;
}

const ScanPayModal = ({ open, onClose }: ScanPayModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[calc-(100vw-2rem)] ] h-[90vh] overflow-y-auto rounded-xl scrollbar-hide  bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            Scan & Pay
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4 ">
          {/* QR Scanner Animation */}
          <div className="relative w-64 h-64 mx-auto aspect-square   bg-gradient-to-br from-blue-500/10 to-teal-500/10 rounded-xl border-2 border-dashed border-primary/30 overflow-hidden">
            <div className="absolute inset-0  flex items-center justify-center">
              <div className="relative">
                <QrCode className="h-32  w-32 text-muted-foreground/30" />
                
                {/* Scanning Line Animation */}
                <div className="absolute inset-0 animate-pulse">
                  <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>
              </div>
            </div>

            {/* Corner Brackets */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary" />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Position the QR code within the frame to scan
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="hover-lift"
              onClick={() => {
                toast.success("Camera opened");
                onClose();
              }}
            >
              <Camera className="mr-2 h-4 w-4" />
              Open Camera
            </Button>
            <Button
              variant="outline"
              className="hover-lift"
              onClick={() => {
                toast.success("Upload QR image");
                onClose();
              }}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload QR
            </Button>
          </div>

          {/* Sample QR Code Display */}
          <div className="border-t border-border pt-4">
            <p className="text-xs text-center text-muted-foreground mb-3">
              Or show your QR code to receive payment
            </p>
            <div className="bg-white p-4 rounded-lg flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <QrCode className="h-24 w-24 text-white" />
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Your unique payment QR code
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanPayModal;
