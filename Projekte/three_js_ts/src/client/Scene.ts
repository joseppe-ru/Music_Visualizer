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
import { Object_Creator } from './Objects';


    //Scene
const scene = new THREE.Scene()
    //Kamera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
camera.position.z = 2
    //Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

    //Button handler initialisieren
var Handler = new Event_Handler()

camera.add(  )


    //Animationsschleife
function animate() {

    //Visualisierung
    Handler.Visualize()
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

    //animationsschleife starten
animate()
