import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Privatecomponent from './components/privateComponent';
import Login from './components/Login';
import Prod from './components/product';
import Productlist from './components/productlist';
import Updateprod from './components/updateproduct';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Nav/>
         <Routes>
         <Route element={<Privatecomponent/>}>
            <Route path='/' element={<Productlist/>}/>
            <Route path='/add' element={<Prod/>}/>
            <Route path='/update/:id' element={<Updateprod/>}/>
            <Route path='/logout' element={<h1>logout</h1>}/>
            <Route path='/profile' element={<h1>User profile</h1>}/>
        </Route>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
         </Routes>
       </BrowserRouter>
       <Footer/>
       
    </div>
  );
}

export default App;
