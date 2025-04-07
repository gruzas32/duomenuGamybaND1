let db; // pradžioje be ryšio

function setDb(database) {
  db = database;
}

async function createUser(req, res) {
  try {
    const result = await db.collection("users").insertOne(req.body);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error creating user", error: err });
  }
}

async function getUsers(req, res) {
  try {
    const data = await db.collection("users").find().toArray();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send({ message: "Error retrieving users", error: err });
  }
}

async function updateUser(req, res) {
  try {
    const result = await db.collection("users").updateOne(
      { _id: new require("mongodb").ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error updating user", error: err });
  }
}

async function deleteUser(req, res) {
  try {
    const result = await db.collection("users").deleteOne({ _id: new require("mongodb").ObjectId(req.params.id) });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send({ message: "Error deleting user", error: err });
  }
}

module.exports = {
  setDb,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
