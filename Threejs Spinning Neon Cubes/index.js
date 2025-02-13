import * as THREE from "three";
import { LineMaterial } from "https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/lines/LineMaterial.js";
import { Line2 } from "https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/lines/Line2.js";
import { LineGeometry } from "https://cdn.jsdelivr.net/npm/three@0.131/examples/jsm/lines/LineGeometry.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const getPositions = () => {
  const points = [];
  points.push(0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0); // face
  points.push(0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1); // face
  points.push(0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1); // the rest

 return points.map(v => v -= 0.5); // center the remove by removing 0.5 from the value
}

const getBox = (index) => {
  const material = new LineMaterial({
    color: '#ffff00',
    linewidth: 2,
  })
  material.resolution.set(innerWidth, innerHeight)

  const geometry = new LineGeometry()
  geometry.setPositions(getPositions());

  const mesh = new Line2(geometry, material)
  const rate = index * 0.01

  mesh.update = (timestamp) => {
    mesh.rotation.x = timestamp * rate;
    mesh.rotation.y = timestamp * rate;
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
addBoxes(10)

function tick(timeStamp) {
  // timeStamp += 0.000001;
  timeStamp *= 0.01;
  boxGroup.update(timeStamp)

  renderer.render(scene, camera);

  requestAnimationFrame(tick)
}
tick();

function handleWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', handleWindowResize, false);
