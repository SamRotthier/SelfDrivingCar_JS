const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx= carCanvas.getContext("2d");
const networkCtx= networkCanvas.getContext("2d");
const road=new Road(carCanvas.width/2,carCanvas.width*0.9)
const N=100;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"))

        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1) //deze waarde is om de veranderingsgraad te verhogen of verlagen
        }
    }
}
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2),
];

animate();

function save(){
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[]
    for (let i = 0; i <= N; i++) {
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"))
    }
    return cars;

}

function animate(time){
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders,[]);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders,traffic);  
    }
    bestCar=cars.find(c=>c.y==Math.min(...cars.map(c=>c.y))); //math.min werkt met enkele waardes niet met arrays, daarom opgesplits met ...

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
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
    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}

//Best brain that completed the full course
//"bestBrain": "{\"levels\":[{\"inputs\":[0.09727827076215612,0,0,0.3161989216146014,0.6299295231020583],\"outputs\":[1,0,1,0,0,0],\"biases\":[-0.20651515450831195,-0.05059809989663976,-0.08742543886340184,-0.03632217597187105,0.22467776313388488,0.12430632491426077],\"weights\":[[-0.028749714610349544,-0.038152922873522455,0.056858054410665174,0.1326556342395252,-0.15108942258127375,-0.08734782687365807],[-0.01078493088792536,-0.05585529700951475,-0.1028338232360441,0.05676004822016308,0.14310274881350768,0.03985299681323907],[-0.0936928435462454,-0.5008008252273041,-0.016091140536628044,0.02309367914958012,-0.017209241403501677,0.019157583980790278],[-0.19391450253939685,-0.2911137728595695,-0.09020301852163143,-0.05298547383658241,0.29357655196788013,0.07514567138049856],[-0.20997149662829795,0.025439614371868334,0.1777427273137171,-0.20706871209022065,-0.3867050850073889,-0.275945977159149]]},{\"inputs\":[1,0,1,0,0,0],\"outputs\":[1,0,0,0],\"biases\":[-0.11021328960824069,0.021256659738507457,0.3613778279033416,-0.16350481757580748],\"weights\":[[0.28166314318854524,-0.45136558858691433,0.020778156114394195,-0.3388589977345315],[-0.16935375639009004,0.08261350248895434,-0.22569518229004462,-0.2091191174357436],[-0.14991641279112966,0.05042998480214702,0.30040229112046146,-0.2489053398828193],[0.24389279657449964,-0.020879859062680306,0.21467575833445662,-0.19557668455359967],[-0.27398974957138694,-0.2311360951242544,-0.3594268270894593,-0.15574329640394843],[0.0025056558950465463,-0.15419607927891776,0.04452806662955702,-0.16021570769390991]]}]}"
