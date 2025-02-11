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

const textureLoader = new THREE.TextureLoader()
const starSprite = textureLoader.load('./assets/circle.png')

const earthTexture = textureLoader.load('./assets/00_earthmap1k.jpg')
// const earthTexture = textureLoader.load('./assets/03_earthlights1k.jpg')
const earthElevationTexture = textureLoader.load('./assets/01_earthbump1k.jpg')
const earthAlphaTexture = textureLoader.load('./assets/02_earthspec1k.jpg')

const stars = getStars({ numStars: 4000, sprite: starSprite })
scene.add(stars)

const globeGroup = new THREE.Group()
scene.add(globeGroup)

const geo = new THREE.IcosahedronGeometry(1, 10)
const mat = new THREE.MeshBasicMaterial({ color: '#202020', wireframe: true })
const cube = new THREE.Mesh(geo, mat)
globeGroup.add(cube)

const detail = 100
const pointsGeo = new THREE.IcosahedronGeometry(1, detail)

const vertexShader = `
  uniform float size;
  uniform sampler2D elevationTexture;
  
  varying vec2 vUv;
  varying float vVisible;
   
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float elevation = texture2D(elevationTexture, vUv).r;
    vec3 vNormal = normalMatrix * normal;
    vVisible = step(0.0, dot(-normalize(mvPosition.xyz), normalize(vNormal)));
    mvPosition.z += 0.35 * elevation;    
    gl_PointSize = size;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform sampler2D colorTexture;
  uniform sampler2D alphaTexture;
  
  varying vec2 vUv;
  varying float vVisible;
    
  void main() {
    if (floor(vVisible + 0.1) == 0.0) discard;
    float alpha = 1.0 - texture2D(alphaTexture, vUv).r;
    vec3 color = texture2D(colorTexture, vUv).rgb;
    gl_FragColor = vec4(color, alpha);
  }
`

const uniforms = {
  size: { type: 'f', value: 3.5 },
  colorTexture: { type: 't', value: earthTexture },
  elevationTexture: { type: 't', value: earthElevationTexture },
  alphaTexture: { type: 't', value: earthAlphaTexture },
}

const pointsMaterial = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
  transparent: true,
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

