import * as THREE from 'three'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
/**
 * Event-Handling
 *  - Buttons
 */

import { Object_Creator } from './Objects';

export class Event_Handler{
    AudioLoader:THREE.AudioLoader;
    Sound:THREE.Audio;
    Listener:THREE.AudioListener;
    Objects:Object_Creator;
    constructor(scene:THREE.Scene)
    {
        //Sound Umgebung initialisieren
        this.Listener = new THREE.AudioListener()
        this.AudioLoader = new THREE.AudioLoader()
        this.Sound = new THREE.Audio( this.Listener )

        //Visualisierungs-Objekte +  Funktionenen initialisieren 
        this.Objects=new Object_Creator(scene)

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

/** Button Handler funktionen
 *  - event_bt_play
 *  - event_bt_pause
 *  - event_bt_stop
 *  - event_bt_file
 *  - event_bt_upload
 * */

    event_bt_play=()=>{
        //musik und visualisierung starten
        console.log("Event Start_Button")
        this.Sound.play()

    }

    event_bt_pause=()=>{
        //musik anhalten, visualisierung zurücksetzten
        console.log("Event Pause_Button")
        this.Sound.pause()
    }

    event_bt_stop=()=>{
        //reset, musik stopp und animation beenden
        console.log("Event Stop_Button")
        this.Sound_Reset()
    }

    event_bt_file=()=>{
        this.Sound_Reset();

        console.log("Event File_Button")
        const audio_file = "./media/audio/audio.mp3"
        let thisSound = this.Sound;
        //Laden 
        this.AudioLoader.load( audio_file, function( buffer ) {
            thisSound.setBuffer( buffer );
            thisSound.setLoop(false);
            thisSound.setVolume(0.1);
        });
        //Pfad/Name der Datei anzeigen
        const lb_path = document.getElementById("lb_path") as HTMLParagraphElement
        lb_path.textContent=audio_file

    }

    event_bt_upload=()=>{
        this.Sound_Reset();

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

        let thisSound = this.Sound;
        this.AudioLoader.load( dat, function( buffer ) {
            thisSound.setBuffer( buffer );
            thisSound.setLoop(false);
            thisSound.setVolume(0.1);
        });

        //Pfad/Name der Datei anzeigen
        const lb_path = document.getElementById("lb_path") as HTMLParagraphElement
        lb_path.textContent=dat
    }

    Start_Sound=()=>{
        
    }
/**allgemeine Reset Funktion
 * 
 */
    Sound_Reset=()=>{
        this.Listener.clear()
        this.Sound.clear()
        this.Sound.remove()
        this.Sound.stop()
        this.Listener.remove()
        //TODO: zurücksetzten des Visualisierers
    }

/**Aufruf/Koordination der Visualisierung (idle und vollgas)
 * 
 */
    Visualize=()=>{
        if(this.Sound.isPlaying){
            //animation für visualisierung
            this.Objects.Animate_Visualisation(this.Sound)
        }
        else
        {
            //leerlauf-Animation
            this.Objects.Animate_Idle()
        }
    }
}