//'use strict';

//Class Sign Up

class Signup {
    
    constructor () {
        this.emailInput = document.querySelector("#email");
        this.passwordInput = document.querySelector("#password");
        this.repeatPassInput = document.querySelector("#repeatpass");
        this.buttonInput = document.querySelector("#signup-button");
        this.messageWrapper = document.querySelector(".message-container");
    }

    // Methods to manage the fields on the screen.

    handleEmailInput = (event) => {
        const email = event.target.value; // The event has a method target that has the value entered on the webpage.
        
        validator.validateValidEmail(email);

        const errorsObj = validator.getErrors();

        if (!errorsObj.invalidEmailError) {
            validator.validateUniqueEmail(email);
        }

        this.setErrorMessages();

        // Checks the button that activates if there are no errors.

        this.checkButton();
    }
    // Takes the event from the listener.
    handlePasswordInput = (event) => {
        const password = event.target.value;
        const repeatedPassword = this.repeatPassInput.value;

        validator.validatePassword(password);
        validator.validatePassRepeat(password, repeatedPassword);

        this.setErrorMessages();

        this.checkButton();

    }

    handleRepPassInput = (event) => {
        const repeatedPass = event.target.value;
        const password = this.passwordInput.value;

        validator.validatePassword(password);
        validator.validatePassRepeat(password, repeatedPass);
        
        this.setErrorMessages();

        this.checkButton();
    }

    // Picks up all the values entered on the web page to keep it.
    saveData = (event) => {
        // Avoids that the page be uploaded again (as would happen by default).
        event.preventDefault();

        const email = this.emailInput.value;
        const password = this.passwordInput.value;

        const newUser = new User(email, password);

        // We keep the user on the localStorage.
        db.saveNewUser(newUser);

        // Empty the form
        this.emailInput.value = "";
        this.passwordInput.value = "";

        this.showSuccessMessage();
        this.removeMessages();

        // Prepare validator for next check and deactive the button again.
        validator.resetValidator();
        this.buttonInput.disabled = true;
    }

    // Methods to listen what's going on on the fields and button. 
    // When something goes on the inputs the methods will be called.

    addListeners = () => {
        this.emailInput.addEventListener("input", this.handleEmailInput);
        this.passwordInput.addEventListener("input", this.handlePasswordInput);
        this.repeatPassInput.addEventListener("input", this.handleRepPassInput);

        this.buttonInput.addEventListener("click", this.saveData);
    }

    showSuccessMessage = () => {
        // vacia los errores para que no se sumen
        this.messageWrapper.innerHTML = "";
    
        const errorsObj = validator.getErrors();
        // convertir el objeto a un array de strings
        const errorsStringsArr = Object.values(errorsObj);
    
        if (errorsStringsArr.length > 1) {
          return;
        }
    
        const successMessageP = document.createElement('p');
        successMessageP.innerHTML = "Account succesfully created.";
    
        this.messageWrapper.appendChild(successMessageP);
    
      }    

    // activar o desactivar el botón de envio (Sign Up)
    checkButton = () => {
        const errorsObj = validator.getErrors();
        const errorsArr = Object.values(errorsObj);
        

        if(errorsArr.length > 0) {
            this.buttonInput.disabled = true;
        }
        else {
            this.buttonInput.disabled = false;
        }
    }

    removeMessages = () => {
        setTimeout( () => {
          this.messageWrapper.innerHTML = "";
        }, 2000)
    }

    setErrorMessages = () => {
        this.messageWrapper.innerHTML = "";

        const errorObj = validator.getErrors();

        const errorStringArr = Object.values(errorObj);

        errorStringArr.forEach((errorStr) => {
            const errorMessageP = document.createElement("p");
            errorMessageP.innerHTML = errorStr;
            this.messageWrapper.appendChild(errorMessageP);
        });
    }
}

const signup = new Signup();

// When the web page is loaded the listeners are called.
window.addEventListener("load", signup.addListeners());