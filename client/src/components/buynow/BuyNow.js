import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './BuyNow.css'
import Option from './option'
import Right from './Right'
import SubTotal from './SubTotal'

const BuyNow = () => {

    const [cartdata,setCartdata] = useState("")
    console.log(cartdata);


    const getdatabuy = async()=>{
        const res = await fetch("/cartdetails",{
        
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
        const data = await res.json();
        if(res.status !== 201)
        {
            console.log("error");
        }
        else{
            setCartdata(data.carts);
        }
    
    }
    
    useEffect(()=>{
        getdatabuy();
    },[])

  return (
  <>
  {
    cartdata.length?<div className="buynow_section">
    <div className="buynow_container">
        <div className="left_buy">
            <h1>Shopping Cart</h1>
            <p>Select all items</p>
            <span className="leftbuyprice">Price</span>
            <Divider />
            
            {
                cartdata.map((e,k)=>{
                    return (
                        <>
                            <div className="item_container">
                <img src={e.detailUrl} alt="IMG" />
                <div className="item_details">
                    <h3>{e.title.longTitle}</h3>
                    <h3>{e.title.shortTitle}</h3>
                    <h3 className="diffrentprice">Rs {e.price.cost}.00</h3>
                    <p className='unusuall'>Usually dispatched in 7 days</p>
                    <p>Eligible for FREE shipping</p>
                    <Option deletedata = {e.id} get={getdatabuy}/>
                    
                </div>
                <h3 className="item_price">Rs {e.price.cost}</h3>
            </div>
                        
            <Divider />
                        </>
                    )
                })
            }
            
            
            <SubTotal item={cartdata}/>
        </div>
        <div className="right_buy">
            <Right item={cartdata}/>
        </div>
    </div>
</div>:
""
  }
    
    </>
  )
}

export default BuyNow