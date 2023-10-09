import * as THREE from 'three'

export class Object_Creator{
    Scene:THREE.Scene
    Object:THREE.Mesh
    constructor(scene:THREE.Scene){
        this.Scene=scene
        this.Object=new THREE.Mesh
        this.Create_Objects()
    }

    Create_Objects=()=>{
        const geometry = new THREE.BoxGeometry()
        const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
        })
        const cube = new THREE.Mesh(geometry, material)
        this.Object=new THREE.Mesh(geometry,material)
        this.Scene.add(this.Object)
    }

    Animate_Visualisation=(sound:THREE.Audio)=>{
        //Music-Visualisierungs effekte

        //music analyzer
        const analyzer = new THREE.AudioAnalyser(sound,512)
        const data = analyzer.getFrequencyData()     
        
    }

    Animate_Idle=()=>{
        this.Object.rotation.z+=0.01
        this.Object.rotation.y+=0.01
        this.Object.rotation.x+=0.01
    }
}

