import * as THREE from 'three'
import { Audio_Processing } from './processing';
import { Event_Handler } from './handling';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Scenaries, Cube_Scenary, Sphere_Senary } from './Scenaries'

    //Scene
const Scene = new THREE.Scene()
    //Kamera
const Camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
Camera.position.z = 300
    //Renderer
const Renderer = new THREE.WebGLRenderer()
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)
    //AudioListener
const Listener = new THREE.AudioListener()
Camera.add(Listener)
 
//TODO: Helfer zum schluss wieder entfernen
    //zum frei navigieren / herumschwenken
new OrbitControls(Camera, Renderer.domElement);
    //Grid & Axen helper
//Scene.add(new THREE.GridHelper(250, 10),new THREE.AxesHelper( 5 ));

//Eigene Klassen
const fft_size=2048
const Szenario = new Cube_Scenary(Scene,Camera, fft_size/2)
const Visualizer = new Audio_Processing(Listener,Szenario,fft_size)
new Event_Handler(Visualizer)  

//Animationsschleife
function Animate() {
    //Visualisierung
    
    Visualizer.Visualize()
    Renderer.render(Scene,Camera);
    requestAnimationFrame( Animate );


}

//TODO: alert (disclaimer) wieder einblenden)
//alert("Die Bedienelemente erscheinen am Oberen Fensterrand")
//alert("Disclaimer: Die von Uns verwendete Musik ist offiziell als NCS(no copyright sound) freigegeben")
//Animationsschleife starten (Einstiegspunkt)
Animate()
