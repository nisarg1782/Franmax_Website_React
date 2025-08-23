import React from 'react';
import { FaCheckCircle, FaChartBar, FaPuzzlePiece, FaSearchDollar, FaBalanceScale, FaClipboardList, FaHandshake, FaGlobe } from 'react-icons/fa';
import BenefitCard from './FranchiseBenifitCard';
import WorkCard from './WorkCard';

const tabInfo = {
  expansion: {
    title: 'Franchise Expansion',
    description:
      'Franmax India offers strategic franchise expansion services tailored to your business vision. We help brands scale through data-driven market entry plans, partner scouting, and seamless location rollouts across cities and regions.',
    benefits: [
      'Scalable Growth Strategy',
      'Pan-India Expansion Planning',
      'Verified Franchisee Network',
      'Increased Brand Reach',
    ],
    work: [
      { icon: <FaSearchDollar />, label: 'Market Demand Analysis' },
      { icon: <FaChartBar />, label: 'Territory Planning & Roadmap' },
      { icon: <FaPuzzlePiece />, label: 'Franchise Partner Onboarding' },
      { icon: <FaHandshake />, label: 'Investor Shortlisting & Screening' },
      { icon: <FaGlobe />, label: 'City-wise Rollout Strategy' },
    ],
  },
  model: {
    title: 'Franchise Model Making',
    description:
      'Our team helps you craft a foolproof franchise model that’s replicable, profitable, and easy to operate. From operational frameworks to training modules, we ensure your franchise runs like a well-oiled machine.',
    benefits: [
      'End-to-End Franchise Blueprint',
      'Operational SOPs & Manuals',
      'Financial Projections & Revenue Sharing',
      'Scalable Business Design',
    ],
    work: [
      { icon: <FaChartBar />, label: 'Business Model Drafting' },
      { icon: <FaPuzzlePiece />, label: 'Unit Economics Planning' },
      { icon: <FaBalanceScale />, label: 'ROI & Breakeven Analysis' },
      { icon: <FaClipboardList />, label: 'Operations & Compliance SOPs' },
      { icon: <FaHandshake />, label: 'Franchisee Onboarding Kits' },
    ],
  },
  auditing: {
    title: 'Franchise Auditing',
    description:
      'Maintain consistency and performance across all your franchise outlets with our specialized auditing services. We audit operational health, customer service quality, and compliance with brand guidelines.',
    benefits: [
      'Enhanced Operational Efficiency',
      'Improved Compliance & Brand Image',
      'Data-Driven Performance Tracking',
      'Franchisee Accountability',
    ],
    work: [
      { icon: <FaSearchDollar />, label: 'Franchise Compliance Reports' },
      { icon: <FaBalanceScale />, label: 'Mystery Audits & Quality Checks' },
      { icon: <FaChartBar />, label: 'Sales & KPI Review' },
      { icon: <FaClipboardList />, label: 'Standard Operating Benchmarking' },
      { icon: <FaHandshake />, label: 'Feedback & Improvement Planning' },
    ],
  },
};

const TabContent = ({ activeTab }) => {
  const { title, description, benefits, work } = tabInfo[activeTab];

  return (
    <div className="tab-content">
      <h2>{title}</h2>
      <p>{description}</p>

      <h3>🌟 Benefits</h3>
      <div className="benefit-list">
        {benefits.map((item, i) => (
          <BenefitCard key={i} text={item} />
        ))}
      </div>

      <h3>🛠️ How Franmax Works</h3>
      <div className="work-grid">
        {work.map((item, i) => (
          <WorkCard key={i} icon={item.icon} label={item.label} />
        ))}
      </div>
    </div>
  );
};

export default TabContent;
