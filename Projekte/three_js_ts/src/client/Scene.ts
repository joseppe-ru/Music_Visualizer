// # Three.js Bibliotheken
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BloomEffect, EffectComposer, EffectPass, Pass, RenderPass} from 'postprocessing';

// # Eigene Bibliotheken/Klassen
import { Audio_Processing } from './Audio';
import { Event_Handler } from './Event_Handling';
import { Scenaries, Cube_Scenary, Freq_Bar_Scenary ,Sphere_Senary} from './Scenaries'

//---------------------------------
//Three.js Szenen Initialisierungen
//---------------------------------
    //Scene
const scene = new THREE.Scene()
scene.background=new THREE.Color(0x000000)
    //Kamera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
camera.position.z = 200
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
scene.add(new THREE.GridHelper(250, 10),new THREE.AxesHelper( 5 ));

//postprocessiung Bloom effekt:::
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene,camera))

const effectpass = new EffectPass(camera,new BloomEffect({
    resolutionX:window.innerWidth,
    resolutionY:window.innerHeight,
    intensity:0.5,
    radius:0.1,
    luminanceThreshold:0.1}))
effectpass.renderToScreen=true

composer.addPass(effectpass)

//-----------------
// # Eigene Klassen
//-----------------
const fft_size=2048
    //Liste aller Initialisierten Visualisierungs-Szenarien
var scenaries:Scenaries<THREE.Object3D>[]=[]

    //Visualisierungs-Szenario: mit pulsierenden Würfeln
const cube_scene = new Cube_Scenary(scene,camera, fft_size/4)
scenaries.push(cube_scene)

    //Visualisierungs-Szenario: Frequenzgang mit Balken
const req_bar_scene = new Freq_Bar_Scenary(scene,camera,fft_size/2)
scenaries.push(req_bar_scene)

    //Visualisierungs-Szenario: Kugel aus Strichen (ins zentrum gerichtet)
//const sphere = new Sphere_Senary(scene,camera,fft_size/2,3,4)
//scenaries.push(sphere)

    //Initialisierung der Three.js Audio-API funktionen
const visualizer = new Audio_Processing(listener,scenaries,fft_size)

    //Initialisierung des Eventhandlers
new Event_Handler(visualizer)  

//---------------------
// # Animationsschleife
//---------------------
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
