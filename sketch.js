var robot, robotIMG
var start_button
var road, roadIMG
var nukeImg
var coinImg
var topWall, bottomWall
var coinGroup
var score
var nukeGroup
var blastImg;
var gameState;

function preload(){
    roadIMG = loadImage("road.png");
    robotIMG = loadImage("player_robot0.png")
    nukeImg = loadImage("NUKE.png")
    coinImg= loadImage("coin.png");
    blastImg=loadImage("200w.gif")
}

function setup() {
    createCanvas(1000, 300)
    road = createSprite(500,150)
    road.addImage(roadIMG);
    road.scale=4;
    robot = createSprite(100, 150)
    robot.addImage(robotIMG)
    robot.scale = 0.2
    topWall = createSprite(500, 0, 1000, 10)
    bottomWall = createSprite(500, 300, 1000, 10)
    coinGroup = createGroup()
    nukeGroup = createGroup()
    score = 0;
    gameState="play"
}

function draw() {
    
    background("black");

    drawSprites()

    if(gameState=="play"){
        road.velocityX= -5;

    if(road.x < 350){
        road.x = 500;
    }
    if(keyDown(DOWN_ARROW) && robot.y < 250){
        robot.y += 5;
    }
    if(keyDown(UP_ARROW) && robot.y >50){
        robot.y -= 5;
    }
    for(var i = 0; i < coinGroup.length; i++){
        if(coinGroup[i].isTouching(robot)){
            score++;
            coinGroup[i].destroy(); 
        }
    }
   
        if(nukeGroup.isTouching(robot)){
            gameState="end"
        }
        makingStuff();
        coinGroup.bounceOff(bottomWall);
        coinGroup.bounceOff(topWall);
        
    }

    if(gameState=="end"){
        image (blastImg,0, 0,1000,300)

        nukeGroup.setVelocityXEach(0)

        fill("white")
        textSize(50)
        stroke("red")
        strokeWeight(30)
        text("😈 😈 😈 😈 Y O U  D I E D 😈 😈 😈 😈", 10  ,150)
    }

    

    
   
    
    push()
    fill("white")
    textSize(20)
    stroke("blue")
    strokeWeight(5)
    text("SCORE : "+score, 30, 30);
    pop()
}

function makingStuff(){
    if(frameCount%60==0){
        var nuke=createSprite(1050,random(0, 300));
        nuke.addImage(nukeImg);
        nuke.velocityX=-30;
        nuke.scale = 0.6;
        nukeGroup.add(nuke)
    }
    if(frameCount % 100 == 0){
        var coin = createSprite(1050, random(50, 250));
        coin.addImage(coinImg);
        coin.velocityX= random(-10, -15);
        coin.scale=0.1;
        coin.velocityY = random(-4, 4);
        coinGroup.add(coin)
        
    }
    
    
}