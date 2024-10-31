import React from 'react'

function FooterHome() {
    return (
        <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={`${process.env.PUBLIC_URL}/images/logo/white-logo.svg`} alt="Rise Logo"/>
            <p className="follow-us">
              Follow us on: 
              <a href="#1">Facebook</a>
              <a href="#1">Instagram</a>
              <a href="#1">Threads</a>
              <a href="#1">Youtube</a>
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-section service">
              <h3>Services</h3>
              <ul>
                <li><a href="#1">Clients</a></li>
                <li><a href="#1">Vendors</a></li>
              </ul>
            </div>
            <div className="footer-section company">
              <h3>Company</h3>
              <ul>
                <li><a href="#1">Orientation hub</a></li>
                <li><a href="#1">About us</a></li>
                <li><a href="#1">Career</a></li>
                <li><a href="#1">News</a></li>
                <li><a href="#1">Rebranding</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-contact">
          <div className="contact-section">
            <h3>Call us</h3>
            <p>+84 939 107 890</p>
          </div>
          <div className="contact-section">
            <h3>Write to us</h3>
            <p>info@rise.com.vn</p>
          </div>
          <div className="contact-section">
            <h3>Find us</h3>
            <p>101 - 103, Nguyen Tri Phuong St, District 10</p>
          </div>
          <a href="#1" className="view-all">View all contacts</a>
        </div>
        <div className="footer-bottom">           
          <p className="copyright">©2022 RISE Company. All rights reserved</p>
          <a href="#1" className="privacy-notice">Privacy Notice</a>
        </div>
      </footer>
    )
}

export default FooterHome;