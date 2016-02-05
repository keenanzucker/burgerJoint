var path = require('path');
var express = require('express');
var Ingredient = require('../models/ingredientModel');
var Model = require('../models/orderModel');

var routes = {};

routes.showIngredients = function(req, res){

  Ingredient.find({}, function(err, data){
    if (err) console.log(err);
    else{
      console.log(data);
      res.render('ingredients', {ingredients: data});
    }
  });
};

routes.addNewIngredient = function(req, res) {
  
  new Ingredient({
    name: req.body.name,
    price: req.body.price,
    stock: true
  }).save(function(err){
    if (err) console.log(err);
    else{
      console.log("Ingredient Added: " + req.body.name);
    }
  });

};

routes.editIngredient = function(req ,res){

  // new Ingredient({
  //   name: req.body.name,
  //   price: req.body.price,
  //   stock: true
  // }).update(function(err){
  //   if (err) console.log(err);
  //   else{
  //     console.log("Ingredient Added: " + req.body.name);
  //   }
  // });

};

module.exports = routes;