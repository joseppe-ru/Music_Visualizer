import * as THREE from 'three';
import { randnum } from './global_functions';

export class Scenaries<T extends THREE.Object3D>{
    Scene:THREE.Scene
    Camera:THREE.Camera
    Object_Count:number
    Objects:T[]
    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number){
        //Scene
        this.Scene=scene
        //Kamrea
        this.Camera=camera
        //Anz. Objekte
        this.Object_Count=count
        //Ojekte-Array
        this.Objects=[]
    }

    //allgemeine Funktionen für alle Kindklassen/Scenarien
    protected Create_Objects(){/*console.log("super_Create_Objects")*/}

    public Animate_Visualisation(data:Uint8Array,freq:number){/*console.log("super_Animate_Visu")*/}

    public Animate_Idle(){/*console.log("super_Animate_idle")*/}

    public Animate_Reset(){/*console.log("super_Animate_Reset")*/
        this.Camera.position.set(0,0,0)
    }
}

export class Cube_Scenary extends Scenaries<THREE.Mesh>{
    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number){
        super(scene,camera,count)
        this.Create_Objects()
    }
     Create_Objects(){
        super.Create_Objects()

        for (let i=0;i<this.Object_Count;i++){//1/2 FFT size
            const geometry = new THREE.BoxGeometry(1,1,1,1,1,1)
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color("rgb(255,255,255)"),
                wireframe: false 
            })

            this.Objects.push(new THREE.Mesh(geometry,material))

            this.Objects[i].position.x=randnum()*i
            this.Objects[i].position.y=randnum()*i
            this.Objects[i].position.z=randnum(100,-200)
            this.Scene.add(this.Objects[i])
        }

    }

    public Animate_Visualisation(data:Uint8Array,freq:number){
        super.Animate_Visualisation(data,freq)
        for (let i=0;i<this.Objects.length;i++){
            //Animation für alle Objekte
            //this.Objects[i].scale.y=data[i]/10
            //this.Objects[i].scale.z=data[i]/10
            //vor und zurück vibriren zum Bass (20Hz und 5000Hz)
            //this.Objects[i].position.z+=randnum()* (data[0]*data[0])/2000 + data[510]/10   //255^2/3000 -> z max 20  255/10 -> max 25
            this.Objects[i].scale.z= data[i]/20  //255^2/3000 -> z max 20  255/10 -> max 25
            this.Objects[i].position.x=Math.sin(i*2)*data[i]
            this.Objects[i].position.y=Math.cos(i*2)*data[i]
            //Farbe nicht verändern
            var color = data[i]/255
            this.Objects[i].material=new THREE.MeshBasicMaterial({color: new THREE.Color(i/2048,freq/100,color)}) 
        }

        //Rotation
        this.Camera.rotation.z+=0.01+(data[500]/4000)
        this.Camera.position.z=200+ (data[0]*data[0])/2000 + data[510]/10

        if(data[0]>170){
            //Kick-Animation für Beat -> Bloom oder aufleuchten
        }
    }

    Animate_Idle(){
        super.Animate_Idle()
        for (let i=0;i<this.Objects.length;i++){
            //Animation für alle Objekte
            if(this.Objects[i].position.y<0.2 && this.Objects[i].position.y>-0.2){
                if(this.Objects[i].position.y>0){
                    this.Objects[i].position.y-=0.1
                }
                else{
                    this.Objects[i].position.y+=0.1
                }
            }
            if(this.Objects[i].position.x<0.2 && this.Objects[i].position.x>-0.2){
                if(this.Objects[i].position.x>0){
                    this.Objects[i].position.x-=0.1
                }
                else{
                    this.Objects[i].position.x+=0.1
                }
            }
        }
    }

    Animate_Reset(){
        super.Animate_Reset()
        for (let i=0;i<this.Objects.length;i++){
            this.Objects[i].position.set(0,0,0)
        }
    }
}

export class Sphere_Senary extends Scenaries<THREE.LineSegments>{

    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number, r_max:number,r_min:number){
        super(scene,camera,count)
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
    Animate_Visualisation(data: Uint8Array,freq:number): void {
        
    }
}