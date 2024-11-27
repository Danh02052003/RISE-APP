import React from "react";
//import image
import whiteLogo from "../../Assets/icon/logo/white-logo.svg";
function FooterHome() {
  return (
    <footer className="footer bg-[linear-gradient(180deg,_#304FC9_0%,_#304FC9_80.54%,_#5F7CEF_100%)] w-full h-full m-0 p-[20px] text-white flex flex-col overflow-hidden">
      <div className="footer-content flex justify-between items-start mb-[20px] ml-[67px] flex-col">
        <div className="footer-logo w-full flex m-0 justify-between">
          <img
            class="w-[101.65px] h-[163.19px] ml-[7px] gap-12"
            src={whiteLogo}
            alt="Rise Logo"
          />
          <p className="follow-us mr-[80px] text-[18px] font-normal leading-[23.94px] text-left text-[rgba(255,_255,_255,_0.6)]">
            Follow us on:
            <a href="#1">Facebook</a>
            <a href="#1">Instagram</a>
            <a href="#1">Threads</a>
            <a href="#1">Youtube</a>
          </p>
        </div>
        <div className="footer-links flex justify-between">
          <div className="footer-section service">
            <h3>Services</h3>
            <ul>
              <li>
                <a href="#1">Clients</a>
              </li>
              <li>
                <a href="#1">Vendors</a>
              </li>
            </ul>
          </div>
          <div className="footer-section company">
            <h3>Company</h3>
            <ul>
              <li>
                <a href="#1">Orientation hub</a>
              </li>
              <li>
                <a href="#1">About us</a>
              </li>
              <li>
                <a href="#1">Career</a>
              </li>
              <li>
                <a href="#1">News</a>
              </li>
              <li>
                <a href="#1">Rebranding</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-contact m-[0_100px_20px_95px] flex flex-wrap w-auto">
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
        <a
          href="#1"
          className="view-all w-full mt-[40px] text-white no-underline text-[24px] font-bold leading-[31.92px] flex items-center"
        >
          View all contacts &#8594;
        </a>
      </div>
      <div className="footer-bottom flex justify-between items-center m-[40px_100px_20px_95px] flex-wrap w-auto pt-[10px]">
        <a
          href="#1"
          className="privacy-notice text-white no-underline mt-[40px]"
        >
          Privacy Notice
        </a>
        <p className="copyright m-0 mt-[40px] text-[24px] font-semibold leading-[31.92px] text-left">
          ©2022 RISE Company. All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default FooterHome;
