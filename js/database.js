//'use strict';
// Important: the real Db is the localStorage. We don't need to create a new Db. For 
// this reason we don't have a constructor.
// We really create a new Db (on the bottom of the code) just to create an object 
// that can use the localStorage.getItem to get all the users kept on the localStorage
// (database in memory) and save a new user using localStorage.setItem.

class Database {

    // from the local storage we get a string and convert it to an array.
    getAllUsers () {
        const usersStr = localStorage.getItem('users');
        const usersArr = JSON.parse(usersStr);

        if (usersStr === null) {
            return [];
        } else {
            return usersArr;
        }
    }

    // from 'this' Database we get all the users in an array, add the new one, and 
    // convert them to an string to save back to the Db the new user added.
    saveNewUser (newUser) {
        const usersArr = this.getAllUsers();
        usersArr.push(newUser);
        const userStr = JSON.stringify(usersArr);
        localStorage.setItem('users', userStr);
    }
}

const db = new Database();