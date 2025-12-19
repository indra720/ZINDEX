import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero1 from "../assets/hero1.jpg"
import hero2 from "../assets/hero2.jpg"
import hero3 from "../assets/hero3.jpg"


const slides = [
  {
    id: 1,
    title: "Mega Electronics Sale",
    subtitle: "Up to 70% OFF on Smartphones & Laptops",
    cta: "Shop Now",
    gradient: "from-blue-600 to-blue-400",
    image: hero1,
  },
  {
    id: 2,
    title: "Fashion Fiesta",
    subtitle: "Trending Styles at Unbeatable Prices",
    cta: "Explore Fashion",
    gradient: "from-purple-600 to-pink-400",
    image:hero2,
  },
  // {
  //   id: 3,
  //   title: "Home Appliances",
  //   subtitle: "Smart Living Made Affordable",
  //   cta: "Browse Deals",
  //   gradient: "from-orange-600 to-red-400",
  //   image:hero3,
  // },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[400px] md:h-[200px] lg:h-[300px] xl:h-[400px] overflow-hidden rounded-xl ">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? "translate-x-0" : "translate-x-full"
          } ${index < currentSlide ? "-translate-x-full" : ""}`}
        >
          {/* <div className={`w-full h-full bg-gradient-to-r ${slide.gradient} flex items-center justify-center text-center px-4`}>
            <div className="text-white space-y-4 animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-xl md:text-2xl font-light">
                {slide.subtitle}
              </p>
              <Button size="lg" variant="secondary" className="hover-lift text-lg">
                {slide.cta}
              </Button>
            </div>
          </div> */}
          <img src={slide.image} alt="" className="h-full w-full object-cover object-center"/>
        </div>
      ))}

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-10 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/100 text-white rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-10 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
