
// const {tv} = require('./tvefect');
// import tv from './tvefect.js';

var w = window.innerWidth;
var h = window.innerHeight;  
var inputReleasedName = false;
var inputReleasedUrl = false;
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

/*------------------------------------------------------------------------------------------------------------------*/
// Funciones del P5JS para crear el canvas principal de las figuras

function setup() {
  a = createCanvas(w-70, h-70, WEBGL);
  noFill();
  a.id('canvas-poligonos');
  
  //Botones.js setup
  let button = createButton('New shortcut');
  // button.position(window.width-button.width,window.height-button.height);
  button.id('newUrlButton');
  // console.log(window.width - (2 * button.width), window.height - (2 * button.height));

  inputName = createInput('');
  inputUrl = createInput('');

  // inp.position(window.width-inp.width,window.height-inp.height);
  // console.log(window.width - inp.width, window.height - inp.height);

  inputName.id('nameNewUrl');
  inputUrl.id('urlNewUrl');

  document.getElementById('nameNewUrl').autocomplete = 'off';
  document.getElementById('urlNewUrl').autocomplete = 'off';

  document.getElementById('urlNewUrl').type = 'url';

  displayInput();
  inputName.input(keyTyped);
  inputName.input(keyPressed);
  inputUrl.input(keyTyped);
  inputUrl.input(keyPressed);

  const misBotonesGuardados = getItem('botonesCreados');

  if (misBotonesGuardados !== null) {
      misBotonesGuardados.forEach(miBotonGuardado => {
          const btnElement = createButton(miBotonGuardado.text);
          btnElement.class(miBotonGuardado.className);
          btnElement.id(miBotonGuardado.id);
          btnElement.position();
          document.getElementById(miBotonGuardado.id).setAttribute('onclick', `window.open("${miBotonGuardado.url}");`);
          document.getElementById('flex-container').appendChild(btnElement.elt);
      });
  }
  button.mousePressed(displayButton);


  document.getElementById('container').appendChild(document.getElementById('canvas-poligonos'));
  document.getElementById('container').appendChild(document.getElementById('flex-container'));
  // console.log(inputReleased);
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
  inputReleasedName = true;
  displayInput();
  document.getElementById('newUrlButton').style.display = 'none';

  // console.log(inputReleased);
}


function displayInput() {

  if (inputReleasedName === false && inputReleasedUrl === false) {
      inputName.value('');
      inputUrl.value('');
      document.getElementById('nameNewUrl').style.display = 'none';
      document.getElementById('urlNewUrl').style.display = 'none';
      document.getElementById('newUrlButton').style.display = '';
  } else if (inputReleasedName === true && inputReleasedUrl === false) {
      inputName.value('');
      document.getElementById('nameNewUrl').style.display = 'block';
      document.getElementById('nameNewUrl').placeholder = "name";
      document.getElementById('urlNewUrl').style.display = 'none';

  } else if (inputReleasedName === false && inputReleasedUrl === true) {
      // inputName.value('');
      inputUrl.value('');
      document.getElementById('nameNewUrl').style.display = 'none';
      document.getElementById('newUrlButton').style.display = 'none';
      document.getElementById('urlNewUrl').style.display = 'block';

      document.getElementById('urlNewUrl').placeholder = "url";
  }
  // console.log(inputReleased);

}

function keyPressed() {
  if (keyCode === ESCAPE_KEY && inputReleasedName === true) {
      inputReleasedName = false;
      inputReleasedUrl = false;
      displayInput();
  } else if (keyCode === ESCAPE_KEY && inputReleasedUrl === true) {
      inputReleasedName = false;
      inputReleasedUrl = false;
      displayInput();

  }

}
function keyTyped() {
  //  console.log({
  //      keyCode,
  //     // enter: ENTER,
  //     inputReleased
  //  });
  // console.log('you are typing: ', inp.value());



  if (keyCode === ENTER_KEY && inputReleasedName === true) {

      inputReleasedName = false;
      inputReleasedUrl = true;
      displayInput();
      // console.log(inputReleased);

  } else if (keyCode === ENTER_KEY && inputReleasedUrl === true) {

      const misBotonesGuardados = getItem('botonesCreados');

      let newURL = createButton(inputName.value());
      newURL.position();
      newURL.class('botonUrl');
      newURL.id(misBotonesGuardados === null ? 1 : misBotonesGuardados.length + 1);

      const httpwww = 'http://www.';
      const http = 'http://';
      const www = 'www.';
      let inputUrlValue;

      //Chequea que en el inputUrl hayas escrito el http://www o el http://
      if (inputUrl.value().includes(httpwww)) {
          document.getElementById(newURL.id()).setAttribute('onclick', `window.open("${inputUrl.value()}");`);
          inputUrlValue = inputUrl.value();
      } else if (inputUrl.value().includes(www) && !inputUrl.value().includes(http)) {
          document.getElementById(newURL.id()).setAttribute('onclick', `window.open("${http.concat(inputUrl.value())}");`);
          inputUrlValue = http.concat(inputUrl.value());
      } else if (!inputUrl.value().includes(www) && !inputUrl.value().includes(http)) {
          document.getElementById(newURL.id()).setAttribute('onclick', `window.open("${httpwww.concat(inputUrl.value())}");`);
          inputUrlValue = httpwww.concat(inputUrl.value());
      }

      const toSave = {
          id: newURL.id(),
          className: newURL.class(),
          url: inputUrlValue,
          text: newURL.html(),

      }
      storeItem('botonesCreados', [toSave])
      if (misBotonesGuardados === null) {
          storeItem('botonesCreados', [toSave]);
      } else {
          storeItem('botonesCreados', [...misBotonesGuardados, toSave]);
      }

      inputReleasedName = false;
      inputReleasedUrl = false;
      displayInput();


      document.getElementById('flex-container').appendChild(newURL.elt);
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
//  Eventos de raton  // Efecto TV

// function mousePressed(){
//   window.tv();

//   // console.log(mouseX, mouseY);
//   // console.log(windowWidth, windowHeight);
  
// }

// function mouseReleased(){
//   document.getElementById('tv').style.display = 'none';
//   // window.clearTv();
// }

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

