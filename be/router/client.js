const express = require("express");
const mongoose = require("mongoose");
const z = require("zod");
const getIDToken = require("../api/getIDToken");
const jwt = require("jsonwebtoken");
const verifytoken = require("../middleware/verifytoken");

const Client = require("../models/ClientSchema");
const Psychologist = require("../models/PsychoSchema");

const LoginRequest = z.object({
  code: z.string(),
});

const Payload = z.object({
  sub: z.string(),
  email: z.string().email(),
  family_name: z.string(),
  given_name: z.string(),
  picture: z.string(),
});

const NewTopic = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  isNew: z.boolean(),
});

const router = express.Router();

router.post("/login", async (req, res) => {
  const result = LoginRequest.safeParse(req.body); // vatidates the req.body if it fits the SignUpRequest type
  if (result.success === false) {
    return res.status(400).json({ error: result.error });
  }
  const loginRequest = result.data;
  redirect_uri = "http://localhost:5173/clientcallback";
  const allData = await getIDToken(loginRequest.code, redirect_uri);
  const { id_token, access_token, refresh_token } = allData;
  if (!id_token) return res.sendStatus(401);
  const payload = jwt.decode(id_token);

  const psychologist = await Psychologist.findOne({
    email: "portaproba85@gmail.com",
  });

  if (!psychologist) {
    return { success: false, message: "Invalid email or password" };
  }
  const index = psychologist.clients.findIndex(
    (client) => client.email === payload.email
  );

  // if there's no matching client, return an error
  if (index === -1) {
    return { success: false, message: "Sorry you have no permission" };
  }

  psychologist.clients[index].name = payload.name;

  await psychologist.updateOne(psychologist);
  // if there is, save the client to the client schema

  const foundClient = await Client.findOne({ sub: payload.sub });

  if (!foundClient) {
    const newClient = new Client({
      sub: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      phone: null,
      address: null,
      createdAt: new Date(),
      Invoice: [],
      Documents: [],
      tasks: [],
      topicSuggestions: [],
      occasions: null,
      therapist: psychologist.name,
      notes: [],
      progressions: [],
      access_token: access_token,
      refresh_token: refresh_token,
    });
    await newClient.save();
  } else {
    await Client.findOneAndUpdate(
      { sub: payload.sub },
      {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
      }
    );
  }

  const result2 = Payload.safeParse(payload);

  if (!result2.success) {
    return res.sendStatus(500);
  }
  const expireDate = {
    expiresIn: 0,
  };
  const sessionToken = jwt.sign(
    result2.data,
    process.env.JWT_SECRET || expireDate
  );
  res.json(sessionToken);
});

router.get("/getdetails", verifytoken, async (req, res) => {
  const clientEmail = res.locals.email;
  const ClientsAllDetail = await Client.findOne({ email: clientEmail });
  const clientDetail = {
    sub: ClientsAllDetail.sub,
    name: ClientsAllDetail.name,
    email: ClientsAllDetail.email,
    phone: ClientsAllDetail.phone,
    address: ClientsAllDetail.address,
    createdAt: ClientsAllDetail.createdAt,
    Invoice: ClientsAllDetail.Invoice,
    Documents: ClientsAllDetail.Documents,
    tasks: ClientsAllDetail.tasks,
    topicSuggestions: ClientsAllDetail.topicSuggestions,
    occasions: ClientsAllDetail.occasions,
    therapist: ClientsAllDetail.therapist,
  };
  const therapist = await Psychologist.findOne({
    name: clientDetail.therapist,
  });
  clientDetail.therapistsFee = therapist.oradij;
  clientDetail.therapistEmail = therapist.email;
  res.send(clientDetail);
});

router.post("/newtopic", verifytoken, async (req, res) => {
  const clientEmail = res.locals.email;
  const client = await Client.findOne({ email: clientEmail });
  if (!client) return res.status(400).json({ error: "client not found" });

  const newTopic = req.body;
  client.topicSuggestions.push(newTopic);

  await client.save();
  res.sendStatus(200);
});

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTc3NTM5NTg2MjY5ODgyNzA3MjIiLCJlbWFpbCI6ImJhbGF6cy50aWxkeUBnbWFpbC5jb20iLCJpYXQiOjE2ODEzMTA2NzV9.sE4bKIBDdCKu-zxas5bc-de7teEP_FAPx0h9OEhSa84

module.exports = router;
