var dog, foodS, foodStock, happyDog, database;

var foodObj;
var feedButton, addButton;
var fedTime, lastFed;
var gameState, readState;

var bedroom,garden,washroom;

function preload(){ 
  dog= loadImage("dogImg.png")
  happyDog= loadImage("dogImg1.png")
  sadDog= loadImage("Lazy.png")
  bedroom= loadImage("Living Room.png")
  garden= loadImage("Garden.png")
  washroom= loadImage("Wash Room.png")
}

function getState(){
  var gameStateRef  = database.ref('gameState');
  gameStateRef.on("value",function(data){
     gameState = data.val();
  })

}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

function setup() {
  createCanvas(1000, 900)
  
  dog1= createSprite(400,500,50,50)
  dog1.addImage(dog)
  database= firebase.database()

  foodObj= new Food()

  feedButton= createButton("Feed The Hungry Dog")
  feedButton.position(800,70)
  feedButton.mousePressed(feedDog)

  addFood= createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}

function getStock(data){
  foodS= data.val()
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
   
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog1.addImage(happyDog)
  console.log(hour())
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodObj.foodStock++;
  database.ref("/").update({
    Food:foodObj.foodStock
  })
}



function draw() {  
  background(46, 139, 87)

  drawSprites();
  
  fill("black")
  textSize(20)
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 +"PM",350,30)
  }
  else if(lastFed==0){
    text("Last Feed : 12 PM",350,30)
  }
  else{
    text("Last Feed : "+ lastFed%12 +"PM",350,30)
  }
  //text("Press UP ARROW to feed the dog !", 200,50)
  //text("No. of Bottles:"+ foodS, 650,100)

  foodObj.display()
  fedTime= database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed= data.val()
  })

  // if(gameState!=="hungry"){
  //   feedButton.hide()
  //   addFood.hide()
  //   //dog.remove()
  // } else{
  //   feedButton.show()
  //   addFood.show()
  //   dog.addImage(sadDog)
  // }

  currentTime=hour()
  if(currentTime==(lastFed+1)){
    update("Playing")
    foodObj.garden()
  }else if(currentTime==(lastFed+2)){
    update("Sleeping")
    foodObj.bedroom()
  } else if (currentTime>(lastFed+2)&& current<=(lastFed+4)){
    update("Bathing")
    foodObj.washroom()
  } else{
    update("Hungry")
    foodObj.display();
  }
}



