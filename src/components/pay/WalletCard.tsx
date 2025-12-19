import { Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface WalletCardProps {
  balance: number;
  onAddMoney: () => void;
}

const WalletCard = ({ balance, onAddMoney }: WalletCardProps) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-teal-500 to-cyan-400 text-white p-6 shadow-lg">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,122.7C1248,107,1344,85,1392,74.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="animate-float"
          />
        </svg>
      </div>

      <div className="relative z-10 space-y-4">
        {/* Balance Display */}
        <div className="space-y-1">
          <p className="text-sm font-medium opacity-90">Wallet Balance</p>
          <h2 className="text-4xl font-bold tracking-tight">
            ₹{balance.toFixed(2)}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Button
            onClick={onAddMoney}
            className=" felx md:flex-1 bg-white text-blue-600 hover:bg-white/90 font-semibold shadow-lg"
           
          >
            <div className="rounded-full p-1 bg-blue-100"><Plus className=" h-4 w-4 text-black font-bold" /></div>
            <span className="hidden md:flex">Add Money</span>
          </Button>
          <Button
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            
          >
            <TrendingUp className="mr-2 h-4 w-4 text-black" />
            <span className="text-black">Transaction</span>
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 pt-2 text-xs opacity-90">
          <div>
            <p className="font-medium">This Month</p>
            <p className="text-sm font-semibold">₹4,250</p>
          </div>
          <div className="border-l border-white/30 pl-4">
            <p className="font-medium">Cashback Earned</p>
            <p className="text-sm font-semibold">₹180</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WalletCard;
