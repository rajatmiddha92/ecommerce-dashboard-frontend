import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useEffect } from "react";

const Signup = () => {
    const navigate = useNavigate();
    const isloggedin= localStorage.getItem('userdetails')
  const [val, setVal] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const [error,setError]=useState(false)
useEffect(()=>{
  if(isloggedin)
  {
    navigate('/')
  }
})
  
  const handledata=async(e)=>{
    e.preventDefault()
    let verify = val.password.length!=0 && val.fname.length!=0 && val.email.length!=0 && val.lname.length!=0 && val.password.length!=0
    if(val.password==val.confpassword && verify)
    {
    setError(false)
    let data=await axios.post('https://e-commerce-xr5d.onrender.com/register', val)
    localStorage.setItem('userdetails',JSON.stringify(data.data.userInfo))
    localStorage.setItem('token',JSON.stringify(data.data.token))
    setVal({
        fname: "",
        lname: "",
        email: "",
        password: "",
        confpassword: "",
      })
      navigate("/")
    }
    else{
        setError(true)
    }
  }
  return (
    <>
      <section className="w-2/5 pb-5 mx-auto mb-10 mt-5 border-2 max-lg:w-4/5">
        <h3 className="my-5">Sign up</h3>
        <form>
          <div>
            <input
              required
              className="rounded-md border-2 px-1 py-3 mb-10 mr-5 max-lg:w-3/4 max-lg:mx-auto"
              placeholder="First Name"
              onChange={(e) => setVal({ ...val, fname: e.target.value })}
              value={val.fname}
            />
            <input
              required
              className="rounded-md border-2 px-1 py-3 max-lg:w-3/4 max-lg:mx-auto max-lg:mb-10"
              placeholder="Last Name"
              onChange={(e) => setVal({ ...val, lname: e.target.value })}
              value={val.lname}
            />
          </div>
          <div>
            <input
              type="email"
              className="rounded-md border-2 py-3 mb-10 w-4/6 max-lg:w-3/4 max-lg:mx-auto "
              placeholder="Email address or phone number"
              onChange={(e) => setVal({ ...val, email: e.target.value })}
              value={val.email}
            />
          </div>
          <div>
            <input
              required
              className="rounded-md border-2 px-1 py-3 mr-5 max-lg:w-3/4 max-lg:mx-auto max-lg:mb-10"
              type="password"
              placeholder="Password"
              onChange={(e) => setVal({ ...val, password: e.target.value })}
              value={val.password}
            />
            <input
              required
              className="rounded-md border-2 px-1 py-3 max-lg:w-3/4 max-lg:mx-auto"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setVal({ ...val, confpassword: e.target.value })}
              value={val.confpassword}
            />
          </div>
          {error && <div>All fields are mandatory</div>}
          {val.password.length!==0 && val.password!== val.confpassword ?<div>The password must be same</div>: null}
          <button onClick={handledata} className="px-7 py-3 mt-6 rounded-lg border-transparent bg-green-300 text-purple-900">
            Sign Up
          </button>
        </form>
        
      </section>
    </>
  );
};
export default Signup;
