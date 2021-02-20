// using other text libraries for p5?
// other createGraphic options (kerning?)
// blur, colour separate, etc (other shader things)
// other shader patterns/distortions

var shaderData = {
  amplitude: {
    type: 'slider',
    modes: ['auto freq', 'absolute'],
    val: 0.02,
    min: -0.4,
    max: 0.4,
    step: 0.001
  },
  frequency: {
    type: 'slider',
    modes: ['absolute'],
    val: 0.1,
    min: -50.0,
    max: 50.0,
    step: 0.5
  },
  freq: {
    type: 'select',
    modes: ['auto'],
    val: 'auto increment',
    options: ['auto increment']
  },
  mouseX: {
    type: 'select',
    modes: ['mouse'],
    val: 'amp asc',
    options: ['amp desc', 'amp asc']
  },
  maxAmp: {
    type: 'value',
    modes: ['mouse'],
    val: 0.25
  },
  mouseY: {
    type: 'select',
    modes: ['mouse'],
    val: 'freq asc',
    options: ['freq desc', 'freq asc']
  },
  maxFreq: {
    type: 'value',
    modes: ['mouse'],
    val: 20
  },
  freqStep: {
    type: 'slider',
    modes: ['auto freq', 'auto amp'],
    val: freqStep,
    min: 0.0,
    max: 1.0,
    step: 0.001
  },
  ampStep: {
    type: 'slider',
    modes: ['auto amp'],
    val: ampStep,
    min: 0.0,
    max: 0.001,
    step: 0.0001
  }
}

let guiItems = {};

const resetShaderParams = () => {
  //clear all gui params for shader before adding again
  let guiItemKeys = Object.keys(guiItems);
  guiItemKeys.forEach(item => {
    removeGuiItem(item)
  })

  //loop through data params for current shader + show/hide depending on current mode
  if(shaderData) {
    let params = Object.keys(shaderData);
    let currentParams = [];

    params.forEach(key => {
      //only show if needed/used for current mode
      let paramData = shaderData[key]
      let showModes = paramData.modes;

      if(showModes && showModes.includes(obj.mode)) {
        currentParams.push(key)
      }
    });

    //loop through params to show for mode and add to shader folder in gui panel
    currentParams.forEach(param => {
      let paramData = shaderData[param];
      addGuiItem(param,paramData)
    })
  }
}

const addGuiItem = (key, paramData) => {
  obj[key] = paramData.val;
  let inputType = paramData.type
  let item = null
  if(inputType === 'slider') {
    item = f2.add(obj, key).min(paramData.min).max(paramData.max).step(paramData.step)
  } else if(inputType === 'select') {
    item = f2.add(obj, key, paramData.options)
  } else if(inputType === 'value') {
    item = f2.add(obj, key)
  }
  if(item) guiItems[key] = item
}
const removeGuiItem = (key) => {
  delete obj[key];
  if(guiItems[key]) {
    f2.remove(guiItems[key]);
    delete guiItems[key];
  }
}
