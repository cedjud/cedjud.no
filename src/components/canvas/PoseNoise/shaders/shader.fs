uniform float time;
uniform vec2 nose;
uniform vec3 color;
varying vec2 vUv;
varying float vNoise;
varying float vD;

void main() {

  // gl_FragColor.rgba = vec4(0.93, 0.35, 0.43, vNoise);
  gl_FragColor.rgba = vec4(0.93, 0.35, 0.43, vD);
}
