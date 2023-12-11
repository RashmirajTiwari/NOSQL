

const getDb=require('../util/database').getDb;
const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectId;

class User{

    constructor(username,email){

        this.name=username;
        this.email=email;
    }
    save(){
        const db=getDb;
        return db.collection('users').insrtOne(this);
    }

    static findById(userId){
        return db.collection('users').findOne({_id:new ObjectId(userId)});
    }
}