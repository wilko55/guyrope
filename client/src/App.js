import React, { Component } from 'react';
import './App.scss';
import CampsiteCard from './components/campsiteCard';
import MapContainer from './components/mapContainer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campsites: [],
      error: {},
      params: {},
      querystring: ''
    };

    this.getCampsites = this.getCampsites.bind(this);
  }

  getCampsites(location) {
    if (location) {
      const lat = location.lat();
      const lng = location.lng();

      fetch(`http://localhost:3000/location/${lat}/${lng}/100/10`)
      .then((response) => {
        if (response.ok) {

          return response.json();
        } else {
          this.setState({ error: { type: 403 } });
        }
      })
      .then((results) => {
        this.setState({ campsites: results, isLoading: false, error: false });
      })
      .catch(err => {
        this.setState({ error: { type: 500 }});
      })
    }
  }

  componentWillMount() {
    this.setState({ querystring: location.search.slice(1)});
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.getCampsites();    
  }

  render() {
    return (
      <div className="App">Guyrope
        <MapContainer campsites={this.state.campsites} getCampsites={this.getCampsites} />
        <CampsiteCard error={this.state.error} isLoading={this.state.isLoading} campsites={this.state.campsites} />
      </div>
    );
  }
}

console.log('fetching results from server...');

export default App;
