var dx = 1000;
var dy = 0;

function setup(){
	createCanvas(400,400);
	//frameRate(10);
	pixelDensity(1);
}

function draw(){
	background(255);
	loadPixels();
	for (var x = 0; x < width; x++ ){
		dx =1000;
		for (var y = 0; y < height; y++) {
			var index = (x + y * width)*4;
			var bright = noise(dx,dy)*255;
			pixels[index]=bright;
			pixels[index+1]=bright;
			pixels[index+2]=bright;
			pixels[index+3]=255;
			dx+=0.002;
		}
		dy += 0.002;

	}
	updatePixels();
}