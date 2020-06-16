import {removeUser} from '../services/userServices.js'
const readline = require("readline");


export const removeUserByUsername = () => {
    let rl2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl2.question("Input username: ", async (username) => {
        let numRemove = await removeUser(username)
        console.log("Removed ",numRemove)
        rl2.close()
    })
}