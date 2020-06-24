const { Manufacturer, validate } = require("../models/manufacturer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const manufacturers = await Manufacturer.find().sort("manufacturerName");
  res.send(manufacturers);
});

router.post("/", async (req, res) => {
  const { error } = validateManufacturer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let manufacturer = new Manufacturer({
    manufacturerName: req.body.manufacturerName,
  });
  manufacturer = await manufacturer.save();

  res.send(manufacturer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateManufacturer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const manufacturer = await Manufacturer.findByIdAndUpdate(
    req.params.id,
    { manufacturerName: req.body.manufacturerName },
    {
      new: true,
    }
  );

  if (!manufacturer)
    return res
      .status(404)
      .send("The Manufacturer with the given ID was not found.");

  res.send(manufacturer);
});

router.delete("/:id", async (req, res) => {
  const manufacturer = await Manufacturer.findByIdAndRemove(req.params.id);
  if (!manufacturer)
    return res
      .status(404)
      .send("The manufacturer with the given ID was not found.");

  res.send(manufacturer);
});

router.get("/:id", async (req, res) => {
  const manufacturer = await Manufacturer.findById(req.params.id);
  if (!manufacturer)
    return res
      .status(404)
      .send("The manufacturer with the given ID was not found.");
  res.send(manufacturer);
});

module.exports = router;
