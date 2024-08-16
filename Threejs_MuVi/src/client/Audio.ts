import * as THREE from 'three'
import { Scenaries } from './Scenaries'
import { Enum_Visual_Method } from './Global_Collection'

/** # Audio Control
 *  - start 
 *  - stop
 *  - pause
 *  - sound laden
 *  - Visualisierung steuern (nach stand der Musik) 
 *  - Audio FFT-Analyse
 */
export class Audio_Processing{

    //Audio
    Music:THREE.Audio
    Music_Loader:THREE.AudioLoader
    Analyzer:THREE.AudioAnalyser
    Analyser_Data:any
    FFT_Size:number
    //Szenario
    Szenarios:Scenaries<THREE.Object3D>[]
    Enum_Leangth:number

    constructor(listener:THREE.AudioListener, szenario:Scenaries<THREE.Object3D>[],fft_size:number){
        //Audio
        this.FFT_Size=fft_size
        this.Music_Loader=new THREE.AudioLoader
        this.Music=new THREE.Audio(listener)                
        this.Analyzer = new THREE.AudioAnalyser(this.Music) //Analyser AIPI
        this.Analyser_Data = []     //Daten beinhalten FFT-Analyse

        //Objekte / Szenario
        this.Szenarios=szenario
        this.Enum_Leangth=Object.keys(Enum_Visual_Method).length
    }
     
    Load_Music(path:string,name?:string){
        this.Reset_Music()
        //Audio Laden
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
        const lb_path = document.getElementById("lb_perf") as HTMLParagraphElement
        lb_path.textContent=name
    }
    
    Play_Music(){
        this.Music.play()
    }

    Pause_Music(){
        this.Music.pause()
    }
    
    Reset_Music(){
        this.Music.stop()

        for(let i=0;i<this.Szenarios.length;i++){
            this.Szenarios[i].Animate_Reset()
        }
    }

    Toggle_Music(){
        if(this.Music.isPlaying){
            this.Music.pause()
        }
        else{
            this.Music.play()
        }
    }

    get_log_FFT=(): Uint8Array => {

        var fft_data = this.Analyzer.getFrequencyData()
        const härte = 0.035 //Skalierungsfktor für Anstieg der kurve
        const f_max = 20000   //Maximale frequenz (frequenzspanne / Bandbreite)
        var s:number = f_max/this.FFT_Size // Schrittgröße (nrmales linieares Array)


        var npv = (f_max / Math.log(f_max * härte + 1)) //Null Punkt Verschiebung
        var offset = 1 + f_max * härte

        var logData = new Uint8Array(this.FFT_Size);
 

        for (let i_log=0;i_log<this.FFT_Size;i_log++){

// 1.) i_log -> f ; doppelt inverse Logarithmische Funktion berechnen
            const log_fn = -Math.log(-i_log * härte + offset);
            const f = log_fn * npv + f_max;

// 2.) f -> i ; Startindex für linerae Interpolation berechnen
            const i = Math.floor(f*s);

// 3.) FFT[i] -> v_log (lineare interpolation von v auf ein beliebiges f mit vorherausgerechnetem Index, wi f bei fft_data dazwischenliegt)
            const v_log = fft_data[i] + ( (fft_data[i+1]-fft_data[i]) / ((i+1) *s) - (i*s) ) * f - i*s;

// 4.) Speichern
            logData[i_log] = Math.max(0, Math.min(255, Math.floor(v_log)));
        }
        // console.log(logData);
        return logData
    }

    /** # Visualisierung steuern
     *  - idle (wenn keine Musik spielt)
     *  - Visualisierung (wenn Musik spielt)
     */
    Visualize(){

        //TODO: ist Audio schon geladen??
        if(this.Music.isPlaying){

            //FFT-Analyse 
            // var data = this.Analyzer.getFrequencyData()
            var data = this.get_log_FFT();
            var freq = this.Analyzer.getAverageFrequency()
            //Darstellung der analysierten Daten
            for(let i=0;i<this.Szenarios.length;i++){
                this.Szenarios[i].Animate_Visualisation(data,freq)
            }
        }
        else
        {
            //leerlauf-Animation
            for(let i=0;i<this.Szenarios.length;i++){
                this.Szenarios[i].Animate_Idle()
            }
        }
    }
}

/**
 * Visualisierung wird erweitert
 * 
 * 1.) Logarithmische Interpolation:
 *        - (aus fft_array[1024] ein log_fft_array[1024] mit hoher Auflösung im Bassbereich)
 * 2.) Frequenzbereiche Bestimmen (Indizes) für Subbass, Bass, Mitten, Höhen...
 */

//function logScaleFFT(): number[] {
//    const logData = [];
//    var fft = Analyzer.getFrequencyData()
//
//
//    for (let i = 0; i < size; i++) {
//        const logIndex = minFreq * Math.pow(maxFreq / minFreq, i / (size - 1));
//        const value = interpolate(logIndex, data);
//        logData.push(value);
//    }
//    return logData;
//}
