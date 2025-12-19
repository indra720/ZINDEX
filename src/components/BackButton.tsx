import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface BackButtonProps {
  showHomeButton?: boolean;
  className?: string;
}

const BackButton = ({ showHomeButton = true, className = "" }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 rounded-full hover:bg-primary/10 hover:text-primary hover:border-primary transition-all"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Back</span>
      </Button>
      
      {showHomeButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Home</span>
        </Button>
      )}
    </motion.div>
  );
};

export default BackButton;
