import { useState } from "react";
import { CreditCard, Smartphone, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface AddMoneyModalProps {
  open: boolean;
  onClose: () => void;
  currentBalance: number;
}

const quickAmounts = [500, 1000, 2000, 5000];

const AddMoneyModal = ({ open, onClose, currentBalance }: AddMoneyModalProps) => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const handleAddMoney = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    toast.success(`₹${amount} added to wallet successfully! 🎉`);
    onClose();
    setAmount("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-xl  max-h-[95vh] w-[calc(100vw-2rem)] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add Money</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Current Balance: ₹{currentBalance.toFixed(2)}
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Enter Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₹
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 text-lg"
              />
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <Label>Quick Add</Label>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amt.toString())}
                  className="hover-lift"
                >
                  ₹{amt}
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label>Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="upi" id="upi-add" />
                  <Label
                    htmlFor="upi-add"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <Smartphone className="h-5 w-5 text-primary" />
                    <span>UPI</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="card" id="card-add" />
                  <Label
                    htmlFor="card-add"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Credit/Debit Card</span>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="bank" id="bank-add" />
                  <Label
                    htmlFor="bank-add"
                    className="flex items-center gap-2 cursor-pointer flex-1"
                  >
                    <Building2 className="h-5 w-5 text-primary" />
                    <span>Net Banking</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Action Button */}
          <Button
            onClick={handleAddMoney}
            className="w-full gradient-primary hover:opacity-90 h-12 text-lg"
          >
            Add ₹{amount || "0"} to Wallet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMoneyModal;
