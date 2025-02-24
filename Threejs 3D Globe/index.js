import * as THREE from 'three'
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { drawThreeGeo } from './lib/threeGeoJSON.js';

const w = window.innerWidth
const h = window.innerHeight

const scene = new THREE.Scene()
scene.fog = new THREE.FogExp2(0x000000, 0.05)

const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

let planet = new THREE.Object3D();
scene.add(planet);

const geometry = new THREE.SphereGeometry(10, 48, 48)
const material = new THREE.MeshBasicMaterial({
  color: '#333333',
  wireframe: true,
  transparent: true
});
const sphere = new THREE.Mesh(geometry, material);
planet.add(sphere);

// const edges = new THREE.EdgesGeometry(geometry, 0.1)
// const lineMaterial = new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.4 })
// const lines = new THREE.LineSegments(edges, lineMaterial)
// scene.add(lines);

fetch('./test_geojson/countries.json')
  .then((response) => response.text())
  .then((json) => {
    const data = JSON.parse(json)

    drawThreeGeo(data, 10, 'sphere', {
      // color: '#00d9ff',
      fog: true
    }, planet);
  });

const animate = () => {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)

  controls.update()
}

animate()

function handleWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize);
