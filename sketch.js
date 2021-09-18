function setup() {
  a = createCanvas(windowWidth, windowHeight, WEBGL);
  noFill();
  // slider = createSlider(-PI, PI, 0, 0.01);
  // slider.position(0,475);
  // // slider.style('width', '500px');
  // slider.addClass("mySliders");
}

function draw() {
  background(200);
    //let rad = millis() / 1000;
  // Set rotation angles
  //let ct = cos(rad);
  //let st = sin(rad);
  rotateY(PI / 6);
  // let val = slider.value();
  let ct = cos(mouseX/180);
  let st = sin(mouseY/180);
    applyMatrix(  ct, 0.0,  ct,  0.0,
               0.0, 1.0, 0.0,  0.0,
               -st, 0.0,  st,  0.0,
               0.0, 0.0, 0.0,  1.0);
    //applyMatrix(  -ct, 0.0,  -st,  0.0,
     //          0.0, 1.0, 0.0,  0.0,
     //          st, 0.0,  -st,  0.0,
     //          0.0, 0.0, 0.0,  1.0);
  stroke(10);
  box(250);

  // Matrix for rotation around the Y axis
  
  applyMatrix(  ct, 0.0,  -ct,  0.0,
              0.0, 1.0, 0.0,  0.0,
              st, 0.0,  st,  0.0,
              0.0, 0.0, 0.0,  1.0);

  stroke(255);
  box(150);
}

function mouseClicked(){
  console.log(mouseX);
  
}
