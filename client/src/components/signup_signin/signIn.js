import React,{ useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './signIn.css'
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';


const SignIn = () => {

    const [logdata,setData] = useState({
        email:"",
        password:""
    });
  const {account,setAccount} = useContext(LoginContext);
    
    const addData = (e)=>{
        const {name,value} = e.target;
        
        setData(()=>{
        return {...logdata,
            [name]:value
            }
        })
        
    }


    const senddata = async(e)=>{
        e.preventDefault();
        
        const {email,password} = logdata;
        const res = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password
            }),
          });
          
          const data = await res.json();
          console.log(data);
          
          if(res.status === 400 || !data)
          {
            //   alert("Please fill all the details correctly")
              toast.warn("Please enter correct details",{
                  position: "top-center"
              })
          }
          else
          {
            //   alert("You are successfully registered")
            setAccount(data)
              toast.success("You are successfully logged in...",{
                  position: "top-center"
              })
              setData({...logdata,email:"",password:""});
          }
        
    }
  return (
    <>
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <h1>TechZen</h1>
                </div>
                <div className="sign_form">
                    <form method='POST'>
                        <h1>Sign In</h1>
                        <div className="form_data">
                            <label htmlFor=''>Email</label>
                            <input type="text" onChange={addData} value={logdata.email}  name='email' id='email' />
                        </div>
                        
                        
                        
                        <div className="form_data">
                            <label htmlFor='password'>Password</label>
                            <input type="password" onChange={addData} value={logdata.password} name='password' id='password' />
                        </div>
                        
                        
                        <button className="signin_btn" onClick={senddata}>Sign In</button>
                        
                        
                    </form>
                </div>
                
                <div className="create_accountinfo">
                    <p>New to TechZen?</p>
                    <NavLink to="/register"><button>Create your TechZen account</button></NavLink>
                </div>
            </div>
            <ToastContainer />
        </section>
    </>
  )
}

export default SignIn