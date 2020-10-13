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

    handleEmailInput (event) {
        const email = event.target.value; // The event has a method target that has the value entered on the webpage.
        
        validator.validateValidEmail(email);

        const errorsObj = validator.getErrors;

        if (!errorsObj.invalidEmailError) {
            validator.validateUniqueEmail(email);
        }
    }

    handlePasswordInput (event) {
        const password = event.target.value;

        const repeatedPassword = this.repeatPassInput.value;

        validator.validatePassword(password);
        validator.validatePassRepeat(password, repeatedPassword);

        this.setErrorMessages();

    }

    handleRepPassInput (event) {
        const repeatedPass = event.target.value;

        const password = this.passwordInput.value;

        validator.validatePassRepeat(password, repeatedPass);
        validator.validatePassword(password);

        this.setErrorMessages();

    }

    // Picks up all the values entered on the web page to keep it.
    saveData (event) {
        // Avoids that the page be uploaded again (as would happen by default).
        event.preventDefault();

        const name = this.emailInput.value;
        const password = this.passwordInput.value;

        // We create the object with user info. Not 'this' because we are not creating a new object.
        // function createUser (name, password) {
        //     const userObj = {name: name, password: password}; // also valid {name, password}
        // }

        // const newUser = createUser(name, password);

        const newUser = new User(name, password);

        // We keep the user on the localStorage.
        db.saveNewUser(newUser);

        // Empty the form
        this.emailInput.value = "";
        this.passwordInput.value = "";

        validator.resetValidator();
    }

    // Methods to listen what's going on on the fields and button. 
    // When something goes on the inputs the methods will be called.

    addListeners() {
        console.log("Enter in addListeners");
        this.emailInput.addEventListener("input", this.handleEmailInput(event));
        this.passwordInput.addEventListener("input", this.handlePasswordInput(event));
        this.repeatpassInput.addEventListener("input", this.handleRepPassInput(event));
        this.buttonInput.addEventListener("click", this.saveData(event));
    }

    setErrorMessages() {
        this.messageWrapper.innerHTML = "";

        const errorObj = validator.getErrors();

        const errorStringArr = Object.values(errorObj);

        errorStringArr.array.forEach((errorStr) => {
            const errorMessageP = document.createElement("p");
            errorMessageP.innerHTML = errorStr;
            this.messageWrapper.appendChild(errorMessageP);
        });
    }
}

const signup = new Signup();

console.log('New signup:', signup);

// When the web page is loaded the listeners are called.
window.addEventListener("load", signup.addListeners());