var Datastore = require('nedb')
const users = new Datastore('./src/model/db/users.db');
users.loadDatabase();
users.ensureIndex({fieldName: 'username', unique: true}, (err) => {
    if (err){
        console.log(err);
        
    }
})

export default users;


