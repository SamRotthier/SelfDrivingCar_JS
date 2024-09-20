function lerp(A,B,t){
    return A+(B-A)*t;
    //lerp is linear interpelation
    // bij t=0 zal waarde A zijn (door berekening zal de rest 0 zijn), 0%
    // bij t=1 zal waarde B zijn (door berekening cancelt A zichzelf uit), 100%
    // bij t= alles tussen 0 en 1 zullen er % waardes gevonden worden
}

function getIntersection(A,B,C,D){ 
    const tTop=(D.x-C.x)*(A.y-C.y)-(D.y-C.y)*(A.x-C.x);
    const uTop=(C.y-A.y)*(A.x-B.x)-(C.x-A.x)*(A.y-B.y);
    const bottom=(D.y-C.y)*(B.x-A.x)-(D.x-C.x)*(B.y-A.y);
    
    if(bottom!=0){
        const t=tTop/bottom;
        const u=uTop/bottom;
        if(t>=0 && t<=1 && u>=0 && u<=1){
            return {
                x:lerp(A.x,B.x,t),
                y:lerp(A.y,B.y,t),
                offset:t
            }
        }
    }

    return null;
}