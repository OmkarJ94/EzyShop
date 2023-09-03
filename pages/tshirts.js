import React, { useState, useEffect } from "react";
import Link from "next/link";
import mongoose from "mongoose";
import Product from "../Models/Prod";

const Tshirts = ({ products }) => {
  return (
    <>
      <section className="text-gray-600 body-font mt-6 ">
        <div className=" px-5  mx-auto">
          <div className="grid md:grid-cols-4 2xl:grid-cols-5 gap-8 m-auto">
            {Object.keys(products).map((ele) => {

              return (
                <div className=" p-4 px-10 w-full shadow-lg rounded-lg">

                  <Link
                    href={`/product/${products[ele].slug}`}
                    key={products[ele]._id}
                  >
                    <div className="block relative h-[45vh] rounded overflow-hidden  cursor-pointer ">
                      <img
                        alt="ecommerce"
                        className="object-fill object-center w-full h-full m-auto block"
                        src={
                          !products[ele].img
                            ? "https://www.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg"
                            : products[ele].img
                        }
                      />
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products[ele].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[ele].title}
                      </h2>
                      <p className="mt-1">₹ {products[ele].price}</p>
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      {products[ele].size.includes("S") && (
                        <span className="border border-gray-300 mx-1 px-1">
                          S
                        </span>
                      )}
                      {products[ele].size.includes("M") && (
                        <span className="border border-gray-300 mx-1 px-1">
                          M
                        </span>
                      )}
                      {products[ele].size.includes("L") && (
                        <span className="border border-gray-300 mx-1 px-1">
                          L
                        </span>
                      )}
                      {products[ele].size.includes("XL") && (
                        <span className="border border-gray-300 mx-1 px-1">
                          XL
                        </span>
                      )}
                      {products[ele].size.includes("XXL") && (
                        <span className="border border-gray-300 mx-1 px-1">
                          XXL
                        </span>
                      )}
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      {products[ele].color.includes("black") && (
                        <button className="border-2 border-gray-300 ml-1 bg-black rounded-full w-6 h-6 focous:outline-none"></button>
                      )}
                      {products[ele].color.includes("blue") && (
                        <button className="border-2 border-gray-300 ml-1 bg-[#3730a3] rounded-full w-6 h-6 focous:outline-none"></button>
                      )}
                      {products[ele].color.includes("white") && (
                        <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focous:outline-none"></button>
                      )}
                      {products[ele].color.includes("gray") && (
                        <button className="border-2 border-gray-300 ml-1 bg-[#9ca3af] rounded-full w-6 h-6 focous:outline-none"></button>
                      )}
                    </div>
                    {products[ele].availableQty <= 0 && <p className="font-bold text-red-500">Out Of Stock</p>}
                  </Link>
                </div>

              );
            })}
          </div>
        </div>
      </section >
    </>
  );
};

export async function getServerSideProps(context) {
  const { token } = context.query

  let host = process.env.NODE_ENV === "development" ? "http" : "https"
  const data = await fetch(`${host}://${context.req.headers.host}/api/getTshirts`);

  const res = await data.json();

  return {
    props: { products: res },
  };
}
export default Tshirts;
