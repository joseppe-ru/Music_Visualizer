import { Audio_Processing } from './processing';

/** # Event-Handling
 *  - Button-event-handlers
 *  - Verweise auf eigene Audio-Control Klasse für start,stop,...
 *  - Dateien Pfade ermitteln
 */
export class Event_Handler{
    Visualizer:Audio_Processing
    constructor(visualizer:Audio_Processing)
    {

        this.Visualizer=visualizer

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
        //Tastaturevent
        addEventListener("keydown",(e:KeyboardEvent)=>this.event_keypress(e),false);
        //Resize (drehen vom handy/Bowserfenster verschieben/Element untersuchen....)
        addEventListener("resize",(e:Event)=>this.event_resize(e),false)
    }

/** Button Handler funktionen
 *  - event_bt_play
 *  - event_bt_pause
 *  - event_bt_stop
 *  - event_bt_file
 *  - event_bt_upload
 * */

    private event_bt_play(){
        //musik und visualisierung starten
        console.log("Event Start_Button")
        this.Visualizer.Play_Music()
    }

    private event_bt_pause(){
        //musik anhalten, visualisierung zurücksetzten
        console.log("Event Pause_Button")
        this.Visualizer.Pause_Music()
    }

    private event_bt_stop(){
        //reset, musik stopp und animation beenden
        R2D2 ausraster scream Soundeffect
        https://youtu.be/8qokt65f20o
        console.log("Event Stop_Button")
        this.Visualizer.Reset_Music()
    }

    private event_bt_file(){
        //this.Visualizer.Reset_Music()
        console.log("Event File_Button")
        this.Visualizer.Load_Music("./media/audio/ncs_audio.mp3","Maazel - To Be Loved")
    }

    private event_bt_upload(){
        //this.Visualizer.Reset_Music()
        //MP3-Datei hochladen / Pfad ermitteln
        let fileInput = document.getElementById("file_input") as HTMLInputElement;
        var mp3_file = "404_File_Not_Found"
        var name = "null"
        if(fileInput != null){
            if(fileInput.files !=null){
                var item = fileInput.files.item(0)
                console.log(item)
                if(item!= null){
                    mp3_file = URL.createObjectURL(item)
                    name=fileInput.files[0].name
                }
            }
        }
        console.log(mp3_file)
        this.Visualizer.Load_Music(mp3_file,name)
    }

    private event_keypress(e:KeyboardEvent){
        console.log(e)
        if(e.code=="Space"){
            this.Visualizer.Toggle_Music()
        }
        else if(e.code.substring(0,5)=="Digit"){
            console.log(+e.key)
            //this.Visualizer.Toggle_Scene(+e.key)
        }
        else if(e.code.substring(0,3)=="Key"){
            console.log(+e.key)
            //this.Visualizer.Toggle_Scene(+e.key)
        }
        else if(e.code=="ArrowUp"||e.code=="ArrowRight"){
            this.Visualizer.Toggle_Scene(+1)
        }
        else if(e.code=="ArrowDown"||e.code=="ArrowLeft"){
            this.Visualizer.Toggle_Scene(-1)
        }
    }

    private event_resize(e:Event){
        //location.reload()
        console.log(e)
    }
} 