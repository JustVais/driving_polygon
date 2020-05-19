import React, { useState, useEffect, useRef } from 'react';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let width = window.innerWidth;
let height = window.innerHeight;


let scene, camera, controls, loader;
let light;

const init = () => {
  camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.z = 15;
  camera.position.y = 15;
  camera.rotation.x = -0.8;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xddddddd);

  light = new THREE.AmbientLight(0xffffff, 3);
  scene.add(light);

  loader = new GLTFLoader();
}

const App = () => {
  const canvas = useRef();
  const [renderer, setRenderer] = useState();
  const [counter, setCounter] = useState(0);

  const renderScene = () => {
    renderer.render(scene, camera);
  }

  const loadTheCar = () => {
    loader.load("/models/scene.gltf", (gltf) => {
      scene.add(gltf.scene);
      renderScene();
    });
  }
  
  const setupOrbitsControl = () => {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', renderScene);
  }

  useEffect(() => {
    canvas.current.setAttribute('width', width);
    canvas.current.setAttribute('height', height);

    init();

    setRenderer(new THREE.WebGLRenderer({ canvas: canvas.current, antialias: true }));
  }, []);

  useEffect(() => {
    if (counter > 0) {
      renderScene();
      loadTheCar(renderer);
      setupOrbitsControl(renderer);
    } else {
      setCounter(counter => counter + 1);
    }
  }, [renderer]);

  return (
    <canvas ref={canvas} className="canvas" />
  );
}

export default App;
