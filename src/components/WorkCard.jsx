import React from 'react';

const WorkCard = ({ icon, label }) => {
  return (
    <div className="work-card">
      <div className="work-icon">{icon}</div>
      <div className="work-label">{label}</div>
    </div>
  );
};

export default WorkCard;
