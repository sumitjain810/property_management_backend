import express from "express";
import bodyParser from "body-parser";

import Airtable from "airtable-node";
const airtable = new Airtable({ apiKey: "keywwJIRL7Nr6KbHd" })
  .base("appUsA2oCYw1PeyUc")
  .table("property_list");

import cors from "cors";
const app = express();
const corsOptions = { origin: "http://localhost:4200" };

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/getAll", async (req, res) => {
	console.log("GET Request: ", req.body)
	await airtable.list().then((resp) => {
		console.log(resp);
		res.json({ message: resp });
	});
});

app.post("/saveProperty", async (req, res) => {
	console.log("POST Request: ", req.body)
	await airtable.create(req.body).then((resp) => {
		console.log(resp);
		res.json({ message: resp });
	});	
});

app.post("/deleteProperty", async (req, res) => {
	console.log("Delete Request: ", req.body)
	await airtable.delete('recL3tp8V8hgPV9oV').then((resp) => {
		console.log(resp);
		res.json({ message: resp });
	});	
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}.`);
});
