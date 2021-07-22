// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.
/* global createCanvas, background, colorMode, HSB, random, width, height, image, noFill, rect,textSize, textFont, LEFT_ARROW, RIGHT_ARROW, keyCode, frameCount,
   ellipse, text, fill, noStroke, wasteGroup, plasticGroup, glassGroup, paperGroup, loadSound, loadImage, score, waste, paper, glass, loadFont, plastic*/

let items, trash, waste, paper, glass, plastic, myFont, mySound, trash1, trash2, trash3, trash4, trash5, trash6, trash7, trash8, trash9, trash10, trash11, 
    trash12, trash13, clock, font, allItems, currentItem, bg;
let time = 60;
var gameIsOver;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  score = 0;
  gameIsOver = false;
  
  trash1 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2Fbananna%20peel.png?v=1595861442723');
  trash2 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2Fcrumpled-up-ball-paper-4.png?v=1595864426634');
  trash3 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2Fbrokenglass.png?v=1595865804348');
  trash4 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2Fplastic%20bag.png?v=1595865929950');
  trash5 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2Fcardboard.png?v=1595865964846');
  trash6 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2Frottentomato.png?v=1595866010565');
  trash7 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2Ftissue-paper-box-png-transparent-tissue-paper-boxpng-images-tissue-box-png-424_365.png?v=1595981259665');
  trash8 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2Fplastic%20spoon.png?v=1595981255983');
  trash9 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2F8e54c6cec901754428ff616f5e44b660.png?v=1595981733897');
  trash10 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2F1051-CLR.png?v=1595982060703');
  trash11 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2FEgg-Carton.png?v=1595982063138');
  trash12 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2FEgg-Split-In-Halfe.png?v=1595982197907');
  trash13 = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2Fchickenbones.png?v=1595982202814');
  clock = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2FAlarm%20Clock%20Silhouette-292432.png?v=1596075498984');
  font = loadFont('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2Fluckiestguy%5B1%5D.ttf?v=1596119897924');
 
  //arrays for recycable cateogories
  items = [];
  waste = [trash1, trash6, trash12, trash13];
  paper = [trash2, trash5, trash7, trash11];
  glass = [trash3, trash10];
  plastic = [trash4, trash8, trash9];
  wasteGroup = random(waste); 
  paperGroup = random(paper); 
  glassGroup = random(glass); 
  plasticGroup = random(plastic); 
  allItems = [wasteGroup, paperGroup, glassGroup, plasticGroup];
  currentItem = random(allItems);
  
   for (let i=0; i<1; i++){
    items.push(new (RainDrop));
  }
  
  bg = loadImage('https://cdn.glitch.com/0307c938-4d95-44d6-afe8-480e2d23aa9c%2Frecycling%20game%20bg.PNG?v=1595860588905');
  
}

function draw() {
  background(bg);
  fill(0);
  textSize(12);
  textFont(font);
  text('Rules: organize the trash items into the correct bins before \ntime runs out!', 100, 20);
  text('Press the left and right arrows to move the trash left or right \nand the down arrow to go straight down!', 100, 60);
  text('Score: ' + score, 10, 20);
  text('Waste', 290, 475);
  text('Plastic', 200, 475);
  text('Glass', 380, 475);
  text('Paper', 115, 475);
  timer();
  
  noStroke();
  noFill();
  rect(93, 340, 80, 115)
  rect(260, 340, 80, 115)
  rect(175, 340, 80, 115)
  rect(350, 340, 80, 115)
  
  for (let i = 0; i < 1; i++){    
    items[i].correctBin();
    items[i].move();
    items[i].show();
    items[i].keyPressed();
  }
}
  
//inside this we'll have a constructor, a place where we can put certain parameters and sets up our object
class RainDrop{
  constructor(x, y, wid, hei, fallSpeed){
  this.x = 5; 
  this.y = 5; 
  this.wid = 50; 
  this.hei = 50; 
  this.fallSpeed = 1.5; 
  }
  
  show(){ 
    
    image(currentItem, this.x, this.y, this.wid, this.hei);

  }
  
  move() {
    this.y += this.fallSpeed; 
  // If it goes off the screen...
   if (this.y > height) {
    //reset it
    this.y = 0;
    //and move it somewhere random.
    this.x = random(width);
    this.wid = 50;
    this.hei = 50;
  wasteGroup = random(waste); 
  paperGroup = random(paper); 
  glassGroup = random(glass); 
  plasticGroup = random(plastic); 
  allItems = [wasteGroup, paperGroup, glassGroup, plasticGroup];
  currentItem = random(allItems);
   }
  }
  
  keyPressed(){
   if(keyCode === LEFT_ARROW){
    this.x -= 2;
  } else if(keyCode === RIGHT_ARROW){
    this.x += 2;
   }
 }
  
  correctBin(){
    if (this.x>93 && this.x<150 && this.y>340 && this.y<370 && currentItem === paperGroup){
      score++;
      this.y = height + 1;
    }
    if (this.x>175 && this.x<240 && this.y>340 && this.y<370 && currentItem === plasticGroup){
      score++;
      this.y = height + 1;
    }
    if (this.x>260 && this.x<340 && this.y>340 && this.y<370 && currentItem === wasteGroup){
      score++;
      this.y = height + 1;
    }
    if (this.x>350 && this.x<430 && this.y>340 && this.y<370 && currentItem === glassGroup){
      score++;
      this.y = height + 1;
    }
  }
}

function timer(){
  image(clock, 23, 420, 52, 68);
  textSize(25);
  fill(255);
  text(time, 34, 470);
  
  if (frameCount % 60 == 0 && time > 0) { 
    time --;
  }
  if (time === 0) {
    text("GAME OVER", 200, 250);
  }
       
}
//next steps: add music, add playagain function, add more items




