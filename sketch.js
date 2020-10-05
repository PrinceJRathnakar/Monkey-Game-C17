var PLAY = 1;
var END = 0;
var gameState = PLAY;


var ground,  groundImage;


var mon,monImg;
var obstacles,banana,obstacleGroup,bananaGroup;
var obstacleImg,bananaImg;

var survivalTime=0;




function preload(){
  bananaImg=loadImage("banana.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  obstacleImg=loadImage("obstacle.png");
}

function setup() {
  createCanvas(400, 400);
  
  mon=createSprite(100,340,20,50);
  mon.addAnimation("mon",monkey_running);
  mon.scale=0.1;
  ground = createSprite(400,350,800,10);

  ground.x = ground.width /2;
  ground.velocityX = -4;
  
 
  

  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  console.log("Hello" + 5);
  
  score = 0;
}

function draw() {
  background(180);
  stroke("black");
    textSize(20);
    fill("black");
  text("survivalTime:"+survivalTime,100,50);
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    
    survivalTime=Math.ceil(frameCount/frameRate());
    
    //spawn the clouds
  spawnbanana();
  
  //spawn obstacles on the ground
  spawnObstacles();
    if(keyDown("space")&& mon.y >= 300) {
    mon.velocityY = -13;
  }
    
  
  mon.velocityY = mon.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    if(obstacleGroup.isTouching(mon)){
       
      gameState=END;
      }
    if(bananaGroup.isTouching(mon)){
       bananaGroup.destroyEach();
      survivalTime=survivalTime+1;
      }
  }
  else if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
     bananaGroup.setLifetimeEach(-1);
  }
  
  

  mon.collide(ground);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(400,320,10,40);
 
   obstacle.addImage(obstacleImg);
   
   obstacle.velocityX = -6;
   
   
    // //generate random obstacles
    obstacle.x = Math.round(random(200,400));
     
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.13;
    obstacle.lifetime = 300;
   
   //adjust the depth
   obstacle.debug=true;
   obstacle.setCollider("circle",0,0,40);
   //adding obstacles to the group
   obstacleGroup.add(obstacle);
 }
}




function spawnbanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     banana = createSprite(400,265,40,10);
    banana.addImage(bananaImg);
    
    
    
    banana.velocityX = -3;
    
     //assign lifetime to the variable
     banana.scale = 0.1;
    banana.lifetime = 134;
    
    //adjust the depth
    banana.depth = mon.depth;
    mon.depth = mon.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(banana);
  }
  
}