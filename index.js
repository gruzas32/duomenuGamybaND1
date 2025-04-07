require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");
const controleriai = require("./controllers/controleriai.js");

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

app.use(express.json());

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("testDB");
  console.log("Connected to MongoDB");

  // Paduodam db į controller failą
  controleriai.setDb(db);
}

connectDB();

app.post("/users", controleriai.createUser);
app.get("/users", controleriai.getUsers);
app.put("/users/:name", controleriai.updateUser);
app.delete("/users/:id", controleriai.deleteUser);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
