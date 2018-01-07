import './Map.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Map extends Component {
    constructor(props) {
        super(props);

        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
            markers: []
        }
    }

    onSubmit = function(e) {
        e.preventDefault();
    }

    componentDidMount() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    currentLocation: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
            })
        }
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
        if (prevProps.campsites !== this.props.campsites) {
            this.updateMarkers();
        }
    }

    updateMarkers() {
        this.state.markers.map((m) => { m.setMap(null); });
        const markers = this.props.campsites.map( (campsite) => {
            const marker = new google.maps.Marker({
                position: {lat: campsite.location.coordinates[0], lng: campsite.location.coordinates[1]},
                map: this.map,
            })
            var infowindow = new google.maps.InfoWindow({
                content: `<h3>${campsite.name}</h3>
                <h4>${campsite.type}</h4>`
            });
            marker.addListener('click', function() {
                infowindow.open(this.map, marker);
            });
            return marker;
        })

        this.setState({markers: markers});
    }

    recenterMap() {
        const map = this.map;
        const curr = this.state.currentLocation;
        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(curr.lat, curr.lng);
            map.panTo(center);
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            const {google} = this.props;
            const maps = google.maps;
            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            let {initialCenter, zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign({}, {
                center: center,
                zoom: zoom,
                gestureHandling: "cooperative"
            })
            this.map = new maps.Map(node, mapConfig);

            this.autocomplete = new google.maps.places.Autocomplete(
                (document.getElementById('autocomplete'))
            )
            
            this.autocomplete.addListener('place_changed', onPlaceChanged.bind(this));
            this.places = new maps.places.PlacesService(this.map);

            this.map.addListener('dragend', () => {
                const coords = this.map.getCenter();
                this.props.getCampsites(coords)
            })

            function onPlaceChanged() {
                var place = this.autocomplete.getPlace();
                if (place.geometry) {
                    this.map.panTo(place.geometry.location);
                    this.map.setZoom(10);
                    this.props.getCampsites(place.geometry.location)
                } else {
                   document.getElementById('autocomplete').placeholder = 'Enter a city';
                }
            }
        }
    }
    
    renderChildren() {
        const {children} = this.props;
        if (!children) { return; }
        return React.Children.map(children, c => {
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        })
    }

    render() {
        const style = {
            width: '100vw',
            height: '75vh'
        }
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input
                        ref='autocomplete'
                        type="text"
                        id="autocomplete"
                        placeholder="Enter a location" />
                </form>
                <div ref="map" style={style}>
                    loading map...
                    {this.renderChildren()}
                </div>
            </div>

        )
    }
};

Map.propTypes = {
    google: React.PropTypes.object,
    zoom: React.PropTypes.number,
    initialCenter: React.PropTypes.object
}

Map.defaultProps = {
    zoom: 7,
    initialCenter: {
        lat: 48,
        lng: 7
    }
}

export default Map;