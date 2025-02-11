import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStars from "./getStars.js";

// Scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0, 3.5);

// renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

// orbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;

// light
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x080820, 4);
scene.add(hemisphereLight);

// load star sprite
const textureLoader = new THREE.TextureLoader()
const starSprite = textureLoader.load('./assets/circle.png')
const earthTexture = textureLoader.load('./assets/00_earthmap1k.jpg')

const stars = getStars({ numStars: 4000, sprite: starSprite })
scene.add(stars)

const globeGroup = new THREE.Group()
scene.add(globeGroup)

const geo = new THREE.IcosahedronGeometry(1, 10)
const mat = new THREE.MeshBasicMaterial({ color: '#656565', wireframe: true, transparent: true, opacity: 0.05 })
const cube = new THREE.Mesh(geo, mat)
globeGroup.add(cube)

const detail = 80
const pointsGeo =new THREE.IcosahedronGeometry(1, detail)
const pointsMaterial = new THREE.PointsMaterial({
  size: .025,
  map: earthTexture
})
const points = new THREE.Points(pointsGeo, pointsMaterial)
globeGroup.add(points)

function animate() {
  renderer.render(scene, camera);

  globeGroup.rotation.y += .002

  requestAnimationFrame(animate);
  orbitControls.update();
}

animate();

