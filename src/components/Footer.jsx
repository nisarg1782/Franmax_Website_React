import React from 'react';
import './design/Footer.css';
import InquiryForm from './Footer/InquiryForm';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaGoogle, FaYoutube } from 'react-icons/fa';
import WhatsAppIcon from '../components/Footer/WhatsAppIcon';
import { Link } from 'react-router-dom'; // ✅ Import Link

function Footer() {
  return (
    <>
      {/* Disclaimer Section */}
      <div className="footer-disclaimer">
        <div className="disclaimer-container">
          <h4>Disclaimer</h4>
          <p>
            The information contained herein is of a general nature and Franmax India is not using this website or any part thereof to provide professional advice or services. Before making any choice or action that may affect your finances or business, you should seek the advice of a certified professional.
          </p>
          <p><strong>USE OF THIS WEBSITE</strong> or any pages or links to it is at your own risk, and you assume all liability and risk of loss arising out of your use.</p>
          <p>All brands or entities listed on Franmax India or its network websites are publicly available on the internet. Trademarks or brand names used are registered trademarks of their respective companies.</p>
          <p>Franmax India does not claim ownership or association with unclaimed or unverified business listings. Visitors should contact us before trading with any such listings. Data is collected from multiple public sources over time, and its accuracy may vary.</p>
          <p>Franmax India Private Limited or its agents do not claim ownership of third-party listings. Please use your sole discretion before engaging with these businesses. If you have concerns regarding any content published, contact us at <a href="mailto:info@franmaxindia.com">info@franmaxindia.com</a>.</p>
          <p>Please also read the <Link to="/terms-of-use">Terms of Use</Link> regarding usage of the Franmax India website.</p>
        </div>
      </div>

      <div className="footer-section inquiry">
        <InquiryForm />
      </div>

      {/* Main Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-section about">
            {/* <h4>Franmax India</h4> */}
            <p>&copy; 2020–{new Date().getFullYear()} Franmax India (P) Ltd.</p>
            <p>Email: <a href="mailto:info@franmaxindia.com">info@franmaxindia.com</a></p>
          </div>

          <div className="footer-section contact">
            {/* <h4>Contact</h4> */}
            <p>📞 +91 82008 67016</p>
            <div className="footer-address">
              <span>📍</span>
              <a
                href="https://www.google.com/maps/dir//Titanium+City+Centre,+A-402,+100+Feet+Anand+Nagar+Rd,+Satellite,+Jodhpur+Village,+Ahmedabad,+Gujarat+380015"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-address-link"
              >
                A-402, Titanium City Center,<br />
                100 Feet Anand Nagar Road,<br />
                Ahmedabad, Gujarat – 380015
              </a>
            </div>
          </div>

          <div className="footer-section follow">
            {/* <h4>Follow Us</h4> */}
            <div className="social-icons">
              <a href="https://www.facebook.com/@franmaxindia/?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://www.linkedin.com/company/franmaxindia/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
              <a href="https://www.instagram.com/franmax_india?igsh=MWo2YjhteXRqazR6ZQ==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://g.co/kgs/zeVko4Q" target="_blank" rel="noopener noreferrer"><FaGoogle /></a>
              <a href="https://www.youtube.com/@Franmaxindia" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <WhatsAppIcon />

        <div className="footer-quick-links-row">
          <Link to="/about">About Us</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/cookies-policy">Cookies & Policy</Link> {/* ✅ Correct routing */}
          <Link to="/privacy-policy">Privacy & Policy</Link> {/* ✅ Correct routing */}
          <Link to="/payment-terms">Payment Terms</Link> {/* ✅ Correct routing */}
          <Link to="/our-team">Team</Link> {/* ✅ Correct routing */}
              <Link to="/contact-us">Contact</Link>
        </div>
      </footer>
    </>
  );
}
export default Footer;
