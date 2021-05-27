import './style.css';

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var amogus,meshText
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);

renderer.render(scene,camera);

const bg = new THREE.TextureLoader().load('skybox.jpg')
scene.background = bg
// const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color:0xFFFFFF});
// const torus = new THREE.Mesh(geometry,material);
// scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight,ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200,50);
// scene.add(lightHelper,gridHelper)
const loader = new GLTFLoader();
loader.load('/untitled.glb', function(gltf){
  amogus = gltf.scene
  scene.add(gltf.scene)
  
},undefined)
 const controls = new OrbitControls(camera, renderer.domElement)

function addCube(){
  const geometry = new THREE.SphereGeometry(0.24,24,24)
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff})
  const cube = new THREE.Mesh(geometry,material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000))

  cube.position.set(x,y,z)
  scene.add(cube)
}
 Array(5000).fill().forEach(addCube)
var floader = new THREE.FontLoader();

floader.load( 'fonts/arial_regular.json', function ( font ) {

  const text = new THREE.TextGeometry('Amogus was not the impostor...',{font:font, size: 0.8,height: 0.01})
  const textMat = new THREE.MeshStandardMaterial({color: 0xffffff})
  const textMesh = new THREE.Mesh(text,textMat)
  textMesh.position.set(-7,4,0)
  scene.add(textMesh)
  meshText = textMesh
} );


function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);

 controls.update()

  // torus.rotation.x += 0.01 
  // torus.rotation.y += 0.02
  if (amogus) {
    amogus.rotation.y += 0.02;
    amogus.rotation.x += 0.01;
    amogus.rotation.z += 0.01;
    // camera.position.setY(amogus.position.y)
    // amogus.position.y -= 0.5
    // if(meshText){
    //   meshText.position.set(-7, amogus.position.y + 3, 0)
    // }
}
}
animate();