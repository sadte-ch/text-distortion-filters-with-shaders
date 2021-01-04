let shaderStore = {};
let currentShader;
let graphic;
let fonts = {};
let freq = 0.0, amp = 0.0;
let mode, shaderType;
let direction = 'forwards';

function preload() {
  shaderStore.waveDistortion = loadShader('shaders/waveDistortion/shader.vert', 'shaders/waveDistortion/shader.frag');
  
  shaderStore.waveDistortionX = loadShader('shaders/waveDistortionX/shader.vert', 'shaders/waveDistortionX/shader.frag');
  
  shaderStore.waveDistortionY = loadShader('shaders/waveDistortionY/shader.vert', 'shaders/waveDistortionY/shader.frag');
  
  fonts.barlow = loadFont('assets/Barlow-Black.otf');
  fonts.abril = loadFont('assets/abril.ttf');
  fonts.archivo = loadFont('assets/archivo.ttf');
  fonts.bebas = loadFont('assets/bebas.ttf');
  fonts.caveat = loadFont('assets/caveat.ttf');
  fonts.exo2 = loadFont('assets/exo2.ttf');
  fonts.gravitas = loadFont('assets/gravitas.ttf');
  fonts.indieFlower = loadFont('assets/indie-flower.ttf');
  fonts.josefineSans = loadFont('assets/josefin-sans.ttf');
  fonts.pressStart = loadFont('assets/press-start.ttf');
  fonts.robotoMono = loadFont('assets/roboto-mono.ttf');
  fonts.spaceMono = loadFont('assets/space-mono.ttf');
  fonts.viaodaLibre = loadFont('assets/viaoda-libre.ttf');
}

function setup() {
  let orientation = windowWidth > windowHeight ? 'landscape' : 'portrait';
  let size = orientation === 'portrait' ? windowWidth : windowHeight;
  
  createCanvas(size, size, WEBGL);
  
  //graphics (contains text) ---------------
  graphic = createGraphics(size, size);
  
  noStroke();
}

function draw() {
  createTextGraphic()
  
  // ------------ shader stuff ---------------
  shaderSetup()

  rect(0,0,width, height);
}

function createTextGraphic() {
  let gWth = graphic.width;
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
  let lineSpacing = getGuiVal('lineSpacing');
  let noRepeat = getGuiVal('repeatY');
  
  let text2 = getGuiVal('text2');
  if(text2) {
    texts.push(text2);
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
    graphic.text(line,gWth*0.5,gWth*y);
  })
}

function shaderSetup() {
  let newMode = getGuiVal('mode');
  if(mode !== newMode) {
    //if mode has changed since last frame
    mode = newMode;
    resetShaderParams();
  }
  let newShaderType = getGuiVal('shaderType');
  if(shaderType !== newShaderType) {
    //if shader type has changed since last frame 
    shaderType = newShaderType;
    resetShaderParams();
  }
  
  currentShader = shaderStore[shaderType]
  shader(currentShader);
  
  currentShader.setUniform('tex', graphic);
  
  let speed = getGuiVal('speed');
currentShader.setUniform('speed', frameCount * speed);
  
  // ----------- shader params ---------- //
  setShaderParams()
}

function setShaderParams() {
  switch(shaderType) {
    case 'waveDistortion': 
      waveDistortionShader();
      break;
    case 'waveDistortionX': 
      waveDistortionShader();
      break;
    case 'waveDistortionY': 
      waveDistortionShader();
      break;
    default:
  }
}