import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import fashion from "../assets/fashion-category.png";
import electronics from "../assets/elect-category.png";
import bag from "../assets/bags-category.png";
import footwear from "../assets/shoes.png";
import groceries from "../assets/groceries.png";
import beauty from "../assets/beauty-category.png";
import wellness from "../assets/wellnes.png";
import jewellry from "../assets/jewellry.png";

const Category = () => {

  const swiperRef = useRef(null);

  const scroll = (direction) => {
    if (!swiperRef.current) return;

    if (direction === "left") {
      swiperRef.current.slidePrev();
    } else {
      swiperRef.current.slideNext();
    }
  };

  const categorycard = [
    { title: "Fashion", image: fashion, id: 1 },
    { title: "Electronics", image: electronics, id: 2 },
    { title: "Bags", image: bag, id: 3 },
    { title: "Footwear", image: footwear, id: 4 },
    { title: "Groceries", image: groceries, id: 5 },
    { title: "Beauty", image: beauty, id: 6 },
    { title: "Jewellry", image: jewellry, id: 7 },
    { title: "Wellness", image: wellness, id: 8 },
    { title: "Winter", image: fashion, id: 9 },
    { title: "Womens", image: footwear, id: 10 },
  ];

  return (
    <div className="homecatslider py-4">

      {/* Header + Left/Right Buttons */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold relative">
          Category
          <div className="absolute -bottom-1 left-0 w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </h2>

        {/* Custom Scroll Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Swiper */}
      <div className="container">
        <Swiper
          spaceBetween={20}
          navigation={false} // ❗Disable default arrows
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 8 },
          }}
        >
          {categorycard.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="item p-3 bg-white rounded-sm shadow hover:shadow-lg text-center cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
                  className="mx-auto w-16 h-16 object-contain transition-transform duration-300 hover:scale-110"
                />
                <span className="block mt-2 font-medium">{item.title}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Category;












