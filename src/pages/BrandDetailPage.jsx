import React, { useState, useEffect } from "react";
import "./BrandDetailPage.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import ConnectMeModal from "./ConnectMePage.jsx"; // Import the new modal component

// Base URL for images
const IMAGE_BASE_URL = "http://localhost/react-api/uploads/";

const BrandDetailPage = ({ productId = 7 }) => {
  const [brandData, setBrandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  // Fetch brand data from your API
  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const response = await fetch(
          `http://localhost/react-api/get_brand_details.php?product_id=${productId}`
        );
        const apiResponse = await response.json();

        if (apiResponse.success && apiResponse.brands?.length > 0) {
          setBrandData(apiResponse.brands[0]);
        } else {
          setBrandData(null);
        }
      } catch (err) {
        console.error("Failed to fetch brand data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [productId]);

  // Set the initial main image once data is loaded
  useEffect(() => {
    if (brandData) {
      const primaryImage = brandData.images?.find(
        (img) => img.photo_type === "primaryImage"
      );
      const firstAvailableImage = primaryImage || brandData.images?.[0];

      if (firstAvailableImage) {
        setMainImage(`${IMAGE_BASE_URL}${firstAvailableImage.photo_url}`);
      }
    }
  }, [brandData]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showConnectModal ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [showConnectModal]);

  // Gallery images for the thumbnails
  const imageGallery =
    brandData?.images?.filter((img) =>
      ["primaryImage", "listingImage", "detailImage1", "detailImage2", "logo"].includes(img.photo_type)
    ) || [];

  // Loading / Error / No Data states
  if (loading)
    return <div className="loading-state">Loading brand details...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;
  if (!brandData)
    return <div className="no-data-state">No brand data found.</div>;

  // Similar Brands (from API or mock)
  const similarBrands = brandData.similar_brands || [
    {
      name: "Brand A",
      img: "https://placehold.co/150x150/ff6666/ffffff",
      desc: "Similar brand description.",
    },
    {
      name: "Brand B",
      img: "https://placehold.co/150x150/66cc66/ffffff",
      desc: "Similar brand description.",
    },
    {
      name: "Brand C",
      img: "https://placehold.co/150x150/6699ff/ffffff",
      desc: "Similar brand description.",
    },
  ];

  return (
    <div className="brand-detail-page">
      {/* Connect Me Button */}
      <button
        className="detail-page-connect-btn"
        onClick={() => setShowConnectModal(true)}
      >
        Connect Me
      </button>

      {/* Main Section */}
      <section className="main-section">
        {/* The main image and thumbnail gallery */}
        <div className="image-gallery-container">
          <div className="main-image">
            <img src={mainImage} alt="Brand Main" />
          </div>
          <div className="thumbnail-gallery">
            {imageGallery.map((img, index) => (
              <img
                key={index}
                src={`${IMAGE_BASE_URL}${img.photo_url}`}
                alt={`Thumbnail ${index}`}
                className={
                  mainImage === `${IMAGE_BASE_URL}${img.photo_url}`
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setMainImage(`${IMAGE_BASE_URL}${img.photo_url}`)
                }
              />
            ))}
          </div>
        </div>

        <div className="main-details">
          <h1>{brandData.name}</h1>
          <p className="short-desc">
            {brandData.sector}, {brandData.category_name?.trim()},{" "}
            {brandData.subcategory_name?.trim()}.
          </p>
          <div className="key-stats">
            <div>
              <span>Area:</span> {brandData.min_area}–{brandData.max_area}{" "}
              sq.ft
            </div>
            <div>
              <span>Investment:</span> ₹{brandData.min_investment}–₹
              {brandData.max_investment}
            </div>
            <div>
              <span>No of Outlets:</span> {brandData.total_outlets}
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="category-section">
        <div className="category-card">
          <h2>Sector</h2>
          <p>{brandData.sector}</p>
        </div>
        <div className="category-card">
          <h2>Category</h2>
          <p>{brandData.category_name?.trim()}</p>
        </div>
        <div className="category-card">
          <h2>Sub-category</h2>
          <p>{brandData.subcategory_name?.trim()}</p>
        </div>
      </section>

      {/* Brand Details */}
      <section className="brand-details">
        <h2>About {brandData.name}</h2>
        <p>
          Established in {brandData.master_unit_details?.start_year || "recent years"}, with{" "}
          {brandData.total_outlets} outlets.
        </p>
        <p>
          Franchise partners receive full support including site selection,
          training, marketing, and ongoing assistance.
        </p>

        {/* ===== Unit Details Section ===== */}
        <section className="unit-details-section">
          <div className="unit-details">
            <h3>Unit Details</h3>

            {/* Single Unit */}
            {brandData.single_unit_details && (
              <div className="unit-card single-unit">
                <h4>Single Unit</h4>
                <p>
                  <span>Area Required:</span> {brandData.single_unit_details.area_req}
                </p>
                <p>
                  <span>Investment:</span> ₹
                  {brandData.single_unit_details.investment}
                </p>
                <p>
                  <span>ROI:</span> {brandData.single_unit_details.roi}%
                </p>
                <p>
                  <span>Payback:</span> {brandData.single_unit_details.payback}{" "}
                  years
                </p>
              </div>
            )}

            {/* Master Unit Details */}
            {brandData.master_unit_details &&
              brandData.master_unit_details.length > 0 && (
                <div className="master-unit-section">
                  <h3>Master Unit Details</h3>

                  <div className="master-unit-cards">
                    {brandData.master_unit_details.map((unit) => (
                      <div className={`unit-card ${unit.type}`} key={unit.id}>
                        <h4>
                          {unit.type === "city_wise" && "City-wise Unit"}
                          {unit.type === "state_wise" && "State-wise Unit"}
                          {unit.type === "country_wise" && "Country-wise Unit"}
                        </h4>
                        <p>
                          <span>Area Required:</span> {unit.area_req}
                        </p>
                        <p>
                          <span>Investment:</span> ₹{unit.investment}
                        </p>
                        <p>
                          <span>ROI:</span> {unit.roi}%
                        </p>
                        <p>
                          <span>Payback:</span> {unit.payback} years
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {!brandData.single_unit_details && !brandData.master_unit_details && (
              <p>Unit details not provided.</p>
            )}
          </div>
        </section>
      </section>

      {/* --- */}
      {/* Expansion Map */}
      <section className="expansion-map">
        <h2>Expansion Map</h2>
        <p>Operational outlets across different states and cities:</p>
        <div className="states-list">
          {(brandData.expansion_states?.length > 0
            ? brandData.expansion_states
            : [
                { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur"] },
                {
                  name: "Karnataka",
                  cities: ["Bengaluru", "Mysuru", "Mangalore"],
                },
                { name: "Delhi", cities: ["New Delhi", "Dwarka", "Rohini"] },
                {
                  name: "Tamil Nadu",
                  cities: ["Chennai", "Coimbatore", "Madurai"],
                },
              ]
          ).map((state, index) => (
            <div key={index} className="state-card">
              <h3>{state.name}</h3>
              {state.cities?.length > 0 ? (
                <ul>
                  {state.cities.map((city, idx) => (
                    <li key={idx}>{city}</li>
                  ))}
                </ul>
              ) : (
                <p>No city data available.</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* --- */}
      {/* Features Section */}
      <section className="features-section">
        <div className="feature-row image-right">
          <div className="feature-image">
            <img
              src={
                brandData.images?.find((img) => img.photo_type === "detailImage1")
                  ? `${IMAGE_BASE_URL}${
                      brandData.images.find(
                        (img) => img.photo_type === "detailImage1"
                      ).photo_url
                    }`
                  : ""
              }
              alt="Feature 1"
            />
          </div>
          <div className="feature-desc">
            <h3>Key Feature 1</h3>
            <p>Dynamic description of a key feature or aspect of the brand.</p>
          </div>
        </div>
        <div className="feature-row image-left">
          <div className="feature-image">
            <img
              src={
                brandData.images?.find((img) => img.photo_type === "detailImage2")
                  ? `${IMAGE_BASE_URL}${
                      brandData.images.find(
                        (img) => img.photo_type === "detailImage2"
                      ).photo_url
                    }`
                  : ""
              }
              alt="Feature 2"
            />
          </div>
          <div className="feature-desc">
            <h3>Key Feature 2</h3>
            <p>
              Another important aspect of the brand's business or support system.
            </p>
          </div>
        </div>
      </section>

      {/* --- */}
      {/* Why Choose */}
      <section className="why-choose">
        <h2>Why Choose {brandData.name}</h2>
        <ul>
          <li>
            Proven business model with a payback period of{" "}
            {brandData.single_unit_details?.payback} years.
          </li>
          <li>
            Investment range: ₹{brandData.single_unit_details?.investment}
          </li>
          <li>Support in marketing, training, and operations.</li>
          <li>Continuous innovation and business growth.</li>
        </ul>
      </section>

      {/* --- */}
      {/* Similar Brands */}
      <section className="similar-brands">
        <h2>Similar Brands</h2>
        <div className="slider-wrapper">
          <div className="brand-slider">
            {[...similarBrands, ...similarBrands].map((brand, index) => (
              <div className="brand-card" key={index}>
                <img src={brand.img} alt={brand.name} />
                <h3>{brand.name}</h3>
                <p>{brand.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Modal */}
      {showConnectModal && (
        <ConnectMeModal
          show={showConnectModal}
          onClose={() => setShowConnectModal(false)}
          brandId={brandData.register_id}
          productId={productId} // Pass both IDs for flexibility
        />
      )}
    </div>
  );
};

export default BrandDetailPage;