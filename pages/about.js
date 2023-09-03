import React from 'react'
import Link from 'next/link';

const About = () => {

  const data = [{
    title: "Our Story",
    description: "EzyShop emerged from a simple idea: to redefine the way people connect with their wardrobes. Our journey began when Omkar Shard Jadhav, a passionate fashion enthusiast, embarked on a mission to create clothing that not only looked good but also felt good. It was a journey driven by a desire to blend the latest trends with timeless elegance, all while prioritizing sustainability and ethical practices."
  },
  {
    title: "Our Mission",
    description: "At EzyShop, our mission is to empower individuals to express their unique personalities through clothing. We believe that what you wear is an extension of who you are, and your wardrobe should be a canvas for self-expression. Our commitment to crafting high-quality, eco-conscious fashion ensures that you not only look your best but also feel good about your choices. The Ezyshop Difference What sets [Your Brand Name] apart is our dedication to excellence.From the initial design concept to the final stitch, we obsess over every detail to create clothing that's both stylish and sustainable. We prioritize using eco-friendly materials and ethical production processes because we believe fashion should leave a positive footprint on the world."
  },
  {
    title: "Contact Us",
    description: "Have questions or feedback? We'd love to hear from you. Our customer support team is here to assist you."
  },
  {
    title: "Thank You",
    description: "Thank you for choosing EzyShop as your fashion destination. We're honored to be a part of your style journey and look forward to helping you express your unique self through our clothing."
  }

  ]
  return (
    <div>

      <section class="text-gray-600 body-font">
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



                <div className="mt-4 text-center md:text-start">
                  <h2 className="text-gray-500 text-xl text-pink-500 tracking-widest mb-1  cursor-pointer">
                    {item.title}
                  </h2>
                  <h3 className="text-gray-900 text-sm font-medium  cursor-pointer">
                    {item.description}&nbsp;
                    {item.title === "Contact Us" ?
                      (
                        <Link href="/contact" className='text-blue-600 underline'>Contact us</Link>
                      )
                      : <></>
                    }
                  </h3>



                </div>

              </div>
            );
          })}
        </div>
      </section>
    </div>
  )
}

export default About