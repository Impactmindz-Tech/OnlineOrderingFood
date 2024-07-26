import React from "react";
import onloadImg from "../../../assests/white_logo.png";
import cat_img from "../../../assests/cat_img.webp";
import Image from "next/image";
import Link from "next/link";

const category = () => {
  return (
    <section className="main-bg">
      <div className="page_width">
        <div>
          <div className="flex justify-center">
            <Image width={200} height={100} src={onloadImg} alt="onload img" />
          </div>
          <div className="pt-7">
            <button className="text-[#fff] bg-[#ded4c4] p-3 rounded-xl font-bold">Back</button>
          </div>
          <div className="flex flex-col gap-5 py-5">
            <div className="w-full h-[150px] relative">
              <div className="bg-[#0000008e] absolute top-0 w-full h-full left-0"></div>
              <Image className="w-full h-full object-cover" src={cat_img} alt="onload img" />
              <p className="absolute top-[50%] left-[50%] transform text-xl font-semibold text-white">Morning</p>
            </div>
            <div className="w-full h-[150px] relative">
              <div className="bg-[#0000008e] absolute top-0 w-full h-full left-0"></div>
              <Image className="w-full h-full object-cover" src={cat_img} alt="onload img" />
              <p className="absolute top-[50%] left-[50%] transform text-xl font-semibold text-white">Lunch</p>
            </div>
            <div className="w-full h-[150px] relative">
              <div className="bg-[#0000008e] absolute top-0 w-full h-full left-0"></div>
              <Image className="w-full h-full object-cover" src={cat_img} alt="onload img" />
              <p className="absolute top-[50%] left-[50%] transform text-xl font-semibold text-white">Dinner</p>
            </div>
          </div>
          <Link href={"/online_ordering/category"}>
            <button className="bg-[#2F52A0] py-4 w-full text-white font-semibold text-xl">Order</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default category;
