import * as THREE from 'three'

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
    Objects:THREE.Mesh[]
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
        this.Create_Objects()       //init funktion
    }

    Create_Objects=()=>{
        
        //würfel für Visualisierung
        for (let i=0;i<this.FFT_Size/2;i++){
            const geometry = new THREE.BoxGeometry(1,1,1,1,1,1)
            const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            })
    
            this.Objects.push(new THREE.Mesh(geometry,material))
            this.Objects[i].position.x=-this.FFT_Size/4+i
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
                const music_context=this.Music.context
                const filter=music_context.createBiquadFilter()
                filter.type='lowpass'
                filter.frequency.setValueAtTime(200,music_context.currentTime+2000)

                this.Music.setBuffer( buffer );
                
                this.Music.setLoop(true);
                this.Music.setVolume(1);
                this.Analyzer=new THREE.AudioAnalyser(this.Music,this.FFT_Size)
                this.Music.play()
                //this.Music.setFilter(filter)
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
        //this.Listener.clear()
        //this.Music.clear()
        //this.Music.remove()
        //this.Music.stop()
        //this.Listener.remove()
        //TODO: zurücksetzten des Visualisierers
        for (let i=0;i<this.Objects.length;i++){
        this.Objects[i].scale.y=0
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
        
        for (let i=0;i<this.Objects.length;i++){
            //Animation für alle Objekte
            //this.Objects[i].position.y=this.Analyser_Data[i]
            //this.Objects[i].scale.length=this.Analyser_Data[i]
            this.Objects[i].scale.y=this.Analyser_Data[i]                        
        }
        if(this.Analyser_Data[0]>this.Threshold){
            //Kick-Animation für Beat -> Bloom oder aufleuchten
        }
    }

    Animate_Idle=()=>{

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
}

