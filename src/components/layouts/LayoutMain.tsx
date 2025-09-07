import  { NavBar } from "../ui/navbar/NavBar"
import { Outlet } from "react-router-dom"
import { Hero } from "../ui/hero/Hero"

export const LayoutMain = () => {
    return (
        <div>
            <NavBar /> 
            <Hero />
            <Outlet />
        </div>
    )
}
