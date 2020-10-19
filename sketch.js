//creating variables;
var dog,happyDog;
var dogImg;
var foodS,foodStock;
var database;

function preload()
{
  //loading images for dog and happy dog;
  dogImg = loadImage("dogImg.png");
  happyDog = loadImage("dogImg1.png");
}

function setup() {
  //creating canvas;
  createCanvas(500, 500);

  //assigning firebase database to variable database;
  database = firebase.database();

  //fetching food stock info from database;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  //creating dog sprite and adding image to it;
  dog = createSprite(250,250,5,5);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  
}


function draw() {  
  //painting thr background;
  background(46,139,87);

  //writing the code to feed the dog;
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
  foodStock = foodStock - 1;
}

  //drawing the sprites;
  drawSprites();

  //texting the food remaining message;
  textSize(20);
  fill("red");
  stroke("yellow");
  text("FOOD LEFT = "+foodS,175,150);

  //texting message to feed the dog;
  textSize(20);
  fill("red");
  stroke("yellow");
  text("PRESS THE 'UP ARROW' KEY TO FEED THE DOG !!!",5,50);

}

//creating function to read values in the database;
function readStock(data){
  foodS = data.val();
}

//creating function to write values in the database;
function writeStock(x){
  if(x <= 0){
    x = 0;
  }else{
    x = x - 1;
  }
  database.ref('/').update({
    Food:x
  })
}