import { Gift, Star, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RewardsModalProps {
  open: boolean;
  onClose: () => void;
}

const rewards = [
  {
    id: 1,
    title: "Welcome Bonus",
    points: 100,
    description: "Complete your first transaction",
    status: "claimed",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 2,
    title: "Bill Payment Pro",
    points: 250,
    description: "Pay 5 utility bills this month",
    status: "available",
    color: "from-blue-500 to-cyan-500",
    progress: 60,
  },
  {
    id: 3,
    title: "Recharge Master",
    points: 150,
    description: "Complete 10 mobile recharges",
    status: "available",
    color: "from-purple-500 to-pink-500",
    progress: 40,
  },
  {
    id: 4,
    title: "Big Spender",
    points: 500,
    description: "Spend ₹10,000 this month",
    status: "locked",
    color: "from-orange-500 to-red-500",
    progress: 25,
  },
];

const RewardsModal = ({ open, onClose }: RewardsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl w-[calc(100vw-2rem)] rounded-sm max-h-[80vh] overflow-y-auto bg-card scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="text-sm font-semibold flex items-center gap-2">
            <Gift className="h-6 w-6 text-primary" />
            Rewards & Cashback
          </DialogTitle>
          <div className="flex items-center gap-2 mt-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold">1,250 Points Available</span>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Points Balance Card */}
          <Card className="bg-gradient-to-br from-primary to-secondary text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Cashback Earned</p>
                <h3 className="text-3xl font-bold">₹180.00</h3>
              </div>
              <TrendingUp className="h-12 w-12 opacity-50" />
            </div>
          </Card>

          {/* Rewards List */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Available Rewards</h3>
            {rewards.map((reward) => (
              <Card
                key={reward.id}
                className={`overflow-hidden ${
                  reward.status === "locked" ? "opacity-60" : ""
                }`}
              >
                <div className="flex">
                  {/* Color Bar */}
                  <div
                    className={`w-2 bg-gradient-to-b ${reward.color}`}
                  />

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-sm mb-1">
                          {reward.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {reward.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-primary font-bold">
                          <Star className="h-4 w-4 fill-primary" />
                          <span>{reward.points}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {reward.progress && (
                      <div className="mb-3">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${reward.color} transition-all duration-500`}
                            style={{ width: `${reward.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {reward.progress}% completed
                        </p>
                      </div>
                    )}

                    {/* Action Button */}
                    {reward.status === "claimed" ? (
                      <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                        <Star className="h-4 w-4 fill-green-600" />
                        <span>Claimed</span>
                      </div>
                    ) : reward.status === "available" ? (
                      <Button
                        size="sm"
                        className="gradient-primary hover:opacity-90"
                        onClick={() => toast.success("Reward claimed! 🎉")}
                      >
                        Claim Now
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
                        Locked
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RewardsModal;
