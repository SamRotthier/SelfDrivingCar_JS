const canvas=document.getElementById("myCanvas");

canvas.width=200;

const ctx= canvas.getContext("2d");
const road=new Road(canvas.width/2,canvas.width*0.9)
const car=new Car(100,100,30,50,"KEYS");
const traffic=[
    new Car(100,-100,30,50,"DUMMY",2)
];


animate();

function animate(){
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update([],[]);
    }
    car.update(road.borders,traffic);
    
    canvas.height=window.innerHeight;

    ctx.translate(0,-car.y+canvas.height*0.7);
    road.draw(ctx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx,"red");
    }
    car.draw(ctx,"blue");
    
    requestAnimationFrame(animate);
}
