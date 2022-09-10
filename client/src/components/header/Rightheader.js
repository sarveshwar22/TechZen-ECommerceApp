import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
// import Badge from '@mui/material/Badge';
// import { useContext, useState } from 'react';
// import { makeStyles } from '@material-ui/core';
import "./Rightheader.css";
import { LoginContext } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';



// const usestyle = makeStyles({
//     component: {
//         marginTop: 10,
//         marginRight: "-50px",
//         width: "300px",
//         padding: 50,
//         height: "300px"
//     },
// })
const Rightheader = ({logclose,logoutuser}) => {

    const imgd = "https://upload.wikimedia.org/wikipedia/commons/3/37/Flag_India.svg"

    const { account, setAccount } = useContext(LoginContext);

//  this is left drawer bt name is right header

    return (
        <div className="rightheader">
            <div className="right_nav">
                {
                    account ?
                        <Avatar className="avtar2"
                             title={account.fname.toUpperCase()}>{account.fname[0].toUpperCase()}</Avatar> :
                        <Avatar className="avtar"
                     />
                }
                {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""}
            </div>
            <div className="nav_btn" onClick={()=>logclose()}>
            
                <NavLink to="/">Home</NavLink>
                <NavLink to="/">Categories</NavLink>
                <Divider style={{ width: "100%", marginLeft: -20 }} />
                <NavLink to="/" style={{ marginTop: 10 }}>Today's Deal</NavLink>
                {
                    account ? <NavLink to="/buynow">Your Order</NavLink> : <NavLink to="/login">Your Order (Sign in)</NavLink>
                }
                <Divider style={{ width: "100%", marginLeft: -20 }} />
                <div className="flag">
                    <NavLink to="" style={{ marginTop: 14 }}>Settings</NavLink>
                    <img src={imgd} alt="india flag" style={{ width: 35, marginLeft: 10 }} />
                </div>

                {
                    account ?
                        <div className="flag">
                            <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                            <h3 onClick={() => logoutuser()} style={{ cursor: "pointer", fontWeight: 500 }}>Log Out</h3>
                        </div>
                        : <NavLink to="/login">Sign in</NavLink>
                }


            </div>
        </div>
    )
}




export default Rightheader