const mongoose = require("mongoose");
const manufacturers = require("./routes/manufacturers");
const customers = require("./routes/customers");
const categorys = require("./routes/categorys");
const express = require("express");
const app = express();

mongoose
	.connect("mongodb://localhost/manufacturers")
	.then(() => console.log("connected"))
	.catch((err) => console.error("could not connect", err));

app.use(express.json());
app.use("/api/manufacturers", manufacturers);
app.use("/api/customers", customers);
app.use("/api/categorys", categorys);

const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
