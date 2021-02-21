let currentShader;
let graphic;
let fonts = {};
let minFreq = 20.0;
let freqStep = 0.04;
let maxFreq = 50;
let freq = minFreq, amp = 0.0;
let mode, shaderType;
let direction = 'forwards';
let capturer
let captureStarted = false

function preload() {
  currentShader = loadShader('shaders/waveDistortion/shader.vert', 'shaders/waveDistortion/shader.frag');

  fonts.shapiro = loadFont('assets/fonts/Shapiro-116InclinedExtd.otf');
  fonts.eurostile = loadFont('assets/fonts/EurostileExtendedBlack.ttf');
  fonts.norms = loadFont('assets/fonts/TTNorms-Black.otf');
  fonts.formulaCondensed = loadFont('assets/fonts/FormulaCondensed-Bold.otf');
  fonts.gillSans = loadFont('assets/fonts/GillSansUltraBold.ttf');
  fonts.franklinGothic = loadFont('assets/fonts/Franklin Gothic Condensed.ttf');
  fonts.futura = loadFont('assets/fonts/Futura Bold.ttf');
  fonts.robotoMono = loadFont('assets/fonts/RobotoMono-Bold.ttf');
  fonts.mantra = loadFont('assets/fonts/Mantra-Regular.ttf');
  fonts.restora = loadFont('assets/fonts/RestoraExtraLight.otf');
  fonts.tiffany = loadFont('assets/fonts/TiffanyStd-Demi.otf');
  fonts.didot = loadFont('assets/fonts/Didot LT Std Bold.otf');
}

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);

  //graphics (contains text) ---------------
  graphic = createGraphics(windowWidth, windowHeight);

  noStroke();
  frameRate(24)
}

function draw() {
  createTextGraphic()

  // ------------ shader stuff ---------------
  shaderSetup()

  rect(0,0,width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  graphic = createGraphics(windowWidth, windowHeight);
}

function createTextGraphic() {
  let gWth = graphic.width;
  let gHgt = graphic.height;
  let bgColour = getGuiVal('background');
  let textColour = getGuiVal('textColour');
  let textAlign = getGuiVal('textAlign');
  let textSize = getGuiVal('textSize');
  let textOutlineWidth = getGuiVal('strokeWidth');
  let textOutlineColour = getGuiVal('strokeColour');
  let currentFont = getGuiVal('font');

  graphic.background(bgColour);
  graphic.noStroke();
  graphic.textFont(fonts[currentFont]);
  graphic.textSize(windowWidth*textSize);
  if(textAlign === 'center') {
    graphic.textAlign(CENTER,CENTER);
  } else if(textAlign === 'left') {
    graphic.textAlign(LEFT,CENTER);
  } else if(textAlign === 'right') {
    graphic.textAlign(RIGHT, CENTER);
  }
  graphic.fill(textColour);
  graphic.stroke(textOutlineColour);
  graphic.strokeWeight(textOutlineWidth);

  let text = getGuiVal('text');
  let texts = [text]
  let noLines = 1;
  //line spacing should scale relative to the textSize
  let lineSpacing = getGuiVal('lineSpacing');
  lineSpacing = lineSpacing + (textSize*0.8);
  let noRepeat = getGuiVal('repeatY');

  let text2 = getGuiVal('text2');
  if(text2) {
    texts.push(text2);
    noLines++;
  }
  let text3 = getGuiVal('text3');
  if(text3) {
    texts.push(text3);
    noLines++;
  }

  //repeat texts
  let ogTexts = [...texts];
  for(let i=1; i<noRepeat; i++) {
    texts = [...texts, ...ogTexts]
  }

  let ifEven = texts.length % 2 == 0;
  let middle = texts.length/2;

  texts.forEach((line,index) => {
    let y = 0.5;
    let pos = 0;
    if(texts.length > 1) {
      //find middle
      if(ifEven) { //no middle
        //how far from middle (top/bottom | -/+)
        pos = index - middle;
        pos+=0.3
      } else { //odd has middle
        pos = index - middle;
        pos+=0.35
      }
      y = y + (lineSpacing*pos);
    }
    graphic.text(line,gWth*0.5,gHgt*y);
  })
}

function shaderSetup() {
  let newMode = getGuiVal('mode');
  if(mode !== newMode) {
    //if mode has changed since last frame
    mode = newMode;
    resetShaderParams();
  }
  // let newShaderType = getGuiVal('shaderType');
  // if(shaderType !== newShaderType) {
  //   //if shader type has changed since last frame
  //   shaderType = newShaderType;
  //   resetShaderParams();
  // }

  shader(currentShader);

  currentShader.setUniform('tex', graphic);

  let speed = getGuiVal('speed');
  currentShader.setUniform('speed', frameCount * speed);

  // ----------- shader params ---------- //
  setShaderParams()
}

function setShaderParams() {
  waveDistortionShader();
}

function startRecording() {
	// if(!recording) recording = gui.add(obj, 'recording');
	// if(captureStarted) {
	// 	console.log('capture already started')
	// 	return
	// }
  // const canvas = document.getElementsByTagName('canvas')[0];
  // capturer = new CanvasRecorder(canvas);
  // captureStarted = true
	// capturer.start();
  convertWebmToMp4()
}
function stopRecording() {
	if(recording) {
		gui.remove(recording);
		recording = null
	}
	if(!capturer) {
		console.log('no capture')
		return
	}
  captureStarted = false
	capturer.stop();
	capturer.save('sad__tech-text-distortion-recording.webm');
	capturer = null;
}

function stopRecordingLoop() {
  console.log('stop loop')
  recordingLoop = false
  stopRecording()
}

function captureCanvas() {
  ReImg.fromCanvas(document.getElementsByTagName('canvas')[0]).downloadPng()
}
