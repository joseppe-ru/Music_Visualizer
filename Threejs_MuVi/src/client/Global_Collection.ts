/**
 *  # Zufallsgenerator
 * @param max obere Grenze, oder 1
 * @param min untere Grenze, oder -1
 * @returns zufällige Zahl zwischen max und min
 */
export var randnum =(max=-1,min=1):number =>{
    return (Math.random() * (max - min) + min);
}

/**
 * Liste mit Visualisierungsmethoden 
 *  - zum durchiterieren
 *  - zum Unterscheiden nach Namen -> der Einfachkeit halber gegen Verwirrung
 */
export enum Enum_Visual_Method{
    Vis_Mitten = 0,//Kreis
    Vis_Bass = 1,//Kreis invers
    Vis_Höhen = 2,//Spirale
}