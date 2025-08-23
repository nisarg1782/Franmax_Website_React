// src/components/TopBar.js
import React, { useState } from 'react';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import LoginModal from './LoginModal/LoginModal';
import RegisterModal from './RegisterModal/RegisterModal';
import InvestorFormModal from './RegisterModal/InvestorForm';
import BrandFormModal from './RegisterModal/BrandFormModal';
import PartnerFormModal from './RegisterModal/PartnerFormModal';
import LeasingFormModal from './RegisterModal/LeasingFormModal'; // ✅ NEW
import './design/Header.css';

export default function TopBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showInvestorModal, setShowInvestorModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showLeasingModal, setShowLeasingModal] = useState(false); // ✅ NEW

  const handleOpenRegister = () => {
    setShowLogin(false);
    setIsRegisterOpen(true);
  };

  const handleOpenLogin = () => {
    setIsRegisterOpen(false);
    setShowLogin(true);
  };

  const handleOpenInvestor = () => {
    setIsRegisterOpen(false);
    setShowInvestorModal(true);
  };

  const handleOpenBrand = () => {
    setIsRegisterOpen(false);
    setShowBrandModal(true);
  };

  const handleOpenPartner = () => {
    setIsRegisterOpen(false);
    setShowPartnerModal(true);
  };

  const handleOpenLeasing = () => {
    setIsRegisterOpen(false);
    setShowLeasingModal(true);
  };

  return (
    <>
      <div className="top-bar">
        <div className="top-left">
          <img
            src="https://www.franmaxindia.com/images/black-pngb-logo-fx.png"
            alt="Logo"
            className="logo-img"
          />
        </div>

        <div className="top-center">
          <h2>
            India’s #1 <br />
            <span>Franchise Marketplace</span>
          </h2>
        </div>

        <div className="top-right">
          <button className="top-link-button" onClick={handleOpenRegister}>
            <FaUserPlus /> Register
          </button>

          <button className="top-link-button" onClick={handleOpenLogin}>
            <FaSignInAlt /> Login
          </button>
        </div>
      </div>

      {/* 🔐 Login Modal */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        openRegister={handleOpenRegister}
      />

      {/* 📝 Register Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        openLogin={handleOpenLogin}
        openInvestor={handleOpenInvestor}
        openBrand={handleOpenBrand}
        openPartner={handleOpenPartner}
        openLeasing={handleOpenLeasing} // ✅ Pass leasing modal trigger
      />

      {/* 👤 Investor Registration */}
      <InvestorFormModal
        isOpen={showInvestorModal}
        onClose={() => setShowInvestorModal(false)}
        onBack={() => {
          setShowInvestorModal(false);
          setIsRegisterOpen(true);
        }}
        openLogin={handleOpenLogin}
      />

      {/* 🏢 Brand Registration */}
      <BrandFormModal
        isOpen={showBrandModal}
        onClose={() => setShowBrandModal(false)}
        onBack={() => {
          setShowBrandModal(false);
          setIsRegisterOpen(true);
        }}
        openLogin={handleOpenLogin}
      />

      {/* 🤝 Partner Registration */}
      <PartnerFormModal
        isOpen={showPartnerModal}
        onClose={() => setShowPartnerModal(false)}
        onBack={() => {
          setShowPartnerModal(false);
          setIsRegisterOpen(true);
        }}
        openLogin={handleOpenLogin}
      />

      {/* 🏠 Leasing Property Registration */}
      <LeasingFormModal
        isOpen={showLeasingModal}
        onClose={() => setShowLeasingModal(false)}
      />
    </>
  );
}
