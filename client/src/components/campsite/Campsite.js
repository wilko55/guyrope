import React from 'react';
import './Campsite.scss';

const Campsite = props => (
    <div className="campsiteCard">
        name = {props.data.name}
    </div>
);

export default Campsite;
