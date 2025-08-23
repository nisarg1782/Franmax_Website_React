import React, { useEffect, useState, useRef } from 'react';
import './design/TopBrands.css';
import { getImageUrl } from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import { getApiUrl } from '../utils/api';

const TopBrands = ({
  apiUrl = getApiUrl('get-premium-brands.php'),
  sectionTitle = 'Top Franchising Opportunities',
  viewAllLink = '/franchises'
}) => {
  const [brands, setBrands] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const intervalRef = useRef(null);
  const cardGridRef = useRef(null);

  // ... (useEffect hooks for fetching, carousel, and transform) ...
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data.success && Array.isArray(data.brands)) {
          const unique = data.brands.filter(
            (b, i, arr) => arr.findIndex(x => x.id === b.id) === i
          );
          setBrands(unique);
        } else {
          console.error("API response format unexpected or no brands found:", data);
          setBrands([]);
        }
      } catch (err) {
        console.error("Failed to fetch brands from API:", apiUrl, err);
        setBrands([]);
      }
    };
    if (apiUrl) {
      fetchBrands();
    }
    return () => clearInterval(intervalRef.current);
  }, [apiUrl]);

  useEffect(() => {
    if (brands.length > 3) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setVisibleIndex(prev => (prev + 1) % brands.length);
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [brands]);

  useEffect(() => {
    if (cardGridRef.current && brands.length > 0) {
      const cardWidthWithGap = 280 + 15;
      const offset = visibleIndex * cardWidthWithGap;
      cardGridRef.current.style.transform = `translateX(-${offset}px)`;
    }
  }, [visibleIndex, brands]);
  

  return (
    <div className="syb-wrapper">
      <div className="syb-heading-row">
        <h2 className="syb-heading">{sectionTitle}</h2>
        {brands.length >= 1 && (
          <a href={viewAllLink} className="syb-view-all">View All</a>
        )}
      </div>
      <div className="syb-carousel-container">
        <div className="syb-grid" ref={cardGridRef}>
          {brands.map((brand, i) => (
            <div className="syb-card" key={brand.id || i}>
              <div className="syb-img-wrap">
                <img src={getImageUrl(brand.logo)} alt={brand.name} />
              </div>
              <div className="syb-content">
                <h3>{brand.name}</h3>
                <div className="syb-detail">
                  <div className="biz-field">
                    <span className="label">Sector:</span>
                    <span className="value">{brand.sector || '—'}</span>
                  </div>
                  <div className="biz-field">
                    <span className="label">Investment:</span>
                    <span className="value">₹{brand.min_investment} - {brand.max_investment}</span>
                  </div>
                  <div className="biz-field">
                    <span className="label">Area:</span>
                    <span className="value">{brand.min_area} - {brand.max_area} sq.ft</span>
                  </div>
                  <div className="biz-field">
                    <span className="label">Outlets:</span>
                    <span className="value">{brand.total_outlets}</span>
                  </div>
                </div>
                <button className="syb-btn"
               
                >Know More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBrands;