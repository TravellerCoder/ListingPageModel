import  { NavBar } from "../ui/navbar/NavBar"
import { Outlet } from "react-router-dom"


export const LayoutMain = () => {
    return (
        <div>
            <NavBar /> 
            <Outlet />
        </div>
    )
}
