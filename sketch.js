
// const {tv} = require('./tvefect');
// import tv from './tvefect.js';

function setup() {
  a = createCanvas(windowWidth, windowHeight, WEBGL);
  noFill();



}

function draw() {
  let d = day();
  background(200);

  rotateY(PI / 6);

  let ct = cos(mouseX/180);
  let st = sin(mouseY/180);
    applyMatrix(  ct, 0.0,  ct,  0.0,
               0.0, 1.0, 0.0,  0.0,
               -st, 0.0,  st,  0.0,
               0.0, 0.0, 0.0,  1.0);

  stroke(10);
  box(250);

  
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
  
  let xs = Math.round(24-(Math.pow(Math.round(mouseX/(windowWidth/24))-12,2)/6));
  let xy = Math.round(24-(Math.pow(Math.round(mouseY/(windowHeight/24))-12,2)/6));
  
  if(xs==0){
    xs=2;
  }
  if(xy==0){
    xy=2;
  }
  sphere (50, xs, xy);
//   let xs = windowWidth/24;
//   let ys = windowHeight/24;
//   sphere(50, Math.round(24-(Math.pow(Math.round(mouseX/xs)-12,2)/6)) , Math.round(24-(Math.pow(Math.round(mouseY/ys)-12,2)/6)));
}


function once(fn, context) { 
  var result;
  return function() { 
      if (fn) {
          result = fn.apply(context || this, arguments);
          fn = null;
      }
      return result;
  };
}


function mousePressed(){


  var one_tv = once(window.tv);
  one_tv();

  let x = document.getElementById('tv');
  if(x.style.display === "none"){
    x.style.display = 'block';
  }


  

  // console.log(mouseX, mouseY);
  // console.log(windowWidth, windowHeight);
  
}

function mouseReleased(){
  console.log('a');

  document.getElementById('tv').style.display = 'none';
  // window.clearTv();
}