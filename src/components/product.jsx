import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Prod = () => {
    const navigate=useNavigate()
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
  });
  const [error,setError]=useState(false)
  const handledata = async () => {
    let verify= form.name.length && form.price.length && form.category.length && form.company.length
    if(verify)
    {
    setError(false)
    let user = JSON.parse(localStorage.getItem("userdetails"))._id;
    try {
      let data = await axios.post("https://e-commerce-xr5d.onrender.com/add-product", {
        userId: user,
        form,
      },{headers: {
        Authorization: JSON.parse(localStorage.getItem('token'))
      }});
      if (data) {
        setForm({
          name: "",
          price: "",
          category: "",
          company: "",
        });
        navigate('/')

      }
    } catch (err) {
      alert(err.response.data.message);
    }
}
else{
    setError(true)
}
  };
  return (
    <>
      <div>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border-2 px-8 py-2 rounded-xl mt-8 hover:border-green-300 focus:outline-none focus:border-green-500"
          placeholder="Enter Product Name"
        />
      </div>
      {error && !form.name.length && <div>Enter valid name</div>}
      <div>
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border-2 px-8 py-2 rounded-xl mt-4  hover:border-green-300 focus:outline-none focus:border-green-500"
          placeholder="Enter Price"
        />
      </div>
      {error && !form.price.length && <div>Enter valid price</div>}
      <div>
        <input
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border-2 px-8 py-2 rounded-xl mt-4  hover:border-green-300 focus:outline-none focus:border-green-500"
          placeholder="Enter Category"
        />
      </div>
      {error && !form.category.length && <div>Enter valid Category</div>}
      <div>
        <input
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="border-2 px-8 py-2 rounded-xl mt-4 mb-5  hover:border-green-300 focus:outline-none focus:border-green-500"
          placeholder="Enter Company"
        />
      </div>
      {error && !form.company.length && <div>Enter valid Company</div>}
      <button
        onClick={handledata}
        className="active:bg-green-400 active:shadow-xl active:translate-y-1 bg-green-300 text-slate-500 rounded-2xl px-5 py-2 hover:bg-green-200"
      >
        Add Product
      </button>
    </>
  );
};

export default Prod;
