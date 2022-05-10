#pragma glslify: random = require(glsl-random)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: map = require(glsl-map)

varying vec2 vUv;
varying float vNoise;
varying float vD;

uniform float time;
uniform vec2 nose;
uniform vec2 rightIndex;
uniform vec2 leftIndex;


void main() {
  float rnd = random(uv.xy);	
  // float n = snoise3(vec3(position.x * 0.5 + 2.0, position.y * 0.75 + 2.0, position.z * 3.0 + (time / 10.0))) * 1.0;
  float n = snoise3(vec3(position.x * 0.8 + 0.5, position.y * 0.8 + 0.5, position.z * 4.5 + (time / 10.0))) * 1.0;

  vNoise = n;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
