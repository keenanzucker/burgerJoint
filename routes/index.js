var path = require('path');
var express = require('express');
var Ingredient = require('../models/ingredientModel');
var Order = require('../models/orderModel');

var routes = {};

routes.showIngredients = function(req, res){

  Ingredient.find({stock:true}).sort({price:-1}).exec(function(err, data){
    if (err) console.log(err);
    else{
      res.render('ingredients', {ingredients: data});
    }
  });
}

routes.showIngredientsOrder = function(req, res){

  Ingredient.find().sort({price:-1}).exec(function(err, data){
    if (err) console.log(err);
    else{
      res.render('order', {ingredients: data});
    }
  });
}

routes.showOrders = function(req, res){

  Order.find().sort({cost:-1}).exec(function(err, data){
    if (err) console.log(err);
    else{
      console.log("Showing Orders!");
      res.render('kitchen', {order: data});
    }
  });
}

routes.addNewIngredient = function(req, res) {
  
  new Ingredient({
    name: req.body.name,
    price: req.body.price,
    stock: true
  }).save(function(err, val){
    if (err) console.log(err);
    else{
      console.log("Ingredient Added: " + req.body.name);
      res.send(val);
    }
  });
}

routes.editIngredient = function(req ,res){

  var newName = req.body.name;
  var newPrice = req.body.price;
  var old = req.body.oldId;

  console.log(newName);

  Ingredient.findByIdAndUpdate(old, {name: newName, price: newPrice}, function(err, val){
    if (err) console.log(err);
    else {
      console.log("Ingredient Editted!", newName, newPrice);
      res.send({id:old, name:newName, price:newPrice, oldName:val.name, oldCost:val.price});
    }
  });
}


routes.placeOrder = function(req, res){

  console.log("BODY", req.body);
  var OrderX = new Order({
    ingredients: req.body.ingredients,
    cost: req.body.cost,
    name: req.body.name,
    complete: false,
  })
  console.log(OrderX)
  OrderX.save(function(err, val){
    if (err) console.log(err);
    else {
      console.log("ORDER PLACED!");
      console.log(val.ingredients);
      res.send(val);
    }
  });
}

routes.outOfStock = function(req, res){

  var ingId = req.body.id;
  console.log(ingId);

  Ingredient.findByIdAndUpdate(ingId, {stock: false}, function(err, val){
    if (err) console.log(err);
    else {
      console.log("Ingredient Stock Changed!");
      console.log(val.stock);
      res.send(ingId);
    }
  });
}

routes.completeOrder = function(req, res){

  var ingId = req.body.id;
  console.log(ingId);

  Order.findByIdAndRemove(ingId, function(err, val){
    if (err) console.log(err);
    else {
      console.log("Order Completed!");
      res.send(ingId);
    }
  });
}





module.exports = routes;