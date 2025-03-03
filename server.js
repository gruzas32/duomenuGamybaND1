require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

app.use(express.json());

let db;

async function connectDB() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("myDatabase"); 
  console.log("Connected to MongoDB");
}

connectDB();

app.post("/users", async (req, res) => {
  try {
    const newUser = req.body;
    const result = await db.collection("users").insertOne(newUser);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await db.collection("users").findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await db.collection("users").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
