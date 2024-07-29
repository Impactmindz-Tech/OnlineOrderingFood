"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import onloadImg from "../../../assests/white_logo.png";
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/pagination";
import CategoryModels from "@/app/modal/CategoryModels";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import ProductsModels from "@/app/modal/ProductModels";

interface SwiperSliderProps {
  params: { id: string };
}

const SwiperSlider: React.FC<SwiperSliderProps> = ({ params }) => {
  const [category, setCategory] = useState<CategoryModels[]>([]);
  const [product, setProduct] = useState<ProductsModels[]>([]);
  const fetchCategory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Category"));
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
  const fetchProduct = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Products"));
      const productList: ProductsModels[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as ProductsModels;
        return {
          ...data,
          id: doc.id,
        };
      });
      setProduct(productList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategory();
    fetchProduct();
  }, []);
  return (
    <section className="main-bg">
      <div className="page_width h-full">
        <div className="flex justify-center h-full p-10">
          <Image width={200} height={100} src={onloadImg} alt="onload img" />
        </div>
        <div className="">
          <button className="text-[#fff] bg-[#ded4c4] p-3 rounded-xl font-bold">Back</button>
        </div>
        <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} pagination={{ clickable: true }} slidesPerView={1}>
          {category
            ?.filter((cat) => cat?.Category == params?.id)
            ?.map((item) => {
              return (
                <>
                  <SwiperSlide key={`${item?.id}-cat`}>
                    <div className="text-center mt-10">
                      <h1 className="text-white text-4xl font-semibold">{item?.Name}</h1>
                      <p className="text-white">Choose One</p>
                      <div className="flex flex-wrap gap-3 pt-14">
                        {product
                          ?.filter((pro) => pro?.meal == item?.Category)
                          ?.map((prodctItem) => {
                            return (
                              <div key={`${prodctItem?.id}-pro`} className="flex flex-col w-[48%]">
                                <Image width={349} height={50} className="w-[349px] h-[232px]" src={prodctItem?.ImageUrl} alt="" />
                                <h1 className="text-black text-4xl font-semibold">{prodctItem?.Name}</h1>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </SwiperSlide>
                </>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
};

export default SwiperSlider;
