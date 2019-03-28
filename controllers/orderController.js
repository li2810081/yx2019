var mongoose = require("mongoose");
var Order = require("../models/Order");

var orderController = {};

// Show List View
orderController.list = function(req, res) {
    Order.find({}).exec(function (err, orders) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/orders/index", {orders: orders});
      }
    });
};

orderController.show = function(req, res) {
    Order.findOne({_id: req.params.id}).exec(function (err, order) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/orders/show", {order: order});
      }
    });
};

orderController.create = function(req, res) {
    res.render("../views/orders/create");
};

  //Save Post
orderController.save = function(req, res) {
    var order = new Order(req.body);
  
    order.save(function(err) {
      if(err) {
        console.log(err);
        res.render("../views/orders/create");
      } else {
        console.log("Successfully created an order.");
        res.redirect("/orders/show/"+order._id);
      }
    });
};

orderController.edit = function(req, res) {
    Order.findOne({_id: req.params.id}).exec(function (err, order) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/orders/edit", {order: order});
      }
    });
};

orderController.update = function(req, res) {
    Order.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, order) {
      if (err) {
        console.log(err);
        res.render("../views/orders/edit", {order: req.body});
      }
      res.redirect("/orders/show/"+order._id);
    });
};

orderController.delete = function(req, res) {
    Order.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("Order deleted!");
        res.redirect("/orders");
      }
    });
};

module.exports = orderController;
