import React from 'react'
import Banner from './Banner'
import './home.css'
import Slide from './Slide'
const mainComponent = () => {
  return (
    <div className='home_section'>
        <div className="banner_part"> 
            <Banner />
        </div>
        <div className="slide_part">
            <div className="left_slide">
                <Slide title="Independence Day Offers"/>
            </div>
            <div className="right_slide">
                <h3>Happy Independence Day</h3>
                <img src='https://upload.wikimedia.org/wikipedia/commons/3/37/Flag_India.svg' alt='img2'/>
                
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href='#'>Check out our new products</a>
            </div>
        </div>
        <Slide title="Today's Deal"/>
        <Slide title="Best Seller"/>
        <Slide title="Upto 80% off"/>
        {/* <Slide /> */}
    </div>
  )
}

export default mainComponent
