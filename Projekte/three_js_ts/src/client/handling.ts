import * as THREE from 'three'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
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

        let bt_upload= document.getElementById("file-input")
        bt_upload?.addEventListener("change",(e:Event)=>this.event_bt_upload(),false);
        
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
        //TODO: überprüfen, ob audio datei verfügbar ist
        const audio_file = "./media/audio/audio.mp3"
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

    event_bt_upload=()=>{
        //MP3-Datei hochladen 
        let fileInput = document.getElementById("file-input") as HTMLInputElement;
        var dat = "-"
        if(fileInput != null){
            if(fileInput.files !=null){
                var item = fileInput.files.item(0)
                console.log(item)
                if(item!= null){
                    dat = URL.createObjectURL(item)
                }
            }
        }

        let thisSound = this.sound;
        this.audioLoader.load( dat, function( buffer ) {
            thisSound.setBuffer( buffer );
            thisSound.setLoop(false);
            thisSound.setVolume(0.1);
        });

        //Pfad/Name der Datei anzeigen
        const lb_path = document.getElementById("lb_path") as HTMLParagraphElement
        lb_path.textContent=dat
        this.sound.stop()
    }
}