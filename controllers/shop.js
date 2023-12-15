const Product = require('../models/product');
//const Cart = require('../models/cart');


exports.getProducts = (req, res, next) => {
  Product.find().then(product=>{
    console.log(product);
    res.render('shop/product-list', {
      prods:product,
      pageTitle: 'Shop',
      path: '/products'
    });
  }).catch(err=>{
    console.log(err);
  })
};

exports.getProductId=(req, res, next)=>{
  const proId=req.params.productId;
  Product.findById(proId).then(product=>{
  res.render('shop/product-detail',
  {
    product:product,
    pageTitle:product.title,
    path:'/products'
  })
 }).catch(err=>console.log(err));

}

exports.getIndex = (req, res, next) => {
  Product.find().then(products=>{
    res.render('shop/index', {
      prods:products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err=>{
    console.log(err);
  })
 
  
};

exports.getCart = (req, res, next) => {
  req.user.populate('cart.items.productId').
    then(user=>{
      console.log(user.cart.items)
      const products=user.cart.items
      res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products:products
    })
  
  }).catch(err=>{console.log(err)})
 
};
exports.postCart = (req, res, next) => {
  const proId=req.body.productId;

  Product.findById(proId).then(product=>{
    return req.user.addToCart(product);
  }).then(result=>{
    console.log(result);
    res.redirect('/cart');
  });
 
};

exports.postDeleteCart = (req, res, next) => {
  const proId=req.body.productId;

  req.user.deleteItemFromCart(proId).then(result=>{
    console.log(result);
    res.redirect('/cart');
  }).catch(err=>console.log(err));
 
};

exports.postOrder = (req, res, next) => {
  req.user.addOrders().
    then(result=>{
      console.log(result)
      res.redirect('/orders');
    }).catch(err=>{console.log(err)})
 
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

