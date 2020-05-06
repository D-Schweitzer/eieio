let images1 = new Array();
let images2 = new Array();
let holes = new Array();
let img1, img2, hammer1, hammer2, hammer3, bang,eieio;
let cadetCnt = 0, delta = 1;
let cadetRow, cadetCol;
let drawCadet = false, cadet1=true;
let score = 0,numEIs = 0;
let gameStarted = false;
let hammerCnt = 0;
let startBtn, endButton;
let gotHit = false;
let bangCnt=0;

function preload() {
  img1=loadImage('smallcadet1.png');
  img2= loadImage('smallcadet2.png');
  hammer1 = loadImage('hammer1.png');
  hammer2 = loadImage('hammer2.png');
  hammer3 = loadImage('hammer3.png');
  bang = loadImage('bang.png');
  eieio = loadImage('eieio.png');
}
function setup() {
  createCanvas(750, 800);
  for (let i=0; i<20; i++) {
    let imgA = createImage(84, (i+1)*5);
    imgA.copy(img1, 0, 0, 84, (i+1)*5, 0, 0, 84, (i+1)*5);
    images1.push(imgA);
    let imgB = createImage(84, (i+1)*5);
    imgB.copy(img2, 0, 0, 84, (i+1)*5, 0, 0, 84, (i+1)*5);
    images2.push(imgB);
  }
  startBtn = createButton('START GAME');
  startBtn.position(300, 750);
  startBtn.size(200, 50);
  startBtn.mousePressed(startPressed);
  endBtn = createButton('END GAME');
  endBtn.position(300, 750);
  endBtn.size(200, 50);
  endBtn.mousePressed(endPressed);
  endBtn.hide();
}
function startPressed() {
  if (!gameStarted) {
    gameStarted = true;
    cadetRow = floor(random(4));
    cadetCol = floor(random(4));
    cadetCnt = 0;
    score = 0;
    numEIs = 0;
    startBtn.hide();
    endBtn.show();
  }
}
function endPressed() {
  if (gameStarted) {
    gameStarted = false;
    startBtn.show();
    endBtn.hide();
  }
}

function draw() {
  background(100, 255, 100);
  image(eieio,0,0);
  fill(0);
  stroke(0);
  for (let row=0; row<4; row++) {
    for (let col=0; col<4; col++) {
      ellipse(100+50*(row%2)+col*150, 200+row*150, 100, 20);
    }
  }
  textSize(30);
  text('SCORE: '+score, 550, 770);
  text('NUMBER EIs: '+numEIs,40,770);
  if (gameStarted) {
    if (gotHit) {
      image(bang, 65+50*(cadetRow%2)+cadetCol*150, 140+cadetRow*150);
      bangCnt++;
      if(bangCnt > 5){
      cadetRow = floor(random(4));
      cadetCol = floor(random(4));
      cadet1 = random(2)<1;
      cadetCnt = 0;
      delta = 1;
      score += 10;
      gotHit = false;
      numEIs = numEIs+1;
      }
    } else {

      if (cadet1) {
        image(images1[floor(cadetCnt/2)], 75+50*(cadetRow%2)+cadetCol*150, 200+cadetRow*150-cadetCnt/2*5);
      } else {
        image(images2[floor(cadetCnt/2)], 75+50*(cadetRow%2)+cadetCol*150, 200+cadetRow*150-cadetCnt/2*5);
      }
      cadetCnt += delta;
      if (cadetCnt/2  > 18) {
        delta = -1;
      }
      if (cadetCnt < 0) {
        cadetRow = floor(random(4));
        cadetCol = floor(random(4));
        cadet1 = random(2)<1;
        cadetCnt = 0;
        delta = 1;
        numEIs = numEIs+1;
      }

      if (hammerCnt == 0) {
        image(hammer1, mouseX-75, mouseY-75);
      } 
      if (hammerCnt == 1) {
        image(hammer2, mouseX-75, mouseY-75);
        hammerCnt = 2;
      } else {
        if (hammerCnt == 2) {
          image(hammer3, mouseX-75, mouseY-75);
          hammerCnt = 3;
        } else {
          if (hammerCnt == 3) {
            image(hammer2, mouseX-75, mouseY-75);
            hammerCnt = 0;
          }
        }
      }
    }
  }
}

function mousePressed() {
  if (gameStarted) {
    hammerCnt = 1;
    //check if hit cadet
    print(''+mouseX+', '+mouseY+"  "+(75+50*(cadetRow%2)+cadetCol*150)+', '+(125+50*(cadetRow%2)+cadetCol*150));
    if (mouseX-75 >= 75+50*(cadetRow%2)+cadetCol*150 && mouseX-75 <= 125+50*(cadetRow%2)+cadetCol*150) {
      gotHit = true;
      bangCnt = 0;
    }
  }
}
