let gui = new dat.gui.GUI();
let recording = null

let modes = ['waveXY', 'waveY', 'waveX', 'sineWave', 'gridWave', 'scannerXY', 'scannerY', 'scannerX', 'collider']

var obj = {
  text: '*',
  text2: '',
  text3: '',
  lineSpacing: 0.01,
  repeatY: 1,
  mode: 'auto',

  speed: 0.05,
  shaderType: modes[0],

  font: 'didot',
  textAlign: 'center',
  textSize: 0.75,
  background: [0,0,255],
  textColour: [44, 255, 0],
  strokeColour: [0,0,0],
  strokeWidth: 2.0,
  randomiseColours: function() {
    let colours = [[33,0,255], [1,1,2], [253,154,1], [153,254,3], [223,0,195], [211,87,11], [111,170,7], [204,5,105]]
    let rand1 = Math.floor(Math.random() * colours.length)
    let rand2 = Math.floor(Math.random() * colours.length)
    let rand3 = Math.floor(Math.random() * colours.length)
    obj.textColour = colours[rand1]
    obj.background = colours[rand2]
    obj.strokeColour = colours[rand3]
  },

  // recording options ----------------
  recording: true,
  startRecording: function() {
    startRecording()
  },
  stopRecording: function() {
    stopRecording()
  },
  saveImage: function() {
    captureCanvas()
  }
};

gui.close(true);
gui.remember(obj);

gui.add(obj, 'text');
gui.add(obj, 'text2');
gui.add(obj, 'text3')
gui.add(obj, 'lineSpacing').min(-1.0).max(1.0).step(0.01);
gui.add(obj, 'repeatY').min(1).max(10).step(1);
gui.add(obj, 'mode', [ 'auto', 'mouse', 'absolute' ] );


// --------------- motion vars ---------------
var f1 = gui.addFolder('Motion Options');
    f1.add(obj, 'speed', { slow: 0.02, medium: 0.05, fast: 0.1, faster: 0.15, fasterer: 0.2 } );

// --------------- shader vars ---------------
var f2 = gui.addFolder('Shader Options');
    f2.add(obj, 'shaderType', modes);

resetShaderParams()


// --------------- text vars -----------------
var f3 = gui.addFolder('Design Options');
    f3.add(obj, 'font', ['shapiro','eurostile','norms','formulaCondensed','gillSans','franklinGothic','futura','robotoMono','mantra','restora','tiffany','didot']);
    f3.add(obj, 'textAlign', ['center', 'left', 'right']);
    f3.add(obj, 'textSize').min(0.01).max(2.0).step(0.01);
    f3.addColor(obj, 'background');
    f3.addColor(obj, 'textColour');
    f3.add(obj, 'strokeWidth').min(0.0).max(100.0);
    f3.addColor(obj, 'strokeColour');
    f3.add(obj, 'randomiseColours');

var f4 = gui.addFolder('Capture');
		f4.add(obj, 'startRecording');
		f4.add(obj, 'stopRecording');
		f4.add(obj, 'saveImage');


const getGuiVal = (param) => {
  return obj[param]
}
