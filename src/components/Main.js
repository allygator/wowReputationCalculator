import React, { Component } from 'react';
import Calc from './Calc';
import Blog from './Blog';
import  { Route, Switch } from 'react-router-dom';

export const characterData = {
	region: '',
	realm: '',
	name: ''
};

export const characterContext = React.createContext(
	characterData
);

class Main extends Component {
	// constructor(props) {
	//     super(props);
	// }

	render() {
		return (
			<Switch>
				<Route exact path='/' component={Calc}/>
				<Route path='/:region/:realm/:name' component={Calc}/>
				<Route path='/blog' component={Blog}/>
			</Switch>
		);
	}


}

export default Main;
