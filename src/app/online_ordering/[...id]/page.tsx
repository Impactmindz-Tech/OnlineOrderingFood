"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import onloadImg from "../../../assests/white_logo.png";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import CategoryModels from "@/app/modal/CategoryModels";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, addProduct, addToCart } from "@/app/store/slice/ProductSlice";
import CheckIcon from "@mui/icons-material/Check";
import { RootState } from "@/app/store/Store";
import { ProductsModels } from "@/app/modal/ProductModels";

interface SwiperSliderProps {
  params: { id: string };
}

const SwiperSlider: React.FC<SwiperSliderProps> = ({ params }) => {
  const dispatch = useDispatch();
  const category = useSelector((state:RootState) => state.Product.category);
  const product = useSelector((state:RootState) => state.Product.products);
  const cart = useSelector((state:RootState) => state.Product.cart);

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
      dispatch(addCategory(categoryList));
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
      dispatch(addProduct(productList));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product: ProductsModels) => {
    dispatch(addToCart(product));
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
        <Swiper autoHeight={true} modules={[Pagination]} pagination={{ clickable: true }} slidesPerView={1}>
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
                          ?.filter((pro:ProductsModels) => pro?.category == item?.Name)
                          ?.map((prodctItem:ProductsModels) => {
                            const isActive = cart.some((cartItem:ProductsModels) => cartItem.id === prodctItem.id);
                            return (
                              <div key={`${prodctItem?.id}-pro`} className={`flex flex-col w-[48%] cursor-pointer relative`} onClick={() => handleAddToCart(prodctItem)}>
                                {isActive && (
                                  <div className="w-full h-full bg-[#9efeb98a] absolute flex items-center justify-center">
                                    <CheckIcon sx={{width:"100px" ,fontSize:"80px", fill:"white"}} />
                                  </div>
                                )}
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
