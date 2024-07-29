"use client";
import React, { useEffect, useState } from "react";
import onloadImg from "../../../assests/white_logo.png";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import CategoryModels from "@/app/modal/CategoryModels";

const category = () => {
  const [category, setCategory] = useState<CategoryModels[]>([]);

  const fetchCategory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Meals"));
      const categoryList: CategoryModels[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as CategoryModels;
        return {
          ...data,
          id: doc.id,
        };
      });
      setCategory(categoryList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <section className="main-bg">
      <div className="page_width h-full">
        <div className="h-full">
          <div className="flex justify-center h-full p-10">
            <Image width={200} height={100} src={onloadImg} alt="onload img" />
          </div>
          <div className="">
            <button className="text-[#fff] bg-[#ded4c4] p-3 rounded-xl font-bold">Back</button>
          </div>
          {category?.map((item, index) => {
            return (
              <Link href={`/online_ordering/${item?.Name}`}>
                <div key={index} className="flex flex-col gap-5 py-5">
                  <div className="w-full h-[185px] relative">
                    {/* <div className="bg-[#9efeb98a] absolute top-0 w-full h-full left-0"></div> */}
                    <div className="bg-[#00000083] absolute top-0 w-full h-full left-0"></div>
                    <img className="object-cover w-full h-full" src={item?.ImageUrl} alt="category image" />
                    <p className="absolute top-[50%] left-[50%] transform text-xl font-semibold text-white">{item?.Name}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default category;
