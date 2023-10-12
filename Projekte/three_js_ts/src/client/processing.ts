import * as THREE from 'three'
import { Scenaries, Cube_Scenary, Sphere_Senary } from './Scenaries';
/** # Audio Control
 *  - start, stop, pause
 *  - sound laden
 *  # Scene
 *  - Objekte erschaffen
 *  - Animations/Visualisierungsschleifen
 * @note Das Szenario wird im Contruktor ausgewählt (Object_Scenary)
 */
export class Audio_Processing{

    Object_Scenary:Scenaries<THREE.Object3D>
    //Audio
    Music:THREE.Audio
    Music_Loader:THREE.AudioLoader
    Analyzer:THREE.AudioAnalyser
    Analyser_Data:any
    FFT_Size:number

    constructor(scene:THREE.Scene, listener:THREE.AudioListener, fft_size:number){
        //Audio
        this.FFT_Size=fft_size
        this.Music_Loader=new THREE.AudioLoader
        this.Music=new THREE.Audio(listener)                
        this.Analyzer = new THREE.AudioAnalyser(this.Music) //Analyser AIPI
        this.Analyser_Data = []     //Daten beinhalten FFT-Analyse

        //Initialisierung der Objekte
        this.Object_Scenary=new Cube_Scenary(scene,this.FFT_Size)
        //this.Object_Scenary=new Sphere_Senary(scene,100,5,100)
    }
     
    Load_Music=(path:string,name?:string)=>{
        this.Reset_Music()
        //Audio Laden
        this.Music_Loader.load( path, ( buffer )=> {
            setTimeout(()=>{
                //const music_context=this.Music.context
                //const filter=music_context.createBiquadFilter()
                //filter.type='lowpass'
                //filter.frequency.setValueAtTime(200,music_context.currentTime+2000)
                ////this.Music.setFilter(filter)
                this.Music.setBuffer( buffer );
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
        const lb_path = document.getElementById("lb_perf") as HTMLParagraphElement
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
        //this.Listener.clear()
        //this.Music.clear()
        //this.Music.remove()
        //this.Listener.remove()

        this.Object_Scenary.Animate_Reset()
    }
    
    /** # Visualisierung steuern
     *  - idle (wenn keine Musik spielt)
     *  - Visualisierung (wenn Musik spielt)
     */
    Visualize=()=>{
        //TODO: ist Audio schon geladen??
        if(this.Music.isPlaying){

            //FFT-Analyse 
            this.Analyser_Data=this.Analyzer.getFrequencyData()
        
            //Darstellung der analysierten Daten
            this.Object_Scenary.Animate_Visualisation(this.Analyser_Data)
            
        }
        else
        {
            //leerlauf-Animation
            this.Object_Scenary.Animate_Idle()
        }
    }

}

