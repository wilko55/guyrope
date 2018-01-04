import './Map.scss';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Map extends Component {

        componentDidUpdate(prevProps, prevState) {
          if (prevProps.google !== this.props.google || prevProps.quakes !== this.props.quakes) {
            this.loadMap();
          }
        }

        loadMap() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };
                })
            }

            if (this.props && this.props.google) {
              const {google} = this.props;
              const maps = google.maps;
              const mapRef = this.refs.map;
              const node = ReactDOM.findDOMNode(mapRef);
              const mapConfig = Object.assign({}, {
                center: {lat: 48, lng: 7},
                zoom: 4,
                gestureHandling: "cooperative",
                mapTypeId: 'terrain'
              })
              this.map = new maps.Map(node, mapConfig);
              
              this.props.campsites.map( (campsite) => {
                const marker = new google.maps.Marker({
                    position: {lat: parseFloat(campsite.address.gps.latitude), lng: parseFloat(campsite.address.gps.longitude)},
                    map: this.map,
                })
                var infowindow = new google.maps.InfoWindow({
                    content: `<h3>${campsite.name}</h3>
                    <h4>${campsite.type}</h4>`
                });
                marker.addListener('click', function() {
                    infowindow.open(this.map, marker);
                });
              })
            }
          }

          
          render() {
            const style = {
              width: '100vw',
              height: '75vh'
            }
        return (
              <div ref="map" style={style}>
                loading map...
              </div>
            )
        }
        
    // constructor(props) {
        // super(props);
    // }

    // componentWillUpdate(prevProps, prevState) {
    //     if (prevProps.google !== this.props.google || prevProps.quakes !== this.props.quakes) {
    //         this.loadMap();
    //       }
    // }

    // // componentDidMount() {
    // //     this.loadMap();
    // // }

    // loadMap() {
    //     console.log('!', this.props)
    //     if (this.props && this.props.google) {
    //             const {google} = this.props;
    //             const maps = google.maps;
          
    //             const mapRef = this.refs.map;
    //             const node = ReactDOM.findDOMNode(mapRef);
          
    //             const mapConfig = Object.assign({}, {
    //               center: {lat: 0, lng: 180},
    //               zoom: 2,
    //               gestureHandling: "cooperative",
    //               mapTypeId: 'terrain'
    //             })
    //             this.map = new maps.Map(node, mapConfig);
    //           }
    //         }

    // render() {
    //     const style = {
    //       width: '100vw',
    //       height: '75vh'
    //     }
    // return (
    //       <div ref="map" style={style}>
    //         loading map...
    //       </div>
    //     )
    // };
};

export default Map;