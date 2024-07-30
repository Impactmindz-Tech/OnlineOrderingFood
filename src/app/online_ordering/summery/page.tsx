"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import onloadImg from "../../../assests/white_logo.png";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/Store";
import { ProductsModels } from "@/app/modal/ProductModels";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { useRouter } from "next/navigation";
import { resetCart } from "@/app/store/slice/ProductSlice";
import { getFromLocalStorage } from "@/app/utills/LocalStorageUtills";

const ViewMeals: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [groupedByMeal, setGroupedByMeal] = useState<Record<string, ProductsModels[]>>({});
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({
    Tomorrow: false,
    Week: false,
    Staying: false,
  });
  console.log(selectedOptions);

  const summery = useSelector((state: RootState) => state.Product.cart);

  useEffect(() => {
    // Group products by meal type when summery changes
    if (summery) {
      const grouped = summery.reduce((acc: Record<string, ProductsModels[]>, product: ProductsModels) => {
        const mealType = product.meal || "Unknown";
        if (!acc[mealType]) {
          acc[mealType] = [];
        }
        acc[mealType].push(product);
        return acc;
      }, {});
      setGroupedByMeal(grouped);
    }
  }, [summery]);

  // Handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSelectedOptions((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
     await setDoc(doc(db, "Orders", Date.now().toString()), {
        body: {
          sechudle:selectedOptions,
          summery:summery,
          location:getFromLocalStorage("location") ? getFromLocalStorage("location")?.address : null
        },
      });
      router.push("/online_ordering/thankyou")
      dispatch(resetCart())
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <section className="main-bg">
      <div className="page_width h-full">
        <div className="flex justify-center h-full p-10">
          <Image width={200} height={100} src={onloadImg} alt="onload img" />
        </div>
        <div className="">
          <button className="text-[#fff] bg-[#ded4c4] p-3 rounded-xl font-bold">Back</button>
        </div>

        {/* Render meals grouped by type */}
        {Object.keys(groupedByMeal).length > 0 ? (
          Object.keys(groupedByMeal).map((mealType) => (
            <div key={mealType} className="pt-5">
              <h1 className="text-white text-xl">{mealType}</h1>
              {groupedByMeal[mealType].length > 0 ? (
                groupedByMeal[mealType].map((item) => (
                  <div key={item.id} className="pt-3">
                    <p className="text-white">{item.Description}</p>
                  </div>
                ))
              ) : (
                <p className="text-white">No items available.</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-white">No meals available.</p>
        )}

        <div className="pt-10">
          <h1 className="bg-[#eadecf] p-3 rounded-lg">The Location</h1>
          <div className="pt-5">
            <input type="checkbox" name="Tomorrow" id="Tomorrow" checked={selectedOptions.Tomorrow} onChange={handleCheckboxChange} />
            <label className="pl-2" htmlFor="Tomorrow">
              Tomorrow
            </label>
          </div>
          <div className="pt-5">
            <input type="checkbox" name="Week" id="Week" checked={selectedOptions.Week} onChange={handleCheckboxChange} />
            <label className="pl-2" htmlFor="Week">
              The Rest of this Week
            </label>
          </div>
          <div className="pt-5">
            <input type="checkbox" name="Staying" id="Staying" checked={selectedOptions.Staying} onChange={handleCheckboxChange} />
            <label className="pl-2" htmlFor="Staying">
              All My Staying
            </label>
          </div>

          <button className="bg-[#2F52A0] py-4 w-full text-white font-semibold text-xl mt-10" onClick={handleSubmit}>
            Approve and Send It
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewMeals;
