import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { useLoader } from "@react-three/fiber";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useState } from "react";

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
    idle1.setLoop(THREE.LoopOnce, 1);
    const idle2 = animations.actions.Idle_2;
    idle2.setLoop(THREE.LoopOnce, 1);
    const idle3 = animations.actions.Idle_3;
    idle3.setLoop(THREE.LoopOnce, 1);
    const idle4 = animations.actions.Idle_4;
    idle4.setLoop(THREE.LoopOnce, 1);
    const idle5 = animations.actions.Idle_5;
    idle5.setLoop(THREE.LoopOnce, 1);
    const idle6 = animations.actions.Idle_6;
    idle6.setLoop(THREE.LoopOnce, 1);
    const idle7 = animations.actions.Idle_7;
    idle7.setLoop(THREE.LoopOnce, 1);

    let currentAnimation;

    mixer.addEventListener("finished", (e) => {
        let animation = currentAnimation;
        switch(e.action.getClip().name)
        {
            case "Lie_belly_sleep":
                currentAnimation = lieBellySleepEnd;
                break;
            case "Lie_belly_sleep_end":
                currentAnimation = lieBellyEnd;
                break;
            case "Lie_belly_end":
                currentAnimation = idle1;
                break;
            default:
                currentAnimation = getRandomIdle(0.85)
                break;
        }
        animation.stop();
        currentAnimation.play();
    })

    const getRandomIdle = (threshold) => {
        let animation = animations.actions.Idle_1;
        //calculate the next animation
        const random0_1 = Math.random();

        if(random0_1 >= threshold) {
            const index = Math.floor(((random0_1 - threshold) / (1 - threshold)) * 6) + 1;
            animation = animations.actions["Idle_" + index];
        }
        return animation;
    }

    useEffect(() => {
        currentAnimation = lieBellySleep;
        currentAnimation.play();
    }, []);

    return <>
        <primitive object={scene.scene}/>
    </>
}

export default Cat;