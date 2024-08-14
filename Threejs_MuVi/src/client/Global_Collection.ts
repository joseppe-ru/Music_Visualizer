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
    Muster2_raute=3,
    Muster3_sun_like=4,
    Muster4_spirale=5,
    Muster5_star1=6,
    Muster6_star2,
    Muster7_std_auge,
    Muster8_schmal_auge,
    Muster9_blatt,
    Muster10_saphire,
    Muster11_spahire_fixed,
    Muster12_reinverse_kreis
}