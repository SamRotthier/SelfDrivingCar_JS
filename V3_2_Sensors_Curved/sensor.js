class Sensor{
    constructor(){
        this.rayCount=50;
        this.rayLenght=200;
        this.raySpread=Math.PI/2;

        this.rays=[];
        this.readings=[];
    }

    update(x,y,angle,roadBorders){
        this.#castRays(x,y,angle);

        this.readings=[];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(this.#getReading(this.rays[i],roadBorders)) 
        }
    }

    #getReading(ray,roadBorders){
        let touches=[]
        roadBorders.forEach(border=>{
            for(let i=1; i<border.length;i++){
                const touch=getIntersection(
                    ray[0],
                    ray[1],
                    border[i-1],
                    border[i]
                );
                if (touch){
                    touches.push(touch);
                }
            }
        })

        if(touches.length==0){
            return null;
        }else{
            const offsets=touches.map(e=>e.offset)
            const minOffset=Math.min(...offsets);
            return touches.find(e=>e.offset==minOffset);
        }
    }

    #castRays(x,y,angle){
        this.rays=[];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(this.raySpread/2,-this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1))+angle;
            const start={x:x,y:y};
            const end={x:x-Math.sin(rayAngle)*this.rayLenght,
                y:y-Math.cos(rayAngle)*this.rayLenght};
            this.rays.push([start,end]);
        }
    }

    draw(ctx){
        for (let i = 0; i < this.rayCount; i++) {
            let end=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i];
            }

            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="Yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            )
            ctx.stroke();
        }
    }

}
