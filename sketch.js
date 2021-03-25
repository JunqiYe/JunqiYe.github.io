var dx = 0;
var dy = 1000;
var clr_timer = 60;

function setup(){
	var canv = createCanvas(windowWidth, windowHeight);
	canv.style('display', 'block');
	frameRate(20);
	pixelDensity(1);
	background(255);
	setInterval(background, 1000 * clr_timer, 255);

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	background(255);
}

function draw(){
	loadPixels();

	var x = (int) (noise(dx) * width);  // using Perlin noise for x and y
	var y = (int) (noise(dy) * height);

	console.log(width);
	var index = (x + y * width) * 4;  	// translate 2d coord to 1d array

	// width and height of the pixel dot
	var thickness = 3;
	for (var i = 0; i < thickness * 4; i+=4) {
		for (var j = 0; j < thickness * 4; j += 4) {
			var delta = j * width;
			pixels[index+i+delta]=0;		// r
			pixels[index+i+delta+1]=0;  	// g
			pixels[index+i+delta+2]=0;		// b
			pixels[index+i+delta+3]=255;	// a
		}
	}

	dx += 0.02;				// shift the noise by 0.02 unit
	dy += 0.02;
	updatePixels();
	

}
