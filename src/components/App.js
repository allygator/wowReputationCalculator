import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import Main from './Main';

class App extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        return fetch('/.netlify/functions/token.js', {
        method: 'POST'
  }).then(response => {
    return response.json()
  })
}

    render() {
        return (
          <div className="App">
            <Header />
            <Main />
          </div>
    );}

}

export default App;
