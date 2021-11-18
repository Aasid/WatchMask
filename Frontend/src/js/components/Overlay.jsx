import React, { Component } from 'react';
import Canvas from './Canvas';

class Overlay extends Component {
	constructor(props) {
		super(props);
		this.state = { recieved: false, detection: false };
		this.resultString = '';
	}
	render() {
		let element = 'hello!';
		if (this.state.recieved && this.state.detection) {
			element = 'True';
		}
		if (this.state.recieved && this.state.detection == false) {
			element = 'False';
		}
		return (
			<div className="overlay">
				{element}
				<Canvas />
			</div>
		);
	}
}

export default Overlay;
