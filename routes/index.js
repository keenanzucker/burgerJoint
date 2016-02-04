var path = require('path');
var express = require('express');
var Ingredient = require('../models/ingredientModel');
var Model = require('../models/orderModel');

var routes = {};

var i1 = {name: "tomato", price: '12', stock: 'true'};

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
  })
};

module.exports = routes;