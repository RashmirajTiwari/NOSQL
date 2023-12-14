const Product = require('../models/product');
const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectId;


exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    res.redirect('/');
  }
  const proId=req.params.productId;
  Product.findById(proId).then(product=>{
    if(!product){
      res.redirect('/');
    }
   
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      editing:editMode,
      product:product
  })
  }).catch(err=>{
    console.log(err);
  })
    
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  
  const product=new Product({title:title,price:price,description:description,imageUrl:imageUrl});
  product.save().then(result=>{
    console.log('Product Created');
    res.redirect('/');
  }).catch(err=>{
    console.log(err);
  })
  
};

exports.postEditProduct = (req, res, next) => {
  const prodId=req.body.productId;
  const upatedTitle = req.body.title;
  const upatedtImageUrl = req.body.imageUrl;
  const upatedtPrice = req.body.price;
  const upatedtDescription = req.body.description;
  // const updateProduct = new Product(proId,upatedTitle, upatedtImageUrl, upatedtDescription, upatedtPrice);
  // updateProduct.save();

   
    Product.findById(prodId).then(product=>{

      product.title=upatedTitle;
      product.price=upatedtPrice;
      product.description=upatedtDescription;
      product.imageUrl=upatedtImageUrl;
      return product.save();
   
    }).then(()=>{
    console.log("Updated Product...!")
    res.redirect('/');
  })
  .catch(err=>{
    console.log(err);
  })
 
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId=req.params.productId;
  Product.findByIdAndDelete(prodId).then(()=>{
    console.log("Deleted Product...!")
    res.redirect('/admin/products');
  })
  .catch(err=>{
    console.log(err);
  })
  
};

exports.getProducts = (req, res, next) => {

  Product.find().then(products=>{
    res.render("admin/products", {
      prods:products,
      pageTitle: 'Products',
      path:'/'
    });
  }).catch(err=>{
    console.log(err);
  })
  // Product.findAll().then(products=>{
  //   res.render("admin/products", {
  //     prods:products,
  //     pageTitle: 'Products',
  //     path:'/'
  //   });
  // }).catch(err=>{
  //   console.log(err);
  // })
};
