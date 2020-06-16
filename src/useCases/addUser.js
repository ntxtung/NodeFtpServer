import {adduser} from '../services/userServices.js'
const readline = require("readline");
var fs = require('fs');

export const addNewUser = () => {
    let rl1 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("Creating a new user!")
        let newUser = {}
        new Promise((resolve) => {
            rl1.question("Username: ", (username) => {
                newUser.username = username
                rl1.question("Password: ", (password) => {
                    newUser.password = password
                    rl1.question("Is user an admin (y/n): ", (isAdmin) => {
                        if (isAdmin.toLowerCase() === "y") {
                            newUser.isAdmin = true
                        } else {
                            newUser.isAdmin = false
                        }
                        resolve()
                    })
                })
            })
        }).then(async () => {
            console.log("Confirm new user: ");
            console.log(newUser);
            await new Promise(resolve => {
                rl1.question("Is this correct? (y/n)", (ans) => {
                    switch (ans.toLowerCase()) {
                        case 'y':
                        case '':
                            adduser(newUser)
                            if (newUser.isAdmin === false) {
                                if (!fs.existsSync(process.env.ROOT_PATH+"\\"+newUser.username)) {
                                    fs.mkdirSync(process.env.ROOT_PATH+"\\"+newUser.username);
                                }
                            }
                            resolve()
                            break
                        default:
                            resolve()
                            break;
                    }
                })
            })
            rl1.close()
        })
}
