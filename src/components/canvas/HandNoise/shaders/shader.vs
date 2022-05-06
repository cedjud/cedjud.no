#pragma glslify: random = require(glsl-random)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

varying vec2 vUv;
varying float vNoise;
varying float vD;

uniform float time;
uniform vec2 mouse;



void main() {
  // float rnd = random(uv.xy);	
  // float n = snoise3(vec3(position.x * 0.5 + (2.0 - mouse.x / 4.0), position.y * 0.75 + (2.0 - mouse.y / 4.0), position.z * 3.0 + (time / 5.0)));
  float n = snoise3(vec3(position.x * 0.5 + (2.0 - mouse.x), position.y * 0.75 + (2.0 - mouse.y / 2.0), position.z * 3.0 + (time / 5.0)));

  // float d = abs(distance(position.xy, nose.xy)) + n * 0.1;
  float d = 1.0 - distance(position.xy, mouse.xy * -1.0);
  // float d = distance(position.xy, mouse.xy);
  // float d = step(0.25 + n, (distance(position.xy, nose.xy)));

  // float d = step(0.25 + n * 0.5, (distance(position.xy, 1.0 - nose.xy * 2.0)));
  // float li = step(0.25 + n * 0.5, (distance(position.xy, 1.0 - leftIndex.xy * 2.0)));
  // float ri = step(0.25 + n * 0.5, (distance(position.xy, 1.0 - rightIndex.xy * 2.0)));

  // float t = ri + d + li;
  // vD = t / 3.0;
  // vNoise = n +  ;
  vNoise = n + d;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
