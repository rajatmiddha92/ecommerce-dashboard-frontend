import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate=useNavigate()
    const [data,setData]= useState({email:'', password:''})
    const [error, setError] = useState('');

    const handleLogin=async()=>{
        try{
        if(data.email && data.password)
     {
       let user=await axios.post('https://e-commerce-xr5d.onrender.com/login',data)
       if (user.data.token)
       {
        localStorage.setItem('userdetails',JSON.stringify(user.data.data))
        localStorage.setItem('token',JSON.stringify(user.data.token))
       setData({email:'', password:''})
       navigate('/')
       }
     }
     else
     {
        setError('All fields are madnatory')
     }
    }catch (error) {
        console.log(error)
        setError(error.response.data.message);
     }

    }

  return (
        <>
      <h1 className="text-xl text-stone-600 mt-5">Login</h1>
      <div>
        <input
          className="border-2 mt-6 px-10 w-72 py-2 rounded-lg hover:border-green-300 focus:outline-none focus:border-green-500"
          placeholder="Enter email or username" value={data.email} onChange={e=>setData({...data,email:e.target.value})}
        />
      </div>
      <div>
        <input
          className="border-2 mt-6 px-10 w-72 py-2 rounded-lg hover:border-green-300 focus:outline-none focus:border-green-500"
          type="password"
          placeholder="Enter password" value={data.password} onChange={e=>setData({...data,password:e.target.value})}
        />
      </div>
      { error && <div className="error mt-3">{error}</div> }
      <button onClick={handleLogin} className="bg-green-400 px-6 py-2 rounded-md mt-5 text-slate-600 hover:bg-green-300 active:bg-green-500 active:shadow-xl active:translate-y-1">
        Login
      </button>
    </>
  );
};

export default Login;
