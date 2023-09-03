import Image from 'next/image'
import React, { useState } from 'react'
import { useRouter } from "next/router"
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { MdDelete, MdAccountCircle } from "react-icons/md"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ logout, user, cart, addtoCart, removeCart, clearCart, subTotal }) => {
  const router = useRouter()

  const [show, setShow] = useState(false)

  const chk = () => {
    setShow(false)
  }

  const [dropdown, setDropdown] = useState(false)
  const [disabled, setDisabled] = useState(false)


  return (
    <>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center sticky bg-white top-0 z-10 shadow-2xl">
        <ToastContainer />
        <div className="logo mx-5">
          <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <h2 className="text-pink-500 text-bold">EzyShop</h2>
          </Link>
        </div>
        <nav className="mx-5 md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l px-2 md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link href="/tshirts" className="mr-5 hover:text-gray-900">Tshirts</Link>
          <Link href="/hoodies" className="mr-5 hover:text-gray-900">Hoodies</Link>
          <Link href="/stickers" className="mr-5 hover:text-gray-900">Stickers</Link>
          <Link href="/mugs" className="mr-5 hover:text-gray-900">Mugs</Link>
        </nav>
        <div className="cart absolute right-0 top-6  flex mr-5">
          <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }}>
            {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className=" absolute right-8 bg-white shadow-lg border top-7 rounded-md px-5 w-32">
              <ul>
                <Link href="/account"> <li className="py-1 hover:text-pink-700 text-sm cursor-pointer">Account</li></Link>
                <Link href="/orders"> <li className="py-1 hover:text-pink-700 text-sm cursor-pointer">Orders</li></Link>
                <li onClick={() => {
                  logout()

                  router.push("/login")
                }} className="py-1 hover:text-pink-700 text-sm cursor-pointer">Logout</li>

              </ul>

            </div>}

            {user.value && <MdAccountCircle className="text-3xl mx-2 cursor-pointer" />}



          </div>
          {!user.value && <button onClick={() => { router.push('/login') }} className=" bg-pink-600 mx-2 px-2 py-1 rounded-md text-sm text-white">Log In</button>}
          <AiOutlineShoppingCart className="text-3xl mr-1" style={{ cursor: "pointer" }} onClick={() => { setShow(true) }} />

          {show && <div className="relative z-0" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

                  <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                          <div className="ml-3 flex h-7 items-center">
                            <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                              <span className="sr-only">Close panel</span>

                              <svg className="text-pink-500 bg-pink h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" onClick={() => { setShow(false) }}>
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {Object.keys(cart).length === 0 &&
                                <div>No items in cart</div>
                              }

                              {Object.keys(cart).map((k) => {


                                return (
                                  <li className="flex py-6" key={k}>
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img src={cart[k].img} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-center" />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            {cart[k].name}
                                          </h3>

                                          <p className="ml-4">₹{cart[k].price}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">Color : {cart[k].color}</p>
                                        <p className="mt-1 text-sm text-gray-500">Size : {cart[k].size}</p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <AiFillMinusCircle className="cursor-pointer text-pink-500" onClick={() => {
                                          removeCart(k, 1, cart[k].price, cart[k].title, cart[k].size, cart[k].color, cart[k].img)
                                        }
                                        } />{cart[k].qty}<AiFillPlusCircle className="cursor-pointer text-pink-500" onClick={() => {
                                          // variants[availablecolor][availablesize]['slug'], 1, products.price, products.title, availablesize, availablecolor, products.img
                                          addtoCart(k, 1, cart[k].price, cart[k].title, cart[k].size, cart[k].color.img)
                                        }
                                        } />

                                        <div className="flex">
                                          <MdDelete className="text-pink-500 cursor-pointer" />
                                        </div>
                                      </div>
                                    </div>
                                  </li>

                                )
                              })}



                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>Subtotal : ₹ {isNaN(subTotal) ? "0" : subTotal}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">

                          <Link href="/checkout"><button disabled={((Object.keys(cart).length) == 0)} className="disabled:bg-pink-300 flex mr-2 justify-center text-white bg-pink-500 border-0 py-2 px-2 focous:outline-none hover:bg-pink-600 rounded text-sm w-full" onClick={chk}>Checkout</button></Link>

                          <button disabled={((Object.keys(cart).length) == 0)} className="disabled:bg-pink-300 w-full flex mr-2  mt-3 justify-center text-white bg-pink-500 border-0 py-2 px-2 focous:outline-none hover:bg-pink-600 rounded text-sm" onClick={clearCart}>Clear Cart</button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <Link href="/" type="button" className="font-medium text-pink-600 hover:text-pink-500" onClick={chk}>
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
        </div>

      </div>



    </ >
  )
}

export default Navbar