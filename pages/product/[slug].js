import React, { useState } from 'react'
import { useRouter } from "next/router"
import Product from "../../Models/Prod";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Slug = ({ cart, addtoCart, removeCart, clearCart, subTotal, products, variants }) => {

  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState(0)
  const [service, setService] = useState(false)
  const [availablecolor, setavailablecolor] = useState(products.color);
  const [availablesize, setavailablesize] = useState(products.size);

  const { slug } = router.query;

  const check = async () => {

    try {
      setLoading(true)
      let result = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      result = await result.json()
      console.log(result)

      if (result[0].Status === "Error") {
        setService(false)
        setLoading(false)
      }
      else {

        setService(true)
        setLoading(false)

      }
    } catch (error) {
      setService(false)
      setLoading(false)
    }

  }
  const refresh = (newsize, newcolor) => {
    let url = `/product/${variants[newcolor][newsize]['slug']}`
    window.location = url

  }
  const add = () => {
    addtoCart(variants[availablecolor][availablesize]['slug'], 1, products.price, products.title, availablesize, availablecolor, products.img)
    toast.success('Item Added To Cart Successfully', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <div className="container px-5 py-2 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded" src={products.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{products.title}</h2>
              {/* <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">Wear the code</h1> */}
              <hr />
              <p className="leading-relaxed">{products.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {products.category === "T-shirts" || products.category === "Hoodies" ? <div div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("white") && Object.keys(variants['white']).includes(availablesize) && < button onClick={(e) => { refresh(availablesize, 'white') }} className={`border-2 ${availablecolor === 'white' ? 'border-black' : 'border - gray - 300'} ml-1 bg-white rounded-full w-6 h-6 focus:outline-none`} />}
                  {Object.keys(variants).includes("black") && Object.keys(variants['black']).includes(availablesize) && < button onClick={(e) => { refresh(availablesize, 'black') }} className={`border-2 ml-1 ${availablecolor === 'black' ? 'border-black' : 'border - gray - 300'} bg-black rounded-full w-6 h-6 focus:outline-none`} />}
                  {Object.keys(variants).includes("blue") && Object.keys(variants['blue']).includes(availablesize) && < button onClick={(e) => { refresh(availablesize, 'blue') }} className={`border-2 ${availablecolor === 'blue' ? 'border-black' : 'border - gray - 300'} bg-[#3730a3] rounded-full w-6 h-6 focus:outline-none`} />}
                  {Object.keys(variants).includes("gray") && Object.keys(variants['gray']).includes(availablesize) && < button onClick={(e) => { refresh(availablesize, 'gray') }} className={`border-2 ml-1 ${availablecolor === 'gray' ? 'border-black' : 'border - gray - 300'} bg-[#9ca3af] rounded-full w-6 h-6 focus:outline-none`} />}
                  {Object.keys(variants).includes("green") && Object.keys(variants['green']).includes(availablesize) && < button onClick={(e) => { refresh(availablesize, 'gray') }} className={`border-2 ml-1 ${availablecolor === 'green' ? 'border-black' : 'border - gray - 300'} bg-[#0d9488] rounded-full w-6 h-6 focus:outline-none`} />}
                  {Object.keys(variants).includes("red") && Object.keys(variants['red']).includes(availablesize) && < button onClick={(e) => { refresh(availablesize, 'red') }} className={`border-2 ml-1 ${availablecolor === 'red' ? 'border-black' : 'border - gray - 300'} bg-red-700 rounded-full w-6 h-6 focus:outline-none`} />}
                </div> : <div></div>}
                {products.category === 'T-shirts' || products.category === 'Hoodies' ?
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select value={availablesize} onChange={(e) => { refresh(e.target.value, availablecolor) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10">
                        {Object.keys(variants[availablecolor]).includes("S") && <option value='S' > S</option>}
                        {Object.keys(variants[availablecolor]).includes("M") && <option value='M'> M</option>}
                        {Object.keys(variants[availablecolor]).includes("L") && <option value='L'> L</option>}
                        {Object.keys(variants[availablecolor]).includes("XL") && <option value='XL'> XL</option>}
                        {Object.keys(variants[availablecolor]).includes("XXL") && <option value='XXL'> XXL</option>}

                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div> : <div></div>}
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">₹ {products.price}</span>
                <button disabled={products.availableQty <= 0} className=" disabled:bg-pink-300 flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded" onClick={add}>Add to Cart</button>

              </div>
              {products.availableQty <= 0 && <p className="title-font font-medium text-2xl text-red-700">Out Of Stock</p>}
              {loading && <div className="flex flex-wrap justify-center mb-5 mt-5">
                <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>}
              <div className="pin mt-6 flex space-x-2 text-sm">
                <input type="text" className="px-2 border-2 border-gray-400 rounded-mg" onChange={(e) => { setPin(e.target.value) }} placeholder="Enter your pincode" />
                <butoon onClick={check} className="cursor-pointer text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Check</butoon>

              </div>
              {!service ? <p className='text-red-700 mb-3'>Enter Valid Pincode</p> : <p className='text-green-700 mb-3'>Your Pincode Is Servicable</p>}
            </div>
          </div>
        </div>
      </section >

    </div >
  )
}

export async function getServerSideProps(context) {
  const data = await Product.findOne({ slug: context.query.slug })

  const res = await Product.find({ title: data.title })

  let colorsize = {};

  for (let item of res) {
    if (Object.keys(colorsize).includes(item.color)) {
      colorsize[item.color][item.size] = { slug: item.slug }
    }
    else {
      colorsize[item.color] = {}
      colorsize[item.color][item.size] = { slug: item.slug }
    }
  }


  return {
    props: { products: JSON.parse(JSON.stringify(data)), variants: JSON.parse(JSON.stringify(colorsize)) },
  };
}
export default Slug