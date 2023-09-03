import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    "name": "",
    "email": "",
    "address": "",
    "phone": ""
  })
  const [passwords, setPasswords] = useState({
    "password": "",
    "cpassword": ""
  })

  const handleChange = ((e) => {
    let name = e.target.name
    let value = e.target.value

    setData({ ...data, [name]: value })
  })


  const fetchUser = async () => {
    try {
      let token = localStorage.getItem("token");
      const data = await fetch(`/api/getUser?token=${token}`)
      const result = await data.json()
      setUser(result)
      setData({
        "name": result.name,
        "email": result.email,
        "address": result.address,
        "phone": result.phone
      })

    } catch (error) {
      

    }
  }
  const handleSubmit = async (e) => {

    e.preventDefault()
    
    if ((data?.phone).length != 10) {
      toast.error("Check Phone Number", {
        position: "top-right",
        autoClose: 1000,
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
      let response = await fetch(`/api/signup`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          email: data?.email,
          name: data?.name,
          address: data?.address,
          phone: data?.phone
        })
      })
      setLoading(false)
      const result = await response.json()

      if (response.status == 200 || response.status == 203) {
        toast.success(result.message, {
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
    } catch (error) {
      
      setLoading(false)
    }
  }

  const handlePassowrd = (e) => {
    let name = e.target.name
    let value = e.target.value

    setPasswords({ ...passwords, [name]: value })
  }

  const handleSubmitPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (passwords.password !== passwords.cpassword) {
      toast.error("Something Went Wrong", {
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
      return;
    }
    try {
      let token = localStorage.getItem("token")
      let response = await fetch(`/api/changepassword`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          token,
          password: passwords.password,
          cpassword: passwords.cpassword
        })
      })
      const result = await response.json()
      
      if (response.status == 200) {
        setLoading(false)
        toast.success(result.message, {
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
      else {
        setLoading(false)
        toast.error(result.message, {
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
    } catch (error) {
      setLoading(false)
      
      toast.error("Something Went Wrong", {
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
  }


  useEffect(() => {
    if (!(localStorage.getItem("token"))) {
      router.push("/login")
    }
    else {
      fetchUser();
    }
  }, [])
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">

          <h1 className="font-bold tet-3xl mu-8 text-center my-8">User Details</h1>

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
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                    Name
                  </label>
                  <input name="name" value={data?.name} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Name" />

                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                    Email
                  </label>
                  <input name="email" value={data?.email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="email" placeholder="Enter Email" />

                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                    Address
                  </label>
                  <textarea name="address" value={data?.address} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Address" />

                </div>

                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
                    Phone
                  </label>
                  <input name="phone" value={data?.phone} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Enter Phone" />

                </div>
                <div className="w-full px-3">
                  <button type="submit" onClick={handleSubmit} className=" w-full flex mr-2 justify-center text-white bg-pink-500 border-0 py-2 px-2 focous:outline-none hover:bg-pink-600 rounded text-sm">Submit</button>

                </div>


              </div>

            </form>
          </div>
        </div>
      </section>



      <section className="text-gray-600 body-font">
        <div className="container px-5 mx-auto">

          <h1 className="font-bold tet-3xl mu-8 text-center my-8">Change Password</h1>

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
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                    Password
                  </label>
                  <input name="password" value={passwords.password} onChange={handlePassowrd} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Enter Password" />

                </div>
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                    Confirm Password
                  </label>
                  <input name="cpassword" value={passwords.cpassword} onChange={handlePassowrd} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="Enter Password Again" />

                </div>

                <div className="w-full px-3">
                  <button type="submit" onClick={handleSubmitPassword} className=" w-full flex mr-2 justify-center text-white bg-pink-500 border-0 py-2 px-2 focous:outline-none hover:bg-pink-600 rounded text-sm">Submit</button>

                </div>


              </div>

            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Account