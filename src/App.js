import React, { useState, useEffect, useRef } from 'react';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let width = window.innerWidth;
let height = window.innerHeight;


let scene, camera;

const init = () => {
  camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.z = 15;
  camera.position.y = 15;
  camera.rotation.x = -0.8;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xddddddd);

  let light = new THREE.AmbientLight(0xffffff, 3);
  scene.add(light);
}

let loadTheCar = (renderer) => {
  let loader = new GLTFLoader();

  loader.load("/models/scene.gltf", (gltf) => {
    scene.add(gltf.scene);
    renderScene(renderer);
  });
}

const renderScene = (renderer) => {
  renderer.render(scene, camera);
}

const App = () => {
  const canvas = useRef();
  const [renderer, setRenderer] = useState();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    canvas.current.setAttribute('width', width);
    canvas.current.setAttribute('height', height);

    init();

    setRenderer(new THREE.WebGLRenderer({ canvas: canvas.current, antialias: true }));
  }, []);

  useEffect(() => {
    if (counter > 0) {
      renderScene(renderer);
      loadTheCar(renderer);
    } else {
      setCounter(counter => counter + 1);
    }
  }, [renderer]);

  return (
    <canvas ref={canvas} className="canvas" />
  );
}

export default App;
