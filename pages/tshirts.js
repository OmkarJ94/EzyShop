import React, { useState, useEffect } from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "../Models/Prod";

const Tshirts = ({ products }) => {
  return (
    <>
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-2 mx-auto">
          <div className="flex flex-wrap m-4 justify-center">
            {Object.keys(products.data).map((ele) => {

              return (
                <Link
                  href={`/product/${products.data[ele].slug}`}
                  key={products.data[ele]._id}
                  className="product"
                >
                  <div key={products.data[ele]._id} className="p-4 w-[43vh] cursor-pointer  m-4 rounded-md  sm:h-[40vh] m-auto md:h-[77vh] shadow-lg">
                    <div className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="h-[30vh] m-auto md:h-[35vh]"
                        src={
                          !products.data[ele].img
                            ? "https://www.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg"
                            : products.data[ele].img
                        }
                      />
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products.data[ele].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products.data[ele].title}
                      </h2>
                      <p className="mt-1">₹ {products.data[ele].price}</p>
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      {products.data[ele].size.includes("S") && (
                        <span className="border border-gray-300 mx-1 px-1">
                          S
                        </span>
                      )}
                      {products.data[ele].size.includes("M") && (
                        <span className="border border-gray-300 mx-1 px-1">
                          M
                        </span>
                      )}
                      {products.data[ele].size.includes("L") && (
                        <span className="border border-gray-300 mx-1 px-1">
                          L
                        </span>
                      )}
                      {products.data[ele].size.includes("XL") && (
                        <span className="border border-gray-300 mx-1 px-1">
                          XL
                        </span>
                      )}
                      {products.data[ele].size.includes("XXL") && (
                        <span className="border border-gray-300 mx-1 px-1">
                          XXL
                        </span>
                      )}
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      {products.data[ele].color.includes("black") && (
                        <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focous:outline-none"></button>
                      )}
                      {products.data[ele].color.includes("blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-[#3730a3] rounded-full w-6 h-6 focous:outline-none"></button>
                      )}
                      {products.data[ele].color.includes("white") && (
                        <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focous:outline-none"></button>
                      )}
                      {products.data[ele].color.includes("gray") && (
                        <button className="border-2 border-gray-300 ml-1 bg-[#9ca3af] rounded-full w-6 h-6 focous:outline-none"></button>
                      )}
                    </div>
                    {products.data[ele].availableQty <= 0 && <p className="font-bold text-red-500">Out Of Stock</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getTshirts`);

  const res = await data.json();
  console.log(res);
  return {
    props: { products: res },
  };
}
export default Tshirts;
