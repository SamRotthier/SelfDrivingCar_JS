carCanvas.height=window.innerHeight;
carCanvas.width=200;
networkCanvas.height=window.innerHeight;
networkCanvas.width=300;

const carCtx= carCanvas.getContext("2d");
const networkCtx= networkCanvas.getContext("2d");
const road=new Road(carCanvas.width/2,carCanvas.width*0.9)
const car=new Car(100,100,30,50,"AI"); //KEYS om zelf te rijden
const traffic=[
    new Car(100,-100,30,50,"DUMMY",2)
];


animate();

function animate(){
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update([],[]);
    }
    car.update(road.borders,traffic);
    
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.translate(0,-car.y+carCanvas.height*0.7);
    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx,"red");
    }
    car.draw(carCtx,"blue");

    Visualizer.drawNetwork(networkCtx,car.brain);
    
    requestAnimationFrame(animate);
}
