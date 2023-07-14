import React, { useContext } from 'react'
import { LoginContext } from '../context/ContextProvider';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from "react-toastify";


const Option = ({deletedata,get}) => {

  
  // eslint-disable-next-line no-unused-vars
  const {account,setAccount} = useContext(LoginContext)


  const removedata = async(id)=>{
    try {
    console.log("test");
      const res = await fetch(`/remove/${id}`,{
      
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-type":"application/json"
        },
        credentials:"include"
      })
      
    console.log("test");
      const data = await res.json();
      console.log(data);
      
    console.log("test");
      if(res.status === 400 || !data){
        console.log("error at remove time");      
      }
      else
      {
        console.log("user delete");
        setAccount(data);
        toast.success("Item successfully deleted",{
          position: "top-center"
      })
        get();
      }
    
    
      console.log("test");
    
      
    } catch (error) {
      console.log("error");
    }
  }

  return (
    <div className="add_remove_select">
        <select>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        <p style={{cursor:"pointer"}} onClick={()=>removedata(deletedata)}>Delete</p>
        
        <p className='forremovemedia'>Save for Later</p>
        <p className='forremovemedia'>See More like this</p>
        <ToastContainer />
    </div>
  )
}

export default Option