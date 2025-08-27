import React, { useEffect, useState, useRef } from 'react';
import './design/TopBrands.css';
import { getImageUrl, getApiUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const TopBrands = ({
  apiUrl = getApiUrl('get-premium-brands.php'),
  sectionTitle = 'Top Franchising Opportunities',
  viewAllLink = '/franchises'
}) => {
  const [brands, setBrands] = useState([]);
  const intervalRef = useRef(null);
  const cardGridRef = useRef(null);
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const navigate = useNavigate();

  // Shuffle helper
  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Fetch brands from API and shuffle
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data.success && Array.isArray(data.brands)) {
          const unique = data.brands.filter(
            (b, i, arr) => arr.findIndex(x => x.id === b.id) === i
          );
          setBrands(shuffleArray(unique)); // Shuffle on load
        } else {
          console.error("API response unexpected or no brands found:", data);
          setBrands([]);
        }
      } catch (err) {
        console.error("Failed to fetch brands from API:", apiUrl, err);
        setBrands([]);
      }
    };
    if (apiUrl) fetchBrands();

    return () => clearInterval(intervalRef.current);
  }, [apiUrl]);

  // Measure card width dynamically
  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        const computedWidth = cardRef.current.offsetWidth;
        const computedStyle = getComputedStyle(cardRef.current);
        const marginRight = parseInt(computedStyle.marginRight, 10) || 0;
        setCardWidth(computedWidth + marginRight);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [brands]);

  // Auto-slide every 4s if more than 3 brands
  useEffect(() => {
    if (brands.length > 3 && cardWidth > 0) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        if (cardGridRef.current) {
          cardGridRef.current.style.transition = "transform 0.8s ease-in-out";
          cardGridRef.current.style.transform = `translateX(-${cardWidth}px)`;

          setTimeout(() => {
            setBrands(prev => {
              const first = prev[0];
              return [...prev.slice(1), first];
            });
            if (cardGridRef.current) {
              cardGridRef.current.style.transition = "none";
              cardGridRef.current.style.transform = "translateX(0)";
            }
          }, 800);
        }
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [brands.length, cardWidth]);

  const handleKnowMore = (register_id) => {
    navigate(`/brand/${register_id}`);
  };

  return (
    <div className="syb-wrapper">
      <div className="syb-heading-row">
        {brands.length >= 1 && <h2 className="syb-heading">{sectionTitle}</h2>}
        {brands.length >= 1 && (
          <a href={viewAllLink} className="syb-view-all">View All</a>
        )}
      </div>

      <div className="syb-carousel-container">
        <div className="syb-grid" ref={cardGridRef}>
          {brands.map((brand, i) => (
            <div
              className="syb-card" 
              key={brand.id || i} 
              ref={i === 0 ? cardRef : null} // measure first card
            >
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
                    <span className="value">
                      ₹{brand.min_investment} - {brand.max_investment}
                    </span>
                  </div>
                  <div className="biz-field">
                    <span className="label">Area:</span>
                    <span className="value">
                      {brand.min_area} - {brand.max_area} sq.ft
                    </span>
                  </div>
                  <div className="biz-field">
                    <span className="label">Outlets:</span>
                    <span className="value">{brand.total_outlets}</span>
                  </div>
                </div>
                <button
                  className="syb-btn"
                  onClick={() => handleKnowMore(brand.id)}
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBrands;
