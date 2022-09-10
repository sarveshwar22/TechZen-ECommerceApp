import './App.css';
import NavBar from './components/header/NavBar';
import NewNav from './components/newNavBar/newNav';
import MainComp from './components/home/MainComp';
import Footer from './components/footer/footer';
import SignIn from './components/signup_signin/signIn'
import SignUp from './components/signup_signin/signUp';

import {Routes,Route} from "react-router-dom"
import Cart from './components/cart/Cart';
import BuyNow from './components/buynow/BuyNow';

function App() {
  return (
    <>
      <NavBar />
      <NewNav />
      <Routes>
        <Route path='/' element={<MainComp />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/getproductsone/:id' element={<Cart />} />
        <Route path='/buynow' element={<BuyNow />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
