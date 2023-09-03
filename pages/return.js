import Link from 'next/link'
import React from 'react'


const Return = () => {
    const data = [{
        title: "Return Policy",
        description: "At EzyShop, we want you to love your new clothing as much as we do. If you're not completely satisfied with your purchase, we're here to help. Our return policy is designed to be simple, fair, and hassle-free."
    },
    {
        title: "30-Day Happiness Guarantee",
        description: "We offer a 30-day return window for all eligible items, starting from the date you receive your order. If for any reason you're not satisfied with your purchase within this period, you can initiate a return."
    },
    {
        title: "Eligibility Criteria",
        description: "To be eligible for a return, please make sure that your item meets the following conditions : The item is in its original, unworn, and unwashed condition,All original tags and packaging are intact,The item doesn't fall under our non-returnable categories."
    },
    {
        title: "Easy Returns Process",
        description: "To initiate a return, follow these simple steps:",
        "Contact Us": "Reach out to our customer support team from contact us page to request a return authorization.",
        "Prepare Your Package": "Pack the item securely, including all original tags and packaging.",
        "Label Your Package": " Include your order number and return authorization number (if provided) on the package.",
        "Ship Your Return": "Send the package to the address provided by our customer support tea"
    }

    ]
    return (
        <div>      <section class="text-gray-600 body-font">
            <div class="container px-5 py-24 mx-auto">
                <div class="flex flex-col text-center w-full mb-20">
                    <h1 class="text-2xl font-medium title-font mb-4 text-gray-900">About Us</h1>
                    <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Welcome to <span class="text-pink-500 text-bold">EzyShop</span>, where fashion meets individuality. We're more than just a clothing brand; we're a statement of style, a celebration of self-expression, and a commitment to quality..</p>
                </div>
                {data.map((item) => {
                    return (
                        <div
                            key={item._id}
                            className=" p-4 px-10 w-full shadow-lg shadow-lg rounded-lg">
                                
                            {
                                item.title === "Easy Returns Process" ?
                                    <div className="mt-4 text-center md:text-start">
                                        <h2 className="text-gray-500 text-xl text-pink-500 tracking-widest mb-1  cursor-pointer">
                                            {item.title}
                                        </h2>
                                        <h3 className="text-gray-900 text-sm font-medium  cursor-pointer">
                                            {item.description}&nbsp;
                                        </h3>
                                        <h2>&#x2022; Contact Us : {item['Contact Us']}<Link href="/contact" className='text-blue-600 underline'>Contact us</Link>
                                         
                                        </h2>
                                        <h2>&#x2022; Prepare Your Package : {item['Prepare Your Package']}</h2>
                                        <h2>&#x2022; Label Your Package : {item['Label Your Package']}</h2>
                                        <h2>&#x2022; Ship Your Return : {item['Ship Your Return']}</h2>



                                    </div>
                                    : (
                                        <div className="mt-4 text-center md:text-start">
                                            <h2 className="text-gray-500 text-xl text-pink-500 tracking-widest mb-1  cursor-pointer">
                                                {item.title}
                                            </h2>
                                            <h3 className="text-gray-900 text-sm font-medium  cursor-pointer">
                                                {item.description}
                                                
                                            </h3>



                                        </div>
                                    )
                            }



                        </div>
                    );
                })}
            </div>
        </section></div>
    )
}

export default Return