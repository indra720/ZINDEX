import React from "react";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "swiper/modules";

import offer1 from "../assets/offer1.png";
import offer2 from "../assets/offer2.png";
import offer3 from "../assets/offer3.png";
import offer4 from "../assets/offer4.png";
import offer5 from "../assets/offer5.png";
import offer6 from "../assets/offer6.jpg";
import offer7 from "../assets/offer7.webp";
import offer8 from "../assets/offer8.jpg";
import { Link } from "react-router-dom";
const BannerSlider = () => {
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
    { image: offer1, id: 1, link: "/" },
    { image: offer2, id: 2, link: "/pay" },
    { image: offer3, id: 3, link: "/notifications" },
    { image: offer4, id: 4, link: "login/" },
    { image: offer5, id: 5, link: "/profile" },
    { image: offer6, id: 6, link: "/" },
    { image: offer7, id: 7, link: "/" },
    { image: offer8, id: 8, link: "/" },
  ];
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold relative">
          Ads Card
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
      <div className="container w-full">
        <Swiper
          spaceBetween={20}
          navigation={false} // ❗Disable default arrows
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          breakpoints={{
            0: { slidesPerView: 1.5 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4.5 },
          }}
        >
          {categorycard.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="box flex justify-center items-center h-[350pxpx] w-[320px]   rounded-sm shadow hover:shadow-lg text-center cursor-pointer ">
                <Link to={item.link} className="group block">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mx-auto w-[280px] h-[300px] object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2 "
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default BannerSlider;
