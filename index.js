require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const languageController = require("./controllers/languageController");

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

app.use(express.json());

let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  console.log("Connected to MongoDB");
}

connectDB();

app.post("/languages", controleriai.createLanguage);
app.get("/languages", controleriai.getLanguages);
app.put("/languages/:name", controleriai.updateLanguage);
app.delete("/languages/:name", controleriai.deleteLanguage);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
