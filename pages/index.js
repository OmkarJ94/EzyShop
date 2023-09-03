import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import styles from "../styles/Home.module.css"
import Link from 'next/link';
export default function Home() {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      let token = localStorage.getItem("token");
      const data = await fetch(`/api/getUser?token=${token}`)
      const result = await data.json()
      
      if (data.status === 200) {
        
        setUser(result.name)
      }


    } catch (error) {
      

    }
  }

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <section
      className="relative bg-[url(https://raw.githubusercontent.com/tech2etc/Build-and-Deploy-Ecommerce-Website/main/img/hero4.png)] bg-cover bg-center bg-no-repeat"
    >
      <div
        className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
      ></div>

      <div
        className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
      >
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-3xl">
            Wrap Yourself in Elegance

            <strong className="block font-extrabold text-rose-700">
              Unveil the Perfect Outfit!.
            </strong>
          </h1>

          {/* <p className="mt-4 max-w-lg sm:text-xl/relaxed">
          Wrap Yourself in Elegance – Unveil the Perfect Outfit!
          </p> */}

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/category"
              className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              What We Have
            </Link>

            {/* <a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Learn More
            </a> */}
          </div>
        </div>
      </div>
    </section>
  )
}
