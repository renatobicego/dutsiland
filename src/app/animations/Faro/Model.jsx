import React, { forwardRef} from "react";
import { Float, useGLTF } from "@react-three/drei";

export default forwardRef(function Model(props, ref) {
  const { nodes, materials } = useGLTF("/lighthouse_on_island.glb");
  
  return (
    <group {...props} dispose={null} ref={ref}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, -0.138, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.ambient_rocks_1_0.geometry}
              material={materials["rocks_1.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.ambient_rocks_1_0006.geometry}
              material={materials["rocks_1.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.ambient_rocks_1_0008.geometry}
              material={materials["rocks_1.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.ambient_rocks_2_0.geometry}
              material={materials["rocks_2.003"]}
            />
            <Float floatingRange={[-0.01, 0.01]} floatIntensity={1.3} rotationIntensity={0.1} speed={1.3}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.ambient_sea_0.geometry}
                material={materials.material}
              />
              <group
                position={[-0.343, 0.16, 0.025]}
                rotation={[0, 0, -Math.PI / 2]}
              >
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.boat_boat_in_0.geometry}
                  material={materials["boat_in.002"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.boat_boat_out_0.geometry}
                  material={materials["boat_out.002"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.boat_paddles_0.geometry}
                  material={materials["paddles.002"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.boat_paddlles_handle_0.geometry}
                  material={materials["paddlles_handle.002"]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.boat_seats_0.geometry}
                  material={materials["seats.002"]}
                />
              </group>
            </Float>
          </group>

          <group position={[0, -0.007, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.lighthouse_base_0.geometry}
              material={materials["base.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.lighthouse_handle_0.geometry}
              material={materials["handle.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.lighthouse_roof_0.geometry}
              material={materials["roof.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.lighthouse_tower_0.geometry}
              material={materials["tower.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.lighthouse_window_frame_0.geometry}
              material={materials["window_frame.003"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.lighthouse_window_glass_0.geometry}
              material={materials["window_glass.003"]}
            />
          </group>
          <group
            position={[-0.297, -0.111, -0.225]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.pier_wood_1_0.geometry}
              material={materials["wood_1.002"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.pier_wood_2_0.geometry}
              material={materials["wood_2.002"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.pier_wood_3_0.geometry}
              material={materials["wood_3.002"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.pier_wood_4_0.geometry}
              material={materials["wood_4.002"]}
            />
          </group>
          <group
            position={[-0.244, 0.403, -0.092]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.seagulls_beak_0.geometry}
              material={materials["beak.002"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.seagulls_body_0.geometry}
              material={materials["body.002"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.seagulls_wings_0.geometry}
              material={materials["wings.002"]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.seagulls_wings_ends_0.geometry}
              material={materials["wings_ends.002"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
})
