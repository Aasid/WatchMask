import React, { Component } from 'react';
import Overlay from './Overlay';
import Webcam from 'react-webcam';

<<<<<<< HEAD
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

=======
>>>>>>> d3629bad55af387ba7652dca48cbd3842df1d543
const videoConstraints = {
	width: vw,
	height: vh,
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
					screenshotFormat="image/jpeg"
					ref={this.webcamRef}
					videoConstraints={videoConstraints}
				/>
				<Overlay />
			</div>
		);
	}
}

export default CamComponent;
