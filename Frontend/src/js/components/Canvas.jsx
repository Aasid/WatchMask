import React, { useState, useEffect } from 'react';

function Canvas() {
	let xCoordinate = useState(200);
	let yCoordinate = useState(220);
	useEffect(() => {
		const canvas = document.getElementById('canvas');
		const ctx = canvas.getContext('2d');

		canvas.width = 720;
		canvas.height = 1280;

		// strokeRect()
		ctx.setLineDash([20, 10]);
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'cyan';
		ctx.strokeRect(200, 330, 250, 150);
	}, []);

	return <canvas id="canvas"></canvas>;
}

export default Canvas;
