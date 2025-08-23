import React from 'react';
import { FaCheckCircle, FaRocket, FaBuilding, FaChartLine, FaBullhorn, FaGavel } from 'react-icons/fa';
import { MdWork, MdOutlineStorefront } from 'react-icons/md';
import BenefitCard from './BenefitCard';
import WorkList from './WorkList';

const tabData = {
  build: {
    title: 'Start Your Own Brand with Franmax India',
    description:
      'We help aspiring entrepreneurs build their own brand from scratch, including branding, legal setup, marketing, and business planning.',
    benefits: [
      'Customized Branding Support',
      'Market & Competitor Analysis',
      'Full Business Model Creation',
    ],
    work: [
      { icon: <FaRocket />, label: 'Logo & Identity Design' },
      { icon: <FaGavel />, label: 'Legal & Licensing Help' },
      { icon: <MdOutlineStorefront />, label: 'Store Setup Guidance' },
      { icon: <FaChartLine />, label: 'Menu/Product Design' },
      { icon: <FaBullhorn />, label: 'Social Media & Ads' },
    ],
  },
  franchise: {
    title: 'Find the Right Franchise with Franmax India',
    description:
      'Choosing the right franchise is crucial. We guide you through the evaluation, negotiation, and onboarding process.',
    benefits: [
      'Personalized Franchise Match',
      'ROI & Risk Assessment',
      'Franchise Agreement Guidance',
    ],
    work: [
      { icon: <FaChartLine />, label: 'Market Research' },
      { icon: <FaBuilding />, label: 'Brand Comparisons' },
      { icon: <FaGavel />, label: 'Franchise Document Review' },
      { icon: <FaRocket />, label: 'Investment Planning' },
      { icon: <MdWork />, label: 'Location Strategy' },
    ],
  },
};

const TabContent = ({ activeTab }) => {
  const { title, description, benefits, work } = tabData[activeTab];

  return (
    <div className="tab-content enhanced-tab-content">
      <h2 className="tab-title">{title}</h2>
      <p className="tab-description">{description}</p>

      <section className="tab-section">
        <h3 className="tab-subheading">🌟 Key Benefits</h3>
        <div className="benefit-list">
          {benefits.map((benefit, index) => (
            <div className="benefit-card enhanced-benefit-card" key={index}>
              <FaCheckCircle className="benefit-icon" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="tab-section">
        <h3 className="tab-subheading">🛠️ What We Do</h3>
        <div className="work-grid">
          {work.map((item, index) => (
            <div className="work-item" key={index}>
              <div className="work-icon">{item.icon}</div>
              <p className="work-label">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TabContent;
