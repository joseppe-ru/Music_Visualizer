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


//TODO: renderer auf gesamen Bildschirm, aber unter dem ControlCenter
//    controlcenter muss rein und raus hovern, wenn sich maus entfernt/darauf zu kommt
//        -> aber nicht bei Pause
//    innere Strucktur überarbeiten mit Event_Handler...

import * as THREE from 'three'
import { Event_Handler } from './handling';
import { Object_Creator } from './Objects';

/**
 * # Scenen Definitionen
 *  - Camera
 *  - Renderer
 *  - 3D-Objekte
 *  - Audio-Listener 
*/
    //Scene
const scene = new THREE.Scene()
    //Kamera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
camera.position.z = 2
    //Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

    //Audio Listener, Loader, Audio
const listener = new THREE.AudioListener()
camera.add( listener )
const audioLoader = new THREE.AudioLoader()
const sound = new THREE.Audio( listener );
    //Objekte initialisieren
var objects = new Object_Creator(scene)
    //Button handler initialisieren
new Event_Handler(audioLoader,sound)

/**
 * # Funktionen
 */
    //Progressbar auf angegebenen Wert stellen
const toggle_progressbar =(progress:string)=>{
    document.getElementById("bar")?.setAttribute("value",progress)
}
    //Animationsschleife
function animate() {

    if(sound.isPlaying){
        toggle_progressbar("0%")
        //animation für visualisierung
        objects.Animate_Visualisation(sound)
    }
    else
    {
        toggle_progressbar("0")
        //tilt-Animation
        objects.Animate_Idle()
    }
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

    //animationsschleife starten
animate()
