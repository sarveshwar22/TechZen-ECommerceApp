import React from "react";
import { NavLink } from "react-router-dom";
import "./signIn.css";
import { useState } from "react";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [udata, setUdata] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const addData = (e) => {
    const { name, value } = e.target;

    setUdata(() => {
      return { ...udata, [name]: value };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { fname, email, mobile, password, cpassword } = udata;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        email,
        mobile,
        password,
        cpassword,
      }),
    });
    
    const data = await res.json();
    console.log(data);
    
    if(res.status === 422 || !data)
    {
        // alert("Please fill all the details correctly")
        toast.warn("Please fill all the details correctly",{
            position: "top-center"
        })
    }
    else
    {
        // alert("You are successfully registered")
        toast.success("You are successfully registered",{
            position: "top-center"
        })
        setUdata({...udata,fname:"",email:"",mobile:"",password:"",cpassword:""});
    }
  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_header">
            <h1>TechZen</h1>
          </div>
          <div className="sign_form">
            <form>
              <h1>Sign Up</h1>

              <div className="form_data">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  onChange={addData}
                  value={udata.fname}
                  name="fname"
                  id="fname"
                />
              </div>

              <div className="form_data">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  onChange={addData}
                  value={udata.email}
                  name="email"
                  id="email"
                />
              </div>

              <div className="form_data">
                <label htmlFor="mobile">Phone Number</label>
                <input
                  type="number"
                  onChange={addData}
                  value={udata.mobile}
                  name="mobile"
                  id="mobile"
                />
              </div>

              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={addData}
                  value={udata.password}
                  name="password"
                  id="password"
                  placeholder="At least 6 digits"
                />
              </div>

              <div className="form_data">
                <label htmlFor="cpassword">Re-Enter Password</label>
                <input
                  type="password"
                  onChange={addData}
                  value={udata.cpassword}
                  name="cpassword"
                  id="cpassword"
                />
              </div>

              <button className="signin_btn" onClick={senddata}>
                Sign Up
              </button>

              <div className="signin_info">
                <p>Already have an account?</p>
                <NavLink to="/login">Sign In</NavLink>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default SignUp;
