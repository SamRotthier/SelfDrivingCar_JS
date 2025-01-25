class Road{
    constructor(x,width,laneCount=3){
        this.x=x;
        this.width=width;
        this.laneCount=laneCount;

        this.left=x-width/4;
        this.right=x+width/4;

        const infinity=1000000; //inifinity does weird things in javascript
        this.top=-infinity;
        this.bottom=infinity; //Y grows downwords

        const topLeft={x:this.left,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const topRight={x:this.right,y:this.top};
        const bottomRight={x:this.right,y:this.bottom};
        this.borders=[
            [topLeft], //More points can be added ,p1,p2
            [topRight]
        ];
        for(let y=-1000;y<0;y++){
            const x=Math.sin(y*0.01)*50;
            this.borders[0].push({x:x+this.left,y:y});
            this.borders[1].push({x:x+this.right,y:y});
        }
        this.borders[0].push(bottomLeft);
        this.borders[1].push(bottomRight);
    }

    getLaneCenter(laneIndex){
        const laneWidth=this.width/this.laneCount;
        return this.left+laneWidth/2+
        Math.min(laneIndex,this.laneCount-1)*laneWidth;//Om altijd de auto op de uiterste rijvak te zetten ookal valt het eruit
    }

    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";
        /*
        for(let i=1;i<=this.laneCount-1;i++){
            const x=lerp(
                this.left,
                this.right,
                i/this.laneCount //dit zal zorgen dat t max 1 kan zijn
            );
            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }
            */
        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            for(let i=1;i<border.length;i++){
                ctx.lineTo(border[i].x,border[i].y);
            }
            ctx.stroke();
        })
    }
}

