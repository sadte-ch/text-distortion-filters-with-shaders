#ifdef GL_ES
precision highp float;
#endif

precision highp float;

varying vec2 vUV;

uniform sampler2D tex;
uniform float speed;
uniform float frequency;
uniform float amplitude;
uniform int mode;

void main() {
  vec2 uv = vec2(1.0) - vUV;
  uv.x = uv.x * -1.0;

  // lets create a sine wave to distort our texture coords
  // we will use the built in sin() function in glsl
  // sin() returns the sine of an angle in radians
  // first will multiply our uv * frequency -- frequency will control how many hills and valleys will be in the wave
  // then we add some time to our sine, this will make it move
  // lastly multiply the whole thing by amplitude -- amplitude controls how tall the hills and valleys are, in this case it will be how much to distort the image
  // *try changing uv.y to uv.x and see what happens
  float sineWave = sin(uv.y * frequency + speed) * amplitude;
  float sineWave2 = sin(uv.x * frequency + speed) * amplitude;
  float tanWave = tan(uv.y * frequency + speed) * amplitude;

  // create a vec2 with our sine
  // what happens if you put sineWave in the y slot? in Both slots?

  vec2 distort;

  // waveXY
  if(mode == 0) {
    distort = vec2(sineWave, sineWave);
  }
  // waveY
  if(mode == 1) {
    distort = vec2(0.0, sineWave);
  }
  // waveX
  if(mode == 2) {
    distort = vec2(sineWave, 0.0);
  }
  // sineWave
  if(mode == 3) {
    distort = vec2(sineWave, sineWave2);
  }
  // gridWave
  if(mode == 4) {
    distort = vec2(sineWave2, sineWave);
  }
  // scannerXY
  if(mode == 5) {
    distort = vec2(tanWave, sineWave);
  }
  // scannerY
  if(mode == 6) {
    distort = vec2(0.0, tanWave);
  }
  // scannerX
  if(mode == 7) {
    distort = vec2(tanWave, 0.0);
  }
  // collider
  if(mode == 8) {
    distort = vec2(sin(uv.x * uv.x + speed), cos(uv.y * uv.y + speed));
  }
  // ripple1
  if(mode == 9) {
    vec2 dir = vUV - vec2(0.5);
  	float dist = distance(vUV, vec2(0.5));
  	distort = dir * (sin(dist * frequency + (speed))) * amplitude;
  }
  // ripple2
  if(mode == 10) {
    vec2 dir = uv - vec2(0.5);
  	float dist = distance(vUV, vec2(0.5));
  	distort = dir * (sin(dist * frequency + (speed))) * amplitude;
  }

  // use mod() to wrap our texcoords back to 0.0 if they go over 1.0
  vec4 texColor = texture2D(tex, mod(uv + distort, 1.0));

  gl_FragColor = texColor;
}
