import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useLoader } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useEffect } from "react";

const Cat = () => {

    const scene = useLoader(GLTFLoader, "models/cat-simple.glb", (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
        loader.setDRACOLoader(dracoLoader);
    });
    
    const animations = useAnimations(scene.animations, scene.scene);
    const mixer = animations.mixer;

    const lieBellySleep = animations.actions.Lie_belly_sleep;
    lieBellySleep.setLoop(THREE.LoopOnce, 1);
    const lieBellySleepEnd= animations.actions.Lie_belly_sleep_end;
    lieBellySleepEnd.setLoop(THREE.LoopOnce, 1);
    const lieBellyEnd = animations.actions.Lie_belly_end;
    lieBellyEnd.setLoop(THREE.LoopOnce, 1);
    const idle1 = animations.actions.Idle_1;

    mixer.addEventListener("finished", (e) => {
        switch(e.action.getClip().name)
        {
            case "Lie_belly_sleep":
                lieBellySleep.stop();
                lieBellySleepEnd.play();
                break;
            case "Lie_belly_sleep_end":
                lieBellySleepEnd.stop();
                lieBellyEnd.play();
                break;
            case "Lie_belly_end":
                lieBellyEnd.stop();
                idle1.play();
                break;
            default:
                idle1.play();
                break;
        }
    })

    useEffect(() => {
        lieBellySleep.play();
    }, []);

    return <>
        <primitive object={scene.scene}/>
    </>
}

export default Cat;