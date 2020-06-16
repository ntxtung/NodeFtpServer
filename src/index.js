require('dotenv').config()

import {authenticate} from './services/userServices.js'

import { addNewUser } from './useCases/addUser.js'
import { listAllUser } from './useCases/listUser.js'
import { removeUserByUsername } from './useCases/removeUser.js'
var myArgs = process.argv.slice(2);


switch (myArgs[0]) {
    case 'addUser':
        addNewUser()
        break;
    case 'listUser':
        listAllUser()
        break;
    case 'removeUser':
        removeUserByUsername()
        break;
    case 'startServer':
        const FtpSrv = require('ftp-srv');
        const ftpServer = new FtpSrv({ 
            pasv_url: "localhost",
            greeting: "Hello to my FTP Server",
        });
        
        
        ftpServer.on('login', async ({connection, username, password}, resolve, reject) => {
            let result = await authenticate(username, password);
            if (result) {
                resolve({
                    root: process.env.ROOT_PATH + "/" + result.relativeRootDir,
                    cwd: '/'
                })
            } else {
                reject("Invalid username or password")
            }
        });
        
        ftpServer.listen()
        break;
}

