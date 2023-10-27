import { useRef } from "react"
import { Center, OrbitControls, Text, Text3D, useGLTF } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
const Texto = () => {
    const light = useRef()
    const {scene} = useGLTF('/lighthouse.glb')

    useFrame((state, delta) => {
        light.current.position.x = Math.cos(state.clock.elapsedTime) + 3
        light.current.position.z = Math.sin(state.clock.elapsedTime) + 3
    })
    return (
        <>
            <color args={['#D3ECFF']} attach={'background'} />
            <OrbitControls />
            {/* <Center center>
                <Text3D 
                    font={'/Piazzolla Thin_Regular.json'}
                    
                    // lineHeight={0.75}
                    textAlign="center"
                    scale={ 0.35 }
                    >
                    Encontrar el camino {'\n'} puede ser desafiante {'\n'}
                    Seremos tu faro en la tormenta.
                    <meshStandardMaterial toneMapped={false} />
                </Text3D>

            </Center> */}
            <primitive object={scene} />
            <rectAreaLight 
                ref={light}
                position={[0, 0 , 5]}
                width={5}
                height={5}
                power={500}
            />
        </>
    )
}

export default Texto