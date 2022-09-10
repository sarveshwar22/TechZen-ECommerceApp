import React, { useEffect, useState } from 'react'

const Right = ({item}) => {

  const [price,setPrice] = useState(0);

  useEffect(()=>{
  
    totalAmount();
  },[item])
  
  const totalAmount = ()=>{
  
    let price = 0;
    item.map((i)=>{
      price+=i.price.cost;
    })
    setPrice(price)
    
  }
  




  return (
    <div className="right-buy">
        <div className="cost_right">
            <p>Your cost is eligible for FREE delivery.<br /> 
            <span style={{color:"#565959"}}>Select this option at checkout</span></p>
            <h3>
            Subtotal ({item.length} items) 
            :
            <span style={{fontWeight:700}}>Rs {price}.00</span>
            </h3>
            <button className='rightbuy_btn'>Proceed to Buy</button>
            <div className="emi">
                EMI available
            </div>
        </div>
    </div>
  )
}

export default Right