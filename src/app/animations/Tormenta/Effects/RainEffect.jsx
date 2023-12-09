
import { BlendFunction, Effect } from "postprocessing";
import { Uniform } from "three";

const fragmentShader = /* glsl */`
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform sampler2D iChannel0;

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
    {
        vec2 q = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = -1.0 + 2.0 * q;
        p.x *= u_resolution.x / u_resolution.y;

        vec3 col = vec3(0.0, 0.0, 0.0);

        // Rain
        float timeLimit = 10.0; // Set the time limit

        // Calculate the adjusted time
        float adjustedTime = mod(u_time, timeLimit);

        // Calculate st using the adjusted time
        vec2 st = p * vec2(0.2, 0.01) + vec2(adjustedTime * 0.1, adjustedTime * 0.1);
        float f = floor(mod(u_time / 9.0, 2.0));
        f = texture(iChannel0, st).x * texture(iChannel0, st * .773).y * 1.55;
        f = clamp(pow(abs(f), 23.0) * 13.0, 0.0, q.y * .14);
        col += f;

        outputColor = vec4(col, 1.0);
    }


`



export default class RainEffect extends Effect{
    constructor({u_resolution, blendFunction = BlendFunction.ADD, rainTexture}){
        super(
            'RainEffect', 
            fragmentShader, 
            {
                blendFunction: blendFunction,
                uniforms: new Map([
                    ['u_time', new Uniform(0)],
                    ['u_resolution', new Uniform(u_resolution)],
                    ['iChannel0', new Uniform(rainTexture)],
                ])
            }
        )
    }

    update(renderer, inputBuffer, deltaTime){
        this.uniforms.get('u_time').value += deltaTime
    }
}