import React, {Component} from 'react';
import './MapContainer.scss';
import Map from './map';
import {GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Map google={this.props.google} campsites={this.props.campsites} getCampsites={this.props.getCampsites} />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCl9gYSaGMtTUjkGDPBhHC4jZnhGmTskog',
    libraries: ['visualization', 'places']  
})(MapContainer);
