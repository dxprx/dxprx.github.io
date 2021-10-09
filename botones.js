
var inputReleasedName = false;
var inputReleasedUrl = false;
const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

function setup() {

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
            document.getElementById(miBotonGuardado.id).setAttribute('onclick', `window.location.href="${miBotonGuardado.url}";`);
            document.getElementById('flex-container').appendChild(btnElement.elt);
        });
    }
    button.mousePressed(displayButton);

    // console.log(inputReleased);
}

function draw() {
    background(220);
}

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
            document.getElementById(newURL.id()).setAttribute('onclick', `window.location.href="${inputUrl.value()}";`);
            inputUrlValue = inputUrl.value();
        } else if (inputUrl.value().includes(www) && !inputUrl.value().includes(http)) {
            document.getElementById(newURL.id()).setAttribute('onclick', `window.location.href="${http.concat(inputUrl.value())}";`);
            inputUrlValue = http.concat(inputUrl.value());
        } else if (!inputUrl.value().includes(www) && !inputUrl.value().includes(http)) {
            document.getElementById(newURL.id()).setAttribute('onclick', `window.location.href="${httpwww.concat(inputUrl.value())}";`);
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



/*

TO DO

- Quitar predicciones en el input
- Poner autofocus al input al clicar boton New URL



*/
