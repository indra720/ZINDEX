import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface QuickAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  action: () => void;
}

interface QuickActionsGridProps {
  onScanPay: () => void;
  onRewards: () => void;
}

const QuickActionsGrid = ({ onScanPay, onRewards }: QuickActionsGridProps) => {
  const actions: QuickAction[] = [
    {
      id: "mobile",
      label: "Mobile Recharge",
      icon: "📱",
      color: "from-blue-400 to-blue-600",
      action: () => toast.info("Mobile recharge coming soon!"),
    },
    {
      id: "electricity",
      label: "Electricity Bill",
      icon: "💡",
      color: "from-yellow-400 to-orange-500",
      action: () => toast.info("Electricity bill payment coming soon!"),
    },
    {
      id: "dth",
      label: "DTH Recharge",
      icon: "📺",
      color: "from-purple-400 to-purple-600",
      action: () => toast.info("DTH recharge coming soon!"),
    },
    {
      id: "gas",
      label: "Gas Cylinder",
      icon: "⛽",
      color: "from-red-400 to-orange-600",
      action: () => toast.info("Gas booking coming soon!"),
    },
    {
      id: "water",
      label: "Water Bill",
      icon: "🚰",
      color: "from-cyan-400 to-blue-500",
      action: () => toast.info("Water bill payment coming soon!"),
    },
    {
      id: "credit",
      label: "Credit Card",
      icon: "💳",
      color: "from-indigo-400 to-blue-600",
      action: () => toast.info("Credit card payment coming soon!"),
    },
    {
      id: "scan",
      label: "Scan & Pay",
      icon: "📷",
      color: "from-green-400 to-teal-600",
      action: onScanPay,
    },
    {
      id: "bank",
      label: "Send to Bank",
      icon: "🏦",
      color: "from-slate-400 to-slate-600",
      action: () => toast.info("Bank transfer coming soon!"),
    },
    {
      id: "rewards",
      label: "Rewards",
      icon: "🎁",
      color: "from-pink-400 to-rose-600",
      action: onRewards,
    },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Quick Actions</h2>

      <TooltipProvider>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-3 ">
          {actions.map((action) => (
            <Tooltip key={action.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={action.action}
                  className="group relative w-full"
                >
                  <Card className="aspect-square w-full flex flex-col items-center justify-center gap-2 p-2 sm:p-4 hover-lift hover:shadow-xl transition-all duration-300 bg-card overflow-hidden">
                    {/* Ripple Effect Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    {/* Icon */}
                    <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                      {action.icon}
                    </span>

                    {/* Label */}
                    <span className="text-xs font-medium text-center relative z-10">
                      {action.label}
                    </span>
                  </Card>
                </button>
              </TooltipTrigger>
              <TooltipContent>{action.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>

    </section>
  );
};

export default QuickActionsGrid;
