#define PI 3.1415926535897932384626433832795
uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
varying float vElevation;
varying vec3 vNormal;
varying vec2 vUv;
uniform float uTime;


uniform sampler2D maskTexture;

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}


void main() {
    float mixStrength = uColorMultiplier * (vElevation + uColorOffset);

    vec3 color = mix(uDepthColor, uSurfaceColor,  mixStrength);

    gl_FragColor = vec4(color, 1.0);
}