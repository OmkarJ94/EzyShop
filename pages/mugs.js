import React from 'react'
import Link from "next/link"

const Mugs = ({ products }) => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">

            {Object.keys(products.data).map((ele) => {
              return (
                <Link key={ele} href={`${process.env.NEXT_PUBLIC_HOST}/product/${products.data[ele].slug}`} >
                  <div className="p-4 w-[45vh] cursor-pointer shadow-lg m-4 rounded-md  h-[50vh] m-auto md:h-[65vh]">
                    <div className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="h-[30vh] m-auto md:h-[35vh]"
                        src={products.data[ele].img}
                      />
                    </div>
                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {products.data[ele].title}
                      </h3>

                      <p className="mt-1">₹ {products.data[ele].price}</p>
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
                        <button className="border-2 border-gray-300 ml-1 bg-[#475569] rounded-full w-6 h-6 focous:outline-none"></button>
                      )}
                      {products.data[ele].color.includes("red") && (
                        <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focous:outline-none"></button>
                      )}
                    </div>
                    {products.data[ele].availableQty <= 0 && <p className="font-bold text-red-500">Out Of Stock</p>}
                  </div>
                </Link>

              )
            })
            }


          </div>
        </div>
      </section>

    </>
  )
}

export async function getServerSideProps(context) {
  const { token } = context.query

  let host = process.env.NODE_ENV === "development" ? "http" : "https"
  const data = await fetch(`${host}://${context.req.headers.host}/api/getMugs`);
  const res = await data.json();

  return {
    props: { products: res },
  };
}
export default Mugs