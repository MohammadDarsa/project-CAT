
import Cat from "../models/Cat.jsx";
import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
    SpotLight,
    
  } from "@react-three/drei";

const Scene = () => {
    return <>

    {/* environment */}
    <Environment files="hdri/moonless_golf_2k.hdr" />
    <color attach="background" args={["#000"]} />
    {/* create a camera as default camera */}
    <PerspectiveCamera fov={45} position={[0,0,0]} makeDefault />
    {/* orbit controls */}
    <OrbitControls
        target={[0, 0.25, 0]}
        maxDistance={10}
        minDistance={1}
        maxPolarAngle={Math.PI * 0.45}
        minPolarAngle={Math.PI * 0.1}
    />
    {/* lights */}

    {/* <pointLight
        color="#ffffff"
        position={[0, 3, 0]}
        intensity={100}
    /> */}
      <ambientLight/>
    {/* models */}
        <Cat/>
    </>
}

export default Scene;