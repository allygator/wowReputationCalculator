import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Rewards from './Rewards';

import rewardsCont from '../rewardsobj';

class RepData extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			value: 0
		};
	}

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const rep = this.props.rep;
		const value = this.state.value;
		return (
			<div>
				<Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" fullWidth>
					{rewardsCont[rep] && <Tab label="Rewards" />}
				</Tabs>
				{value === 0 && rewardsCont[rep] && <Rewards rep={rep}></Rewards>}
			</div>
		);
	}
}

export default RepData;
