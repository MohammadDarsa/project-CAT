import React, { Suspense, useState, useEffect, useContext } from "react";
import ReactDOM from 'react-dom/client'
import './index.css'
import { Canvas } from '@react-three/fiber'
import App from './App.jsx'
import * as THREE from "three";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Canvas
      gl={{
        powerPreference: "high-performance",
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
    >
        <Suspense>
          <App />
        </Suspense>
    </Canvas>
  </React.StrictMode>,
)
