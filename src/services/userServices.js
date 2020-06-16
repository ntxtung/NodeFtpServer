import Users from '../model/users.js'

export const authenticate = (username, password) => {
    return new Promise(resolve => {
        Users.findOne({username: username}, (err, doc) => {
            if (doc) {
                if (doc.password === password) {
                    resolve(doc)
                } else {
                    resolve(false)
                }
            } else {
                resolve(false)
            }
        })
    })
}

export const adduser = ({username, password, isAdmin}) => {
    return new Promise(resolve => {
        Users.insert({
            username: username,
            password: password,
            isAdmin: isAdmin,
            relativeRootDir: isAdmin === true ? '' : username
        }, (err, newDoc) => {
            if (newDoc) {
                resolve(true)
                console.log(`Created `)
                console.log(newDoc)
            }
            if (err) {
                resolve(false)
                console.log("Error: ", err)
            }
        })
    })
}

export const listUser = () => {
    return new Promise((resolve) => {
        Users.find({}, (err, docs) => {
            resolve(docs)
        }
    )})
}

export const removeUser = (username) => {
    return new Promise(resolve => {
        Users.remove({username: username}, (err, numRemoved) => {
            resolve(numRemoved)
        })
    })
}
