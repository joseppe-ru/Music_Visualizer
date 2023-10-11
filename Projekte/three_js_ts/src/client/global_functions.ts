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

interface RandnumProps{
    (max:number, min:number):number;
}
export let randnum: RandnumProps =(max:number,min:number) =>{
    return (Math.random() * (max - min) + min);
}