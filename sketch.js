const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var ground, slingshot, stand;
var backgroundImg;

function preload() {
  getBackgroundImage()
}

function setup() {
  var canvas = createCanvas(800, 400);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(400, 350, 800, 20);
  stand = new Ground(150, 100, 350, 20);

  box1 = new Box(290, 305, 70, 70);
  box2 = new Box(360, 305, 70, 70);
  box3 = new Box(430, 305, 70, 70);
  box4 = new Box(500, 305, 70, 70);
  box5 = new Box(570, 305, 70, 70);

  box6 = new Box(360, 270, 70, 70);
  box7 = new Box(430, 270, 70, 70);
  box8 = new Box(500, 270, 70, 70);

  box9 = new Box(430, 235, 70, 70);

  polygon = Bodies.circle(100, 100, 50);
  World.add(world, polygon);

  //imageMode(CENTER);
  //image(polygon_img,polygon.position.x,polygon.position.y,40,40);

  slingshot = new Slingshot(this.polygon, { x: 100, y: 100 });
}

function draw() {
  //background(255, 255, 255);

  if(backgroundImg){
    background(backgroundImg);
  }

  Engine.update(engine);

  ground.display();
  box1.display();
  box2.display();
  box3.display();
  box4.display();
  box5.display();
  box6.display();
  box7.display();
  box8.display();
  box9.display();
  stand.display();
  slingshot.display();

  circle(polygon.position.x, polygon.position.y, 50)

}

function mouseDragged() {
  Matter.Body.setPosition(this.polygon, { x: mouseX, y: mouseY });
}


function mouseReleased() {
  slingshot.fly();
}

function keyPressed() {
  if (keyCode === 32) {
    slingshot.attach(polygon.body);
  }

}

async function getBackgroundImage() {
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11, 13);
  //console.log(hour);
  if (hour >= 06 && hour <= 18) {
    bg = "images/bg.png";
  } else {
    bg = "images/bg2.jpg";
  }
  backgroundImg = loadImage(bg);
  console.log(backgroundImg);
}
