import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import Main from './Main';

class App extends Component {

    componentDidMount() { fetch('/.netlify/functions/token', {
        method: 'POST'
  }).then(response => {
    console.log(response);
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
