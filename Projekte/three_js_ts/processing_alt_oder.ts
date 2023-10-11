import * as THREE from 'three'
import { randnum } from './global_functions'

/** # Audio Control
 *  - start, stop, pause
 *  - sound laden
 *  # Scene
 *  - Objekte erschaffen
 *  - Animations/Visualisierungsschleifen
 */
export class Audio_Processing{

    //Scene
    Scene:THREE.Scene
    Objects:THREE.Line[]
    //Audio
    Music:THREE.Audio
    Listener:THREE.AudioListener
    Music_Loader:THREE.AudioLoader
    Analyzer:THREE.AudioAnalyser
    Analyser_Data:any
    FFT_Size:number
    //helpers
    Threshold:number

    constructor(scene:THREE.Scene, listener:THREE.AudioListener, fft_size:number){
        //Scene
        this.Scene=scene            
        this.Objects=[]  
        //Audio
        this.Listener=listener
        this.FFT_Size=fft_size
        this.Music_Loader=new THREE.AudioLoader
        this.Music=new THREE.Audio(listener)                
        this.Analyzer = new THREE.AudioAnalyser(this.Music) //Analyser AIPI
        this.Analyser_Data = []     //Daten beinhalten FFT-Analyse
        //helpers
        this.Threshold=170
        //Initialisierung
        this.Create_Objects(3,5)       //init funktion
    }

    Create_Objects=(r_min:number,r_max:number)=>{
        const geometry = new THREE.BufferGeometry()
        const material = new THREE.LineBasicMaterial({color:0x27fd52})
        var x:number,y:number,z:number,teta:number,phi:number
        const points:THREE.Vector3[]=[];
        const leangth=0.5;

        //würfel für Visualisierung
        for (let i=0;i<100;i++){
            teta = randnum(2*Math.PI,-2*Math.PI)
            phi = randnum(2*Math.PI,-2*Math.PI)
            x=Math.sin(teta)*Math.sin(phi)
            y=Math.cos(teta)*Math.cos(phi)
            z=Math.sin(teta)*Math.cos(phi)
            //Start und endvektoren für Linie erstellen (random)
            points.push(new THREE.Vector3(x,y,z).normalize().multiplyScalar(r_min))
            points.push(new THREE.Vector3(x,y,z).normalize().multiplyScalar(r_max))
            //neue Linie als THREE Element zu Objects hinzufügen
            this.Objects.push(new THREE.LineSegments(geometry.setFromPoints(points),new THREE.LineBasicMaterial({color:0x27fd52})))
            //zur Szene hinzufügen
            this.Scene.add(this.Objects[i])
        }
        

        ////Hilfslinie
        //const points = []
        //points.push(new THREE.Vector3(600,this.Threshold,0));
        //points.push(new THREE.Vector3(-600,this.Threshold,0));
        //this.Scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:0x0000ff})))
    }
     
    Load_Music=(path:string,name?:string)=>{
        //Audio Laden
        //let thisSound = this.Music
        this.Music_Loader.load( path, ( buffer )=> {
            setTimeout(()=>{
                //    //filtern:...
                //const music_context=this.Music.context
                //const filter=music_context.createBiquadFilter()
                //filter.type='lowpass'
                //filter.frequency.setValueAtTime(200,music_context.currentTime+2000)
                //this.Music.setFilter(filter)
                //this.Music.setBuffer( buffer );
                
                this.Music.setLoop(true);
                this.Music.setVolume(1);
                this.Analyzer=new THREE.AudioAnalyser(this.Music,this.FFT_Size)
                this.Music.play()
            },0);


        });
        if(name == null){
            name=path
        }
        //Pfad/Name der Datei anzeigen
        const lb_path = document.getElementById("lb_path") as HTMLParagraphElement
        lb_path.textContent=name
    }
    
    Play_Music=()=>{
        this.Music.play()
    }

    Pause_Music=()=>{
        this.Music.pause()
    }
    
    Reset_Music=()=>{
        this.Music.stop()

        //zurücksetzten des Visualisierers
        for (let i=0;i<this.Objects.length;i++){
        //this.Objects[i].scale.y=0
        }
    }
    
    /** # Visualisierung steuern
     *  - idle (wenn keine Musik spielt)
     *  - Visualisierung (wenn Musik spielt)
     */
    Visualize=()=>{
        //TODO: ist Audio schon geladen??
        if(this.Music.isPlaying){
            //animation für visualisierung
            this.Animate_Visualisation(this.Music)
            
        }
        else
        {
            //leerlauf-Animation
            this.Animate_Idle()
        }
    }

    Animate_Visualisation=(sound:THREE.Audio)=>{

        this.Analyser_Data=this.Analyzer.getFrequencyData()
        //const cur_pos:THREE.Vector3 = new THREE.Vector3()
        
        for (let i=0;i<this.Objects.length;i++){
            //Animation für alle Objekte
            //this.Objects[i].position.multiplyScalar(0.1)                         
        }
        if(this.Analyser_Data[0]>this.Threshold){
            //Kick-Animation für Beat -> Bloom oder aufleuchten
            //in alle Richtungen weg fliegen
        }
    }

    Animate_Idle=()=>{

        for (let i=0;i<this.Objects.length;i++){
            //Animation für alle Objekte
            //if(!(this.Objects[i].scale.y<=0)){
            //    this.Objects[i].scale.y-=0.3
            //}
            //else{
            //    this.Objects[i].scale.y=0
            //}
        }

    }
}

