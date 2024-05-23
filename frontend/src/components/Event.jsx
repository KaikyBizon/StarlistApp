import React from 'react';
import '../components/Event.css';

const Event = ({ title }) => {
  return <div className="event">{title}</div>;
};

export default Event;