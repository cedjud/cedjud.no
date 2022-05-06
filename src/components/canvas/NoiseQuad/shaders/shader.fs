#pragma glslify: map = require(glsl-map)

uniform float time;
uniform vec2 nose;
uniform vec3 color;
varying vec2 vUv;
varying float vNoise;
varying float vD;

void main() {

  float mappedNoiseValue = map(vNoise, 0.0, 1.0, 0.2, 1.0);
  gl_FragColor.rgba = vec4(0.93, 0.35, 0.43, mappedNoiseValue);
  // gl_FragColor.rgba = vec4(0.93, 0.35, 0.43, vD);
}
