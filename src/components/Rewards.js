import React, { Component } from 'react';
import rewardsCont from '../rewardsobj';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Rewards extends Component {
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
		let tabPanelComplete = [];
		let levels = Object.keys(rewardsCont[rep]).map((level,index) => <Tab label={level} key={index}/>);
		let rewardsCompleted = [];
		let items;
		for(var i = 0; i<levels.length;i++){
			let level = levels[i].props.label;
			items = rewardsCont[rep][level];
			for(var j = 0;j<items.length;j++) {
				let item = items[j];
				if(item.id) {
					rewardsCompleted.push(<p key={item.id}><a href={['//www.wowhead.com/item=',item.id].join('')} >{item.name}</a></p>);
				} else {
					let nameKey = item.name.replace(/ +/g, '');
					rewardsCompleted.push(<p key={nameKey}>{item.name}</p>);
				}
				//console.log("reward completed");
			}
			tabPanelComplete.push(<div key={level}>{this.state.value === i && <TabContainer>{rewardsCompleted}</TabContainer>}</div>);
			rewardsCompleted = [];
		}

		return (
			<div>
				<Tabs value={this.state.value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" centered>
					{levels}
				</Tabs>
				{tabPanelComplete}
			</div>
		);
	}
}

function TabContainer(props) {
	return props.children;
}

export default Rewards;
