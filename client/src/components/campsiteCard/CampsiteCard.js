import React from 'react';
import './CampsiteCard.scss';
import Campsite from '../campsite';

const CampsiteCard = props => {
  let campsiteCards = props.campsites.map(function(el, i) {
    return <Campsite data={el} key={i} />
  });

  if (props.error.type) {
    return (
      <div>Error!!</div>
    )
  }

  if (props.isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="card-grid">
      {campsiteCards}
    </div>
  )
};

export default CampsiteCard;
