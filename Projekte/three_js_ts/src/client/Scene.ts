/** Allgemeine Funktionen...
 * # Initialisierungen:
 *  - Scene
 *  - camera
 *  - Objekte (ausgelagerte Datei)
 * 
 * # Event handling:
 *  - Buttons
 *  - ende des Songs
 *  - Frontend-elemente (progressbar, pfad-textfeld, perf)
 * 
 * # Steuern:
 *  - Analyse ansteueren (eigene Datei)
 *  - Animation der Objekte zur Musik (Logik ausgelagert)
 *  - 
*/

/**
 * # Scenen Definitionen und initialisieurungen und Einstiegspunkt
 *  - Camera
 *  - Renderer
 *  - 3D-Objekte
 *  - Audio-Listener 
*/

//TODO: Audio Loader, Audio usw ordentlich zurücksetzten

import * as THREE from 'three'
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
var Handler = new Event_Handler(Scene,Listener)  

    //Animationsschleife
function Animate() {
    //Visualisierung
    Handler.Animate()
    Renderer.render(Scene,Camera);
    requestAnimationFrame(Animate);
}

    //animationsschleife starten
Animate()
