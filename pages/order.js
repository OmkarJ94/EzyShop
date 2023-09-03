import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import Link from 'next/link';
const Order = ({ cart, addtoCart, removeCart, clearCart, subTotal }) => {
  const router = useRouter()
  const [data, setData] = useState({});
  const [Product, setProduct] = useState({})

  const fetchData = async () => {
    let token = localStorage.getItem("token")

    if (token) {
      try {
        const response = await fetch(`/api/getparticularproduct`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token, slug: router?.query?.id, orderId: router?.query?.orderId
          }),
        })
        const product = await response.json()
        let temp = product.response?.products
        temp = temp[router.query.id]
        setData(temp)
        setProduct(product)
        

      } catch (error) {
        
      }
    }
    else {
      router.push("/")
    }

  }
  useEffect(() => {
    
    fetchData();
  }, [])
  return (
    <div>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-2 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">

              <h1 class="text-gray-900 text-3xl title-font font-medium mb-6">{data?.name}</h1>

              <div class="flex border-t border-gray-200 py-2">
                <span class="text-gray-500">Color</span>
                <span class="ml-auto text-gray-900">{data?.color}</span>
              </div>
              <div class="flex border-t border-gray-200 py-2">
                <span class="text-gray-500">Size</span>
                <span class="ml-auto text-gray-900">{data?.size}</span>
              </div>
              <div class="flex border-t mb-1 border-gray-200 py-2">
                <span class="text-gray-500">Quantity</span>
                <span class="ml-auto text-gray-900">{data?.qty}</span>
              </div>
              <div class="flex border-t border-gray-200 py-2 mb-6">
                <span class="text-gray-500">Price</span>
                <span class="ml-auto text-gray-900">₹ {data?.price}</span>
              </div>


              <p class="leading-relaxed mb-4">Payment Details</p>
              <p class="leading-relaxed mb-4">Payment Id : {Product.response?.paymentInfo?.razorpay_payment_id ? Product.response?.paymentInfo?.razorpay_payment_id : <span className="font-bold">Please Pay The Amount</span>}</p>
              <p class="leading-relaxed mb-4">Payment Status : <span className="font-bold">{Product.response?.status}</span> </p>
              <p class="leading-relaxed mb-4">Delivery Status : <span className="font-bold">{Product.response?.deliveryStatus}</span> </p>
              <div class="flex">
                <span class="title-font font-medium text-2xl text-gray-900 mt-4">₹ {data?.price * data?.qty}</span>


              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:h-[70vh] h-64 object-top rounded">
              <Link href={`product/${router.query.id}`}>
                <img alt="ecommerce" src={data?.img} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Order