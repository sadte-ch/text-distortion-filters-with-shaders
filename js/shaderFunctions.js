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

  } else if(mode === 'auto') {
    amp = getGuiVal('amplitude');
    if(direction === 'forwards') {
      freq = freq+=0.03;
      if(freq > 50) direction = 'backwards';
    } else if(direction === 'backwards') {
      freq = freq-=0.03;
      if(freq < 1.0) direction = 'forwards'
    }
  } else if(mode === 'absolute') {
    amp = getGuiVal('amplitude');
    freq = getGuiVal('frequency');
  }

  currentShader.setUniform('frequency', freq);
  currentShader.setUniform('amplitude', amp);
}
