import React, { Component } from 'react';
import Overlay from './Overlay';
import Webcam from 'react-webcam';

const videoConstraints = {
	width: 1280,
	height: 720,
	facingMode: 'user',
};

class CamComponent extends Component {
	constructor(props) {
		super(props);
		this.webcamRef = React.createRef(null);
	}

	render() {
		return (
			<div id="camComponent" className="camComponent">
				<Webcam
					audio={false}
					height={720}
					screenshotFormat="image/jpeg"
					width={1280}
					ref={this.webcamRef}
					videoConstraints={videoConstraints}
				/>
				<Overlay />
			</div>
		);
	}
}

export default CamComponent;
