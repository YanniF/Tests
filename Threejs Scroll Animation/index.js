import * as THREE from "three";
import addStars from "./libs/addStars.js";
import getLayer from "./libs/getLayer.js";
import { OBJLoader } from "jsm/loaders/OBJLoader.js";

// Scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 5;

// renderer
const canvas = document.getElementById('three-canvas');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas, alpha: true });
renderer.setSize(innerWidth, innerHeight);

let scrollPositionY = 0

// load object
const manager = new THREE.LoadingManager()
const loader = new OBJLoader(manager)
let sceneData = {}

manager.onLoad = () => initScene(sceneData)
loader.load('./assets/astronaut.obj', obj => {
  let geometry

  obj.traverse(child => {
    if (child.type === 'Mesh') {
      geometry = child.geometry
    }
  })

  sceneData.geo = geometry
})

const initScene = ({ geo }) => {
  const geometry = geo;
  const textureLoader = new THREE.TextureLoader();
  const material = new THREE.MeshMatcapMaterial({
    matcap: textureLoader.load('./assets/blue.jpg'),
  })
  geometry.center();

  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(3.5, -.5, 0.5)
  scene.add(mesh)

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(hemisphereLight);

  const gradientBackground = getLayer({
    hue: 0.6,
    numSprites: 8,
    opacity: 0.2,
    radius: 10,
    size: 32,
    z: -10.5,
  });
  scene.add(gradientBackground);

  const stars = addStars({ numStars: 4500 });
  scene.add(stars);

  let goalPosition = 0;
  const interpolationRate = 0.1;

  const animate = () => {
    requestAnimationFrame(animate);

    goalPosition = Math.PI * scrollPositionY;
    mesh.rotation.y -= (mesh.rotation.y - (goalPosition * 2)) * interpolationRate;
    stars.position.z -= (stars.position.z - goalPosition * 8) * interpolationRate;

    renderer.render(scene, camera);
  }

  animate();
}

const handleWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', handleWindowResize);

window.addEventListener('scroll', () => {
  scrollPositionY = window.scrollY / document.body.clientHeight;
});
