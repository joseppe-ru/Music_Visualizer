Das ist die letzten Version unseres Musikvisualisierungsprogrammes.

Das Projekt umfasst 2 Ordner:
  1. /MuVi_build_27_10_2023/  	-> der fertige build, nur zum ausführen
  2. Threejs_MuVi		-> Quellcode, zum auswerten des Quellcodes

#----------
zu 1.: fertiger build
#----------
Alle Javascript und Typescript Quelldateien inclusive der Three.js Bibliotheken wurden zu bundel.js mittels node.js compiliert/transcripiert/zusammengefasst.
 
Für die volle Erfahrung bitte mit Liveserver ausführen!

# Ordner in CMD/Powershell mit Liveserver ausführen:
    1. Win + R
    2. "cmd" + Enter  
    3. "cd [Pfad]/[des]/[Ordners]/"
    4. "start http-server"
    5. "http://localhost:8080" im Webbrowser aufrufen (letzter getesteter: Firefox 119.0 (64-Bit)) 

# Troubleshooting:
    - kein Liveserver installiert?
      -> Node.js (JavaScript runtime environment) installieren (download auf website: nodejs.org) (letzte getestete Version: v18.16.0)
      -> installation überprüfen -> cmd: "node --version" 
      -> http server installieren: "npm install --global http-server"
      -> starten wie oben beschrieben


#---------------
zu 2.: Quellcode
#---------------
Alle wichtigen/eigensverfassten Dateien des Projektes sind zu finden unter:
	 # HTML:
	Threejs_MuVi/dist/client/index.html
 	Threejs_MuVi/dist/client/style_sheet.css
 	 # sonstiges (SVG-Graphiken, Audiodateien)
	Threejs_MuVi/dist/client/media/
	 # Typescript
	Threejs_MuVi/src/client/Audio.ts
	Threejs_MuVi/src/client/Event_Handling.ts
	Threejs_MuVi/src/client/Scenaries.ts
	Threejs_MuVi/src/client/Scene.ts
	Threejs_MuVi/src/client/Global_Collection.ts

# Ausführung_mit_Node.js:
    1. Win + R
    2. "cmd" + Enter  
    3. "cd [Pfad]/[des]/[Ordners]/Threejs_MuVi"
    4. "npm run dev"
    5. "http://localhost:8080" im Webbrowser aufrufen (letzter getesteter: Firefox 119.0 (64-Bit)) 
    (6.) einen Build erstellen "npm run build" -> dist/client = build Ordner (einfach kopieren oder Liveserver drin starten siehe 1.)

# Troubleshooting:
    1. kein Liveserver installiert?
         -> Node.js (JavaScript runtime environment) installieren (download auf website: nodejs.org) (letzte getestete Version: v18.16.0)
         -> installation überprüfen -> cmd: "node --version" 
         -> http server installieren: "npm install --global http-server"
         -> starten wie unter "#Ausführung_mit_Node.js:" beschrieben
    
    2. Module nicht erkannt -> nachinstallieren
	 -Die Module der three.js Bibliothek wurden mit dem Paketmanager von Node.js (npm) installiert
         -vor diesem Schritt bitte "#Troubleshooting: 1.kein Liveserver installiert?" ausführen!
         -> in Powershell oder CMD in Ordner navigieren
  	 -> "npm install three @types/three webpack-cli webpack-dev-server webpack-merge ts-loader typescript postprocessing"
         -> bei weiterm fehler aufgrund fehlender Modulen, auf Fehlermeldung achten und ggf. selbst nachinstallieren

-> Fehler bei mobilen Apple-Geräten: Ton kann nicht abgespielt werden, der Rest funktioniert

