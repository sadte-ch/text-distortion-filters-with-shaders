function waveDistortionShader() {
  if(mode === 'mouse') {
    // lets map the mouseX to frequency and mouseY to amplitude
    // try playing with these to get a more or less distorted effect
    // 10 and 0.25 are just magic numbers that I thought looked good
    let freqDirection = getGuiVal('mouseY');
    let maxFreq = getGuiVal('maxFreq');
    if(freqDirection === 'freq asc') {
      freq = map(mouseX, 0, width, 0, maxFreq);
    } else if(freqDirection === 'freq desc') {
      freq = map(mouseX, 0, width, maxFreq, 0);
    }

    let ampDirection = getGuiVal('mouseX');
    let maxAmp = getGuiVal('maxAmp');
    if(ampDirection === 'amp asc') {
      amp = map(mouseX, 0, width, 0, maxAmp);
    } else if(freqDirection === 'freq desc') {
      amp = map(mouseX, 0, width, maxAmp, 0);
    }

  } else if(mode === 'auto freq') {
    amp = getGuiVal('amplitude');
    let freqStepVar = getGuiVal('freqStep');
    if(direction === 'forwards') {
      freq = freq+=freqStepVar;
      if(freq > maxFreq) direction = 'backwards';
    } else if(direction === 'backwards') {
      freq = freq-=freqStepVar;
      if(freq < minFreq) {
        if(recordingLoop) {
          stopRecordingLoop()
        }
        direction = 'forwards'
      }
    }
  } else if(mode === 'auto amp') {
    let freqStepVar = getGuiVal('freqStep');
    let ampStepVar = getGuiVal('ampStep');
    if(direction === 'forwards') {
      freq+=freqStepVar;
      amp+=ampStepVar
      if(freq > maxFreq) {
        direction = 'backwards';
        amp = 0;
      }
    } else if(direction === 'backwards') {
      freq-=freqStepVar;
      amp-=ampStepVar
      if(freq < minFreq) {
        if(recordingLoop) {
          stopRecordingLoop()
        }
        direction = 'forwards'
      }
    }
  } else if(mode === 'absolute') {
    amp = getGuiVal('amplitude');
    freq = getGuiVal('frequency');
  }
  // console.log('loop', recordingLoop, freq, direction)
  let newShaderType = getGuiVal('shaderType');
  let shaderModeIndex = modes.indexOf(newShaderType)
  currentShader.setUniform('frequency', freq);
  currentShader.setUniform('amplitude', amp);
  currentShader.setUniform('mode', shaderModeIndex);
}
