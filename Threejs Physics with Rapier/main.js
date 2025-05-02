import * as THREE from "three";
import {getBody, getMouseBall} from "./getBodies.js";
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.11.2';
import {EffectComposer} from "jsm/postprocessing/EffectComposer.js";
import {RenderPass} from "jsm/postprocessing/RenderPass.js";
import {UnrealBloomPass} from "jsm/postprocessing/UnrealBloomPass.js"

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);

await RAPIER.init();
const gravity = {x: 0.0, y: 0, z: 0.0};
const world = new RAPIER.World(gravity);

let mousePos = new THREE.Vector2();

// post-processing
const renderScene = new RenderPass(scene, camera);
// resolution, strength, radius, threshold
const bloomPass = new UnrealBloomPass(new THREE.Vector2(windowWidth, windowHeight), 1.5, 0.0, 0.005);
const composer = new EffectComposer(renderer);
composer.addPass(renderScene);
composer.addPass(bloomPass);

const hemiLight = new THREE.HemisphereLight('#00bbff', '#aa00ff');
hemiLight.intensity = 0.2;
scene.add(hemiLight);

const numBodies = 100;
const bodies = [];

for (let i = 0; i < numBodies; i++) {
  const body = getBody(RAPIER, world);

  bodies.push(body);
  scene.add(body.mesh);
}

const mouseBall = getMouseBall(RAPIER, world);
scene.add(mouseBall.mesh);



const animate = () => {
  requestAnimationFrame(animate);

  world.step();

  mouseBall.update(mousePos);
  bodies.forEach(b => b.update());

  composer.render(scene, camera);
}

animate();

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);

function handleMouseMove (event) {
  mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', handleMouseMove, false);
