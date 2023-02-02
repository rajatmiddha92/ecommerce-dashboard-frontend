import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {Link} from 'react-router-dom'
const Productlist = () => {
  const [arr, setArr] = useState([]);
  const [gif,setGif]=useState(true)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setGif(true)
     let id=JSON.parse(localStorage.getItem('userdetails'))._id
    let list = await axios.get(`https://e-commerce-xr5d.onrender.com/list-products/${id}`,{headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }});
    if (list) {
      setArr(list.data.data);
    }
    setGif(false)
  };

  const deletedata=async(id)=>{
    let res=await axios.delete(`https://e-commerce-xr5d.onrender.com/product/${id}`,{headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }}) 
    if(res)
    {
        fetchData()
    }
  }
  const handlesearch=async(e)=>{
    let key=e.target.value;
    if(key)
    {
    let id=JSON.parse(localStorage.getItem('userdetails'))._id
    console.log(id)
    let data=await axios.get(`https://e-commerce-xr5d.onrender.com/search/${id}/${key}`,{headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }})
    console.log(data)
    if(data)
    {
        setArr(data.data.result)
    }
}
else{
    fetchData()
}


  }

  if(gif){
    return <><div className="flex justify-center items-center h-screen"><img src={require('../images/load.gif')}/></div></>
  }
  
  return (
    <>
      <h1 className="mt-6">Product List</h1>
      <input onChange={handlesearch} className="mt-4 border-2 border-green-400 py-3 w-2/5 px-3 rounded-xl focus:outline-none focus:border-green-500" placeholder="Serach by name or category"/>
      <table className="border-collapse ml-auto mr-auto w-2/3 mt-6">
        <thead>
          <tr>
            <th className="border-2 border-green-400 py-2">S.No.</th>
            <th className="border-2  border-green-400">Name</th>
            <th className="border-2  border-green-400">Price</th>
            <th className="border-2  border-green-400">Category</th>
            <th className="border-2  border-green-400">Delete Product</th>
          </tr>
        </thead>
        <tbody>
          {arr.length ? arr.map((data, index) => {
            return (
              <tr key={data._id}>
                <td className="border-2  border-green-400 py-2">{index + 1}</td>
                <td className="border-2  border-green-400">{data.name}</td>
                <td className="border-2  border-green-400">{data.price}</td>
                <td className="border-2  border-green-400">{data.category}</td>
                <td className="border-2  border-green-400">
                 <Link to={'/update/'+ data._id}><button className="mr-4 bg-green-300 rounded-xl px-6 py-0  hover:bg-green-300 active:bg-green-500 active:shadow-xl active:translate-y-1">
                    Edit
                  </button>
                  </Link>
                  <button onClick={()=>deletedata(data._id)} className="bg-green-300 rounded-xl px-4 py-0  hover:bg-green-300 active:bg-green-500 active:shadow-xl active:translate-y-1">
                    Delete
                  </button>
                </td>
              </tr>
            );
          }): null }
        </tbody>
      </table>
      {!arr.length ? <h1 className="text-center m-7 text-3xl">No Record found</h1>:null }
    </>

  );
};

export default Productlist;
