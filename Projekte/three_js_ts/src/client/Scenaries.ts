import * as THREE from 'three';
import { randnum, Enum_Visual_Method } from './global_functions';
//TODO: Camera rotation wieder einschalten

/**
 * # Szenarien für die Visualisierung
 *  @note jede der Kindkalssen stellt ein Szenario dar, \
 *  in welchem Objekte erstellt und nach angegebener FFT-Analyser \
 *  der Gespielten Musik gezielt Parameter verändern
 *    
 * Soweit erstellte Szenarien:
 *  @Cube_Scenary würfel in kreisen angeordnet, pulsieren, bewegend, farbeändernt zur musik
 *  @freq_bar_Scenary einen Balken, der zur Musiklautstärke nach frequenz ausschlag zeigt
 *  @Sphere_Senary eine Kugel auf auf die mitte gerichtete Strichsegmenten
 */
export class Scenaries<T extends THREE.Object3D>{
    Scene:THREE.Scene
    Camera:THREE.Camera
    Object_Count:number
    Objects:T[]
    Group:THREE.Mesh
    Light:THREE.AmbientLight
    inc:number
    Enum_Method:Enum_Visual_Method
    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number){
        //Scene
        this.Scene=scene
        //Kamrea
        this.Camera=camera
        //Anz. Objekte
        this.Object_Count=count
        //Ojekte-Array
        this.Objects=[]
        //Gruppe
        this.Group=new THREE.Mesh()
        //ambienteLight
        this.Light=new THREE.AmbientLight(0xffffff,3)
        //increment für muster
        this.inc=0
        //
        this.Enum_Method=0
    }

    //allgemeine Funktionen für alle Kindklassen/Scenarien
    protected Create_Objects(){/*console.log("super_Create_Objects")*/}

    public Animate_Visualisation(data:Uint8Array,freq:number){/*console.log("super_Animate_Visu")*/}

    public Animate_Idle(){/*console.log("super_Animate_idle")*/
        //this.Camera.rotation.z+=0.001
    }

    public Animate_Reset(){/*console.log("super_Animate_Reset")*/
        //this.Camera.position.set(0,0,0)
    }
}

export class Cube_Scenary extends Scenaries<THREE.Mesh>{
    
    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number){
        super(scene,camera,count)
        this.Create_Objects()
        
    }
     Create_Objects(){
        super.Create_Objects()

        //würfel Objekte
        for (let i=0;i<this.Object_Count;i++){//1/2 FFT size
            const geometry = new THREE.BoxGeometry(2,2,2)
            const material = new THREE.MeshLambertMaterial({
                color: new THREE.Color(0xdd12ff ),
            })

            this.Objects.push(new THREE.Mesh(geometry,material))

            this.Objects[i].position.x=randnum()*i
            this.Objects[i].position.y=randnum()*i
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
        //const helper = new THREE.DirectionalLightHelper(d_light,5)
        //this.Scene.add(helper)

        
        //a_light.position.set(0,10,0)
        
        //this.Scene.add(this.Light)

    }

    public Animate_Visualisation(data:Uint8Array,freq:number){
        super.Animate_Visualisation(data,freq)
        if (this.inc<500000){
            this.inc+=10
        }
        else(
            this.inc=0
        )
        for (let i=0;i<this.Objects.length;i++){
            //Animation für alle Objekte
                switch (this.Enum_Method){
                    case 0:
                        //Muster1 -> regulärer Kreis
                        this.Objects[i].position.x=Math.sin(i*2)*data[i]/2
                        this.Objects[i].position.y=Math.cos(i*2)*data[i]/2 
                        break;
                    case 1:
                        //Muster2 -> schneller Kreis
                        this.Objects[i].position.x=Math.sin(i*data[i])*data[i]/2
                        this.Objects[i].position.y=Math.cos(i*data[i])*data[i]/2 
                        break;                    
                    case 2:
                        //Muster3 -> Raute
                        this.Objects[i].position.x=Math.sin(i*data[i]/20)*data[i]/2 
                        this.Objects[i].position.y=Math.cos(i*i/20)*data[i]/2            
                        break;
                    case 3:
                                    //Muster4 -> viereck wusel
            this.Objects[i].position.x=Math.sin(randnum()*data[i])*data[i]/2 
            this.Objects[i].position.y=Math.sin(randnum()*data[i])*data[i]/2 
                        break;
                    case 4:
                        break;
                    case 5:
                        break;                    
                    case 6:
                        break;
                    case 7:
                        break;
                    case 8:
                        break;
                    case 9:
                        break;                    
                    case 10:
                        break;
                    case 11:
                        break;
                    case 12:
                        break;
                    case 13:
                        break;                    
                    case 14:
                        break;
                        
                }

                //länge nach Lautstärke
            //this.Objects[i].scale.z= data[i]/10  
                //je leiser, desto weiter weg
            //this.Objects[i].position.z = -(255-data[i])/2 


            ////Muster5 -> gemächlicher Kreis
            //this.Objects[i].position.x=Math.sin(i*2)*(data[i]*data[i])/200
            //this.Objects[i].position.y=Math.cos(i*2)*(data[i]*data[i])/200
            ////Muster6 -> gemächlicher Kreis, mehr so striche (Sonne)
            //this.Objects[i].position.x=Math.sin(Math.PI+i)*(data[i]*data[i])/i
            //this.Objects[i].position.y=Math.cos(Math.PI+i)*(data[i]*data[i])/i     
            ////Muster7 -> Spirale (Galaxy) (wackelt bissl im Takt) (geordnet) (Hintergrundmuster)
            //this.Objects[i].position.x=Math.sin(Math.PI+i)*(i*i)/data[i]
            //this.Objects[i].position.y=Math.cos(Math.PI+i)*(i*i)/data[i]       
            ////Muster8 -> Stern
            //this.Objects[i].position.x=Math.asin(i/this.Object_Count)*Math.sin(i*2)*data[i]
            //this.Objects[i].position.y=Math.acos(i/this.Object_Count)*Math.cos(i*2)*data[i]
            ////Muster10 -> cooler anderer Stern
            //this.Objects[i].position.x=Math.asin(i/this.Object_Count)*Math.cos(i*2)*data[i]
            //this.Objects[i].position.y=Math.acos(i/this.Object_Count)*Math.sin(i*2)*data[i]
            ////Muster11 -> cooles Oval, wenig streuung, (Trapez mit ovalförmigen Loch in der Mitte)
            //this.Objects[i].position.x=Math.asin(data[i]/256)*Math.cos(i*2)*data[i]
            //this.Objects[i].position.y=Math.acos(data[i]/256)*Math.sin(i*2)*data[i]
            ////Muster12 -> krasseres Oval mit Muster/Strichen in Mitte 
            //this.Objects[i].position.x=Math.asin(data[i]/256 *i/this.Object_Count)*Math.cos(i*2)*data[i]
            //this.Objects[i].position.y=Math.acos(data[i]/256 *i/this.Object_Count)*Math.sin(i*2)*data[i]
            ////Muster13 -> krasseres Blatt (sehr anstrengend für PC),(wird niedriger, je Lauter aber breiter) (im ganzen jedoch wenig motion)
            //this.Objects[i].position.x=(Math.asin(data[i]/256 *i/this.Object_Count)*Math.cos(i*2)*i)/5
            //this.Objects[i].position.y=(Math.acos(data[i]/256 *i/this.Object_Count)*Math.sin(i*2)*i)/5
            ////Muster14 -> Wahnisinnig krankes Muster (aber leider Satisch) (Saphir)
            //this.Objects[i].position.x=(Math.asin(i/this.Object_Count)*Math.cos(i*2)*i)/5
            //this.Objects[i].position.y=(Math.acos(i/this.Object_Count)*Math.sin(i*2)*i)/5
            ////Muster15 -> wild gewelltes Blatt
            //this.Objects[i].position.x=(Math.asin(i/this.Object_Count)*Math.cos((data[i]))*i)/5
            //this.Objects[i].position.y=(Math.acos(i/this.Object_Count)*Math.sin((data[i]))*i)/5
            //this.Objects[i].position.z=(Math.atan(i/this.Object_Count)*Math.sin((data[i]))*i)/5
            //Muster15 -> wild gewelltes Blatt
            this.Objects[i].position.x=(Math.asin(i/this.Object_Count)*Math.sin((data[i]))*i)/5
            this.Objects[i].position.y=(Math.acos(i/this.Object_Count)*Math.cos((data[i]))*i)/5


            //Farbe verändern
            var red, green, blue 
            green= data[i]/255                               //Lautstärke abhängig
            red= (250-data[i])/255                        //lauter -> weniger 
            blue = (this.Object_Count-i)/this.Object_Count   //frequenz niedrig -> mehr 
            this.Light.intensity=0.8 + data[0]/1000

            this.Objects[i].material=new THREE.MeshLambertMaterial({color: new THREE.Color(red,green,blue)}) 

        }

        //Rotation
        //this.Camera.rotation.z+=(data[200]/4000)
        this.Camera.position.z=200+ (data[0]*data[0])/2000 + data[510]/10

        if(data[0]>170){
            //Kick-Animation für Beat -> Bloom oder aufleuchten
        }

    }

    Animate_Idle(){
        super.Animate_Idle()
        for (let i=0;i<this.Objects.length;i++){
            //Animation für alle Objekte
            if(this.Objects[i].position.y>0.2 || this.Objects[i].position.y<-0.2){
                if(this.Objects[i].position.y>0){
                    this.Objects[i].position.y-=0.5
                }
                else{
                    this.Objects[i].position.y+=0.5
                }
            }
            if(this.Objects[i].position.x>0.2 || this.Objects[i].position.x<-0.2){
                if(this.Objects[i].position.x>0){
                    this.Objects[i].position.x-=0.5
                }
                else{
                    this.Objects[i].position.x+=0.5
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

export class freq_bar_Scenary extends Scenaries<THREE.Mesh>{

    constructor(scene:THREE.Scene,camera:THREE.Camera,count:number){
        super(scene,camera,count)
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
        this.Group.rotation.z+=(data[200]/4000)
    }

    public Animate_Idle() {
        //super.Animate_Idle()
        //this.Group.rotation.z+=0.001
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
    constructor(scene:THREE.Scene,camera:THREE.Camera,count=1){
        super(scene,camera,count)
        this.Create_Objects()
    }
    protected Create_Objects(): void {
//        const geometry = new THREE.BufferGeometry()
//        const material = new THREE.LineBasicMaterial({color:new THREE.Color(0,1,0)})
//
//        const points:THREE.Vector3[]=[];
//        points.push(new THREE.Vector3(0,100,-100))
//        points.push(new THREE.Vector3(0,-100,-100))
//        this.Scene.add(new THREE.LineSegments(geometry.setFromPoints(points),material))
//        points.push(new THREE.Vector3(-this.Object_Count/8,100,-100))
//        points.push(new THREE.Vector3(-this.Object_Count/8,-100,-100))
//        this.Scene.add(new THREE.LineSegments(geometry.setFromPoints(points),material))
//        points.push(new THREE.Vector3(this.Object_Count/8,100,-100))
//        points.push(new THREE.Vector3(this.Object_Count/8,-100,-100))
//        this.Scene.add(new THREE.LineSegments(geometry.setFromPoints(points),material))
//        points.push(new THREE.Vector3(-this.Object_Count/4,100,-100))
//        points.push(new THREE.Vector3(-this.Object_Count/4,-100,-100))
//        this.Scene.add(new THREE.LineSegments(geometry.setFromPoints(points),material))
//        points.push(new THREE.Vector3(this.Object_Count/4,100,-100))
//        points.push(new THREE.Vector3(this.Object_Count/4,-100,-100))
//        this.Scene.add(new THREE.LineSegments(geometry.setFromPoints(points),material))
//        points.push(new THREE.Vector3(-this.Object_Count/2,100,-100))
//        points.push(new THREE.Vector3(-this.Object_Count/2,-100,-100))
//        this.Scene.add(new THREE.LineSegments(geometry.setFromPoints(points),material))
//        points.push(new THREE.Vector3(-this.Object_Count/2,150,-100))
//        points.push(new THREE.Vector3(this.Object_Count/2,150,-100))
//        this.Scene.add(new THREE.LineSegments(geometry.setFromPoints(points),material))
//        points.push(new THREE.Vector3(-this.Object_Count/2,200,-100))
//        points.push(new THREE.Vector3(this.Object_Count/2,200,-100))
//        this.Scene.add(new THREE.LineSegments(geometry.setFromPoints(points),material))
//        points.push(new THREE.Vector3(-this.Object_Count/2,0,100))
//        points.push(new THREE.Vector3(this.Object_Count/2,0,-100))
//        this.Scene.add(new THREE.LineSegments(geometry.setFromPoints(points),material))

        const geometry = new THREE.BoxGeometry(100,1,100)
        const material = new THREE.LineBasicMaterial({color:new THREE.Color(0,1,0)})
        const cube = new THREE.Mesh(geometry,material)
        this.Scene.add(cube)

    }
}

export class light_Scenary extends Scenaries<THREE.Mesh>{
    constructor(scene:THREE.Scene,camera:THREE.Camera,count=1){
        super(scene,camera,count)
        this.Create_Objects()
    }
    protected Create_Objects(): void {
        const light = new THREE.DirectionalLight(0x404040,0)
        const helper = new THREE.DirectionalLightHelper(light,5)
        light.add(helper)
        var point_light = new THREE.PointLight(0xffffff, 1); 
        point_light.position.set(100, 100, 0); 
        this.Scene.add(light,point_light)
    }
}