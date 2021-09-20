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
  
  applyMatrix(  ct, 0.0,  -ct,  0.0,
              0.0, 1.0, 0.0,  0.0,
              st, 0.0,  st,  0.0,
              ct, 0.0, st,  1.0);
  stroke(100);
  
  let xs = windowWidth/24;
  let ys = windowHeight/24;
  sphere(50, Math.round(24-(Math.pow(Math.round(mouseX/xs)-12,2)/6)) , Math.round(24-(Math.pow(Math.round(mouseY/ys)-12,2)/6)));
}

function mouseClicked(){
  // console.log(mouseX, mouseY);
  console.log(windowWidth, windowHeight);
  
}
