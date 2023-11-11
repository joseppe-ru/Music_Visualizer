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

    }

    //allgemeine Funktionen für alle Kindklassen/Scenarien
    protected Create_Objects(){/*console.log("super_Create_Objects")*/}

    public Animate_Visualisation(data:Uint8Array,freq:number){/*console.log("super_Animate_Visu")*/
    }
    

    public Animate_Idle(){/*console.log("super_Animate_idle")*/
    }

    public Animate_Reset(){/*console.log("super_Animate_Reset")*/
        //this.Camera.position.set(0,0,0)
    }
}

export class Cube_Scenary extends Scenaries<THREE.Mesh>{
    
    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number,band_offset:number=0,enum_muster:Enum_Visual_Method=Enum_Visual_Method.Muster_Muster){
        super(scene,camera,count,band_offset,enum_muster)
        this.Create_Objects()
        
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
            this.Objects[i].position.y=randnum(400,-400)
            this.Objects[i].position.z=randnum(100,-200)

            this.Group.add(this.Objects[i])
            
        }

        //const a_light=new THREE.AmbientLight(0xffffff,3)
        this.Scene.add(this.Group,this.Light)

        //Licht
        //const d_light = new THREE.DirectionalLight(0xffffff,1)
        //d_light.position.set(0,10,0)
        //this.Scene.add(d_light)
        //d_light.target=this.Group

        // const a_light = new THREE.AmbientLight(0xffffff)
        // a_light.position.set(0,10,0)
        // this.Scene.add(a_light)
        
        // this.Scene.add(this.Light)

    }

    public Animate_Visualisation(data:Uint8Array,freq:number){
        super.Animate_Visualisation(data,freq)
        var spin_direct=0
        var red=255, green=255, blue=255 
        var x=0,y=0
        var blur=0

        for (let i=0;i<this.Objects.length;i++){
            let offset =i+this.Band_Offset
            
            //Animation für alle Objekte
                switch (this.Enum_Method){
                    case Enum_Visual_Method.Muster0_std_kreis://Mitten und stimme
                        data[offset]=Math.pow((data[offset])/(256/(Math.sqrt(256))),2)
                        //spin:
                        spin_direct=-0.01
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
                    case Enum_Visual_Method.Muster1_invers_kreis://Bass
                        data[offset]=Math.pow((data[offset])/(256/(Math.sqrt(256))),2)
                        //spin
                        spin_direct=+0.01
                        //position
                        x=Math.sin(i)*(255-data[offset])*(2/3) 
                        y=Math.cos(i)*(255-data[offset])*(2/3) 
                        this.Objects[i].position.z=50
                        //farbe: je lauter, desto weniger grün & blau
                        red = 1
                        green = 0.7 - data[i]/256
                        blue = 0.8 - data[i]/256
                        blur=0

                        break;                    
                    case Enum_Visual_Method.Muster2_raute:
                        //position
                        x=Math.sin(i*data[i]/20)*data[i]/2 
                        y=Math.cos(i*i/20)*data[i]/2            
                        break;
                    case Enum_Visual_Method.Muster3_sun_like:
                        x=Math.sin(Math.PI+i)*(data[i]*data[i])/i
                        y=Math.cos(Math.PI+i)*(data[i]*data[i])/i   
                        break;
                    case Enum_Visual_Method.Muster4_spirale://höhen
                        offset=i+250
                        //spin:
                        spin_direct=+0.01
                        //position:
                        x=Math.sin(Math.PI+offset)*(offset*offset)/data[i]
                        y=Math.cos(Math.PI+offset)*(offset*offset)/data[i]
                        this.Objects[i].position.z=-119
                        //Farbe 
                        green = data[i]/255                               //Lautstärke abhängig
                        red = (250-data[i])/255                        //lauter -> weniger 
                        blue = (this.Object_Count-i)/this.Object_Count   //frequenz niedrig -> mehr 
                        blur=0.2
                        break;
                    case Enum_Visual_Method.Muster5_star1:
                        x=Math.asin(i/this.Object_Count)*Math.sin(i*2)*data[i]
                        y=Math.acos(i/this.Object_Count)*Math.cos(i*2)*data[i]
                        break;                    
                    case Enum_Visual_Method.Muster6_star2:
                        x=Math.asin(i/this.Object_Count)*Math.cos(i*2)*data[i]
                        y=Math.acos(i/this.Object_Count)*Math.sin(i*2)*data[i]
                        break;
                    case Enum_Visual_Method.Muster7_std_auge:
                        x=Math.asin(data[i]/256)*Math.cos(i*2)*data[i]
                        y=Math.acos(data[i]/256)*Math.sin(i*2)*data[i]
                        break;
                    case Enum_Visual_Method.Muster8_schmal_auge:
                        x=Math.asin(data[i]/256 *i/this.Object_Count)*Math.cos(i*2)*data[i]
                        y=Math.acos(data[i]/256 *i/this.Object_Count)*Math.sin(i*2)*data[i]
                        break;
                    case Enum_Visual_Method.Muster9_blatt:
                        x=(Math.asin(data[i]/256 *i/this.Object_Count)*Math.cos(i*2)*i)/5
                        y=(Math.acos(data[i]/256 *i/this.Object_Count)*Math.sin(i*2)*i)/5
                        break;                    
                    case Enum_Visual_Method.Muster10_saphire:
                        x=(Math.asin(i/this.Object_Count)*Math.cos(i*2)*i)/5
                        y=(Math.acos(i/this.Object_Count)*Math.sin(i*2)*i)/5
                        break;
                    case Enum_Visual_Method.Muster11_spahire_fixed:
                        x=(Math.asin(i/this.Object_Count)*Math.cos((data[i]))*i)/5
                        y=(Math.acos(i/this.Object_Count)*Math.sin((data[i]))*i)/5
                        break;
                    case Enum_Visual_Method.Muster12_reinverse_kreis:
                        x=Math.sin(i*2)*Math.abs((128-data[i]))/2
                        y=Math.cos(i*2)*Math.abs((128-data[i]))/2 
                        break;
                    case Enum_Visual_Method.Muster13:
                        break;                    
                    case Enum_Visual_Method.Muster14:
                        break;
                }

            this.Objects[i].position.x=x
            this.Objects[i].position.y=y

            //     //länge nach Lautstärke
            this.Objects[i].scale.z= data[i]/20  
            //     //je leiser, desto weiter weg
            // this.Objects[i].position.z = -(255-data[i])/2 

            this.Objects[i].material=new THREE.MeshLambertMaterial({color: new THREE.Color(red,green,blue)}) 
            this.Light.intensity=(0.5 + (data[i]/256)/2) - blur
        }
        

        //Rotation
        
        //this.Camera.position.z=200+ (data[0]*data[0])/2000 + data[510]/10

        this.Group.rotation.z+=spin_direct

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

export class Sphere_Senary extends Scenaries<THREE.Line>{

    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number, r_max:number,r_min:number,band_offset:number=0,enum_muster:Enum_Visual_Method=Enum_Visual_Method.Muster_Muster){
        super(scene,camera,count,band_offset,enum_muster)
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

            //neue Linie als THREE Element zu Objects hinzufügen
            this.Objects.push(new THREE.Line(geometry.setFromPoints(points),material))
            //zur Szene hinzufügen
            this.Scene.add(this.Objects[i])
        }
    }
    Animate_Visualisation(data: Uint8Array,freq:number): void {
        
    }
}

//neues Szenario mit verbundenen Linien, nicht nur segmenten-> sieht bestimmt aus cool aus
export class Freq_Bar_Scenary extends Scenaries<THREE.Mesh>{

    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number,band_offset:number=0,enum_muster:Enum_Visual_Method=Enum_Visual_Method.Muster_Muster){
        super(scene,camera,count,band_offset,enum_muster)
        this.Create_Objects()
        
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


export class helper_Scenary extends Scenaries<THREE.Mesh>{
    constructor(scene:THREE.Scene,camera:THREE.Camera,count=1,band_offset:number=0,enum_muster:Enum_Visual_Method=Enum_Visual_Method.Muster_Muster){
        super(scene,camera,count,band_offset,enum_muster)
        this.Create_Objects()
    }
    protected Create_Objects(): void {
       const geometry = new THREE.BufferGeometry()
       const material = new THREE.LineBasicMaterial({color:new THREE.Color(0,1,0)})

       const points:THREE.Vector3[]=[];
       points.push(new THREE.Vector3(-1000,250,-100))
       points.push(new THREE.Vector3(1000,250,-100))
       this.Scene.add(new THREE.LineSegments(geometry.setFromPoints(points),material))

        const cube = new THREE.Mesh(geometry,material)
        this.Scene.add(cube)

    }
}

export class Camera_Control extends Scenaries<THREE.Mesh>{
    inc:number
    constructor(scene:THREE.Scene,camera:THREE.Camera,count=1,band_offset:number=0,enum_muster:Enum_Visual_Method=Enum_Visual_Method.Muster_Muster){
        super(scene,camera,count,band_offset,enum_muster)
        this.Create_Objects()
        this.inc=0
    }
    protected Create_Objects(): void {

    }

    public Animate_Visualisation(data: Uint8Array, freq: number): void {
        super.Animate_Visualisation(data,freq)
        //leichte bewegung durch Raum -> 3D-Effekt richtig verbildlichen
        //erstmal bissl pulsieren
        
        this.Camera.position.z=250 + (Math.pow((data[2])/(256/(Math.sqrt(256))),2)*(4/5))
    }
    public Animate_Idle(): void {
        this.Camera.position.x=0
        this.Camera.position.y=0
        this.Camera.position.z=250
    }
}

export class Bass_Line extends Scenaries<THREE.LineSegments>{
    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number,band_offset:number=0,enum_muster:Enum_Visual_Method=Enum_Visual_Method.Muster_Muster){
        super(scene,camera,count,band_offset,enum_muster)
        this.Create_Objects()
    }

    Create_Objects(): void {
        const r_max=100,r_min=90
        const geometry = new THREE.BufferGeometry()
        const material = new THREE.LineBasicMaterial({color:0x27fd52})
        const points:THREE.Vector2[]=[];
        //würfel für Visualisierung
        for (let i=0;i<this.Object_Count;i++){
            const teta = (i+Math.PI)*this.Object_Count
            const phi = (i+Math.PI)*this.Object_Count
            const x = Math.sin(teta)*Math.sin(phi)*randnum()
            const y = Math.cos(teta)*Math.cos(phi)*randnum()
            //Start und endvektoren für Linie erstellen (random)
            points.push(new THREE.Vector2(x,y).normalize().multiplyScalar(r_max))
            points.push(new THREE.Vector2(x,y).normalize().multiplyScalar(r_min))
            //neue Linie als THREE Element zu Objects hinzufügen
            this.Objects.push(new THREE.LineSegments(geometry.setFromPoints(points),material))
            //zur Szene hinzufügen
            this.Scene.add(this.Objects[i])
        }
    }
}