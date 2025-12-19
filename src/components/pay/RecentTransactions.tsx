import { Card } from "@/components/ui/card";
import { Check, Clock } from "lucide-react";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  date: string;
  status: "success" | "pending";
  icon: string;
  color: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    type: "Electricity Bill",
    amount: 1200,
    date: "Today, 10:30 AM",
    status: "success",
    icon: "💡",
    color: "text-yellow-600",
  },
  {
    id: 2,
    type: "Mobile Recharge",
    amount: 299,
    date: "Yesterday, 3:45 PM",
    status: "success",
    icon: "📱",
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "DTH Recharge",
    amount: 450,
    date: "2 days ago",
    status: "success",
    icon: "📺",
    color: "text-purple-600",
  },
  {
    id: 4,
    type: "Water Bill",
    amount: 350,
    date: "3 days ago",
    status: "pending",
    icon: "🚰",
    color: "text-cyan-600",
  },
];

const RecentTransactions = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Recent Transactions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {transactions.map((transaction) => (
          <Card
            key={transaction.id}
            className="p-4 hover:bg-muted/50 h-15 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-4 ">
              {/* Icon */}
              <div className="flex-none w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                {transaction.icon}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-0.5">
                  {transaction.type}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {transaction.date}
                </p>
              </div>

              {/* Amount & Status */}
              <div className="flex-none text-right">
                <p className="font-bold text-sm mb-1">
                  ₹{transaction.amount}
                </p>
                <div
                  className={`flex items-center gap-1 text-xs ${
                    transaction.status === "success"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {transaction.status === "success" ? (
                    <>
                      <Check className="h-3 w-3" />
                      <span>Paid</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3" />
                      <span>Pending</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default RecentTransactions;
