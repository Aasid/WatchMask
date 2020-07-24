import '../sass/main.scss';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Marquee from 'react-double-marquee';
import CamComponent from './components/CamComponent';

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

ReactDOM.render(
	<Fragment>
		<div
			className="marqueeContainer"
			style={{
				width: vw,

				whiteSpace: 'nowrap',
			}}
		>
			<Marquee>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
				industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book.
			</Marquee>
		</div>
		<CamComponent />
	</Fragment>,
	document.getElementById('app')
);
