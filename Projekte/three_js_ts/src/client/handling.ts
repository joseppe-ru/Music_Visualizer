import * as THREE from 'three'
/**
 * Event-Handling
 *  - Buttons
 */
export class Event_Handler{
    audioLoader:THREE.AudioLoader;
    sound:THREE.Audio;
    constructor(audioLoader:THREE.AudioLoader,sound:THREE.Audio)
    {
        this.audioLoader=audioLoader
        this.sound=sound

        let bt_play= document.getElementById("bt_play")
        bt_play?.addEventListener("click",(e:Event)=>this.event_bt_play());

        let bt_pause= document.getElementById("bt_pause")
        bt_pause?.addEventListener("click",(e:Event)=>this.event_bt_pause());

        let bt_stop= document.getElementById("bt_stop")
        bt_stop?.addEventListener("click",(e:Event)=>this.event_bt_stop());

        let bt_file= document.getElementById("bt_file")
        bt_file?.addEventListener("click",(e:Event)=>this.event_bt_file());
        
    }
    event_bt_play=()=>{
        //musik und visualisierung starten
        console.log("Event Start_Button")
        this.sound.play()

    }

    event_bt_pause=()=>{
        //musik anhalten, visualisierung zurücksetzten
        console.log("Event Pause_Button")
        this.sound.pause()
    }

    event_bt_stop=()=>{
        //reset, musik stopp und animation beenden
        console.log("Event Stop_Button")
        this.sound.stop()
    }

    event_bt_file=()=>{
        //TODO: Test mit fertigem Build
        console.log("Event File_Button")
        //überprüfen, ob audio datei verfügbar ist
        const audio_file = "./audio.mp3"
        let thisSound = this.sound;
        //Laden 
        this.audioLoader.load( audio_file, function( buffer ) {
            thisSound.setBuffer( buffer );
            thisSound.setLoop(false);
            thisSound.setVolume(0.1);
            
        });
        //Pfad/Name der Datei anzeigen
        const lb_path = document.getElementById("lb_path") as HTMLParagraphElement
        lb_path.textContent=audio_file
        this.sound.stop()
    }
}