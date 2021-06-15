var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score;

var obstacle,obstacle1,bostacle2,obstacle3,obstacleImage, obstacleGroup;

var coin,coinImage,coin0, coinGroup;

var player, playerImage, player0;

var cloud, cloudImage, cloud0, cloudGroup;

var restart,restartImage, restart0;

var coinSound, coin1;

var collidedSound, collided;

var edges;

function preload(){

  obstacleImage = loadAnimation("obstacle1.png","obstacle2.png","obstacle3.png");
  
  coinImage = loadImage("coin0.png");
  
  playerImage= loadAnimation("player0.png");
  
  cloudImage = loadImage("cloud0.png");
  
  restartImage = loadImage("restart0.png");
  
  coinSound = loadSound("coin1.wav");
  
  collided = loadSound("collided.wav");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 
 player = createSprite(width/2,height/1.3,20,20);
 player.addAnimation("airplane",playerImage);
 player.scale = 0.7; 

 player.setCollider("rectangle",0,0,320,250);
 //player.debug = true;
  
  restart = createSprite(width/2.014,height/2.2,20,20);
  restart.addImage(restartImage);
  restart.scale = 0.5
  restart.visible = false;

 obstacleGroup = new Group();
 coinGroup = new Group();
 cloudGroup = new Group();

  score = 0;
  
}

function draw() {
  
  background("cyan");
  
  if(gameState === PLAY){
     
    if(keyDown("right")){
     player.velocityX = 6;
     }
  
  if(keyDown("left")){
     player.velocityX = -(6 + 3*score/100);
     }
  
  edges = createEdgeSprites();
  
  player.bounceOff(edges);

  spawnobstacles();
  spawncoins();
  spawnclouds();
  
    if(coinGroup.isTouching(player)){
      
       coinGroup[0].destroy();
    
       score = score+1;
      
      coinSound.play();
      
         }
      
    
    if(obstacleGroup.isTouching(player)){
       
      gameState = END;
  
      collided.play();
      
    }  
  }
  
  if(gameState === END){
     
    player.velocityX = 0;
    player.velociyY = 0;
    
    player.destroy();
     
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityYEach(0);
      
    coinGroup.setVelocityXEach(0);
    coinGroup.setVelocityYEach(0);
      
    cloudGroup.setVelocityXEach(0);
    cloudGroup.setVelocityYEach(0);
  
    obstacleGroup.destroyEach();
    coinGroup.destroyEach();
    cloudGroup.destroyEach();
    
    restart.visible = true;
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
    
    strokeWeight(5);
    stroke(0);
    fill("yellow");
    textSize(30);
    text("Game Over",width/2.2,height/2.5);
    
     }
  
  strokeWeight(5);
  stroke(0);
  fill("yellow");
  textSize(30);
  text("Score:" + score, width/1.2,height/18);

  strokeWeight(5);
  stroke(0);
  fill("yellow");
  textSize(30);
  text("Press right and left arrow key", width/2.5,height/15);
  
  drawSprites();
 
}

function spawnobstacles(){
  
  if(frameCount%27 === 0){
     
    obstacle = createSprite(1000,-5,20,20);
    obstacle.addAnimation("falling",obstacleImage);
    obstacle.scale = 0.1;
    
    obstacle.x = Math.round(random(4,width/1.01));
    
    obstacle.velocityY = (8 + 3*score/100);
    
    obstacle.lifetime = 400;
    
    obstacleGroup.add(obstacle);

     }
}


function spawncoins(){
  
  if(frameCount%27 === 0){
     
   coin = createSprite(100,-5,20,20);
   coin.addImage(coinImage);
   coin.scale = 0.2;

   coin.x = Math.round(random(5,width/1.01));
    
   coin.velocityY = (8 + 3*score/100);
    
   coin.lifetime = 400;
  
   coinGroup.add(coin);

     }
}

function spawnclouds(){
  
  if(frameCount%50 === 0){
     
   cloud = createSprite(650,-5,20,20);
  cloud.addImage(cloudImage);
  cloud.scale = 1;
    
    cloud.x = Math.round(random(6,width/1.01));
    
    cloud.velocityY = (7 + 3*score/100);

    cloud.lifetime = 400;
    
    cloud.depth = player.depth;
    player.depth = player.depth + 1;
  
   cloudGroup.add(cloud);
    
     }
}

function reset(){
  gameState = PLAY;
  
 player = createSprite(width/2,height/1.3,20,20);
 player.addAnimation("airplane",playerImage);
 player.scale = 0.7;

 restart.visible = false;
  
  obstacleGroup.destroyEach();
  coinGroup.destroyEach();
  
  score = 0;
  
}