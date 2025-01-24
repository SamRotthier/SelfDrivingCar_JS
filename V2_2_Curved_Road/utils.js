function lerp(A,B,t){
    return A+(B-A)*t;
    //lerp is linear interpelation
    // bij t=0 zal waarde A zijn (door berekening zal de rest 0 zijn), 0%
    // bij t=1 zal waarde B zijn (door berekening cancelt A zichzelf uit), 100%
    // bij t= alles tussen 0 en 1 zullen er % waardes gevonden worden
}