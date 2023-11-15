import { CameraShake, Cloud, Clouds, shaderMaterial } from "@react-three/drei"
import {BlendFunction} from 'postprocessing'
import { extend, useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import seaVertexShader from './shaders/vertex.glsl'
import seaFragmentShader from './shaders/fragment.glsl'
import * as THREE from 'three'
import { EffectComposer } from "@react-three/postprocessing"
import Fog from "./Effects/Fog"
import Rain from "./Effects/Rain"

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
    const lightingRef = useRef()
    const fogRef = useRef()
    const rainRef = useRef()
    
    const textureLoader = new THREE.TextureLoader();
    const rainTexture = textureLoader.load('/iChannel0.png')
    rainTexture.repeat.x = 2;
    rainTexture.wrapS = THREE.RepeatWrapping;
    console.log('hola pa')
    useFrame((state, delta) => {
        if(seaMaterial.current){

            seaMaterial.current.uTime += delta  
        }
        // lightMaterial.current.target.position.x += Math.cos(state.clock.elapsedTime )
        // lightMaterial.current.target.position.z += Math.sin(state.clock.elapsedTime)
        // lightMaterial.current.target.updateMatrixWorld();
        if((state.clock.elapsedTime % 7 < 0.1) && lightingRef.current){
            lightingRef.current.intensity += Math.random() * 10 
            lightingRef.current.target.position.x = Math.random()
            lightingRef.current.target.position.y = -Math.random()
            lightingRef.current.target.position.z = -Math.random()
            lightingRef.current.target.updateMatrixWorld();
        }else if(lightingRef.current){
            lightingRef.current.intensity = 
                lightingRef.current.intensity - Math.random() * 10 < 0 ? 
                0 : 
                lightingRef.current.intensity - Math.random() * 10
        }
    })
    return (
        <>
            <CameraShake
                maxPitch={0.25}
                maxRoll={0.15}
                maxYaw={0}
                pitchFrequency={0.4}
                rollFrequency={0.3}
                yawFrequency={0}
            />
            <EffectComposer multisampling={8}>
                <Fog 
                    ref={fogRef}
                    u_resolution={new THREE.Vector2(1428, 520)}
                    blendFunction={BlendFunction.OVERLAY}
                /> 
                <Rain 
                    ref={rainRef} 
                    u_resolution={new THREE.Vector2(2048, 1048)} 
                    blendFunction={BlendFunction.LIGHTEN}
                    rainTexture={rainTexture}/>
            </EffectComposer>
            <color args={['#202020']} attach="background" />
            {/* <directionalLight ref={lightMaterial} position={[-4, 1, 0]} intensity={577}/> */}
            <ambientLight />
            <mesh rotation-x={-2.7} position-y={-1} >
                <planeGeometry args={[20, 20, 512, 512]} />
                <seaMaterial ref={seaMaterial} />
            </mesh>
            
            <Clouds position={[0, -5, -8]} material={THREE.MeshStandardMaterial}>
                <Cloud speed={0.01} concentrate="inside" segments={40} bounds={[20, 5, 1]} volume={10} color="#616161" />
                <Cloud speed={0.01} seed={1} scale={2} volume={5} color="gray" fade={100} />
            </Clouds>
            <directionalLight ref={lightingRef} position={[0, 0, 0]} intensity={0}/> 
        </>
    )
        
}

export default Tormenta