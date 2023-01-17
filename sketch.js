var golem,golem_running_r,golem_running_l;
var background1,backgroundimg;
var invisGround;
var golemlife = 5;

var enemie,enemieimg;
var score;
var plform;

function preload() {
  enemieimg = loadImage("Images/enemie1.png");

  golem_running_r = loadAnimation("Images/GR1.png","Images/GR2.png","Images/GR3.png","Images/GR4.png","Images/GR5.png","Images/GR6.png","Images/GR7.png","Images/GR8.png","Images/GR9.png","Images/GR10.png","Images/GR11.png");
  golem_running_l = loadAnimation("Images/GL1.png","Images/GL2.png","Images/GL3.png","Images/GL4.png","Images/GL5.png","Images/GL6.png","Images/GL7.png","Images/GL8.png","Images/GL9.png","Images/GL10.png","Images/GL11.png");
  backgroundimg = loadImage("Images/dungeon_background.jpg");
}

function setup() {
  createCanvas(800,400);

  background1 = createSprite(400, 400, 800, 400);
  background1.addImage(backgroundimg);
  background1.x = background1.width/2;
  
  golem = createSprite(70,352);
  golem.addAnimation("running_right",golem_running_r);
  golem.addAnimation("running_left",golem_running_l);

  invisGround = createSprite (400,418,800,2);
  invisGround.visible = false

  enemiesGroup = new Group ();
  stoneGroup = new Group ();

  score=0;
}

function draw() {
  background(0);  
  drawSprites();
  background1.velocityX = -3;

  if (background1.x <0) {
   background1.x = background1.width/2;
  }

  golem.collide(invisGround);

  golem.velocityY = golem.velocityY + 0.9  ;

  if(keyDown("space")){
    golem.velocityY = -15;

  }

  if(keyDown("w")){
    createstone();
   }
  

  if(keyDown(LEFT_ARROW)){
    golem.x = golem.x - 1.5;
    golem.changeAnimation("running_left",golem_running_l);
  }

  if(keyDown(RIGHT_ARROW)){
    golem.x = golem.x + 1.5;
    golem.changeAnimation("running_right",golem_running_r);
  }

  if(enemiesGroup.isTouching(golem)){
    if(golemlife>0){
      golemlife--;
      enemiesGroup.destroyEach();
    }
    else if(golemlife == 0){
      background1.velocityX = 0;
      enemiesGroup.setVelocityXEach(0)
      //golem.changeAnimation("golemdeath");
      //background("black");
       textSize(60);
      textFont("Arial");
      textStyle(BOLD);
      textAlign(CENTER);
      fill("red");
      text('GAME OVER',300, 200);
    }
  }

  if(stoneGroup.isTouching(enemiesGroup)){
    score=score+1;
    stoneGroup.destroyEach();
    enemiesGroup.destroyEach();
   }

//winning code
   if(score>=10){
    background1.velocityX = 0;
      enemiesGroup.setVelocityXEach(0)
      //golem.changeAnimation("golemdeath");
      //background("black");
       textSize(60);
      textFont("Arial");
      textStyle(BOLD);
      textAlign(CENTER);
      fill("red");
      text('GAME WON',300, 200);
   }
   
  //drawplform();
  drawEnemie();
  

  fill("yellow");
  textSize(22); 
  text("GolemLife :"+golemlife,10,40);

  fill("blue");
  textSize(22); 
  text("Score :"+score,500,40);
}

function drawEnemie(){

  if(frameCount % 120 == 0){

  
  enemie = createSprite(800,360,50,30)
  enemie.addImage(enemieimg);
  enemie.velocityX=-5;

  enemie.scale = 0.5;
  enemie.lifeTime = 500;
  enemiesGroup.add(enemie);
}
}


function drawplform(){
  if(frameCount % 100==0) {

    plform = createSprite(50, 350,150,30);
    plform.shapeColor ="tan";
    plform.x = Math.round(random(50,350));
    plform.y = Math.round(random(200,350));
    plform.velocityX = -3;
    plform.depth = golem.depth;
    golem.depth = golem.depth+1;
    platformGroup.add(plform);
  }
}

function createstone() {
  stone=createSprite(golem.x,golem.y,5,20);
  stone.shapeColor="red";
  stone.velocityX=5;
  //stone.addImage();
  stoneGroup.add(stone);
  stone.depth=golem.depth;
  golem.depth+=1
  
}