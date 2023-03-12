import React from 'react'
import Link from "next/link"

const Stickers = ({ products }) => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">

            {Object.keys(products.data).map((ele) => {
              return (
                <Link key={ele} href={`/product/${products.data[ele].slug}`}>
                  <div key={ele} className="p-4 w-[45vh] cursor-pointer shadow-lg m-4 rounded-md  h-[45vh] m-auto md:h-[60vh]">
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
  const data = await fetch(`${host}://${context.req.headers.host}/api/getStickers`);
  const res = await data.json();

  return {
    props: { products: res },
  };
}

export default Stickers