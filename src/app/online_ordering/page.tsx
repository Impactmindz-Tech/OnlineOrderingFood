"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import location_imgs from "../../assests/test.png";
import alert_img from "../../assests/aleert.png";
import onloadImg from "../../assests/white_logo.png";
import MapComponent from "../components/mapcomponents/MapComponent";
import SearchComponent from "../components/SearchComponent/SearchComponent";
import { setInLocalStorage } from "../utills/LocalStorageUtills";

const OnlineOrdering: React.FC = () => {
  const [selectPosition, setSelectPosition] = useState<any>(null);
  setInLocalStorage("location", selectPosition);

  return (
    <section className="main-bg">
      <div className="page_width">
        <div>
          <div className="flex justify-center h-full p-10">
            <Image width={200} height={100} src={onloadImg} alt="onload img" />
          </div>
          <div className="">
            <h1 className="text-[#fff] text-4xl font-bold">
              So Where Are <br /> you at?
            </h1>
          </div>
          <div className="text-center pt-14">
            <div className="text-center flex justify-center">
              <Image width={100} height={100} src={alert_img} alt="onload img" />
            </div>
            <div className="bg-[#ded4c4] text-center py-4">
              <button className="text-2xl text-[#3E3939] font-semibold">Auto-Complete SelectBox</button>
              <SearchComponent selectPosition={selectPosition} setSelectPosition={setSelectPosition} />
            </div>
            <p className="text-[#5663FF] text-xl font-bold text-center pt-3">I Rather use my Name</p>
          </div>
          <div className="flex justify-center py-8 pt-32">
            <Image width={200} height={200} src={location_imgs} alt="onload img" />
          </div>
          <Link href={"/online_ordering/category"}>
            <button className="bg-[#2F52A0] py-4 w-full text-white font-semibold text-xl">Continue</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OnlineOrdering;
