#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

uniform float time;

varying float vNoise;
varying vec3 vNormal;

void main() {
  float noise = snoise3(normal * 1.5 + -time * 0.25) * 0.65 + 0.5;

  vec3 pos = position; 
  pos *= 1.0 + noise;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  vNoise = noise;
  vNormal = normal;
}
