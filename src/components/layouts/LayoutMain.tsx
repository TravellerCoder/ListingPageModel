import  { NavBar } from "../ui/navbar/NavBar"
import { Footer } from "../ui/footer/Footer"
import { Outlet } from "react-router-dom"


export const LayoutMain = () => {
    return (
        <div>
            <NavBar /> 
            <Outlet />
            <Footer />
        </div>
    )
}
