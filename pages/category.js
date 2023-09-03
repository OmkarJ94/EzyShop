import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

const category = () => {
    const [user, setUser] = useState(null);
    // 
    const [productsData, setProductsData] = useState([])
    const [noData, setNoData] = useState(false)
    const [data, setData] = useState({
        category: "T-shirts",
        size: "S",
        color: "black"
    })
    const update = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const fetchData = async (e) => {

        try {
            const response = await fetch(`/api/getrequiredproducts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: data.category,
                    size: data.size,
                    color: data.color
                }),
            })
            const result = await response.json()
            
            result.length === 0 ? setNoData(true) : setNoData(false)
            setProductsData(result)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        fetchData()
    }, [data])
    const router = useRouter()
    return (
        <section className="text-gray-600 body-font">
            <header className="text-gray-600 body-font">
                <div className="container flex flex-wrap p-9 flex-col md:flex-row items-center">
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">

                        <select name="size" id="language" className="p-4 border-none" onChange={(e) => {
                            update(e)
                            fetchData(e)
                        }}>
                            <option value="S" selected>S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <select name="color" id="language" className="p-4 border-none" onChange={(e) => {
                            update(e)
                            fetchData(e)
                        }}>

                            <option value="black" className="bg-black text-white mb-2" selected>
                                Black</option>

                            <option value="White">

                                White</option>
                            <option value="blue" className='bg-blue-500 text-white'>Blue</option>
                            <option value="gray" className='bg-gray-500 text-white '>Gray</option>
                            <option value="red" className='bg-red-500 text-white '>
                                Red</option>
                            <option value="green" className='bg-green-500 text-white '>Green</option>
                        </select>
                        <select name="category" id="language" className="p-4 border-none" onChange={(e) => {
                            update(e)
                            fetchData(e)
                        }}>

                            <option value="T-shirts" selected>Tshirts</option>
                            <option value="Hoodies">Hoodies</option>
                            <option value="Stickers">Stickers</option>
                            <option value="Mugs">Mugs</option>
                        </select>

                    </nav>


                </div>
            </header>
            {/* <section class="text-gray-600 body-font">
                <div class="container px-5 mx-auto">
                    <div class="flex flex-wrap -m-4">
                        {
                            productsData.map((ele) => {

                                return (

                                    <div class="max-w-sm rounded overflow-hidden shadow-lg h-1/3">
                                        <img class="w-full h-1/2" src={ele.img} alt="Sunset in the mountains" />
                                        <div class="px-6 py-4">
                                            <div class="font-bold text-xl mb-2">{ele.category}</div>
                                            <p class="text-gray-700 text-base">
                                                {ele.title}
                                            </p>
                                        </div>
                                        <div class="px-6 pt-4 pb-2">
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                                        </div>
                                    </div>
                                )

                            })}

                    </div>
                </div>
            </section> */}
            <div>
                <section className="text-gray-600 ">
                    <div className=" px-5  mx-auto">

                        <div className="grid md:grid-cols-4 2xl:grid-cols-5 gap-8 m-auto">
                            {noData ? <h1 className="text-center text-bold">Sorry...!We don't have any {data.category} with color {data.color} with size {data.size}</h1> : productsData.map((item) => {
                                return (
                                    <div
                                        key={item._id}
                                        className=" p-4 px-10 w-full shadow-lg rounded-lg">
                                        <Link
                                            passHref={true}
                                            href={`/product/${item.slug}`}>
                                            <div className="block relative h-[50vh] rounded overflow-hidden  cursor-pointer ">
                                                <img
                                                    alt="e-commerce"
                                                    className="object-fill object-center w-full h-full m-auto block"
                                                    src={item.img}
                                                />
                                            </div>

                                            <div className="mt-4 text-center md:text-start">
                                                <h3 className="text-gray-500 text-xs tracking-widest mb-1  cursor-pointer">
                                                    {item.category}
                                                </h3>
                                                <h2 className="text-gray-900 text-lg font-medium  cursor-pointer">
                                                    {item.title}
                                                </h2>
                                                <p className="mt-1 text-gray-900">
                                                    ₹ {item.price}
                                                </p>

                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </section >
    )
}

export async function getServerSideProps(context) {
    const { token } = context.query

    let host = process.env.NODE_ENV === "development" ? "http" : "https"
    const data = await fetch(`${host}://${context.req.headers.host}/api/getTshirts`);

    const res = await data.json();

    return {
        props: { products: res },
    };
}
export default category