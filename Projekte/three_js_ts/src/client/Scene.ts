import * as THREE from 'three'
import { Audio_Processing } from './processing';
import { Event_Handler } from './handling';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Scenaries, Cube_Scenary, Sphere_Senary, freq_bar_Scenary,helper_Scenary,light_Scenary } from './Scenaries'
import { BloomEffect, EffectComposer, EffectPass, Pass, RenderPass} from 'postprocessing';

    //Scene
const scene = new THREE.Scene()
scene.background=new THREE.Color(0x000000)
    //Kamera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
camera.position.z = 300
    //Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
    //AudioListener
const listener = new THREE.AudioListener()
camera.add(listener)
 
//TODO: Helfer zum schluss wieder entfernen
    //zum frei navigieren / herumschwenken
new OrbitControls(camera, renderer.domElement);
    //Grid & Axen helper
//Scene.add(new THREE.GridHelper(250, 10),new THREE.AxesHelper( 5 ));

//postprocessiung Bloom effekt:::
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene,camera))

const effectpass = new EffectPass(camera,new BloomEffect())
//effectpass.renderToScreen=true

composer.addPass(effectpass)

//Eigene Klassen
const fft_size=2048
const cube_scene = new Cube_Scenary(scene,camera, fft_size/4)
const rreq_bar_scene = new freq_bar_Scenary(scene,camera,fft_size/2)
//new helper_Scenary(Scene,Camera,fft_size)
//new light_Scenary(Scene,Camera)
var scenaries:Scenaries<THREE.Object3D>[]=[]
scenaries.push(cube_scene)
scenaries.push(rreq_bar_scene)
const visualizer = new Audio_Processing(listener,scenaries,fft_size)
new Event_Handler(visualizer)  



//Animationsschleife
function Animate() {

    //Visualisierung
    visualizer.Visualize()
    composer.render()
    requestAnimationFrame( Animate );
}

//TODO: alert (disclaimer) wieder einblenden)
//alert("Die Bedienelemente erscheinen am Oberen Fensterrand")
//alert("Disclaimer: Die von Uns verwendete Musik ist offiziell als NCS(no copyright sound) freigegeben")
//Animationsschleife starten (Einstiegspunkt)
Animate()
