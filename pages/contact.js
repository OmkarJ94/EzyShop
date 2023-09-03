import React, { useState, useEffect } from 'react'
import { Formik, Form, Field } from "formik"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
const Contact = () => {
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState( false)
  const router = useRouter()
  const fetchData = async (token) => {
    try {
      const response = await fetch(`/api/getUser?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      
      setUser(data)

    } catch (error) {

    }
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    
    if (token) {
      fetchData(token);
    }
    else {
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

  const onSubmit = async (values) => {
    setLoading(true)

    values.email = user.email

    try {
      const response = await fetch("/api/addmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( values )
      })
      if (response.status === 200) {
        toast.success('Than you for contacting us...', {
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

    } catch (error) {
      
      toast.error('Something went wrong', {
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
    finally {
      setLoading(false)
    }

  }

  return (
    <div>
      <section class="bg-white">
        <ToastContainer />
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center  d">Contact Us</h2>
          {loading && <div className="flex flex-wrap justify-center mb-5">
            <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>}
          <Formik initialValues={{ email: user?.email, message: "", subject: "" }} onSubmit={onSubmit}>
            <Form class="space-y-8">
              <div>
                <label for="email" class="block mb-2 text-sm font-medium  ">Your email</label>
                <Field type="email" name="email" class="shadow-sm  border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5    dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light text-black" placeholder={user.email} disabled />
              </div>
              <div>
                <label for="subject" class="block mb-2 text-sm font-medium  ">Subject</label>
                <Field type="text" name="subject" class="block p-3 w-full text-sm   rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500     dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
              </div>
              <div class="sm:col-span-2">
                <label for="message" class="block mb-2 text-sm font-medium  ">Your message</label>
                <Field as="textarea" name="message" rows="6" class="block p-2.5 w-full text-sm   rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500   dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></Field>
              </div>
              <button type="submit" class="flex mr-2 justify-center w-full text-white bg-pink-500 border-0 py-2 px-2 mt-10 focous:outline-none hover:bg-pink-600 rounded text-sm">Send message</button>
            </Form>
          </Formik>
        </div>
      </section>
    </div>
  )
}

export default Contact