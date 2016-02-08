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

routes.placeOrder = function(req, res){


  console.log(req.body);
  new Order({
    ingredients: req.body.ingredients,
    name: req.body.name,
    complete: false,
  }).save(function(err, val){
    if (err) console.log(err);
    else {
      console.log("ORDER PLACED!");
      console.log(val.name);
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

routes.editIngredient = function(req ,res){

  var newName = req.body.name;
  var newPrice = req.body.price;
  var ingId = req.body.id;

  Ingredient.findByIdAndUpdate(ingId, {name: newName, price: newPrice}, function(err, val){
    if (err) console.log(err);
    else {

      console.log("Ingredient Editted!");
      console.log(val.name + val.price);
      res.send(ingId);
    }
  });

}



module.exports = routes;