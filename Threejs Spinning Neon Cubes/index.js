import * as THREE from "three";
import { LineMaterial } from "https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/lines/LineMaterial.js";
import { Line2 } from "https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/lines/Line2.js";
import { LineGeometry } from "https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/lines/LineGeometry.js";
import { EffectComposer } from "https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/postprocessing/UnrealBloomPass.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const renderScene = new RenderPass(scene, camera);
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 100);
bloomPass.threshold = 0;
bloomPass.strength = 1.2;
bloomPass.radius = 0.5;

const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

const getPositions = () => {
  const points = [];
  points.push(0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0); // face
  points.push(0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1); // face
  points.push(0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1); // the rest

 return points.map(v => v -= 0.5); // center the remove by removing 0.5 from the value
}

const getBox = (index) => {
  const hue = 0.8 - index / 19; // 19 hue range of colors, subtracting "0.8" switches the colors
  const material = new LineMaterial({
    color: new THREE.Color().setHSL(hue, 1.0, 0.5),
    linewidth: 8,
    transparent: true,
    opacity: 0.25,
    blendMode: THREE.AdditiveBlending,
  });
  material.resolution.set(innerWidth, innerHeight)

  const geometry = new LineGeometry()
  geometry.setPositions(getPositions());

  const mesh = new Line2(geometry, material)
  mesh.scale.setScalar(1 + index * 0.1)

  // const rotationSpeed = 0.0005;
  const rotationSpeed = 0.05;
  const offset = 1.0 - index * 0.03;

  mesh.update = (timestamp) => {
    mesh.rotation.x = Math.sin(offset + timestamp * rotationSpeed) * 2;
    mesh.rotation.y = Math.sin(offset + timestamp * rotationSpeed) * 2;
  }

  return mesh
}

const addBoxes = (amount) => {
  for (let i = 0; i < amount; i++) {
    let box = getBox(i)
    boxGroup.add(box)
  }
}

const boxGroup = new THREE.Group()
boxGroup.update = (timestamp) => {
  boxGroup.children.forEach((box) => {
    box.update(timestamp);
  });
}
scene.add(boxGroup)
addBoxes(16)

function tick(timeStamp) {
  // timeStamp += 0.000001;
  timeStamp *= 0.01;
  boxGroup.update(timeStamp)

  // renderer.render(scene, camera);
  composer.render(scene, camera);

  requestAnimationFrame(tick)
}
tick();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);
