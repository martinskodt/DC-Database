let objarray = [];
let data;
let imgData;
let obj;
let n = 0; // nummer af objekt vi er nået til
let rightPadding = 20;

let xColor = "#2fbdff";
let yColor = "#ff742f";

let xArr = [];
let yArr = [];
let arr = [];
let xLine;
let yLine;
let cnv;
let tal = 10;
let objTitle;
let objDesc;

let startObj = {
  Objectname: "Please read me before starting",
  Madeby: "Who made the object",
  TargetAudience: "Who is the object made for?",
  Description: "Click once to input your coordinates. Be careful where you press because you cannot edit your rating after pressing. This box wil show the object you are Processing. At the End you wil recive a score. Click the button to start the experience ",
  Imagepath: "Start"
}


let punkt;

let xScale;
let yScale;
let xScaleValue;
let yScaleValue;
let points = [];

let nulP = [50, 720]; //x,y
let koorXSlut = 850;
let koorYSlut = 50;

function preload() {
data = loadJSON("img/03/migraneHTML/DOsheet2.json");

}

function setup() {
cnv = createCanvas(910,900);
cnv.position(280,900);
//let div = document.querySelector(".canvas");
//div.addChild(cnv);
  drawGrid();
obj = data[n];

cnv.mousePressed(press);
descBox(startObj);
}

function press(){

xScaleValue = map(mouseX, nulP[0],koorXSlut, 0,100, false)
xScaleValue = floor(xScaleValue);

yScaleValue = map(mouseY, nulP[1], 68, 0,100, false)
yScaleValue = floor(yScaleValue);
if(n < 27){
punkt = new ObjectPoint(mouseX,mouseY);
} else if (n == 27){
  end();
}

obj = data[n];

descBox(data[n]);
  }

function drawGrid(){
  background(90);
    textSize(13);
  // Koordinatsystem linjer

    //grid
          // vandrette streger
          for (var i = nulP[1]; i > koorYSlut; i = i - 13) {
           strokeWeight(1);
           stroke(205);
          line(nulP[0], i, koorXSlut, i);
         }
        //lodrette streger
        for (var i = nulP[0]; i <= koorXSlut; i = i + 13) {

         strokeWeight(1);
         stroke(205);
        line(i, nulP[1], i, koorYSlut);

      }
      // grid tal X-aksen
      for (var i = nulP[0]+74; i <= koorXSlut; i = i + 80) {
        fill(xColor);
        noStroke();
        text(tal, i, nulP[1]+25);
          tal = tal + 10;
      }
      tal = 10;
      // Y aksen
      for (var i = nulP[1]-65; i >= koorYSlut; i = i - 65) {
        fill(yColor);
        noStroke();
        textSize(14);
        text(tal, nulP[0]-28, i);
          tal = tal + 10;
strokeWeight(4);
stroke(xColor);
  xLine = line(nulP[0], nulP[1], koorXSlut, nulP[1]);
  triangle(koorXSlut,nulP[1]-5,koorXSlut,nulP[1]+5,koorXSlut+5,nulP[1])
stroke(yColor);
  yLine = line(nulP[0], nulP[1], nulP[0], koorYSlut);
  triangle(45, 50, 55, 50, 50, 45);

      }

  //tekst
noStroke();
  textAlign(LEFT);
  textSize(13);
  fill(xColor);
  text("Digital", koorXSlut + 15, nulP[1] + 3)
  text("Analog",3, nulP[1]-8, nulP[0], 50 );
  textAlign(CENTER);
  fill(yColor);
  text("Userhostile",nulP[0], nulP[1] + 25);
  text("Userfriendly",nulP[0], koorYSlut - 25);

  //Box
  fill(255);
  rect(130,760,600,130);

  }

function descBox(nextObj){
  this.nextObj = nextObj;
  fill(255);
  rect(100,760,700,130);
  fill(0);
  textSize(20);
  textAlign(LEFT);
let objTitle = text(nextObj.Objectname, 250,785);
  textSize(13);
let objDesc = text(nextObj.Description, 250,790,550,100);
imgData = loadImage("img/03/migraneHTML/assets/Imagefiles/"+ nextObj.Objectname +".jpg",function(){image(imgData,110,770,130,110)});


}

function ObjectPoint(x,y){
    this.x = x;
    this.y = y;

  if (x >= nulP[0] && x <= koorXSlut+5 && y <= nulP[1] && y >= koorYSlut) {
    strokeWeight(4);


  //kryds
    stroke(xColor);
    line(x-10,y,x+10,y);
    stroke(yColor);
    line(x,y-10,x,y+10);

    // tekst
    strokeWeight(40);
    stroke("White");
    line(x-35, y+32, x+35, y+32);
    noStroke();
    fill(0);
    textAlign(CENTER);
    text(obj.Objectname, x, y+25);
    //skrive Y værdi til konsol og begrænse til 0-100
      if (yScaleValue > 100) {
        yScaleValue = 100;
      } else if (yScaleValue < 0) {
        yScaleValue = 0;
      } else {
      }
    //skrive X værdi til konsol og begrænse til 0-100
      if (xScaleValue > 100) {
        xScaleValue = 100;
      } else if (xScaleValue < 0) {
        xScaleValue = 0;
      } else {
      }
    textSize(16);
    fill(yColor);
    text( "Y " + yScaleValue, x+20, y+42);
    fill(xColor);
    text( "X " + xScaleValue, x-20, y+42);

    n = n + 1;

    //Save Values to obj
  xArr.push(xScaleValue);
  yArr.push(yScaleValue);


  }


}
function myFunc(total, num) {
  return total + num;
}
function end(){

// udregn brugerens gennemsnit
let sumX = xArr.reduce(myFunc);
let sumY = yArr.reduce(myFunc);
let avgX = sumX / xArr.length;
let avgY = sumY / yArr.length;
let avgScore = (avgX + avgY) /2;

console.log("avgScore " + avgScore );
//udregn det samlet gennemsnit for json værdierne

let datasumX = 0;
let datasumY = 0;
let jsonsumX = 0;
let jsonsumY = 0;
let avgData;

for (let i = 0; i <= 27; i++) {
jsonsumX = data[i].AnalogeDigital.reduce(myFunc);
  datasumX = jsonsumX + datasumX;
jsonsumY = data[i].Userfriendlyness.reduce(myFunc);
    datasumY = jsonsumY + datasumY;
}
avgData = (datasumX / 2727) + (datasumY / 2727) / 2;

let finalScore = avgData - avgScore;
console.log(avgScore + " " + avgData + " " + finalScore);

  textSize(100);
  fill(xColor);
 text("You are DONE !!!", nulP[0]+10,150);
 textSize(50);
 fill(225);
 rect(130, 460,500,130);
 fill(yColor);
 text("Your final score is : " + finalScore, 130, 460,550,160);



}



 /*
 Liste af funktionaliteter der skal bygges
 - Introduktion af ideen og formålet med spillet (tekst)
 - Objekterne skal gøres til justerbare objekter i koordinatsystemet
- if statement så man ikke kan gentage punkt

*/
