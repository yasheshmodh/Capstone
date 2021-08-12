var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bird, bird_flying;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  bird_flying =   loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png");

  
  groundImage = loadImage("Sky.jpg");
  
  cloudImage = loadImage("Fruit1.jpg");
  
  obstacle1 = loadAnimation(
  "Eagle/sprite_00.png",
  "Eagle/sprite_01.png",
  "Eagle/sprite_02.png",
  "Eagle/sprite_03.png",
  "Eagle/sprite_04.png",
  "Eagle/sprite_05.png",
  "Eagle/sprite_06.png",
  "Eagle/sprite_07.png",
  "Eagle/sprite_08.png",
  "Eagle/sprite_09.png",
  "Eagle/sprite_10.png",
  "Eagle/sprite_11.png",
  "Eagle/sprite_12.png",
  "Eagle/sprite_13.png",
  "Eagle/sprite_14.png",
  "Eagle/sprite_15.png",);
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 600);
  
 
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.y = ground.height /2;
  ground.velocityY= (6 + 3*score/100);
  bird = createSprite(50,180,20,50);
  
  bird.addAnimation("running", bird_flying);
 // bird.addAnimation("collided", trex_collided);
  bird.scale = 0.5;
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background(255);
  
  
  if (gameState===PLAY){
    ground.velocityY = -(6 + 3*score/100);
  
    if(keyDown("space")) {
      bird.velocityY = -12;
    }
    if(keyDown("left_arrow")) {
      bird.x = bird.x-2
    }
    if(keyDown("right_arrow")) {
      bird.x = bird.x +2
    }
    bird.velocityY = bird.velocityY + 0.8
  
    if (ground.y < 0){
      ground.y = ground.height/2;
    }
  if(cloudsGroup.isTouching(bird)){
    score = score+5;
    cloudsGroup.destroyEach()
  }
   
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(bird)){
        gameState = END;
        obstaclesGroup.destroyEach()
        bird.destroy()
        cloudsGroup.destroyEach()
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    //ground.velocityY = 0;
   // trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
  
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
  text("Score: "+ score, 400,50);
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(Math.round(random(100,500)),-10,40,10);
   
    cloud.addImage(cloudImage);
    cloud.scale = 0.2;
    cloud.velocityY = +3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = bird.depth;
    bird.depth = bird.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(Math.round(random(100,500)),-10,10,40);
    //obstacle.debug = true;
    obstacle.velocityY = +(6 + 3*score/100);
    
    //generate random obstacles
    obstacle.addAnimation("Eagle",obstacle1)
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
 
  
 
  
  score = 0;
  
}