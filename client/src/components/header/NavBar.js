import React, { useContext, useEffect, useState } from 'react'
import './NavBar.css'
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/ContextProvider';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '@mui/material/Drawer';
import Rightheader from './Rightheader';

import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const NavBar = () => {

  const {account,setAccount} = useContext(LoginContext);
  
  
  const history = useNavigate();
  const [dropen,setDropen] = useState(false);
  console.log(account);
  console.log("SUCESSSSS");
  
  const getdetailsvaliduser = async () => {
    const res = await fetch("/validuser", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    const data = await res.json();

    if (res.status !== 201) {
        console.log("first login");
    } else {
        setAccount(data);
    }
}


const logoutuser = async () => {
    const res2 = await fetch("/logout", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
    });
    
  // eslint-disable-next-line no-unused-vars
    const data2 = await res2.json();
        // console.log(data2);

        if (!res2.status === 201) {
            const error = new Error(res2.error);
            throw error;
        } else {
            history("/");
            setAccount(false);
            // setOpen(false)
            toast.success("user Logout 😃!", {
                position: "top-center"
            });
        }
}


const handleopen= ()=>{
    setDropen(true);
}

const handledrclose = ()=>{
    setDropen(false);

}

useEffect(() => {
    getdetailsvaliduser()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <header>
        <nav>
            <div className='left'>
            
            <IconButton className='hamburger' onClick={handleopen}>
            <MenuIcon style={{color:"white"}}/>
          </IconButton>

            <Drawer open={dropen} onClose={handledrclose}>
                <Rightheader logclose={handledrclose} logoutuser={logoutuser}/>
            </Drawer>
            
                <div className='navlogo'>
                    {/* <img src='./logo_main.png' alt='TechZen' /> */}
                    <NavLink to="/" >
                        <h1>TechZen</h1>
                    </NavLink>
                </div> 
                <div className='navSearchBar'>
                    <input type="text"/>
                    <div className="search_icon">
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="nav_btn">
                    <NavLink to="/login">Sign In</NavLink>
                </div>    
                    
                    
                    
                
                
                <div className="cart_btn">
                
                {
                    account?<NavLink to="/buynow">
                    <Badge badgeContent={account.carts.length} color = "secondary">
                            <ShoppingCartIcon id="icon" color='white' />
                        </Badge>
                    
                    </NavLink>:<NavLink to="/login">
                <Badge badgeContent={0} color = "secondary">
                        <ShoppingCartIcon id="icon" color='white' />
                    </Badge>
                
                </NavLink>
                }
                   <ToastContainer /> 
                    <p>Cart</p>
                    
                </div>
                {account?
                <Avatar className='avtar2' onClick = {logoutuser}>
                {account.fname[0].toUpperCase()}
                </Avatar>:<Avatar className='avtar'>
                
                </Avatar>
                }
            </div>
        </nav>
    </header>
  )
}

export default NavBar
