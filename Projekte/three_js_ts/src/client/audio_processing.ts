import * as THREE from 'three'

export class processing_layer{
    audio_path:string;
    constructor(path:string){
        this.audio_path=path;
    }
    create_scene(){

    }
}


/*

//#################
//Müllhalde für alles überschüssige


window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}



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


//###################################
//##############Audio################ 
//###################################


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
        sound.setLoop(false);
        sound.setVolume(0.5);
        sound.play();
    });
    
    
    document.getElementById("bar")?.setAttribute("value",val.toString())
    
    */