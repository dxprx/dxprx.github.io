
// const {tv} = require('./tvefect');
// import tv from './tvefect.js';

var w = window.innerWidth;
var h = window.innerHeight;  
var inputReleased = false;

/*------------------------------------------------------------------------------------------------------------------*/
// Funciones del P5JS para crear el canvas principal de las figuras

function setup() {
  a = createCanvas(w, h, WEBGL);
  noFill();

  //Botones.js setup
  let button = createButton('Nuevo URL');
  button.position(0, 0);
  button.id('newUrlButton');

  inp = createInput('');
  inp.position(0, 0);
  inp.id('nameNewUrl');
  displayInput();
  inp.input(keyTyped);

  const misBotonesGuardados = getItem('botonesCreados');

  if (misBotonesGuardados !== null) {
      misBotonesGuardados.forEach(miBotonGuardado => {
          const btnElement = createButton(miBotonGuardado.text);
          btnElement.class(miBotonGuardado.className);
          btnElement.id(miBotonGuardado.id);
          btnElement.position();
      });
  }
  button.mousePressed(displayButton);
}

function draw() {

  
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

}

/*------------------------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------------------*/
// Funciones de botones.js
function displayButton() {
  inputReleased = true;
  displayInput();
  document.getElementById('newUrlButton').style.display = 'none';

  // console.log(inputReleased);
}


function displayInput() {

  if (inputReleased === false) {
      document.getElementById('nameNewUrl').style.display = 'none';
  } else if (inputReleased === true) {

      document.getElementById('nameNewUrl').style.display = 'block';
      
      
  }
  // console.log(inputReleased);

}

function keyTyped() {
  // console.log({
  //     keyCode,
  //     // enter: ENTER,
  //     inputReleased
  // });
  // console.log('you are typing: ', inp.value());
  if (keyCode === 13 && inputReleased === true) {

      const misBotonesGuardados = getItem('botonesCreados');

      newURL = createButton(inp.value());
      newURL.position();
      newURL.class('botonUrl');
      newURL.id(misBotonesGuardados === null ? 1 : misBotonesGuardados.length + 1);

      console.log(newURL);

      const toSave = {
          id: newURL.id(),
          className: newURL.class(),
          text: newURL.html()
      }

      console.log(toSave);


      if (misBotonesGuardados === null) {
          storeItem('botonesCreados', [toSave]);
      } else {
          storeItem('botonesCreados', [...misBotonesGuardados, toSave]);
      }



      inputReleased = false;

      document.getElementById('nameNewUrl').style.display = 'none';

      document.getElementById('newUrlButton').style.display = '';

      inp.value('');

      // console.log(inputReleased);

  }
}

/*------------------------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------------------*/
//  Fecha 

function startTime(){

  var dt = new Date();
  
  // let d = dt.getDate();
  // let mo = dt.getMonth();
  // let y = dt.getFullYear();
  
  // let ho = dt.getHours();
  let m = dt.getMinutes();
  let s = dt.getSeconds();
  // let ms = dt.getMilliseconds();
  
  m = checkTime(m);
  s = checkTime(s);
  setTimeout(startTime, 1000);
  
  var options = { 
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, 
    hour12: false,
    weekday: 'long',
    year: 'numeric', 
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    miliisecond:'numeric'
  };
  
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }

  document.getElementById("fecha").innerHTML = dt.toLocaleString('en-US', options);
      
}

startTime();


/*------------------------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------------------*/
//  Eventos de raton

function mousePressed(){
  window.tv();

  // console.log(mouseX, mouseY);
  // console.log(windowWidth, windowHeight);
  
}

function mouseReleased(){
  document.getElementById('tv').style.display = 'none';
  // window.clearTv();
}

/*------------------------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------------------*/
//  Reescalado de los canvas

window.onresize = function() {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;  
  a.size(w,h);
}

/*------------------------------------------------------------------------------------------------------------------*/

