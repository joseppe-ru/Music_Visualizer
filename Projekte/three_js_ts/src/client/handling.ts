import * as THREE from 'three'
/**
 * Event-Handling
 *  - Buttons
 */

import { Audio_Processing } from './processing';

export class Event_Handler{

    Listener:THREE.AudioListener;
    Szene:THREE.Scene;

    Music_Control:Audio_Processing;

    constructor(scene:THREE.Scene, listener:THREE.AudioListener)
    {
        this.Listener = listener    //lsitener für three.sound
        this.Szene = scene            //scene für objekte
        this.Music_Control = new Audio_Processing(scene, listener,256)//ruft init dieser Klasse auf

        //play button handler initialisieren
        let bt_play= document.getElementById("bt_play")
        bt_play?.addEventListener("click",(e:Event)=>this.event_bt_play());
        //pause button handler initialisieren
        let bt_pause= document.getElementById("bt_pause")
        bt_pause?.addEventListener("click",(e:Event)=>this.event_bt_pause());
        //stop button handler initialisieren
        let bt_stop= document.getElementById("bt_stop")
        bt_stop?.addEventListener("click",(e:Event)=>this.event_bt_stop());
        //file button handler initialisieren
        let bt_file= document.getElementById("bt_file")
        bt_file?.addEventListener("click",(e:Event)=>this.event_bt_file());
        //file-input button handler initialisieren
        let bt_upload= document.getElementById("file_input")
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
        this.Music_Control.Play_Music()
    }

    event_bt_pause=()=>{
        //musik anhalten, visualisierung zurücksetzten
        console.log("Event Pause_Button")
        this.Music_Control.Pause_Music()
    }

    event_bt_stop=()=>{
        //reset, musik stopp und animation beenden
        console.log("Event Stop_Button")
        this.Music_Control.Reset_Music()
    }

    event_bt_file=()=>{
        this.Music_Control.Reset_Music()
        console.log("Event File_Button")
        this.Music_Control.Load_Music("./media/audio/audio.mp3","Bella_Ciao")
    }

    event_bt_upload=()=>{
        this.Music_Control.Reset_Music()
        //MP3-Datei hochladen / Pfad ermitteln
        let fileInput = document.getElementById("file_input") as HTMLInputElement;
        var mp3_file = "404_File_Not_Found"
        var name = null
        if(fileInput != null){
            if(fileInput.files !=null){
                var item = fileInput.files.item(0)
                console.log(item)
                if(item!= null){
                    mp3_file = URL.createObjectURL(item)
                    name=item.name
                }
            }
        }
        console.log(mp3_file)
        this.Music_Control.Load_Music(mp3_file)
    }

    Animate=()=>{
        this.Music_Control.Visualize()
    }

}