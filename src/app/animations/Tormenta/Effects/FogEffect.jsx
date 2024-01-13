import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /* glsl */`
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform float u_time;

    float random(in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    float noise(in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);

        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    #define NUM_OCTAVES 5

    float fbm(in vec2 _st) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
        for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(_st);
            _st = rot * _st * 2.0 + shift;
            a *= 0.5;
        }
        return v;
    }

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
        vec2 st = gl_FragCoord.xy / u_resolution.xy * 3.;
        vec3 color = inputColor.rgb;

        vec2 q = vec2(0.);
        q.x = fbm(st + 0.00 * u_time);
        q.y = fbm(st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * u_time);
        r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * u_time);

        float f = fbm(st + r) * 0.7;

        color = mix(vec3(0.101961, 0.619608, 0.666667), vec3(0.666667, 0.666667, 0.498039), clamp((f * f) * 4.0, 0.0, 1.0));

        color = mix(color, vec3(0, 0, 0.164706), clamp(length(q), 0.0, 1.0));

        color = mix(color, vec3(0.666667, 1, 1), clamp(length(r.x), 0.0, 1.0));

        outputColor = vec4((f * f * f + 0.6 * f * f + 0.5 * f) * color, 1.0);
    }

`

export default class FogEffect extends Effect{
    constructor({u_resolution, blendFunction = BlendFunction.DARKEN}){
        super(
            'FogEffect', 
            fragmentShader, 
            {
                blendFunction: blendFunction,
                uniforms: new Map([
                    ['u_resolution', new Uniform(u_resolution)],
                    ['u_time', new Uniform(0)],
                ])
            }
        )
    }

    update(renderer, inputBuffer, deltaTime){
        this.uniforms.get('u_time').value += deltaTime
    }
}