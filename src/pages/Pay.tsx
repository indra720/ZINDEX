import { useState } from "react";
import { Wallet, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WalletCard from "@/components/pay/WalletCard";
import QuickActionsGrid from "@/components/pay/QuickActionsGrid";
import OffersCarousel from "@/components/pay/OffersCarousel";
import RecentTransactions from "@/components/pay/RecentTransactions";
import AdditionalServices from "@/components/pay/AdditionalServices";
import AddMoneyModal from "@/components/pay/AddMoneyModal";
import RewardsModal from "@/components/pay/RewardsModal";
import ScanPayModal from "@/components/pay/ScanPayModal";
import ChatbotWidget from "@/components/ChatbotWidget";
import BackButton from "@/components/BackButton";

const Pay = () => {
  const [walletBalance] = useState(2540.0);
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);
  const [isScanPayOpen, setIsScanPayOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BackButton showHomeButton={false} />
            <h1 className="text-xl font-bold">ShoppingCart Pay</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-teal-500/10 to-blue-500/10 rounded-full border border-teal-500/20">
              <Wallet className="h-4 w-4 text-teal-600" />
              <span className="text-sm font-semibold text-teal-700">
                ₹{walletBalance.toFixed(2)}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="hover-glow"
              onClick={() => setIsScanPayOpen(true)}
            >
              <QrCode className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Wallet Balance Card */}
        <WalletCard
          balance={walletBalance}
          onAddMoney={() => setIsAddMoneyOpen(true)}
        />

        {/* Quick Actions Grid */}
        <QuickActionsGrid
          onScanPay={() => setIsScanPayOpen(true)}
          onRewards={() => setIsRewardsOpen(true)}
        />

        {/* Offers & Rewards Carousel */}
        <OffersCarousel onRewardsClick={() => setIsRewardsOpen(true)} />

        {/* Recent Transactions */}
        <RecentTransactions />

        {/* Additional Services */}
        <AdditionalServices />
      </main>

      {/* Modals */}
      <AddMoneyModal
        open={isAddMoneyOpen}
        onClose={() => setIsAddMoneyOpen(false)}
        currentBalance={walletBalance}
      />

      <RewardsModal
        open={isRewardsOpen}
        onClose={() => setIsRewardsOpen(false)}
      />

      <ScanPayModal
        open={isScanPayOpen}
        onClose={() => setIsScanPayOpen(false)}
      />

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
};

export default Pay;
