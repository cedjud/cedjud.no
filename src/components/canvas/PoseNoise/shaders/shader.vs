#pragma glslify: map = require(glsl-map)
#pragma glslify: random = require(glsl-random)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec2 vUv;
varying float vNoise;
varying float vD;

uniform float time;
uniform vec2 nose;
uniform vec2 rightIndex;
uniform vec2 leftIndex;


void main() {
  float rnd = random(uv.xy);	
  float n = snoise3(vec3(position.x * 0.5 + (2.0 - rightIndex.x / 4.0), position.y * 0.75 + (2.0 - rightIndex.y / 4.0), position.z * 3.0 + (time / 5.0)));

  float d = step(0.25 + n * 0.5, (distance(position.xy, 1.0 - nose.xy * 2.0)));
  float li = step(0.25 + n * 0.5, (distance(position.xy, 1.0 - leftIndex.xy * 2.0)));
  float ri = step(0.25 + n * 0.5, (distance(position.xy, 1.0 - rightIndex.xy * 2.0)));

  float t = ri + d + li;
  vD = map(t, 0.0, 3.0, 0.0, 1.0);
  vNoise = n;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
