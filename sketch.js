var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var gameState="hungry";
var bedroom,garden,washroom;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
Bedroom=loadImage("Bed Room.png")
Garden=loadImage("Garden.png")
Washroom=loadImage("Wash Room.png")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

readState=database.ref('GameState');
readState.on("value",function(data) {
  gameState=data.val();
});



  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  if (gameState!="hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(sadDog)
  }

  currentTime=hour();
  if (currentTime==(lastFed+1)) {
    update("playing");
    foodObj.garden();
  }else if (currentTime==(lastFed+2)) {
    update("sleeping");
    foodObj.bedroom();
  } else if (currentTime>(lastFed+2) && currentTime<=(lastFed+4)) {
    update("bathing");
    foodObj.washroom();
  }else {
    update("hungry");
    foodObj.display();
  }
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(foodS){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//funtion to update the gamestate
function update(state) {
  database.ref('/').update({
    GameState:state
  });
}