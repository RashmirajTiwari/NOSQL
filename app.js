const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
//const sequelize=require('./util/database');

const mongoConnect=require('./util/database').mongoConnect;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const Product=require('./models/product');
const User=require('./models/user');
// const Cart=require('./models/cart');
// const CartItem=require('./models/cart-item');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findById('65787c081885c57545bd95aa').
    then(user=>{
        console.log(user)
        req.user=new User(user.name,user.email,user.cart,user._id);
        next();
    }).
    catch(err=>{
    console.log(err)})
    

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Product.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product,{through:CartItem});
// Product.belongsToMany(Cart,{through:CartItem});

mongoConnect(()=>{
    app.listen(3000)
});



