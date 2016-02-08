$(document).ready(function(){

  $('#new-form').hide();
  $('#edit-form').hide();
  $('#add-id').on('click', function(event){
    $('#new-form').toggle('show');
  });


// Change Stock Button
var $stockForm = $(".stock-form");

$stockForm.submit(function(event){

  event.preventDefault();

  var id = event.target.getAttribute('id');

  formData = {
   id: id
  }

  $.post("outOfStock", formData)
    .done(function(data, status){
      console.log("#"+data);
      $("#"+data).parent().hide();

    })
    .error(onError);
});
//  ===============================

// Submit Order

var $orderForm = $("#order-form");

$orderForm.submit(function(event){

  event.preventDefault();
  formData = $orderForm.serialize();
  var sum = 0;

  ingredients = $("input:checked").map(function(){
    return this.name;
  });

  var name = $orderForm.find("[name='orderName']").val();
  ingredients = ingredients.toArray();

  console.log(ingredients);

  formData = {
    ingredients: JSON.stringify(ingredients),
    name: name,
    complete: false,
  }

  console.log(formData)

  $.post('place', formData)
  .done(function(data, status)
  {
    console.log(data);
  })
  .error(onError);

});

// =====================






// ================

// Add New Ingredient Button
// ===============================
var $form = $("#new-form");

var onSuccess = function(data, status) {

  var table = document.getElementById("ing-table");

  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = data.name;
  cell2.innerHTML = data.price;
  cell3.innerHTML =  data.stock;
  cell4.innerHTML = "<input type='submit' value='Out of Stock'/>"
  cell5.innerHTML = "<input type='button' name='edit' value='Edit' />"

};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {

  event.preventDefault();
  formData = $form.serialize();
  var name = $form.find("[name='name']").val();
  var price = $form.find("[name='price']").val();
  formData = {
    name: name,
    price: price,
    stock: true
  }

  $.post("new", formData)
    .done(onSuccess)
    .error(onError);
});

// ============================


// Edit Ingredient Button

$("#edit-button").click(function(){
  var $row= $(this).closest("tr");
  var $name = $row.find("#ing-name").text();

  $('#edit-form').toggle('show');

});

// $("editSubmit").click(funtion(){

// });
});