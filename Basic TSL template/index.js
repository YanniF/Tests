import * as THREE from 'three'
import getLayer from './libs/getLayer.js'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { positionWorld } from "three/tsl";

const w = window.innerWidth
const h = window.innerHeight

const scene = new THREE.Scene()
scene.background = new THREE.Color('#121212');

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGPURenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const geometry = new THREE.TorusKnotGeometry(1.5, .5, 256, 64)
const material = new THREE.MeshStandardNodeMaterial({ color: 'ff0066'})
material.colorNode = positionWorld
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const hemisphereLight = new THREE.HemisphereLight('#ffffff', '#444444', 3)
scene.add(hemisphereLight);

const sprites = getLayer({
  hue: 0.6,
  numSprites: 8,
  opacity: 0.2,
  radius: 10,
  size: 24,
  z: -10.5,
})
scene.add(sprites)

const animate = () => {
  requestAnimationFrame(animate)

  mesh.rotation.x += .005
  mesh.rotation.y += .01

  renderer.renderAsync(scene, camera)

  controls.update()
}

animate()

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);
