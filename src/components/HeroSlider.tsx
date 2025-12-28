// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import hero1 from "../assets/hero1.jpg"
// import hero2 from "../assets/hero2.jpg"
// import hero3 from "../assets/hero3.jpg"


// const slides = [
//   {
//     id: 1,
//     title: "Mega Electronics Sale",
//     subtitle: "Up to 70% OFF on Smartphones & Laptops",
//     cta: "Shop Now",
//     gradient: "from-blue-600 to-blue-400",
//     image: hero1,
//   },
//   {
//     id: 2,
//     title: "Fashion Fiesta",
//     subtitle: "Trending Styles at Unbeatable Prices",
//     cta: "Explore Fashion",
//     gradient: "from-purple-600 to-pink-400",
//     image:hero2,
//   },
//   // {
//   //   id: 3,
//   //   title: "Home Appliances",
//   //   subtitle: "Smart Living Made Affordable",
//   //   cta: "Browse Deals",
//   //   gradient: "from-orange-600 to-red-400",
//   //   image:hero3,
//   // },
// ];

// const HeroSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);

//     return () => clearInterval(timer);
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <div className="relative h-[400px] md:h-[200px] lg:h-[300px] xl:h-[400px] overflow-hidden rounded-xl ">
//       {slides.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
//             index === currentSlide ? "translate-x-0" : "translate-x-full"
//           } ${index < currentSlide ? "-translate-x-full" : ""}`}
//         >
//           {/* <div className={`w-full h-full bg-gradient-to-r ${slide.gradient} flex items-center justify-center text-center px-4`}>
//             <div className="text-white space-y-4 animate-fade-in">
//               <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
//                 {slide.title}
//               </h2>
//               <p className="text-xl md:text-2xl font-light">
//                 {slide.subtitle}
//               </p>
//               <Button size="lg" variant="secondary" className="hover-lift text-lg">
//                 {slide.cta}
//               </Button>
//             </div>
//           </div> */}
//           <img src={slide.image} alt="" className="h-full w-full object-cover object-center"/>
//         </div>
//       ))}

//       {/* Navigation Buttons */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute left-10 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/100 text-white rounded-full"
//         onClick={prevSlide}
//       >
//         <ChevronLeft className="h-6 w-6" />
//       </Button>
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full"
//         onClick={nextSlide}
//       >
//         <ChevronRight className="h-6 w-6" />
//       </Button>

//       {/* Dots Indicator */}
//       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentSlide(index)}
//             className={`w-3 h-3 rounded-full transition-all ${
//               index === currentSlide
//                 ? "bg-white w-8"
//                 : "bg-white/50 hover:bg-white/75"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HeroSlider;















////// Hero Section code



import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import bgVideo from "../assets/bgvideo.mp4";

/* ================= SLIDER DATA ================= */
const slides = [  
  {
    title: "Handcrafted Jewelry",
    subtitle: "Made by independent artisans",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900",
  },
  {
    title: "Vintage Decor",
    subtitle: "Rare pieces with stories",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=900",
  },
  {
    title: "Modern Home Living",
    subtitle: "Minimal, elegant & timeless",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=900",
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* 🎥 BACKGROUND VIDEO */}
      <video
        src={bgVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 🌑 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* 🌈 GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-transparent to-black/90 z-10" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center min-h-screen">

        {/* LEFT CARD */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 ">
          <video
            src={bgVideo}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[460px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-transparent" />

          <div className="absolute bottom-10 left-8 right-8">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-sm">
              🛍 Premium Marketplace
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Discover Products <br /> That Tell Stories
            </h1>

            <p className="text-gray-300 mt-4 max-w-md">
              Explore curated collections from small brands & creators.
            </p>

            <Link to="/products">
              <Button className="mt-6 gap-2 text-lg px-8 py-6">
                Shop Collection <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT SLIDER */}
        <div className="relative h-[520px] flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cn(
                "absolute w-[320px] md:w-[380px] h-[480px] rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl transition-all duration-1000",
                index === activeSlide
                  ? "opacity-100 scale-100 z-20"
                  : "opacity-0 scale-90 z-10"
              )}
            >
              <img src={slide.image} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
                <p className="text-gray-300">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;