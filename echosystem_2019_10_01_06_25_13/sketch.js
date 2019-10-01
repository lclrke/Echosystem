let oscBaseFreq = 220;
let modMaxFreq = 300;
let modMinFreq = 100;
let modMaxDepth = 150;
let modMinDepth = -150;

function setup() {
  createCanvas(windowWidth, windowHeight);
frameRate(24);
	

mic = new p5.AudioIn(); 
mic.start();
  osc = new p5.Oscillator('sine');
  filter = new p5.LowPass();

  modulator = new p5.Oscillator('sawtooth');
  modulator.start();

  modulator.disconnect();
  osc.freq(modulator);
  
 fft = new p5.FFT();
oscsin = new p5.Oscillator('sine');
  osc.disconnect();
  osc.connect(filter);
}

function draw() {
  background('black');

let vol = mic.getLevel();
let h = map(vol, 0, 1, 0, 10);
let m = vol*60;

let modFreq = map(h, 4000, 0, modMinFreq, modMaxFreq);
  modulator.freq(modFreq);

let modDepth = map(100, 0, width, modMinDepth, modMaxDepth);
  modulator.amp(modDepth);


	osc.freq(0 + h*200);
	osc.amp(200 + h*50);
osc.start();
let threshold = 0.02;
  if (vol < threshold) {
    osc.stop();}
  oscsin.start();
oscsin.freq(-2);
oscsin.amp(0.001);
 

filterFreq = map(mouseX, 100, 400, 100, 10000);
 filterRes = map(mouseY, 100, height, 15, 5);
  function touchMoved() {
 let rad= filterFreq
 
  rad(mouseX, mouseY, pmouseX, pmouseY);
     return false;
}

  filter.set(filterFreq, filterRes);



drawWaveform();
translate(width / 2, height / 2);
	
	
	var c1 = color(255, 0, 100, 200);
	var c2 = color(100, 100, 255, 200);
	
	var countSteps = 200;
	for (var i = 0; i <= countSteps; i++) {
		var r = map(i, 0, countSteps, 200, 0);
		var c = lerpColor(c1, c2, map(i, 0, countSteps, 0, 1));
		noFill();
      stroke(c);
		strokeWeight(1);
      
		var linedensity =m;
		beginShape();
			for (var j = 0; j < linedensity; j++) {
				var x = r * cos(map(j, 0, linedensity, 0, 2 * PI));
				var y = r * sin(map(j, 0, linedensity, 0, 2 * PI));
				vertex(0 + r * cos(10*x / 100, y / 100, 0), y + r * sin(x / 100, y / 100, 500));
			}
		endShape(CLOSE);
	}
	

}

function drawWaveform() {
 
}















