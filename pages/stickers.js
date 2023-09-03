import React from 'react'
import Link from "next/link"

const Stickers = ({ products }) => {
  return (
    <>
      <section className="text-gray-600 body-font mt-6">
        <div className=" px-5  mx-auto">
          <div className="grid md:grid-cols-4 2xl:grid-cols-5 gap-8 m-auto">

            {Object.keys(products.data).map((ele, index) => {
              return (
                <div
                  key={index}
                  className=" p-4 px-10 w-full shadow-lg rounded-lg">
                  <Link key={ele} href={`/product/${products.data[ele].slug}`}>
                    <div className="block relative h-[45vh] rounded overflow-hidden  cursor-pointer ">
                      <img
                        alt="ecommerce"
                        className="object-fill object-center w-full h-full m-auto block"
                        src={products.data[ele].img}
                      />
                    </div>
                    <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                       { products.data[ele].category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products.data[ele].title}
                      </h2>

                      <p className="mt-1">₹ {products.data[ele].price}</p>
                    </div>
                    {products.data[ele].availableQty <= 0 && <p className="font-bold text-red-500">Out Of Stock</p>}

                  </Link>
                </div>
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
  const data = await fetch(`${host}://${context.req.headers.host}/api/getStickers`);
  const res = await data.json();

  return {
    props: { products: res },
  };
}

export default Stickers