#pragma glslify: map = require(glsl-map)

uniform float time;
uniform vec2 nose;
uniform vec3 color;

varying float vNoise;
varying float vD;
varying vec2 vUv;

void main() {
  vec3 colorPink = vec3(0.93, 0.35, 0.43);
  vec3 colorBlue = vec3(0.03, 0.25, 0.30);

  vec3 color = mix(colorPink, colorBlue, 1.0 - vNoise);

  gl_FragColor.rgba = vec4(color, 1.0);
}
