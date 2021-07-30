// #pragma glslify: random = require(glsl-random);
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

uniform float time;

varying float vNoise;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  // float randomV = (0.5 - random(vec2(uv)));

  float noise = snoise3(normal * 1.95 + -time * 0.25) * 0.65 + 0.5;

  vec3 pos = position; 

  pos *= 1.0 + noise * 0.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vNoise = noise;
  vNormal = normal;
  vUv = uv;
}
