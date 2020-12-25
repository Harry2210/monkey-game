
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jump=loadSound("jump.mp3")
 
}



function setup() {
  createCanvas(600,250)
  monkey= createSprite(100,150,10,10)
monkey.addAnimation("running",monkey_running);
  monkey.scale=0.09
  
  ground=createSprite(300,245,600,10)
  
  score=0
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
}


function draw() {
background("lightgreen");
  text("score : "+ score,500,20)
  
  if(keyDown("space")&& monkey.y > 210) {
        monkey.velocityY = -20;
  jump.play();
  }

  monkey.velocityY = monkey.velocityY + 1.2
  monkey.collide(ground)
  
  if (foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score=score+2}
  
  if (obstacleGroup.isTouching(monkey)){
    obstacleGroup.setLifetimeEach(-10);
    foodGroup.setLifetimeEach(-10);
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    monkey.velocityY=0
    text("gameover",300,100)
  
    
  }
  textSize=20
  
  spawnBanana();
  spawnObstacle();
  
  drawSprites();
}

function spawnBanana() {
  //write code here to spawn the obstacles
  if (frameCount % 70 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(70,120));
   banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -7;
    
     //assign lifetime to the variable
    banana.lifetime = 150;

  foodGroup.add(banana);
}}

function spawnObstacle() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    obstacle = createSprite(350,220,40,10);
    obstacle.x=random(650,1000)
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.setCollider("circle",0,0,70)
     //assign lifetime to the variable
    obstacle.lifetime = 500;
    

    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
}





