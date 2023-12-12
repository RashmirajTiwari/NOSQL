

const getDb=require('../util/database').getDb;
const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectId;

class User{

    constructor(username,email,cart,id){

        this.name=username;
        this.email=email;
        this.cart=cart;
        this._id=id;
    }
    save(){
        const db=getDb();
        return db.collection('users').insrtOne(this);
    }

    static findById(userId){
        const db=getDb();
        return db.collection('users').findOne({_id:new ObjectId(userId)}).
        then(user=>{
            console.log(user);
            return user;
        }).catch(err=>{
            console.log(err);
        });
    }

    addToCart(product){

        console.log("mmmm => "+this.cart)
        const cartProductIndex=this.cart.updateCart.items.findIndex(cp=>{
            return cp.productId.toString()===product._id.toString();
        })
        
        let newQuantity=1;
        const updatedCartItems=[...this.cart.updateCart.items];
        
        if(cartProductIndex>=0){
            newQuantity=this.cart.updateCart.items[cartProductIndex].quantity+1;
            updatedCartItems[cartProductIndex].quantity=newQuantity;
        }else{
            updatedCartItems.push({productId:new ObjectId(product._id),newQuantity})
        }


        const updateCart={items:updatedCartItems};
        const db=getDb();
        return db.collection('users').
        updateOne({_id:new ObjectId(this._id)},{$set:{cart:{updateCart}}});

    }
}
module.exports=User;