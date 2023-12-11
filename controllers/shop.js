const Product = require('../models/product');
const Cart = require('../models/cart');


exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(product=>{
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
  // Product.findAll({where:{id:proId}}).then(product=>{
  //   res.render('shop/product-detail',
  //   {
  //     product:product[0],
  //     pageTitle:product.title,
  //     path:'/products'
  //   })
  // }).
  // catch(err=>{
  //   console.log(err);
  // });
  
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
  Product.fetchAll().then(products=>{
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
  req.user.getCart().then(cart=>{
    return cart.getProducts().
    then(products=>{
      res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products:products
    })
  });
  }).catch(err=>{console.log(err)})
 
};
exports.postCart = (req, res, next) => {
  const proId=req.body.productId;
  let fetchCart;
  let newQuantity=1;
  req.user.getCart().
  then( cart=>{
    fetchCart=cart;
    return cart.getProducts({where :{id:proId}})
  }).then(products=>{
    let product;
    if(products.length>0){
      product=products[0];
    }
    
    if(product){
      const oldQuantity=product.cartItem.quantity;
      newQuantity=oldQuantity+1;
      return product;
    }
    return Product.findByPk(proId);
    
    }).then((product)=>{
      return fetchCart.addProduct(product,{through:{quantity:newQuantity}
    })
    .then(()=>{
      res.redirect('/cart');
    }).
    catch(err=>{
    console.log(err)
    })
  }).
  catch(err=>{
    console.log(err);
  })
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