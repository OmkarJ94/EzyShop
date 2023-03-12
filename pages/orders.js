import React, { useEffect, useState } from 'react'
import Order from "../Models/Order"
import { useRouter } from "next/router"
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'
const Orders = ({ user, clearCart }) => {
    const router = useRouter();
    const [data, setData] = useState([])
    const fetchData = async (token) => {
        try {
            const response = await fetch(`/api/getorder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token
                }),
            })
            const order = await response.json()

            setData(order.data)


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (router.query.clearcart == 1) {
            clearCart()
        }
        if (token) {
            fetchData(token);
        }
        else {
            router.push("/login")
        }
    }, [])
    return (
        <div>

            {(data.length == 0) ?

                <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto font-bold text-3xl text-center">
                    No Order Yet
                    <br />
                    <Link href="/" className="text-blue-600 underline">Continue Shopping
                    </Link>
                </div>
                :

                data.map((ele) => {
                    return (

                        <div key={ele} class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto shadow-xl ">


                            <div class="flex justify-start item-start space-y-2 flex-col justify-center">
                                <h1 class="text-3xl  lg:text-4xl font-semibold leading-7 lg:leading-9 leading-6 xl:leading-5 underline ">Order-id : {ele.orderId}</h1>
                                <p class="text-base  font-medium leading-6 text-gray-600">{ele.time}</p>
                            </div>
                            <div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                                <div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                                    <div class="flex flex-col justify-start items-start   px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                        <p class="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 ">Customer’s Cart</p>
                                        {Object.keys(ele.products).map((item) => {

                                            return (
                                                <div key={item} class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                                    <div class="pb-4 md:pb-8 w-full md:w-40">
                                                        <img class="w-full hidden md:block" src={ele.products[item].img} alt={ele.products[item].name} />

                                                    </div>
                                                    <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                                        <div class="w-full flex flex-col justify-start items-start space-y-8">
                                                            <h3 class="text-xl  xl:text-2xl font-semibold leading-6 ">{ele.products[item].name}</h3>
                                                            <div class="flex justify-start items-start flex-col space-y-2">

                                                                <p class="text-sm  leading-none "><span class="dark:text-gray-400 text-gray-300">Size: </span> {ele.products[item].size}</p>
                                                                <p class="text-sm  leading-none "><span class="dark:text-gray-400 text-gray-300">Color: </span>{ele.products[item].color}</p>
                                                                <p class="text-sm  leading-none "><span class="dark:text-gray-400 text-gray-300">Delivery Status: </span>{ele.deliveryStatus}</p>
                                                                <Link href={`order?id=` + item + `&orderId=` + ele.orderId} className="text-blue-600 underline">Get Details</Link>
                                                            </div>
                                                        </div>
                                                        <div class="flex justify-between space-x-8 items-start w-full">
                                                            <p class="text-base  xl:text-lg leading-6">Price : {ele.products[item].price}</p>
                                                            <p class="text-base  xl:text-lg leading-6 ">Quantity : {ele.products[item].qty}</p>
                                                            <p class="text-base  xl:text-lg leading-6 ">Total : {ele.products[item].price * ele.products[item].qty} </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })

                                        }
                                    </div>
                                    <div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                        <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full   space-y-6">
                                            <h3 class="text-xl  font-semibold leading-5 ">Summary</h3>

                                            <div div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                                <div class="flex justify-between w-full">
                                                    <p class="text-base  leading-4 ">Subtotal</p>
                                                    <p class="text-base  leading-4 text-gray-600">{ele.ammount}</p>
                                                </div>

                                            </div>


                                        </div>

                                    </div>
                                </div>
                                <div class="  w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
                                    <h3 class="text-xl  font-semibold leading-5 ">Customer</h3>
                                    <div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                                        <div class="flex flex-col justify-start items-start flex-shrink-0">
                                            <div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                                                {/* <img src="/user.png" alt="avatar" /> */}
                                                {/* <div class="flex justify-start items-start flex-col space-y-2"> */}
                                                <FaUserCircle /><span>{ele.name}</span>

                                                {/* </div> */}
                                            </div>

                                            <div class="flex justify-center   md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M3 7L12 13L21 7" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                                <p class="text-sm leading-5 ">{ele.email}</p>
                                            </div>
                                        </div>
                                        <div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                                            <div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                                                <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                                                    <p class="text-base  font-semibold leading-4 text-center md:text-left ">Shipping Address</p>
                                                    <p class="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{ele.address}</p>
                                                </div>
                                                <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                                                    <p class="text-base  font-semibold leading-4 text-center md:text-left ">Billing Address</p>
                                                    <p class="w-48 lg:w-full  xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{ele.address}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                })
            }



        </div >

    )
}




export default Orders