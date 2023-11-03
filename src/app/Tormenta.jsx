import { OrbitControls, Text, Text3D, shaderMaterial } from "@react-three/drei"
import {BlendFunction} from 'postprocessing'
import { extend, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import seaVertexShader from './shaders/vertex.glsl'
import seaFragmentShader from './shaders/fragment.glsl'
import * as THREE from 'three'
import { useControls } from "leva"
import { EffectComposer } from "@react-three/postprocessing"
import Fog from "./Fog"

const SeaMaterial = shaderMaterial({
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000'),
    uBigWavesElevation: 0.25,
    uBigWavesFrequency: new THREE.Vector2(6, 3),
    uBigWavesSpeed: 0.6,

    uSmallWavesElevation: 0.10,
    uSmallWavesFrequency: 7,
    uSmallWavesSpeed: 0.2,
    uSmallWavesIteration: 8,

    // uDepthColor: new THREE.Color('#202020'), #1c3058
    // uSurfaceColor: new THREE.Color('#CECECE'), #d0e1ff
    uDepthColor: new THREE.Color('#000000'), 
    uSurfaceColor: new THREE.Color('#2e2e2e'), 
    uColorOffset: 0.57,
    uColorMultiplier:  1

    // uDepthColor: new THREE.Color('#282B3D'),
    // uSurfaceColor: new THREE.Color('#292E4C'),
    // uColorOffset: 0.5,
    // uColorMultiplier:  12

},
    seaVertexShader,
    seaFragmentShader
)


extend({SeaMaterial})


const Tormenta = () => {
    const seaMaterial = useRef()
    const lightMaterial = useRef()
    const fogRef = useRef()
    const controls = useControls({
        uDepthColor: '#000000',
        uSurfaceColor: '#2e2e2e',
        uSmallWavesElevation: {
            value: 0.10,
            step: 0.01
        },
        uColorOffset: {
            value: 0.57,
            step: 0.01
        },
        uColorMultiplier:  {
            value: 1,
            step: 0.1
        },
        // uSmallWavesFrequency: 7,
        // uSmallWavesSpeed: 0.2,
        // uSmallWavesIteration: 8,
        // opacity: {
        //     value: 0.5,
        //     min: 0,
        //     max: 1,
        //     step: 0.01
        // },
        // blur: {
        //     value: 4,
        //     min: 0,
        //     max: 10,
        //     step: 0.01
        // }
    })
    useEffect(() => {
        seaMaterial.current.uDepthColor = new THREE.Color(controls.uDepthColor) 
        seaMaterial.current.uSurfaceColor = new THREE.Color(controls.uSurfaceColor)
        seaMaterial.current.uSmallWavesElevation = controls.uSmallWavesElevation
        seaMaterial.current.uColorOffset = controls.uColorOffset
        seaMaterial.current.uColorMultiplier = controls.uColorMultiplier
    }, [controls])
    useFrame((state, delta) => {
        seaMaterial.current.uTime += delta
        lightMaterial.current.target.position.x += Math.cos(state.clock.elapsedTime )
        lightMaterial.current.target.position.z += Math.sin(state.clock.elapsedTime)
        lightMaterial.current.target.updateMatrixWorld();
    })
    return (
        <>
            <EffectComposer multisampling={8}>
                <Fog 
                    ref={fogRef}
                    u_resolution={new THREE.Vector2(1300, 700)}
                    blendFunction={BlendFunction.OVERLAY}
                />
            </EffectComposer>
            <OrbitControls />
            <color args={['#202020']} attach="background" />
            <directionalLight ref={lightMaterial} position={[-4, 1, 0]} intensity={577}/>
            <mesh rotation-x={-2.7} position-y={-1} >
                <planeGeometry args={[5, 5, 512, 512]} />
                <seaMaterial ref={seaMaterial} />
            </mesh>
        </>
    )
}

export default Tormenta