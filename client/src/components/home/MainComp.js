import React, { useEffect } from 'react'
import Banner from './Banner'
import './home.css'
import Slide from './Slide'
import { getProducts } from '../redux/action/action'
import {useDispatch, useSelector} from "react-redux"

const MainComp = () => {
    
    const {products} = useSelector(state => state.getproductsdata);
    console.log(products);
     
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch])
    
    return (
        <div className='home_section'>
            <div className="banner_part">
                <Banner />
            </div>
            <div className="slide_part">
                <div className="left_slide">
                    <Slide title="Independence Day Offers" products={products}/>
                </div>
                <div className="right_slide">
                    <h3>Happy Independence Day</h3>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/3/37/Flag_India.svg' alt='img' />
                    
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href='#'>Check out our new products</a>
                </div>
            </div>
            <Slide title="Today's Deal" products={products}/>
            <Slide title="Best Seller" products={products}/>
            <Slide title="Upto 80% off" products={products}/>
            {/* <Slide /> */}
        </div>
      )
}

export default MainComp