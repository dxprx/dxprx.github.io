function botones() {
    var inputReleased = false;

    function setup() {

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
        
        // console.log(inputReleased);
    }

    function draw() {
        background(220);
    }

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
    

    // return {
    //     setup,
    // }
}


/*

TO DO

- Quitar predicciones en el input 
- Poner autofocus al input al clicar boton New URL



*/