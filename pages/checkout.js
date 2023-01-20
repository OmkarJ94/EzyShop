import React, { useState, useEffect } from 'react'
import { AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Link from 'next/link'
// import Razorpay from 'razorpay';
import { MdDelete } from "react-icons/md"
import Head from "next/head"
import Script from 'next/script'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = ({ cart, addtoCart, removeCart, clearCart, subTotal }) => {
  const [Name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [pincode, setPincode] = useState("")
  const [user, setUser] = useState({})
  const [state, setState] = useState("")
  const [disable, setDisabled] = useState(true)
  const [pincodestatus, setpincodestatus] = useState(false)

  const fetchData = async (token) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getUser?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      console.log(data)
      setName(data.name);
      setEmail(data.email);
      setAddress(data.address);
      setPhone(data.phone)
      

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      fetchData(token);
    }
    else {
      router.push("/login")
    }
  }, [])
  const handleInput = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (name == 'Name') {
      setName(value);
    }
    else if (name == 'email') {
      setEmail(value);
    }
    else if (name == 'phone') {
      setPhone(value);
    }
    else if (name == 'pincode') {
      setPincode(value);
    }
    else if (name == 'address') {
      setAddress(value);
    }
    else if (name == 'city') {
      setCity(value);
    }
    else if (name == 'state') {
      setState(value);
    }


    if ((Name.length > 3) && (email.length > 3) && (phone.length > 3) && (state.length > 3) && (city.length > 3) && (pincode.length > 3) && (address.length > 3) && (subTotal > 0)) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }

  }

  const handlePincode = async (e) => {
    try {
      setPincode(e.target.value)
      let result = await fetch(`https://api.postalpincode.in/pincode/${e.target.value}`);
      result = await result.json()
      console.log(result)

      if (result[0].Status === "Error") {
        setpincodestatus(true)
        setState("")
        setCity("")

        // setPincode("")
      }
      else {
        setState(result[0].PostOffice[0].Circle)
        setCity(result[0].PostOffice[0].Block)
        setpincodestatus(false)
        console.log(result)

      }
    } catch (error) {
      console.log(error)
      toast.error('Enter Valid Pincode', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }
  }
  const handlePayment = async () => {
    try {
      let oid = Math.floor(Math.random() * (Date.now()))
      const data = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/transcation`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name, subTotal, email, cart, orderId: oid, Name, address, pincode, phone,
        }),
      })

      const result = await data.json();
      if (data.status === 200) {
        clearCart()
        toast.error(result.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        return;
      }
      else if (data.status === 203) {

        toast.error(result.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        return;
      }
      else {
        var options = {
          "key": process.env.NEXT_PUBLIC_key_id, // Enter the Key ID generated from the Dashboard
          "amount": subTotal, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          "currency": "INR",
          "name": "Omkar",
          "description": "Test Transaction",
          "image": "https://example.com/your_logo",
          "order_id": result.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          "callback_url": `${process.env.NEXT_PUBLIC_HOST}/posttransacation`,
          "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
          },
          "notes": {
            "address": "Razorpay Corporate Office"
          },
          "theme": {
            "color": "#F05189"
          }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzp1.open();
      }

    } catch (error) {
      console.log(error.message);
    }


  }

  return (
    <section className="text-gray-600 body-font">

      <ToastContainer />

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="container px-5 mx-auto">

        <h1 className="font-bold tet-3xl mu-8 text-center my-8">Checkout</h1>
        <h2 className="font-bold tet-3xl mu-8 text-center my-8">1.Delivery Details</h2>
        <div className="flex flex-wrap justify-center">
          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                  Name
                </label>
                <input onChange={handleInput} name="Name" value={Name} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="Enter Name" />

              </div>
              <div className="w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                  Email
                </label>
                <input name="email" value={email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="Enter Email" />

              </div>
              <div className="w-full px-3">
                <label onChange={handleInput} className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                  Address
                </label>
                <textarea name="address" value={address} onChange={handleInput} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Address" />

              </div>

              <div className="w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
                  Phone
                </label>
                <input name="phone" value={phone} onChange={handleInput} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Phone" />

              </div>
              <div className="w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                  Pincode
                </label>
                <input name="pincode" value={pincode} onKeyUp={handlePincode} onChange={handleInput} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Pincode" />
                {pincodestatus && <p className='text-red-700 mb-3'>Enter Valid Pincode</p>}
              </div>

              <div className="w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                  State
                </label>
                <input name="state" value={state} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter State" />

              </div>


              <div className="w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                  City
                </label>
                <input name="city" value={city} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter City" />

              </div>


            </div>

          </form>
        </div>


        <h2 className="font-bold tet-3xl mu-8 text-center my-8">2.Review Cart Items</h2>
        <div className="flex flex-wrap -m-4 justify-center">
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
                        <img src={cart[k].img} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="h-full w-full object-cover object-top" />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              {cart[k].name}
                            </h3>

                            <p className="ml-4">₹{cart[k].price}</p>
                          </div>

                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <AiFillMinusCircle className="cursor-pointer text-pink-500" onClick={() => {
                            removeCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)
                          }
                          } />{cart[k].qty}<AiFillPlusCircle className="cursor-pointer text-pink-500" onClick={() => {
                            addtoCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)
                          }
                          } />

                          <div className="flex">
                            <MdDelete className="text-pink-500" />
                          </div>
                        </div>
                      </div>
                    </li>

                  )
                })}
                <span className="total">Subtotal : ₹ {isNaN(subTotal) ? "0" : subTotal}</span>
              </ul>
              <Link href="/checkout"><button disabled={disable} onClick={handlePayment} className="disabled:bg-pink-300 flex mr-2 justify-center w-full text-white bg-pink-500 border-0 py-2 px-2 mt-10 focous:outline-none hover:bg-pink-600 rounded text-sm" >Pay</button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>



  )
}

export default Checkout