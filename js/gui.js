let gui = new dat.gui.GUI();

var obj = {
  text: 'sad',
  text2: 'tech',
  lineSpacing: 0.2,
  repeatY: 1,
  mode: 'auto',

  explode: function () {
    alert('Bang!');
  },

  speed: 0.02,
  shaderType: 'waveDistortion',

  font: 'archivo',
  textAlign: 'center',
  textSize: 0.3,
  background: [29,0,252],
  textColour: [150, 255, 0],
  strokeColour: [0,0,0],
  strokeWidth: 0.0
};

gui.remember(obj);

gui.add(obj, 'text');
gui.add(obj, 'text2');
gui.add(obj, 'lineSpacing').min(0.0).max(1.0).step(0.05);
gui.add(obj, 'repeatY').min(1).max(10).step(1);
gui.add(obj, 'mode', [ 'auto', 'mouse', 'absolute' ] );


// --------------- motion vars ---------------
var f1 = gui.addFolder('Motion Options');
    f1.add(obj, 'speed', { slow: 0.02, medium: 0.05, fast: 0.1, faster: 0.15, fasterer: 0.2 } );

// --------------- shader vars ---------------
var f2 = gui.addFolder('Shader Options');
    f2.add(obj, 'shaderType', Object.keys(shaders));

resetShaderParams()


// --------------- text vars -----------------
var f3 = gui.addFolder('Design Options');
    f3.add(obj, 'font', ['barlow', 'abril', 'archivo', 'bebas', 'caveat', 'exo2', 'gravitas', 'indieFlower', 'josefineSans', 'pressStart', 'robotoMono', 'spaceMono', 'viaodaLibre']);
    f3.add(obj, 'textAlign', ['center', 'left', 'right']);
    f3.add(obj, 'textSize').min(0.1).max(2.0);
    f3.addColor(obj, 'background');
    f3.addColor(obj, 'textColour');
    f3.add(obj, 'strokeWidth').min(0.0).max(100.0);
    f3.addColor(obj, 'strokeColour');


const getGuiVal = (param) => {
  return obj[param]
}
