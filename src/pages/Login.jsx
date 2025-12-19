// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, ShoppingBag, Sparkles, Shield, Truck, Gift, Loader2 } from "lucide-react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { motion, AnimatePresence } from "framer-motion";

// const Login = () => {
//   const [tab, setTab] = useState("login");
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: "" }));
//     }
//   };

//   const validateForm = (isSignup = false) => {
//     let valid = true;
//     let newErrors = {};

//     if (isSignup && !formData.name.trim()) {
//       newErrors.name = "Name is required";
//       valid = false;
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//       valid = false;
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email address is invalid";
//       valid = false;
//     }

//     if (!formData.password.trim()) {
//       newErrors.password = "Password is required";
//       valid = false;
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   }

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/users/?email=${formData.email}&password=${formData.password}`,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (!response.ok) throw new Error("Login failed");

//       toast.success("Login Successful!");
//       setFormData({ name: "", email: "", password: "" });
//       setErrors({});
//       navigate("/");
//     } catch (error) {
//       toast.error(error.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm(true)) return;

//     setIsLoading(true);
//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) throw new Error("Signup failed");

//       toast.success("Signup successful! Please login.");
//       setFormData({ name: "", email: "", password: "" });
//       setErrors({});
//       setTab("login");
//     } catch (error) {
//       toast.error(error.message || "Signup failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const features = [
//     { icon: Shield, title: "Secure Shopping", desc: "100% secure payments" },
//     { icon: Truck, title: "Fast Delivery", desc: "Free shipping on orders" },
//     { icon: Gift, title: "Exclusive Deals", desc: "Members-only offers" },
//     { icon: Sparkles, title: "Premium Quality", desc: "Curated products" },
//   ];

//   // Dummy social login handlers
//   const handleSocialLogin = (provider) => {
//     toast.info(`Redirecting to ${provider} login...`);
//     // In a real app, you'd redirect to your backend/OAuth provider
//   };

//   const GoogleIcon = (props) => (
//     <svg {...props} viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.49,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
//   );

//   const GitHubIcon = (props) => (
//     <svg {...props} viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
//   );

//   return (
//   <div className="min-h-screen bg-background">

//   {/* HEADER */}
//   <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b h-16 flex items-center">
//     <div className="container mx-auto px-4 flex items-center gap-3">
//       <Link to="/">
//         <Button variant="ghost" size="icon">
//           <ArrowLeft className="h-5 w-5" />
//         </Button>
//       </Link>
//       <h1 className="text-xl font-semibold">Account</h1>
//     </div>
//   </header>

//   {/* MAIN GRID */}
//   <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2">

//     {/* LEFT SECTION—Hidden on mobile */}
//     <motion.div
//       initial={{ opacity: 0, x: -50 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.6 }}
//       className="hidden lg:flex relative items-center justify-center p-10"
//     >
//       <div className="absolute inset-0 gradient-hero" />

//       {/* Floating animations */}
//       <motion.div
//         animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
//         transition={{ duration: 8, repeat: Infinity }}
//         className="absolute top-20 left-20 w-52 h-52 bg-white/10 rounded-full blur-3xl"
//       />

//       <motion.div
//         animate={{ scale: [1.2, 1, 1.2], x: [0, -30, 0], y: [0, 30, 0] }}
//         transition={{ duration: 10, repeat: Infinity }}
//         className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/30 rounded-full blur-3xl"
//       />

//       {/* Content */}
//       <div className="relative z-10 max-w-lg p-10">
//         <div className="flex items-center gap-3 mb-8">
//           <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
//             <ShoppingBag className="w-7 h-7" />
//           </div>
//           <span className="text-3xl font-bold">ShoppingCart</span>
//         </div>

//         <h2 className="text-4xl font-bold mb-4">
//           Shop Smarter,<br />
//           <span className="text-secondary">Live Better</span>
//         </h2>

//         <p className="text-lg mb-10 max-w-md">
//           Join millions of happy customers and discover amazing deals.
//         </p>

//         {/* Features Grid */}
//         <div className="grid grid-cols-2 gap-4">
//           {features.map((f, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 + i * 0.1 }}
//               className="bg-white/10 p-4 rounded-xl border border-white/20"
//             >
//               <f.icon className="w-8 h-8 text-secondary mb-2" />
//               <h3 className="font-semibold">{f.title}</h3>
//               <p className="text-sm">{f.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.div>

//         {/* RIGHT SIDE */}
//         <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-4 relative">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="w-full max-w-md"
//           >
//             <div className="bg-card/95 rounded-2xl shadow-xl border overflow-hidden">

//               {/* Tabs */}
//               <div className="p-6">
//                 <Tabs value={tab} onValueChange={setTab}>
//                   <TabsList className="grid grid-cols-2 bg-muted rounded-xl p-1 mb-6">
//                     <TabsTrigger value="login">Login</TabsTrigger>
//                     <TabsTrigger value="signup">Sign Up</TabsTrigger>
//                   </TabsList>

//                   <AnimatePresence mode="wait">

//                     {/* LOGIN FORM */}
//                     <TabsContent value="login">
//                       <motion.form
//                         key="login"
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: 20 }}
//                         onSubmit={handleLoginSubmit}
//                         className="space-y-4"
//                       >
//                         {/* Email */}
//                         <div>
//                           <Label>Email</Label>
//                           <div className="relative">
//                             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
//                             <Input
//                               type="email"
//                               name="email"
//                               value={formData.email}
//                               onChange={handleChange}
//                               className={`pl-10 h-12 ${errors.email ? "border-red-500" : ""}`}
//                               placeholder="Enter your email"
//                             />
//                           </div>
//                           {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//                         </div>

//                         {/* Password */}
//                         <div>
//                           <Label>Password</Label>
//                           <div className="relative">
//                             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
//                             <Input
//                               type={showPassword ? "text" : "password"}
//                               name="password"
//                               value={formData.password}
//                               onChange={handleChange}
//                               className={`pl-10 pr-10 h-12 ${errors.password ? "border-red-500" : ""}`}
//                               placeholder="Enter your password"
//                             />
//                             <button
//                               type="button"
//                               className="absolute right-3 top-1/2 -translate-y-1/2"
//                               onClick={() => setShowPassword(!showPassword)}
//                             >
//                               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                             </button>
//                           </div>
//                           {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
//                         </div>

//                         <div className="text-right">
//                           <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
//                             Forgot Password?
//                           </Link>
//                         </div>

//                         <Button type="submit" className="w-full h-12" disabled={isLoading}>
//                           {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                           Login
//                         </Button>
//                       </motion.form>
//                     </TabsContent>

//                     {/* SIGNUP FORM */}
//                     <TabsContent value="signup">
//                       <motion.form
//                         key="signup"
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, x: -20 }}
//                         onSubmit={handleSignupSubmit}
//                         className="space-y-4"
//                       >
//                         {/* Name */}
//                         <div>
//                           <Label>Full Name</Label>
//                           <div className="relative">
//                             <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
//                             <Input
//                               type="text"
//                               name="name"
//                               value={formData.name}
//                               onChange={handleChange}
//                               placeholder="Enter your full name"
//                               className={`pl-10 h-12 ${errors.name ? "border-red-500" : ""}`}
//                             />
//                           </div>
//                           {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
//                         </div>

//                         {/* Email */}
//                         <div>
//                           <Label>Email</Label>
//                           <div className="relative">
//                             <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
//                             <Input
//                               type="email"
//                               name="email"
//                               value={formData.email}
//                               onChange={handleChange}
//                               placeholder="Enter your email"
//                               className={`pl-10 h-12 ${errors.email ? "border-red-500" : ""}`}
//                             />
//                           </div>
//                           {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
//                         </div>

//                         {/* Password */}
//                         <div>
//                           <Label>Password</Label>
//                           <div className="relative">
//                             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
//                             <Input
//                               type={showPassword ? "text" : "password"}
//                               name="password"
//                               value={formData.password}
//                               onChange={handleChange}
//                               placeholder="Create a password"
//                               className={`pl-10 pr-10 h-12 ${errors.password ? "border-red-500" : ""}`}
//                             />
//                             <button
//                               type="button"
//                               onClick={() => setShowPassword(!showPassword)}
//                               className="absolute right-3 top-1/2 -translate-y-1/2"
//                             >
//                               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                             </button>
//                           </div>
//                           {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
//                         </div>

//                         <Button type="submit" className="w-full h-12" disabled={isLoading}>
//                           {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
//                           Create Account
//                         </Button>
//                       </motion.form>
//                     </TabsContent>

//                   </AnimatePresence>

//                   {/* Social Login Separator */}
//                   <div className="relative my-6">
//                     <div className="absolute inset-0 flex items-center">
//                       <span className="w-full border-t" />
//                     </div>
//                     <div className="relative flex justify-center text-xs uppercase">
//                       <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
//                     </div>
//                   </div>

//                   {/* Social Login Buttons */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <Button variant="outline" className="h-12" onClick={() => handleSocialLogin('Google')}>
//                       <GoogleIcon className="mr-2 h-5 w-5" /> Google
//                     </Button>
//                     <Button variant="outline" className="h-12" onClick={() => handleSocialLogin('GitHub')}>
//                       <GitHubIcon className="mr-2 h-5 w-5" /> GitHub
//                     </Button>
//                   </div>
//                 </Tabs>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ShoppingBag,
  Sparkles,
  Shield,
  Truck,
  Gift,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateLogin = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateSignup = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      valid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be 6+ characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/?email=${
          formData.email
        }&password=${formData.password}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Login failed");

      toast.success("Login Successful!");
      setFormData({ name: "", email: "", password: "" });
      setErrors({});
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Signup failed");

      toast.success("Signup successful! Please login.");
      setFormData({ name: "", email: "", password: "" });
      setErrors({});
      setTab("login");
    } catch (error) {
      toast.error(error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };


    const GoogleIcon = (props) => (
    <svg {...props} viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.012,36.49,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
  );

  const GitHubIcon = (props) => (
    <svg {...props} viewBox="0 0 16 16"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
  );
  const features = [
    { icon: Shield, title: "Secure Shopping", desc: "100% secure payments" },
    { icon: Truck, title: "Fast Delivery", desc: "Free shipping on orders" },
    { icon: Gift, title: "Exclusive Deals", desc: "Members-only offers" },
    { icon: Sparkles, title: "Premium Quality", desc: "Curated products" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b h-16 flex items-center">
        <div className="container mx-auto px-4 flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Account</h1>
        </div>
      </header>

      {/* GRID */}
      <div className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE — CENTER + PREMIUM LOOK */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden lg:flex items-center justify-center relative overflow-hidden"
        >
          {/* Soft gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-purple-300/20 to-blue-300/20 blur-3xl opacity-80" />

          {/* Floating lights */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-24 left-28 w-52 h-52 bg-white/10 blur-3xl rounded-full"
          />

          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-24 right-28 w-72 h-72 bg-secondary/20 blur-3xl rounded-full"
          />

          {/* CONTENT */}
          <div className="relative z-10 text-center p-16 max-w-xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-bold">ShoppingCart</h1>
            </motion.div>

            <h2 className="text-5xl font-extrabold leading-tight mb-6">
              Shop Smarter,
              <br />
              <span className="text-secondary">Live Better</span>
            </h2>

            <p className="text-lg text-foreground/80 mb-12">
              Discover premium quality items & exclusive discount offers.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-md shadow border border-white/20 p-4 rounded-xl"
                >
                  <f.icon className="w-9 h-9 text-secondary mb-2" />
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm opacity-80">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE — PERFECT CENTER FORM */}
        <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="bg-card/95 rounded-2xl shadow-xl border overflow-hidden">
              {/* Tabs */}
              <div className="p-6">
                <Tabs value={tab} onValueChange={setTab}>
                  <TabsList className="grid grid-cols-2 bg-muted rounded-xl p-1 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    {/* LOGIN FORM */}
                    <TabsContent value="login">
                      <motion.form
                        key="login"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onSubmit={handleLoginSubmit}
                        className="space-y-4"
                      >
                        {/* Email */}
                        <div>
                          <Label>Email</Label>
                          <div className="relative">
                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className={`pl-10 h-12 ${
                                errors.email ? "border-red-500" : ""
                              }`}
                              placeholder="Enter your email"
                            />
                          </div>
                          {errors.email && (
                            <p className="text-red-500 text-xs">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Password */}
                        <div>
                          <Label>Password</Label>
                          <div className="relative">
                            {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" /> */}
                            <Input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              className={`pl-10 pr-10 h-12 ${
                                errors.password ? "border-red-500" : ""
                              }`}
                              placeholder="Enter your password"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="text-red-500 text-xs">
                              {errors.password}
                            </p>
                          )}
                        </div>

                        <div className="text-right">
                          <Link
                            to="/forgot-password"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Forgot Password?
                          </Link>
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-12"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          Login
                        </Button>
                      </motion.form>
                    </TabsContent>

                    {/* SIGNUP FORM */}
                    <TabsContent value="signup">
                      <motion.form
                        key="signup"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={handleSignupSubmit}
                        className="space-y-4"
                      >
                        {/* Name */}
                        <div>
                          <Label>Full Name</Label>
                          <div className="relative">
                            <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                            <Input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Enter your full name"
                              className={`pl-10 h-12 ${
                                errors.name ? "border-red-500" : ""
                              }`}
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-500 text-xs">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <Label>Email</Label>
                          <div className="relative">
                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
                            <Input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Enter your email"
                              className={`pl-10 h-12 ${
                                errors.email ? "border-red-500" : ""
                              }`}
                            />
                          </div>
                          {errors.email && (
                            <p className="text-red-500 text-xs">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Password */}
                        <div>
                          <Label>Password</Label>
                          <div className="relative">
                            {/* <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" /> */}
                            <Input
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Create a password"
                              className={`pl-10 pr-10 h-12 ${
                                errors.password ? "border-red-500" : ""
                              }`}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                          {errors.password && (
                            <p className="text-red-500 text-xs">
                              {errors.password}
                            </p>
                          )}
                        </div>

                        <Button
                          type="submit"
                          className="w-full h-12"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          Create Account
                        </Button>
                      </motion.form>
                    </TabsContent>
                  </AnimatePresence>

                  {/* Social Login Separator */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-12"
                      onClick={() => handleSocialLogin("Google")}
                    >
                      <GoogleIcon className="mr-2 h-5 w-5" /> Google
                    </Button>
                    <Button
                      variant="outline"
                      className="h-12"
                      onClick={() => handleSocialLogin("GitHub")}
                    >
                      <GitHubIcon className="mr-2 h-5 w-5" /> GitHub
                    </Button>
                  </div>
                </Tabs>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
