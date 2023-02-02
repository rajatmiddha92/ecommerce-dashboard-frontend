
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Updateprod = () => {
    const params=useParams()
    const navigate=useNavigate()
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });

  useEffect(()=>{
    getdata()
  },[])

  const getdata=async()=>{
   let prod=await  axios.get(`https://e-commerce-xr5d.onrender.com/product/${params.id}`,{headers: {
    Authorization: JSON.parse(localStorage.getItem('token'))
  }})
   if(prod)
   {
    let d=prod.data.result
    setForm({...form,name:d.name,price:d.price,category:d.category,company:d.company})
   }
  }
  
  const updatedata=async()=>{
    let data=await axios.put(`https://e-commerce-xr5d.onrender.com/product/${params.id}`,form,{headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }})
    if(data){
        navigate('/')
    }
  }

  return (
    <>
      <h1 className="mt-4">Update Product</h1>
      <div>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border-2 px-8 py-2 rounded-xl mt-8 hover:border-green-300 focus:outline-none focus:border-green-500"
          placeholder="Enter Product Name"
        />
      </div>
      
      <div>
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border-2 px-8 py-2 rounded-xl mt-4  hover:border-green-300 focus:outline-none focus:border-green-500"
          placeholder="Enter Price"
        />
      </div>
      <div>
        <input
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border-2 px-8 py-2 rounded-xl mt-4  hover:border-green-300 focus:outline-none focus:border-green-500"
          placeholder="Enter Category"
        />
      </div>
      <div>
        <input
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="border-2 px-8 py-2 rounded-xl mt-4 mb-5  hover:border-green-300 focus:outline-none focus:border-green-500"
          placeholder="Enter Company"
        />
      </div>
      <button
        onClick={updatedata}
        className="active:bg-green-400 active:shadow-xl active:translate-y-1 bg-green-300 text-slate-500 rounded-2xl px-5 py-2 hover:bg-green-200"
      >
        Update
      </button>
    </>
  );
};

export default Updateprod;
