#pragma glslify: map = require(glsl-map)

uniform float time;
uniform vec2 nose;
uniform vec3 color;

varying float vNoise;
varying float vD;
varying vec2 vUv;

void main() {
  // rgb(237, 90, 108)
  vec3 colorPink = vec3(0.929411764705882, 0.352941176470588, 0.423529411764706);

  // rgb(8, 64, 77)
  vec3 colorBlue = vec3(0.031372549019608, 0.250980392156863, 0.301960784313725);

  float mappedNoiseValue = map(vNoise, 0.0, 1.0, 0.5, 1.0);
  float strength = floor(vNoise * 10.0) / 10.0;

  vec3 color = mix(colorPink, colorBlue, 1.0 - strength);

  gl_FragColor.rgba = vec4(color, 1.0);
}
