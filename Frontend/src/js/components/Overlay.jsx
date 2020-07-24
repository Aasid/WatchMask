import React, { Component } from 'react';

class Overlay extends Component {
	constructor(props) {
		super(props);
		this.state = { acess: false };
		this.resultString = '';
	}
	render() {
		if (this.state.acess) {
			this.resultString = 'Proceed';
		} else {
			this.resultString = 'Denied';
		}
		return (
			<div className="overlay">
				<div className="overlayItemContainer">
					<div className="overlayItem">
						<span>{this.resultString}</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Overlay;
