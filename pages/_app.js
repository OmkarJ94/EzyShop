import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useRouter } from "next/router"
import '../styles/globals.css'
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useState } from "react"
function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setsubTotal] = useState(0);
  const [progress, setProgress] = useState(0)
  const [user, setuser] = useState({ value: null });
  const router = useRouter()
  const [key, setKey] = useState()


  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setProgress(100)
    })
    router.events.on("routeChangeStart", () => {
      setProgress(40)
    })
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))

      }
    } catch (error) {

      localStorage.clear()
    }

    if (localStorage.getItem("token") != null) {
      setuser({ value: localStorage.getItem("token") })
      setKey(Math.random())
    }


  }, [router.query])

  const saveCart = (mycart) => {
    
    localStorage.setItem("cart", JSON.stringify(mycart))
    let subt = 0;
    let keys = Object.keys(mycart)

    for (let i = 0; i < keys.length; i++) {
      subt += mycart[keys[i]]['price'] * mycart[keys[i]].qty
    }

    setsubTotal(subt)
  }
  const clearCart = () => {

    setCart({})
    saveCart({})
  }

  const removeCart = (itemCode, qty, price, name, size, color, img) => {

    let mycart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      mycart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (mycart[itemCode].qty <= 0) {
      delete mycart[itemCode]
    }

    setCart(mycart)
    saveCart(mycart);

  }

  const addtoCart = (itemCode, qty, price, name, size, color, img) => {
    let mycart = cart;

    if (itemCode in cart) {
      mycart[itemCode].qty = cart[itemCode].qty + qty;
    }
    else {
      mycart[itemCode] = { qty: 1, price, name, size, color, img };
    }
    setCart(mycart)
    saveCart(mycart);
    // setsubTotal(mycart[itemCode].qty * mycart[itemCode]['price'])

  }

  const logout = () => {

    setuser({ value: null })
    localStorage.removeItem("token");
    setKey(Math.random())
  }
  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar key={key} logout={logout} user={user} cart={cart} addtoCart={addtoCart} removeCart={removeCart} clearCart={clearCart} subTotal={subTotal} />
      <Component cart={cart} user={user} addtoCart={addtoCart} removeCart={removeCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
      <Footer />

    </>)
}

export default MyApp
