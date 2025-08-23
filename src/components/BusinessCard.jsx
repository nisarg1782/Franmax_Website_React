import React from "react";
import { useNavigate } from "react-router-dom";

const BusinessCard = ({ business }) => {
  const navigate = useNavigate();

  const handleKnowMore = () => {
    if (!business.uuid) {
      console.warn("UUID is missing for business:", business);
      return;
    }
    navigate(`/business/${business.uuid}`);
  };

  return (
    <div className="franchise-card">
      <div className="card-img-box">
        <img
          src={business.image || "/placeholder.jpg"}
          alt={business.business_name || "Business"}
          className="card-img"
        />
      </div>

      <div className="card-content">
        <div className="biz-detail">
          <div className="biz-field">
            <span className="label">Expected Amount:</span>
            <span className="value">
              ₹{parseFloat(business.expected_amount || 0).toLocaleString()}
            </span>
          </div>
          <div className="biz-field">
            <span className="label">Location:</span>
            <span className="value">{business.city_name || "N/A"}</span>
          </div>
        </div>

        <button className="know-more-btn" onClick={handleKnowMore}>
          Know More
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;
