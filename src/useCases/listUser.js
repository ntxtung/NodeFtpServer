import {listUser} from '../services/userServices.js'


export const listAllUser = async () => {
    console.log("All users");
    let listOfUser = await listUser()
    let filteredUser = listOfUser.map(user => ({
        username: user.username,
        isAdmin: user.isAdmin,
        relativeRootDir: user.relativeRootDir
    }))
    console.log(JSON.stringify(filteredUser, null, 4))
}