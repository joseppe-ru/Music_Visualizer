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

//Audio analyse
const listener = new THREE.AudioListener();
camera.add( listener );

const sound = new THREE.Audio( listener );

const audioLoader = new THREE.AudioLoader();
audioLoader.load( '../audio.mp3', 
    function( buffer ) {
	    sound.setBuffer( buffer );

    },
	// onProgress callback
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	},

	// onError callback
	function ( err ) {
		console.log( 'An error happened' );
	}
);

//Würfel:
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

function logging(){
    //pfad von localhsot
    console.log("local_Path: " + window.location.pathname)
    sound.play();
}

//Animation
function animate() {
    requestAnimationFrame(animate)

    //Animationsfunktion (vgl. while(true){})

    render()
}

//renderer funktion
function render() {
    renderer.render(scene, camera)
}

animate()

logging()