import * as THREE from 'three';
import { randnum } from './global_functions';

export class Scenaries<T extends THREE.Object3D>{
    Scene:THREE.Scene
    Object_Count:number
    Objects:T[]
    constructor(scene:THREE.Scene,count:number){
        //Scene
        this.Scene=scene
        //Anz. Objekte
        this.Object_Count=count
        //Ojekte-Array
        this.Objects=[]
    }

    //allgemeine Funktionen für alle Kindklassen/Scenarien
    Create_Objects(){/*console.log("super_Create_Objects")*/}

    Animate_Visualisation(data:Uint8Array){/*console.log("super_Animate_Visu")*/}

    Animate_Idle(){/*console.log("super_Animate_idle")*/}

    Animate_Reset(){/*console.log("super_Animate_Reset")*/}
}

export class Cube_Scenary extends Scenaries<THREE.Mesh>{
    constructor(scene:THREE.Scene,count:number){
        super(scene,count)
        this.Create_Objects()
    }
    Create_Objects(){
        super.Create_Objects()

        for (let i=0;i<this.Object_Count;i++){//1/2 FFT size
            const geometry = new THREE.BoxGeometry(1,1,1,1,1,1)
            const material = new THREE.MeshBasicMaterial({
                color: 0x00ff00,
                wireframe: true 
            })


            this.Objects.push(new THREE.Mesh(geometry,material))

            this.Objects[i].position.x=-50+i
            this.Scene.add(this.Objects[i])

        }

    }

    Animate_Visualisation(data:Uint8Array){
        super.Animate_Visualisation(data)
        for (let i=0;i<this.Objects.length;i++){
            //Animation für alle Objekte
            this.Objects[i].scale.y=data[i]
            this.Objects[i].scale.z=data[i]/2
            this.Objects[i].position.x=Math.sin(data[i])*i
        }

        if(data[0]>170){
            //Kick-Animation für Beat -> Bloom oder aufleuchten
        }
    }

    Animate_Idle(){
        super.Animate_Idle()
        for (let i=0;i<this.Objects.length;i++){
            //Animation für alle Objekte
            if(!(this.Objects[i].scale.y<=0)){
                this.Objects[i].scale.y-=0.3
            }
            else{
                this.Objects[i].scale.y=0
            }
        }
    }

    Animate_Reset(){
        super.Animate_Reset()
        for (let i=0;i<this.Objects.length;i++){
            this.Objects[i].scale.y=0
        }
    }
}

export class Sphere_Senary extends Scenaries<THREE.LineSegments>{

    constructor(scene:THREE.Scene,count:number, r_max:number,r_min:number){
        super(scene,count)
        this.Create_Objects(r_max,r_min)
    }
    Create_Objects(r_max=2,r_min=3): void {
        const geometry = new THREE.BufferGeometry()
        const material = new THREE.LineBasicMaterial({color:0x27fd52})
        const points:THREE.Vector3[]=[];
        //würfel für Visualisierung
        for (let i=0;i<this.Object_Count;i++){
            const teta = randnum(2*Math.PI,-2*Math.PI)
            const phi = randnum(2*Math.PI,-2*Math.PI)
            const x = Math.sin(teta)*Math.sin(phi)
            const y = Math.cos(teta)*Math.cos(phi)
            const z = Math.sin(teta)*Math.cos(phi)
            //Start und endvektoren für Linie erstellen (random)
            points.push(new THREE.Vector3(x,y,z).normalize().multiplyScalar(r_max))
            points.push(new THREE.Vector3(x,y,z).normalize().multiplyScalar(r_min))
            //neue Linie als THREE Element zu Objects hinzufügen
            this.Objects.push(new THREE.LineSegments(geometry.setFromPoints(points),material))
            //zur Szene hinzufügen
            this.Scene.add(this.Objects[i])
        }
    }
    Animate_Visualisation(data: Uint8Array): void {
        
    }
}