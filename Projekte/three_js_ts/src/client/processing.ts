import * as THREE from 'three'

export class Audio_Processing{

    Scene:THREE.Scene
    Objects:THREE.Mesh[]
    Music:THREE.Audio
    Listener:THREE.AudioListener
    Music_Loader:THREE.AudioLoader
    Analyzer:THREE.AudioAnalyser
    Analyser_Data:any
    FFT_Size:number

    constructor(scene:THREE.Scene, listener:THREE.AudioListener, fft_size:number){
        this.Scene=scene            //für Objekte
        this.Listener=listener
        this.FFT_Size=fft_size
        this.Objects=[]  //3D Objekte
        this.Music_Loader=new THREE.AudioLoader
        this.Music=new THREE.Audio(listener)
        this.Create_Objects()       //init funktion
        this.Analyzer = new THREE.AudioAnalyser(this.Music)
        this.Analyser_Data = []
    }

    Create_Objects=()=>{
        
        for (let i=0;i<this.FFT_Size/2;i++){
            const geometry = new THREE.BoxGeometry(1,1,1,1,1,1)
            const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
            })
    
            this.Objects.push(new THREE.Mesh(geometry,material))
            this.Objects[i].position.x=-this.FFT_Size/4+i
            this.Scene.add(this.Objects[i])
        }

    }
     
    Load_Music=(path:string,name?:string)=>{
        //Audio Laden
        let thisSound = this.Music;
        this.Music_Loader.load( path, ( buffer )=> {
            setTimeout(()=>{
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
        const lb_path = document.getElementById("lb_path") as HTMLParagraphElement
        lb_path.textContent=name

        console.log(this.Analyzer.data)
    }
    
    Play_Music=()=>{
        this.Music.play()
    }

    Pause_Music=()=>{
        this.Music.pause()
    }
    
    Reset_Music=()=>{
        this.Listener.clear()
        this.Music.clear()
        this.Music.remove()
        this.Music.stop()
        this.Listener.remove()
        //TODO: zurücksetzten des Visualisierers
        for (let i=0;i<this.Objects.length;i++){
        this.Objects[i].position.y=0
        }
    }
    
    /**Visualisierung steuern
     * 
     */
    Visualize=()=>{
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
            this.Objects[i].position.y=this.Analyser_Data[i]/100
        }
        console.log(this.Analyser_Data)
    }

    Animate_Idle=()=>{

        for (let i=0;i<this.Objects.length;i++){
            if(!(this.Objects[i].position.y<=0)){
                this.Objects[i].position.y-=0.1
            }
            else{
                this.Objects[i].position.y=0
            }
        }

    }
}

