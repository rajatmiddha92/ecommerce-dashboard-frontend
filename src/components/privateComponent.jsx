import { Navigate,Outlet } from "react-router-dom"

const Privatecomponent=()=>{
    const isloggedin= localStorage.getItem('userdetails');
    return isloggedin ? <Outlet/> : <Navigate to='/login'/>
}

export default Privatecomponent