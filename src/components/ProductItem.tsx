import React, { useState } from "react";
import product1 from "../assets/product1first.jpg";
import product12nd from '../assets/product1second.jpg'
import { Link } from "react-router-dom";

import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdZoomOutMap } from "react-icons/md";
import { Tooltip } from "@radix-ui/react-tooltip";

const ProductItem = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="productItem rounded-md overflow-hidden bg-card border shadow-lg" onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

      {/* IMAGE SECTION */}
      <div className="group relative w-full h-[250px] overflow-hidden" >

        {/* PRODUCT IMAGE */}
        <img
          src={isHovered ? product12nd : product1}
          alt="product"
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* DISCOUNT BADGE */}
        <span className="absolute top-[10px] left-[10px] z-50 bg-primary text-white rounded-md px-2 py-1 text-sm ">
          10%
        </span>

        {/* ACTION ICONS */}
        <div
          className="
            absolute top-[15px] right-[8px] z-50
            flex flex-col gap-2
            opacity-0 translate-x-6
            group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-300 ease-out
          "
        >
         
            <Button
            className="!w-[36px] !h-[36px] !min-w-[36px] 
                       !rounded-full !bg-yellow-400  !text-black hover:!text-white shadow-md">
            <MdZoomOutMap size={14} />
          </Button>
          

          <Button
            className="!w-[36px] !h-[36px] !min-w-[36px] 
                       !rounded-full !bg-yellow-400 
                       
                       !text-black hover:!text-white shadow-md"
          >
            <FaRegHeart size={14} />
          </Button>

          <Button
            className="!w-[36px] !h-[36px] !min-w-[36px] 
                       !rounded-full !bg-yellow-400 
                       
                       !text-black hover:!text-white shadow-md"
          >
            <IoGitCompareOutline size={14} />
          </Button>
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="info p-3 bg-[#f1f1f1]">
        <h6 className="text-sm text-blue-500">
          <Link to="/" className="hover:underline">
            Flying Machine
          </Link>
        </h6>

        <h3 className="text-[rgba(0,0,0,0.85)] mt-1 font-medium text-sm">
          Women Wide Leg Killer Jeans
        </h3>

        <Rating name="read-only" value={4} size="small" readOnly />

        <div className="flex items-center gap-3 mt-1">
          <span className="line-through text-gray-400 text-sm">$59.00</span>
          <span className="text-primary font-bold text-sm">$39.00</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
