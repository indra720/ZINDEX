// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import ProductItem from "./ProductItem"
// import "swiper/css";
// import "swiper/css/navigation";

// import { Navigation } from "swiper/modules";

// import { ChevronLeft, ChevronRight } from "lucide-react";
// const PopularProductSlide = (props) => {
//   return (
//     <>
//       <section className="productslider">
//         <div className="container">
//           <Swiper
//             spaceBetween={10}
//             navigation={false}
//             slidesPerView={props.items}
//             modules={[Navigation]}
//             className="grid grid-cols-1 md:grid-col-3 lg:grid-cols-5 gap-2"
//           >
//             <SwiperSlide>
//               <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//               <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//               <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//               <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//               <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//               <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//               <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//               <ProductItem />
//             </SwiperSlide>
//             <SwiperSlide>
//               <ProductItem />
//             </SwiperSlide>

//           </Swiper>
//         </div>
//       </section>
//     </>
//   );
// };
// export default PopularProductSlide;






import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductItem from "./ProductItem";

import "swiper/css";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PopularProductSlide = () => {
  const swiperRef = useRef(null);

  const scroll = (direction) => {
    if (!swiperRef.current) return;

    if (direction === "left") {
      swiperRef.current.slidePrev();
    } else {
      swiperRef.current.slideNext();
    }
  };

  return (
    <section className="productslider py-3">
      <div className="container">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold relative">
            Popular Products
            <span className="absolute -bottom-1 left-0 w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>

          {/* CUSTOM CONTROLS */}
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

        {/* SLIDER */}
        <Swiper
          spaceBetween={16}
          onSwiper={(swiper) => (swiperRef.current = swiper)}

          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {[...Array(9)].map((_, i) => (
            <SwiperSlide key={i}>
              <ProductItem />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PopularProductSlide;
