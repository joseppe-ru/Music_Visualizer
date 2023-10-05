import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

//Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

//###################################
//##############Audio################ 
//###################################
const audio_file = "./audio.mp3"

//virtueller zuhörer für alle Audioeffekte
const listener = new THREE.AudioListener();
camera.add( listener );

//Audioloader zum Laden aller sound-Dateien
const audioLoader = new THREE.AudioLoader();

//erschaffen, Laden und Spielen des Songs
const sound = new THREE.Audio( listener );

//sound-datei laden
audioLoader.load( audio_file, function( buffer ) {
	    sound.setBuffer( buffer );
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
    });

//#########################################
//##########Geomery########################
//#########################################
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

//??
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

//##################################
//#######Animationsschleife#########
//##################################
function animate() {
   //requestAnimationFrame(animate)

    //Animationsfunktion (vgl. while(true){})
//sound.play();
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}

//renderer funktion
function render() {
    renderer.render(scene, camera)
}

animate()
