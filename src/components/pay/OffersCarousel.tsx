import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, Zap } from "lucide-react";
import { toast } from "sonner";

interface OffersCarouselProps {
  onRewardsClick: () => void;
}

const offers = [
  {
    id: 1,
    title: "Get ₹50 cashback",
    subtitle: "On mobile recharge above ₹299",
    gradient: "from-purple-500 to-pink-500",
    icon: "📱",
  },
  {
    id: 2,
    title: "Electricity Bill Offer",
    subtitle: "Pay & get 5% cashback up to ₹100",
    gradient: "from-yellow-500 to-orange-500",
    icon: "💡",
  },
  {
    id: 3,
    title: "DTH Recharge Deal",
    subtitle: "Flat ₹30 off on first recharge",
    gradient: "from-blue-500 to-cyan-500",
    icon: "📺",
  },
  {
    id: 4,
    title: "Credit Card Payment",
    subtitle: "Zero convenience fee this week",
    gradient: "from-green-500 to-teal-500",
    icon: "💳",
  },
];

const OffersCarousel = ({ onRewardsClick }: OffersCarouselProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Offers & Rewards
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRewardsClick}
          className="text-primary hover:text-primary"
        >
          View All
        </Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: "none" }}>
        {offers.map((offer) => (
          <Card
            key={offer.id}
            className="flex-none w-[200px] md:w-80  overflow-hidden  cursor-pointer"
          >
            <div className={`bg-gradient-to-br ${offer.gradient} p-6 text-white`}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-5xl">{offer.icon}</span>
                <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Zap className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">{offer.title}</h3>
              <p className="text-sm opacity-90 mb-4">{offer.subtitle}</p>
              <Button
                size="sm"
                className="bg-white text-gray-900 hover:bg-white/90 font-semibold"
                onClick={() => toast.success("Offer activated!")}
              >
                Claim Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default OffersCarousel;
