import React, { Component } from 'react';
import Overlay from './Overlay';
import Webcam from 'react-webcam';

class CamComponent extends Component {
	constructor(props) {
		super(props);
		this.webcamRef = React.createRef(null);
	}

	render() {
		return (
			<div id="camComponent" className="camComponent">
				<img src="http://127.0.0.1:8756/video_feed" />
				<Overlay />
			</div>
		);
	}
}

export default CamComponent;
