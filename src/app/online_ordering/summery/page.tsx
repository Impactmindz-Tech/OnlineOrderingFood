import Image from "next/image";
import React from "react";
import onloadImg from "../../../assests/white_logo.png";
import Link from "next/link";

const viewMeals = () => {
  return (
    <section className="main-bg">
      <div className="page_width h-full">
        <div className="flex justify-center h-full p-10">
          <Image width={200} height={100} src={onloadImg} alt="onload img" />
        </div>
        <div className="">
          <button className="text-[#fff] bg-[#ded4c4] p-3 rounded-xl font-bold">Back</button>
        </div>
        <div className="pt-5">
          <h1 className="text-white text-xl">Breakfast</h1>
          <p className="text-white">Oat Meal</p>
        </div>
        <div className="pt-5">
          <h1 className="text-white text-xl">Lunch</h1>
          <p className="text-white">Oat Meal</p>
        </div>
        <div className="pt-5">
          <h1 className="text-white text-xl">Dinner</h1>
          <p className="text-white">Oat Meal</p>
        </div>
        <div className="pt-10">
          <h1 className="bg-[#eadecf] p-3 rounded-lg">The Location</h1>
          <div className="pt-5">
            <input type="checkbox" name="" id="" />
            <label className="pl-2" htmlFor="">
              Tomorrow
            </label>
          </div>
          <div className="pt-5">
            <input type="checkbox" name="" id="" />
            <label className="pl-2" htmlFor="">
              The Rest of this Week
            </label>
          </div>
          <div className="pt-5">
            <input type="checkbox" name="" id="" />
            <label className="pl-2" htmlFor="">
              All My Staying
            </label>
          </div>

          <Link href={"/online_ordering/select_meals"}>
            <button className="bg-[#2F52A0] py-4 w-full text-white font-semibold text-xl mt-10">Approve and Send It</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default viewMeals;
