import React, {Component} from 'react';
import './MapContainer.scss';
import Map from './map';
import {GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
    render() {
        return (
            <Map google={this.props.google} campsites={this.props.campsites} />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCl9gYSaGMtTUjkGDPBhHC4jZnhGmTskog',
    libraries: ['visualization']  
})(MapContainer);
