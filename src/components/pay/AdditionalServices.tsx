import { Card } from "@/components/ui/card";
import { ChevronRight, CreditCard, Shield, Wallet } from "lucide-react";
import { toast } from "sonner";

const services = [
  {
    id: 1,
    title: "Apply for ShoppingCart Credit Card",
    subtitle: "Get instant approval & exclusive rewards",
    icon: CreditCard,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    id: 2,
    title: "Insurance Plans",
    subtitle: "Protect what matters most to you",
    icon: Shield,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    id: 3,
    title: "EMI Options",
    subtitle: "Convert purchases to easy installments",
    icon: Wallet,
    color: "text-purple-600",
    bgColor: "bg-purple-500/10",
  },
];

const AdditionalServices = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Additional Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.id}
              className="p-4 hover-scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => toast.info(`${service.title} coming soon!`)}
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`flex-none w-12 h-12 rounded-full ${service.bgColor} flex items-center justify-center`}
                >
                  <Icon className={`h-6 w-6 ${service.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm mb-0.5 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {service.subtitle}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight className="flex-none h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default AdditionalServices;
