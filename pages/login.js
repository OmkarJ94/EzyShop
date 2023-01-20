import React, { useState } from 'react'
import { useRouter } from "next/router"
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const router = useRouter()
  const [data, setdata] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setdata({ ...data, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error('Enter Valid Credentials', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })
      const token = await response.json()

      if (response.status === 200) {
        toast.success('Signup Successfully', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.setItem("token", token.token)

        setTimeout(() => {

          router.push(`${process.env.NEXT_PUBLIC_HOST}`)
        }, 500)


      }
      else {
        toast.error('Enter Valid Credentials', {
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
      setLoading(false)

    } catch (error) {

      toast.error('Enter Valid Credentials', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setLoading(false)
    }
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <ToastContainer />
        <div className="container px-5 mx-auto">

          <h1 className="font-bold tet-3xl mu-8 text-center my-8">Log In </h1>

          <div className="flex flex-wrap justify-center">
            <form className="w-full max-w-lg">
              {loading && <div className="flex flex-wrap justify-center mb-5">
                <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>}
              <div className="flex flex-wrap -mx-3 mb-6">

                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                    Email
                  </label>
                  <input name="email" value={data.email} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="Enter Email" />

                </div>


                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                    Password
                  </label>
                  <input name="password" value={data.password} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Enter Password" />

                </div>

                <div className="w-full px-3">
                  <button className=" w-full flex mr-2 justify-center text-white bg-pink-500 border-0 py-2 px-2 focous:outline-none hover:bg-pink-600 rounded text-sm" onClick={handleSubmit}>Log In</button>
                  <p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                    Don’t have an account yet? <Link href="/signup" class="font-medium text-primary-600 hover:underline dark:text-primary-500text-decoration-line: underline">Sign up</Link>
                  </p>
                  <p class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-3">
                    <Link href="/forgetpassword" class="font-medium text-primary-600 hover:underline dark:text-primary-500text-decoration-line: underline">Forget Password</Link>
                  </p>
                </div>
              </div>

            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login