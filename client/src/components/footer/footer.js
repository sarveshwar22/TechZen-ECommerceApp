import React from 'react'
import './footer.css'

const footer = () => {

    const year = new Date().getFullYear();
    
  return (
    <footer>
        <div className="footer_container">
            <div className="footr_details_one">
                <h3>About</h3>
                <p>About Us</p>
                <p>Careers</p>
                <p>News</p>
                <p>Press</p>
            </div>
            
            <div className="footr_details_one">
                <h3>Help</h3>
                <p>Payments</p>
                <p>Shipping</p>
                <p>Cancellation and Returns</p>
                <p>FAQ</p>
            </div>
            
            <div className="footr_details_one forres">
                <h3>Policy</h3>
                <p>Return Policy</p>
                <p>Terms of Use</p>
                <p>Security</p>
                <p>Privacy</p>
            </div>
            
            <div className="footr_details_one forres">
                <h3>Social</h3>
                <p>Facebook</p>
                <p>Instagram</p>
                <p>Twitter</p>
            </div>
        </div>
        <div className="lastdetails"> 
        {/* <img src='https://ibb.co/hKtP8B8' alt='TechZen'/> */}
        <h1>TechZen</h1>
            <p>Become a Seller &nbsp;&nbsp;&nbsp;&nbsp;
            Privacy Notice &nbsp;&nbsp;&nbsp;&nbsp;
            Internet-Based Ads &nbsp;&nbsp;&nbsp;&nbsp;
            Advertise &nbsp;&nbsp;&nbsp;&nbsp;
            Gift Cards &nbsp;&nbsp;&nbsp;&nbsp;
            Help Center &nbsp;&nbsp;&nbsp;&nbsp;
            © 2019-{year} techZen.com
            </p>
        </div>
    </footer>
  )
}

export default footer