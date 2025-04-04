import { Outlet } from "react-router-dom"
import Footer from "../components/footer/footer"
import Navbar from "../components/navbar/navbar"

export const BaseLayout = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}
