import * as THREE from 'three';
import { randnum, Enum_Visual_Method } from './Global_Collection';

/**
 * # Szenarien für die Visualisierung
 *  @note jede der Kindkalssen stellt ein Szenario dar, \
 *  in welchem Objekte erstellt und nach angegebener FFT-Analyser \
 *  der Gespielten Musik gezielt Parameter verändern
 *    
 * Soweit erstellte Szenarien:
 *  @Cube_Scenary würfel in kreisen angeordnet, pulsieren, bewegend, farbeändernt zur musik
 *  @freq_bar_Scenary einen Balken, der zur Musiklautstärke nach frequenz ausschlag zeigt
 *  @Sphere_Senary eine Kugel aus auf die mitte gerichtete Strichsegmenten
 */
export class Scenaries<T extends THREE.Object3D>{
    Scene:THREE.Scene
    Camera:THREE.Camera
    Object_Count:number
    Objects:T[]
    Group:THREE.Mesh
    Light:THREE.AmbientLight
    Enum_Method:Enum_Visual_Method
    Band_Offset:number
    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number,band_offset:number,enum_muster:Enum_Visual_Method){
        //Scene
        this.Scene=scene
        //Kamrea
        this.Camera=camera
        //Anz. Objekte
        this.Object_Count=count
        //Frequenzbereich zum Darstellen (aus Anzahl und offset(startwert))
        this.Band_Offset=band_offset
        //Ojekte-Array
        this.Objects=[]
        //Gruppe
        this.Group=new THREE.Mesh()
        //ambienteLight
        this.Light=new THREE.AmbientLight(0xffffff,3)
        //
        this.Enum_Method=enum_muster
        //Objekte erschaffen beim Erstellen eines Objektes dieser Klasse
        this.Create_Objects()
    }

    //allgemeine Funktionen für alle Kindklassen/Scenarien
    protected Create_Objects(){/*console.log("super_Create_Objects")*/}

    public Animate_Visualisation(data:Uint8Array,freq:number){/*console.log("super_Animate_Visu")*/}
    

    public Animate_Idle(){/*console.log("super_Animate_idle")*/}

    public Animate_Reset(){/*console.log("super_Animate_Reset")*/}
}

export class Cube_Scenary extends Scenaries<THREE.Mesh>{
    
    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number,band_offset:number=0,enum_muster:Enum_Visual_Method){
        super(scene,camera,count,band_offset,enum_muster)        
    }
    Create_Objects(){
        super.Create_Objects()

        //würfel Objekte
        for (let i=0;i<this.Object_Count;i++){
            const geometry = new THREE.BoxGeometry(2,2,2)
            const material = new THREE.MeshLambertMaterial({
                color: new THREE.Color(randnum(0xffffff,0) ),
            })

            this.Objects.push(new THREE.Mesh(geometry,material))

            this.Objects[i].position.x=randnum(400,-400)
            this.Objects[i].position.y=randnum(250,-250)
            this.Objects[i].position.z=randnum(100,-200)

            this.Group.add(this.Objects[i])
            
        }
        this.Scene.add(this.Group,this.Light)
    }

    public Animate_Visualisation(data:Uint8Array,freq:number){
        super.Animate_Visualisation(data,freq)
        var spin=0
        var red=255, green=255, blue=255 
        var x=0,y=0
        var blur=0

        for (let i=0;i<this.Objects.length;i++){
            let offset =i+this.Band_Offset
            
            //Animation für alle Objekte
                switch (this.Enum_Method){
                    case Enum_Visual_Method.Vis_Bass://Bass
                        data[offset]=Math.pow((data[offset])/(256/(Math.sqrt(256))),2)
                        //spin
                        spin=+0.1
                        //position
                        x=Math.sin(i)*(255-data[offset])*(2/3) 
                        y=Math.cos(i)*(255-data[offset])*(2/3) 
                        this.Objects[i].position.z=50
                        //farbe: je lauter, desto weniger grün & blau
                        red = 1
                        green = 0.7 - data[i]/256
                        blue = 0.9 - data[i]/256
                        blur= 0.5 + data[i]/256
                        break;      
                    case Enum_Visual_Method.Vis_Mitten://Mitten und stimme
                        data[offset]=Math.pow((data[offset])/(256/(Math.pow(256,(1/3)))),3) * 2
                        //spin:
                        spin=-0.01
                        //position:
                        x=Math.sin(i)*data[offset]/2
                        y=Math.cos(i)*data[offset]/2 
                        this.Objects[i].position.z=0
                        //farbe:
                        green = data[i]/255                               //Lautstärke abhängig
                        red = (250-data[i])/255                        //lauter -> weniger 
                        blue = (this.Object_Count-i)/this.Object_Count   //frequenz niedrig -> mehr 
                        blur=0
                        break;              
                    case Enum_Visual_Method.Vis_Höhen://höhen
                        offset=i+250
                        //spin:
                        spin=+0.01
                        //position:
                        x=Math.sin(Math.PI+offset)*(Math.pow(offset,2))/data[i]
                        y=Math.cos(Math.PI+offset)*(Math.pow(offset,2))/data[i]
                        this.Objects[i].position.z=-119
                        //Farbe 
                        green = data[i]/255                               //Lautstärke abhängig
                        red = (250-data[i])/255                        //lauter -> weniger 
                        blue = (this.Object_Count-i)/this.Object_Count   //frequenz niedrig -> mehr 
                        blur=0.2
                        break;
                    default:
                        break;
                }

            this.Objects[i].position.x=x
            this.Objects[i].position.y=y

            this.Objects[i].scale.z= data[i]/20  

            this.Objects[i].material=new THREE.MeshLambertMaterial({color: new THREE.Color(red,green,blue)}) 
            this.Light.intensity=1 - blur
        }

        this.Group.rotation.z+=spin
    }

    Animate_Idle(){
        super.Animate_Idle()
        //aktueller Vektor für Objekt
        var cur_vector:THREE.Vector3
        var null_vec =new THREE.Vector3(0,0,0)
        for (let i=0;i<this.Objects.length;i++){
            //XYZ-Vektor ermitteln
            cur_vector=this.Objects[i].position
            if(this.Objects[i].position.x!=0|| this.Objects[i].position.y!=0||this.Objects[i].position.z!=0){
                cur_vector.divideScalar(1+((1/this.Objects[i].position.distanceTo(null_vec))/2))
                this.Objects[i].position.set(cur_vector.x,cur_vector.y,cur_vector.z)
            }
            else{//random verteilen
                this.Objects[i].position.x=randnum(400,-400)
                this.Objects[i].position.y=randnum(400,-400)
                this.Objects[i].position.z=randnum(100,-400)
            }

            if (this.Objects[i].scale.z>1){
                this.Objects[i].scale.z-=0.1
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

//neues Szenario mit verbundenen Linien, nicht nur segmenten-> sieht bestimmt aus cool aus
export class Freq_Bar_Scenary extends Scenaries<THREE.Mesh>{

    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number,band_offset:number=0,enum_muster:Enum_Visual_Method){
        super(scene,camera,count,band_offset,enum_muster)        
    }
    
    protected Create_Objects(): void {
        super.Create_Objects()

        for (let i=0;i<this.Object_Count;i++){//1/2 FFT size
            const geometry = new THREE.BoxGeometry(1,1,1,1,1,1)
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color("rgb(5,5,50)"),
                wireframe: false 
            })
            this.Objects.push(new THREE.Mesh(geometry,material))
            this.Objects[i].position.x=-this.Object_Count/2 + i
            this.Objects[i].position.y=0
            this.Objects[i].position.z=-120
            this.Group.add(this.Objects[i])
        }
        this.Scene.add(this.Group)
    }
    
    Animate_Visualisation(data: Uint8Array,freq:number): void {
        super.Animate_Visualisation(data,freq)
        for (let i=0;i<this.Object_Count;i++){
            this.Objects[i].scale.y=data[i]*2
        }
    }

    public Animate_Idle() {
        super.Animate_Idle()

        for (let i=0;i<this.Objects.length;i++){
            if(this.Objects[i].scale.y>0.1)
                this.Objects[i].scale.y-=0.2
        }
    }

    public Animate_Reset() {
        super.Animate_Reset()
    }
}

export class Camera_Control extends Scenaries<THREE.Mesh>{
    inc:number
    constructor(scene:THREE.Scene,camera:THREE.Camera,count=1,band_offset:number=0,enum_muster:Enum_Visual_Method){
        super(scene,camera,count,band_offset,enum_muster)
        this.inc=0
    }
    protected Create_Objects(): void {

    }

    public Animate_Visualisation(data: Uint8Array, freq: number): void {
        super.Animate_Visualisation(data,freq)
        //leichte bewegung durch Raum -> 3D-Effekt richtig verbildlichen
        //erstmal bissl pulsieren
        
        this.Camera.position.z=250 + (Math.pow((data[2])/(256/(Math.sqrt(256))),2)*(2/5))
    }
    public Animate_Idle(): void {
        this.Camera.position.x=0
        this.Camera.position.y=0
        this.Camera.position.z=250
    }

    public Animate_Reset() {
        super.Animate_Reset()
    }
}