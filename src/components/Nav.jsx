import { useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Nav = () =>{
    const isloggedin= localStorage.getItem('userdetails')
    const Navigate=useNavigate()
    const handlelogout=()=>{
      localStorage.removeItem('userdetails')
      localStorage.removeItem('token')
      Navigate('/login')
    }
   useEffect(()=>{
     if(isloggedin){
        Navigate('/')
     }
   },[])
    return(
    <>
        <section>
            <nav className='flex justify-between  bg-green-200'>
              <img className='w-12 h-12 rounded-full ml-4 mt-2' src={require('../images/logo.jpg')} alt='logo'/>
              {isloggedin ?  <ul className='flex justify-end gap-6 list-none p-5'>
                    <li><Link to='/'>Products</Link></li>
                    <li><Link to='/add'>Add Product</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link onClick={handlelogout} to='/signup'>Logout ({JSON.parse(isloggedin).fname})</Link></li> 
                 </ul> :
                 <ul className='flex justify-end gap-6 list-none p-5 bg-green-200'>
                    <li><Link to='/signup'>Sign up</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
              }
            </nav>
        </section>
    </>)
}

export default Nav