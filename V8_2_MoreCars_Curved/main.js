carCanvas.height=window.innerHeight;
carCanvas.width=200;
networkCanvas.height=window.innerHeight;
networkCanvas.width=300;

const carCtx= carCanvas.getContext("2d");
const networkCtx= networkCanvas.getContext("2d");
const road=new Road(carCanvas.width/2,carCanvas.width*0.9)
//const car=new Car(100,100,30,50,"AI"); //KEYS om zelf te rijden
const N=200;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"))
        if(i>0){
            NeuralNetwork.mutate(cars[i].brain,0.1) //deze waarde is om de veranderingsgraad te verhogen of verlagen
        }
    }
}

const traffic=[
    new Car(100,-100,30,50,"DUMMY",2)
];


animate();

//you can call these methods in the console "save()"
function save(){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[]
    for (let i = 0; i <= N; i++) {
        cars.push(new Car(100,100,30,50,"AI"))
    }
    return cars;
}

function animate(){
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update([],[]);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders,traffic);  
    }
    bestCar=cars.find(c=>c.y==Math.min(...cars.map(c=>c.y)));
    
    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);
    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue",true);

    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}
//Brain dat object course heeft verslagen: 
// {bestBrain: '{"levels":[{"inputs":[0.14271703849843664,0,0,0,0.…0659,0.24584377080635375,0.06839826037785403]]}]}', length: 1}
//"bestBrain": "{\"levels\":[{\"inputs\":[0.14271703849843664,0,0,0,0.…0659,0.24584377080635375,0.06839826037785403]]}]}"

