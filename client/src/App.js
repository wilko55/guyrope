import React, { Component } from 'react';
import './App.scss';
import CampsiteCard from './components/campsiteCard';
import Map from './components/map';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campsites: [],
      error: false,
      params: {},
      querystring: ''
    };
  }

  getLocationsFromQuerystring(query) {
    let params = {};
    query.split('&').forEach((el) => {
     let arr = el.split('=');
     params[arr[0]] = arr[1];
    })
    return {
      fromPlace: params.fromPlace.substring(0,3),
      toPlace: params.toPlace.substring(0,3)
    }
  }

  componentWillMount() {
    this.setState({ querystring: location.search.slice(1)});
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    fetch('http://localhost:3000/location/48.110/7.321/30000/10')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        this.setState({ error: { type: 403 } });
      }
    })
    .then((results) => {
      this.setState({ campsites: results, isLoading: false });
    })
    .catch(err => {
      this.setState({ error: { type: 500 }});
    })
  }

  render() {
    return (
      <div className="App">Guyrope
        {/* map goes here */}
        <Map />
        <CampsiteCard error={this.state.error} isLoading={this.state.isLoading} campsites={this.state.campsites} />
        {/* <TopNav/>
        <ResultsHeader locations={this.getLocationsFromQuerystring(this.state.querystring)}/>
        <PlaceholderControls/>
        <Results results={this.state.results} isLoading={this.state.isLoading} error={this.state.error}/> */}
      </div>
    );
  }
}

console.log('fetching results from server...');

export default App;
