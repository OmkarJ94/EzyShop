import React, { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import { AiOutlineShoppingCart, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import Link from 'next/link'
import * as Yup from 'yup'
// import Razorpay from 'razorpay';
import { MdDelete } from "react-icons/md"
import Head from "next/head"
import Script from 'next/script'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Checkout = ({ cart, addtoCart, removeCart, clearCart, subTotal }) => {
  const router = useRouter()

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)

  const [disable, setDisabled] = useState(true)
  const [pincodestatus, setpincodestatus] = useState(false)


  const ValidationSchema = Yup.object().shape({
    Name: Yup.string()


      .required('Please Enter Name'),
    state: Yup.string()
      .min(3, 'Please Enter Valid State')

      .required('Please Enter state'),
    city: Yup.string()
      .min(3, 'Please Enter city')
      .required('Please Enter city'),
    phone: Yup.string()
      .min(10, "Please Enter Valid Phone Number")
      .max(10, "Please Enter Valid Phone Number")
      .required('Please Enter Phone Number'),
    address: Yup.string()
      .min(2, 'Please Enter Valid Address')

      .required('Please Enter Address'),
    pincode: Yup.string()
      .min(6, 'Please Enter valid pincode')

      .required('Please Enter Pincode'),

    email: Yup.string().email('Invalid email').required('Please Enter Email'),
  });


  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {


      toast.error('You Must Be Login', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      router.push("/login")
    }
  }, [])


  // const handlePincode = async (e) => {
  //   try {
  //     setPincode(e.target.value)
  //     let result = await fetch(`https://api.postalpincode.in/pincode/${e.target.value}`);
  //     result = await result.json()


  //     if (result[0].Status === "Error") {
  //       setpincodestatus(true)
  //       setState("")
  //       setCity("")

  //       // setPincode("")
  //     }
  //     else {
  //       setState(result[0].PostOffice[0].Circle)
  //       setCity(result[0].PostOffice[0].Block)
  //       setpincodestatus(false)


  //     }
  //   } catch (error) {

  //     toast.error('Enter Valid Pincode', {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });

  //   }
  // }
  const handlePayment = async (values) => {
    try {
      setLoading(true)
      let oid = Math.floor(Math.random() * (Date.now()))
      const data = await fetch(`/api/transcation`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.Name, subTotal, email: values.email, cart, orderId: oid, Name: values.Name, address: values.address, pincode: values.pincode, phone: values.phone,
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
          "callback_url": `/`,
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

    }
    finally {
      setLoading(false)
    }


  }


  return (


    <section className="text-gray-600 body-font">

      <ToastContainer />

      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className="container px-5 mx-auto flex justify-center">
        <Formik
          initialValues={{ Name: "", email: "", state: "", phone: "", pincode: "", address: "", city: "" }}
          onSubmit={handlePayment}
          validationSchema={ValidationSchema}
        >

          <Form className="w-full max-w-lg">

            <h1 className="font-bold tet-3xl mu-8 text-center my-8">Checkout</h1>
            <h2 className="font-bold tet-3xl mu-8 text-center my-8">1.Delivery Details</h2>
            <div className="flex flex-wrap justify-center">
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                    Name
                  </label>
                  <Field name="Name" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Name" />
                  <div className="text-red-500"><ErrorMessage name='Name' /></div>
                </div>
                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                    Email
                  </label>
                  <Field name="email" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="Enter Email" />
                  <div className="text-red-500"><ErrorMessage name="email" /></div>
                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                    Address
                  </label>

                  <Field as="textarea" name="address" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Address" />
                  <div className="text-red-500"><ErrorMessage name='address' /></div>
                </div>

                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
                    Phone
                  </label>
                  <Field name="phone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Phone" />
                  <div className="text-red-500"><ErrorMessage name='phone' /></div>

                </div>
                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                    Pincode
                  </label>
                  <Field name="pincode" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Pincode" />
                  {pincodestatus && <p className='text-red-700 mb-3'>Enter Valid Pincode</p>}
                  <div className="text-red-500"><ErrorMessage name='pincode' /></div>

                </div>

                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                    State
                  </label>
                  <Field name="state" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter State" />
                  <div className="text-red-500"><ErrorMessage name='state' /></div>

                </div>


                <div className="w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                    City
                  </label>
                  <Field name="city" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter City" />
                  <div className="text-red-500"><ErrorMessage name='city' /></div>

                </div>


              </div>

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
                  {loading && <div className="flex flex-wrap justify-center mb-5 mt-10">
                    <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>}
                  <button type='submit' className="flex mr-2 justify-center w-full text-white bg-pink-500 border-0 py-2 px-2 mt-10 focous:outline-none hover:bg-pink-600 rounded text-sm" >Pay</button>
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </section>

  )
}

export default Checkout