import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">

            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">

              <Image width={200} height={40} src="/logo.jpg" alt="Loading..." />

            </a>

            <p className="mt-2 text-sm px-4 text-gray-500">Wear the &lt;code/&gt;</p>
            <p className="mt-2 text-sm px-4 text-gray-500">Premium coding tshirts, hoodies and apparals</p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SHOP</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/tshirts" className="text-gray-600 hover:text-gray-800">Tshirts</Link>
                </li>
                <li>
                  <Link href="/hoodies" className="text-gray-600 hover:text-gray-800">Hoodies</Link>
                </li>
                <li>
                  <Link href="/stickers" className="text-gray-600 hover:text-gray-800">Stickers</Link>
                </li>
                <li>
                  <Link href="/mugs" className="text-gray-600 hover:text-gray-800">Mugs</Link>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CUSTOMER SERVICE</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-800">Contact Us</Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-800">About Us</Link>
                </li>
                <li>
                  <Link href="/return" className="text-gray-600 hover:text-gray-800">Return Policy</Link>
                </li>

              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">POLICY</h2>
              <nav className="list-none mb-10">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-gray-800">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-gray-800">Terms and Conditions</Link>
                </li>

              </nav>
            </div>

          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">© 2022 CODESWEAR —
              All Rights Reserved
            </p>
         
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Footer