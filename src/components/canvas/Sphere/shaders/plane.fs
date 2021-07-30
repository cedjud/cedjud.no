uniform float time;
uniform vec3 color;

// varying vec2 vUv;
varying vec3 vNormal;
varying float vNoise;

#pragma glslify: random = require(glsl-random);
#pragma glslify: snoise2 = require(glsl-noise/simplex/3d);

void main() {
  vec3 color = vec3(0.25 + vNoise, 0.0, 0.4);

  float strength = mod(abs(vNormal.x * (sin(time * 0.15) * 0.5)) * 80.0, 1.0);
  // strength *= mod((0.5 + vNormal.y) * 200.0, 1.0);

  float alpha = step(0.25, 1.0 - strength);
  gl_FragColor = vec4(color, alpha);
}
