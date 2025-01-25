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
//"bestBrain": "{"levels":[{"inputs":[0.12515242176702668,0,0,0,0.3069600692752298],"outputs":[0,1,0,0,0,0],"biases":[0.0018797952646436092,-0.04607880678725504,-0.009170903948322727,0.07013274082803503,0.19014230797320975,0.025864553475100444],"weights":[[0.26149185428726857,0.13256070710582965,-0.2221983622283808,-0.05945713640641698,0.3392437182181524,-0.22795932592683021],[0.1468943400726753,-0.2128659070950726,-0.1347629713893382,-0.04974775430795689,0.18164764416396262,-0.21996195582666644],[-0.07769723457780926,0.31330817196958366,-0.03570339624856146,-0.13107453714667353,-0.08360378040185422,-0.19179663670431768],[-0.0027136278144234763,0.05080334387941614,-0.16847641521128484,0.35702503681492603,0.09881200733029971,-0.0820601780840928],[-0.16547248901872716,-0.13741097624553797,0.06011212814292871,0.03809585496373108,-0.18528489344076046,-0.08002153516324777]]},{"inputs":[0,1,0,0,0,0],"outputs":[1,1,1,0],"biases":[-0.1753279377084084,-0.08439241703927108,0.14707345018081136,0.14082217992593168],"weights":[[-0.2269644746684194,-0.11952597757687518,-0.0871338844943093,-0.2689128074173891],[0.13398122919828562,-0.0015883204213389193,0.259475289639011,0.03814076455267429],[0.171408260516842,0.0037088409361580588,-0.25620563959683845,-0.09850270062326272],[-0.17571042591896371,0.07727513125043152,-0.1684130416945291,0.17499217311019413],[0.017363054762983405,-0.2737855645980385,0.4251733568763506,0.3148278159746749],[0.006169932892810551,0.24514908993868897,-0.07512055692141736,-0.3331163093315314]]}]}"

