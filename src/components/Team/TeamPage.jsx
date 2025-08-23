import React from 'react';
import '../design/TeamPage.css';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const team = [
  {
    name: 'Vipul Panchal',
    role: 'Founder & CEO',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQGZjbtqxZFN-Q/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1715690882376?e=2147483647&v=beta&t=kUopH5lG8Ne6igxgbw4LpatPO2TtsJgtw4brMNCntKs',
    description: 'Leading the vision of Franmax India with innovation and commitment.',
    linkedin: 'https://linkedin.com/in/nisargtrivedi',
    email: 'nisarg@franmaxindia.com',
  },
  {
    name: 'Priya Panchal',
    role: 'Co-Founder & CTO',
    image: 'https://via.placeholder.com/400x400?text=Jay+Patel',
    description: 'Transforming technology into value for franchising growth.',
    linkedin: 'https://linkedin.com/in/jaypatel',
    email: 'jay@franmaxindia.com',
  }
];

const TeamSplit = () => {
  return (
    <div className="team-split-section">
      <h2 className="team-split-heading">Our Core Team</h2>
      {team.map((member, idx) => (
        <div className={`team-split-row ${idx % 2 !== 0 ? 'reverse' : ''}`} key={idx}>
          <img src={member.image} alt={member.name} className="team-split-img" />
          <div className="team-split-content">
            <h3>{member.name}</h3>
            <p className="role">{member.role}</p>
            <p className="desc">{member.description}</p>
            <div className="social">
              <a href={member.linkedin}><FaLinkedin /></a>
              <a href={`mailto:${member.email}`}><FaEnvelope /></a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSplit;
