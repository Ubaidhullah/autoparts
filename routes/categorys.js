const { Category, validate } = require("../models/category");
const { Manufacturer } = require("../models/manufacturer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const category = await Category.find();
  res.send(category);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const manufacturer = await Manufacturer.findById(req.body.manufacturerId);
  if (!manufacturer) return res.status(400).send("Invalid manufacturer.");

  let category = new Category({
    title: req.body.title,
    manufacturer: {
      _id: manufacturer._id,
      manufacturerName: manufacturer.manufacturerName,
    },
    numberInStock: req.body.numberInStock,
    priceRate: req.body.priceRate,
  });
  category = await category.save();

  res.send(category);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const manufacturer = await Manufacturer.findById(req.body.manufacturerId);
  if (!manufacturer) return res.status(400).send("Invalid manufacturer.");

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      manufacturer: {
        _id: manufacturer._id,
        manufacturerName: manufacturer.manufacturerName,
      },
      numberInStock: req.body.numberInStock,
      priceRate: req.body.priceRate,
    },
    { new: true }
  );

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category)
    return res
      .status(404)
      .send("The category with the given ID was not found.");

  res.send(category);
});

module.exports = router;
