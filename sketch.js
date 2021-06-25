  var path, boy, cash, diamonds, jwellery, sword, m;
  var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg,       endImg;
  var treasureCollection = 0;
  var cashG, diamondsG, jwelleryG, swordGroup;

  //Game States
  var PLAY = 1;
  var END = 0;
  var gameState = 1;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(400, 600);
  // Moving background
  path = createSprite(200, 200);
  path.addImage(pathImg);
  path.velocityY = 4;

  //creating boy running
  boy = createSprite(70, 500, 20, 20);
  boy.addAnimation("SahilRunning", boyImg);
  boy.scale = 0.08;

  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();

  m = createSprite(200, 300);
  m.addImage(endImg);

  boy.setCollider("rectangle", 0, 0, 1200, 1300);
  //boy.debug = true;
}

function draw() {
  if (gameState === PLAY) {
    background(0);
    boy.x = World.mouseX;

    edges = createEdgeSprites();
    boy.collide(edges);

    //code to reset the background
    if (path.y > 400) {
      path.y = height / 2;
    }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    m.visible = false;
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    } else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection + 150;
    } else if (jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection + 250;
    } else if (swordGroup.isTouching(boy)) {
      gameState = END;
    }
  } else if (gameState === END) {
    boy.velocityY = 0;
    cashG.destroyEach();
    cashG.setVeloocityYEach = 0;
    diamondsG.destroyEach();
    diamondsG.setVeloocityYEach = 0;
    jwelleryG.destroyEach();
    jwelleryG.setVeloocityYEach = 0;
    swordGroup.destroyEach();
    swordGroup.setVeloocityYEach = 0;
    path.velocityY = 0;
    boy.visible = false;
    m.visible = true;
  }
  console.log(gameState);
  drawSprites();
  textSize(30);
  fill(0);
  text("Treasure: " + treasureCollection, 130, 30);
}

function createCash() {
  if (World.frameCount % 200 == 0) {
    var cash = createSprite(Math.round(random(50, 350), 40, 10, 10));
    cash.addImage(cashImg);
    cash.scale = 0.12;
    cash.velocityY = 3;
    cash.lifetime = 250;
    cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350), 40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale = 0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 250;
    diamondsG.add(diamonds);
  }
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350), 40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale = 0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 250;
    jwelleryG.add(jwellery);
  }
}

function createSword() {
  if (World.frameCount % 530 == 0) {
    var sword = createSprite(Math.round(random(50, 350), 40, 10, 10));
    sword.addImage(swordImg);
    sword.scale = 0.1;
    sword.velocityY = 3;
    sword.lifetime = 250;
    swordGroup.add(sword);
  }
}
