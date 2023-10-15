//TODO: nicht bnutzte Funktionen wieder entfernen

export const visibleHeightAtZDepth = ( depth:number, camera:any ) => {
    // compensate for cameras not positioned at z=0
    const cameraOffset = camera.position.z;
    if ( depth < cameraOffset ) depth -= cameraOffset;
    else depth += cameraOffset;
  
    // vertical fov in radians
    const vFOV = camera.fov * Math.PI / 180; 
  
    // Math.abs to ensure the result is always positive
    return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
};
  
export const visibleWidthAtZDepth = ( depth:number, camera:any ) => {
    const height = visibleHeightAtZDepth( depth, camera );
    return height * camera.aspect;
};

export const getPeaks=(data:[],threshold:number)=>{
    var peaksArray = [];
    for(var i = 0; i < data.length;) {
      if (data[i] > threshold) {
        peaksArray.push(i);
        // Skip forward ~ 1/4s to get past this peak.
        i += 10000;
      }
      i++;
    }
    return peaksArray;
};

interface randProps{
  (max?:number,min?:number):number
}
export var randnum:randProps =(max=-1,min=1):number =>{
    return (Math.random() * (max - min) + min);
}

export enum Enum_Visual_Method{
    Muster0_std_kreis = 0,
    Muster1_invers_kreis,
    Muster2_raute,
    Muster3_sun_like,
    Muster4_spirale,
    Muster5_star1,
    Muster6_star2,
    Muster7_std_auge,
    Muster8_schmal_auge,
    Muster9_blatt,
    Muster10_saphire,
    Muster11_spahire_fixed,
    Muster12_reinverse_kreis,
    Muster13,
    Muster14
}