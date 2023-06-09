const express = require("express");
const mongoose = require("mongoose");
const z = require("zod");
const getIDToken = require("../api/getIDToken");
const jwt = require("jsonwebtoken");
const verifytoken = require("../middleware/verifytoken");
const axios = require("axios");

const Psychologist = require("../models/PsychoSchema");
const Clients = require("../models/ClientSchema");
const pdf = require("../models/PdfSchema");

const loginEmail = require("../util/loginEmail");
const eventEmail = require("../util/eventEmail");

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

const ClientEmail = z.object({
  email: z.string().email(),
});

const ClientProgression = z.object({
  name: z.string(),
  percentages: z.string(),
});

const Note = z.object({
  title: z.string(),
  description: z.string(),
});

const Event = z.object({
  end: {
    dateTime: z.string(),
  },
  start: {
    dateTime: z.string(),
  },
  summary: z.string(),
});
const Task = z.object({
  title: z.string(),
  description: z.string(),
  issuedate: z.date(),
  deadline: z.string(),
  isDone: z.boolean(),
  isUrgent: z.boolean(),
});

const router = express.Router();

router.post("/login", async (req, res) => {
  const result = LoginRequest.safeParse(req.body); // vatidates the req.body if it fits the SignUpRequest type
  if (result.success === false) {
    return res.status(400).json({ "hiba van": "hiba" });
  }
  const code = result.data.code;

  const redirect_uri = "http://localhost:5173/psychocallback";
  const { id_token, access_token, refresh_token } = await getIDToken(
    code,
    redirect_uri
  );

  if (!id_token) return res.sendStatus(401);

  const payload = jwt.decode(id_token);

  const findPsychologist = await Psychologist.findOne({ email: payload.email });
  if (!findPsychologist) {
    return res.sendStatus(401);
  }
  findPsychologist.access_token = access_token;
  findPsychologist.refresh_token = refresh_token;

  await findPsychologist.save();

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

router.get("/allclients",/* verifytoken */ async (req, res) => {
    const clients = await Clients.find({}, { name: 1, email: 1, sub: 1 });
    res.send(clients);
    // res.send(psychologist.clients)
  }
);

router.get("/getevents",verifytoken, async (req, res) => {

});
router.get("/:sub", verifytoken, async (req, res) => {
  const clientSub = req.params.sub;

  const clientDetail = await Clients.findOne({ sub: clientSub });

  res.send(clientDetail);
});

router.post("/clientprogression/:sub", verifytoken, async (req, res) => {
  const clientSub = req.params.sub;

  const result = ClientProgression.safeParse(req.body); // vatidates the req.body if it fits the SignUpRequest type
  if (result.success === false) {
    return res.status(400).json({ "hiba van": "hiba" });
  }
  const progression = result.data;
  const client = await Clients.findOneAndUpdate(
    { sub: clientSub },
    { $push: { progressions: progression } }
  );
  if (!client) return res.status(404).json({ "hiba van": "hiba" });
  res.sendStatus(200);
});

router.post("/addtask/:sub", verifytoken, async (req, res) => {
  const clientSub = req.params.sub;

  /*   const result = Task.safeParse(req.body) // vatidates the req.body if it fits the SignUpRequest type
    if (result.success === false){
      return res.status(400).json({"hiba van": "hiba"})
    } */
  const task = req.body;

  const client = await Clients.findOneAndUpdate(
    { sub: clientSub },
    { $push: { tasks: task } }
  );
  if (!client) return res.status(400).json({ "hiba van": "hiba" });
  res.send(client);
});

router.delete("/deletetask/:sub/:id", verifytoken, async (req, res) => {

  const clientSub = req.params.sub;
  const id = req.params.id;

  const client = await Clients.findOne({ sub: clientSub });

  const task = client.tasks.find((task) => task._id == id);

  const index = client.tasks.indexOf(task);
  client.tasks.splice(index, 1);

  await client.save();
  res.sendStatus(200);
});

router.put("/dicreaseprogression/:sub", verifytoken, async (req, res) => {
  const clientSub = req.params.sub;
  const progressionPercentages = req.body.percentages;
  const id = req.body.id;

  const client = await Clients.findOne({ sub: clientSub });

  const progression = client.progressions.find(
    (progression) => progression._id == id
  );

  progression.percentages = progressionPercentages;
  await client.save();
  res.sendStatus(200);
});

router.post("/addnote/:sub", verifytoken, async (req, res) => {
  const clientSub = req.params.sub;
  const result = Note.safeParse(req.body); // vatidates the req.body if it fits the SignUpRequest type
  if (result.success === false) {
    return res.status(400).json({ "safeParsehiba van": "safeParsehibahiba" });
  }
  const note = result.data;

  const client = await Clients.findOneAndUpdate(
    { sub: clientSub },
    { $push: { notes: note } }
  );

  if (!client) return res.status(400).json({ "hiba van": "hiba" });
  res.send(client);
});



router.post("/addevent/:sub", verifytoken, async (req, res) => {
  const clientSub = req.params.sub;
  const result = Event.safeParse(req.body); // vatidates the req.body if it fits the SignUpRequest type
  if (result.success === false) {
    return res.status(400).json({ "hiba van": "hiba" });
  }
  const event = result.data;
  const client = await Clients.findOneAndUpdate(
    { sub: clientSub },
    { $push: { events: event } }
  );
  if (!client) return res.status(400).json({ "hiba van": "hiba" });
  res.send("Client event added");
});

//EZEN MÉG FINOMÍTANI KELL
router.post("/addtocalendar/:sub", verifytoken, async (req, res) => {
  /*   const result = Event.safeParse(req.body) // vatidates the req.body if it fits the SignUpRequest type
     if (result.success === false){
      return res.status(400).json({"hiba van": "hiba"})
    }  */
  const event = req.body;

  const clientSub = req.params.sub;

  const psychologistEmail = res.locals.email;

  const psychologist = await Psychologist.findOne({ email: psychologistEmail });

  if (!psychologist) return res.status(400).json("Psychologist not found");
  psychologist.access_token = psychologist.access_token;

  const client = await Clients.findOne({ sub: clientSub });
  if (!client) return res.status(400).json("Client not found");
  client.refresh_token = client.refresh_token;

  async function getAccessToken() {
    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        refresh_token: client.refresh_token,
        grant_type: "refresh_token",
      });
      return response.data.access_token;
    } catch (err) {
      console.error(err);
    }
  }
  clientNewAccesToken = await getAccessToken();

  const API_KEY = process.env.API_KEY;
  const sendEventToCalendar = async (access_token) => {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(event.newEvent),
      }
    );
    return response;
  };

  const response = await sendEventToCalendar(psychologist.access_token);

  const clientresponse = await sendEventToCalendar(clientNewAccesToken);
 // const senEventEmailt = await eventEmail(client.email, event.newEvent);
  if (!response.ok || !clientresponse.ok)
    return res.status(400).json(" NOT OK");
  return res.status(200).json("OK");
});

router.post("/addclientemail", verifytoken, async (req, res) => {
  const result = ClientEmail.safeParse(req.body);

  const psychologistEmail = res.locals.email;

  const psychologist = await Psychologist.findOne({ email: psychologistEmail });
  if (!psychologist)
    return res.status(400).json("Sajnáljuk Önnek nincsen jogosultsága");
    const index = psychologist.clients.findIndex(client => client.email === result.data.email);
  if (index === -1) {
    psychologist.clients.push({
      email: result.data.email,
      name: null,
    });
    psychologist.save();
    // SEND AND EMAIL TO THE CLIENT NODEMAILER on WEEK3 no google auth
    //await loginEmail(result.data.email)
    res.send("client added");
  } else {
    res.send("client already exist");
  }
});

module.exports = router;
