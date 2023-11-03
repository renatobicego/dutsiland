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

    vec2 rotatedUv = rotate(vUv, PI * uTime * 0.3, vec2(1.0, 0.5));
    vec2 lightUv = vec2((rotatedUv.x ) / 2.0, (rotatedUv.y - 0.5) * 8.0);

    float strength = 1.0 / (distance(lightUv, vec2(0.5, 0.5)));

    vec3 color = mix(uDepthColor, uSurfaceColor, strength + mixStrength);
    // // Aplicar la máscara.
    //  color = texture2D(maskTexture, vec3(vUv, 0.5)).rgb * color;

    gl_FragColor = vec4(color, 1.0);
}