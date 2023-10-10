import * as THREE from 'three'
import { Audio_Processing } from './processing';
import { Event_Handler } from './handling';

    //Scene
const Scene = new THREE.Scene()
    //Kamera
const Camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
Camera.position.z = 30
    //Renderer
const Renderer = new THREE.WebGLRenderer()
Renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(Renderer.domElement)
    //AudioListener
const Listener = new THREE.AudioListener()
Camera.add(Listener)



/**# Handlings
 * =>initialize:
 *  - Button-event-handlers
 *  - Objects
 *  - Audio-Processing
 */

var Visualizer = new Audio_Processing(Scene,Listener,128)
var Handler = new Event_Handler(Visualizer)  

    //Animationsschleife
function Animate() {
    //Visualisierung
    Visualizer.Visualize()
    Renderer.render(Scene,Camera);
    requestAnimationFrame(Animate);
}

    //animationsschleife starten
Animate()
