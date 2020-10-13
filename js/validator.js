//'use strict';

class Validator {

    constructor () {
        this.invalidEmailError = "The email format is not valid.";
        this.emailExistsError = "The email introduced exits already.";
        this.passwordError = "Password must have 6 or more characters.";
        this.repeatPassError = "The password and repeated password must be the same.";
        
        // We don't know yet whether the email is already registered.
        // This way we don't touch the errors literals that are above and play with them.
        this.errors = {
            invalidEmailError : this.invalidEmailError,
            passwordError : this.passwordError,
            repeatPassError : this.repeatPassError
        };
    }

    // We add or remove the error depending whether the email is valid or not.
    validateValidEmail = (email) => {
        if (this.isEmailValid(email)) {
            delete this.errors.invalidEmailError;
        } else {
            this.errors.invalidEmailError = this.invalidEmailError;
        }
    }
    
    // RegEx (regular expression) is a method to validate for example the email.
    isEmailValid = (email) => {
        const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

        // metodo `test` prueba si la cadena cumple las reglas
        // y devuelve `true` o `false`
        const isValid = emailRegEx.test(email);  
        return isValid;
    }

    // We add or remove the error depending whether the email is unique or not.
    validateUniqueEmail = (newEmail) => {

        console.log('email:', newEmail);
        const userDb = db.getAllUsers();

        let emailUnique = true;
        
        if (userDb.length > 0) {
            userDb.forEach((user) => {
                if (user.email == newEmail) {
                    emailUnique = false;
                }
            });
        console.log('Emailunique:', emailUnique);
        if (emailUnique) {
            delete this.errors.emailExistsError;
        } else {
            this.errors.emailExistsError = this.emailExistsError;
        }
        }
    }

    validatePassword = (pass) => {
        if (pass.length > 5) {
            delete this.errors.passwordError;
        } else {
            this.errors.passwordError = this.passwordError;
        }
    }

    validatePassRepeat = (pass, repeatPass) => {
        if (pass == repeatPass) {
            delete this.errors.repeatPassError;
        } else {
            this.errors.repeatPassError = this.repeatPassError;
        }
    }

    getErrors = () => {
        return this.errors;
    }

    resetValidator = () => {
        this.errors = {
            invalidEmailError : this.invalidEmailError,
            passwordError : this.passwordError,
            repeatPassError : this.repeatPassError
        };
    }

}

const validator = new Validator();