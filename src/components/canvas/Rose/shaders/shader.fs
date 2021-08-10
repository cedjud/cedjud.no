uniform float time;
uniform vec3 color;
uniform vec2 mouse;

varying vec3 vNormal;
varying float vNoise;

#pragma glslify: random = require(glsl-random);
#pragma glslify: snoise2 = require(glsl-noise/simplex/3d);

void main() {
  vec3 color = vec3(vNoise, 0.0, 0.0);
  color.z += (1.0 + mouse.x) / 2.0;
  // vec3 color = vec3(0.25 + vNoise, 0.0, 0.4);
  // vec3 color = vec3(0.25 + vNoise, 0.1 * vNoise, 0.25 * vNoise);

  float strength = mod(abs(vNormal.x * (1.0 + sin(time * 0.15) * 0.5 * (mouse.x * 2.0))) * 3.0, 1.0);
  // strength = mod(abs(vNormal.x * (1.5) * 3.0), 1.0);

  float alpha = 1.25 - strength;
  // float alpha = 0.85;
  gl_FragColor = vec4(color, alpha);
}
