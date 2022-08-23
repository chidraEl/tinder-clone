require("dotenv").config();
const PORT = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const url = process.env.MONGODB_URI;
const app = express();

app.use(cors());

app.use(express.json());

app.listen(PORT, () => console.log("server running on PORT " + PORT));

app.get("/", (req, res) => {
  res.json("hello tinders");
});

// signup

app.post("/signup", async (req, res) => {
  const client = new MongoClient(url);
  const { email, password } = req.body;
  const generatedUserId = uuidv4();
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ token, userId: generatedUserId });
  } catch (err) {
    console.log(err);
  }
});

// login

app.post("/login", async (req, res) => {
  const client = new MongoClient(url);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ email });

    if (user) {
      const checkPassword = await bcrypt.compare(
        password,
        user.hashed_password
      );
      if (checkPassword) {
        const token = jwt.sign(user, email, {
          expiresIn: 60 * 24,
        });
        res.status(201).json({ token, userId: user.user_id });
      }
    }

    res.status(400).send("Invalid Crendentials");
  } catch (err) {
    console.log(err);
  }
});

// get user data

app.get("/user", async (req, res) => {
  const client = new MongoClient(url);
  const userId = req.query.userId;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

// onBoarding

app.put("/user", async (req, res) => {
  const client = new MongoClient(url);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        birth_day: formData.birth_day,
        birth_month: formData.birth_month,
        birth_year: formData.birth_year,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        show_gender: formData.show_gender,
        url1: formData.url1,
        about: formData.about,
        matches: formData.matches,
      },
    };

    const insertedUser = await users.updateOne(query, updateDocument);
    res.send(insertedUser);
  } finally {
    await client.close();
  }
});

// get users by gender

app.get("/gendered-users", async (req, res) => {
  const client = new MongoClient(url);
  const gender = req.query.gender;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    // const query = { gender_identity: { $eq: "man", $eq: "woman" } };
    const query = gender === "everyone" ? {} : { gender_identity: gender };
    const genderedUsers = await users.find(query).toArray();

    res.send(genderedUsers);
  } finally {
    client.close();
  }
});

// add usr match

app.put("/addmatch", async (req, res) => {
  const client = new MongoClient(url);
  const { userId, matchedUserId } = req.body;
  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    };

    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(url);
  const userIds = JSON.parse(req.query.userIds);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];

    const foundUsers = await users.aggregate(pipeline).toArray();
    res.send(foundUsers);
  } finally {
    client.close();
  }
});

app.get("/messages", async (req, res) => {
  const client = new MongoClient(url);
  const { userId, correspondingUserId } = req.query;
  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };

    const query2 = {
      from_userId: correspondingUserId,
      to_userId: userId,
    };

    const foundMessages = await messages.find(query).toArray();
    const foundMessages2 = await messages.find(query2).toArray();
    res.send(foundMessages.concat(foundMessages2));
  } finally {
    client.close();
  }
});

app.post("/message", async (req, res) => {
  const client = new MongoClient(url);
  const message = req.body.message;

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");
    const insertMessage = await messages.insertOne(message);
    res.send(insertMessage);
  } finally {
    client.close();
  }
});
